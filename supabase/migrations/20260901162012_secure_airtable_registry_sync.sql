alter table public.airtable_registry_sync_state
  add column if not exists sync_secret_hash bytea;

update public.airtable_registry_sync_state
set sync_secret_hash = decode(
  '7dd4afe8d4a5d7ba95466f1a3f5e50f5ed28f355a910d8d01e950e10fe3f2505',
  'hex'
)
where singleton = true;

alter table public.airtable_registry_sync_state
  alter column sync_secret_hash set not null;

drop function if exists public.activate_airtable_registry_sync(uuid, integer);

create or replace function public.stage_airtable_registry_sync(
  p_sync_id uuid,
  p_records jsonb,
  p_secret text
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_secret_hash bytea;
  v_inserted_count integer;
begin
  select sync_secret_hash
  into v_secret_hash
  from public.airtable_registry_sync_state
  where singleton = true;

  if v_secret_hash is null
     or extensions.digest(coalesce(p_secret, ''), 'sha256') <> v_secret_hash then
    raise insufficient_privilege using message = 'Invalid registry sync credentials';
  end if;

  if p_sync_id is null
     or jsonb_typeof(p_records) <> 'array'
     or jsonb_array_length(p_records) < 1
     or jsonb_array_length(p_records) > 500 then
    raise exception 'A valid sync ID and 1 to 500 registry records are required';
  end if;

  insert into public.airtable_registry_index (
    sync_id,
    source_record_id,
    display_name,
    registration_type,
    registration_number,
    registration_number_key,
    registration_year
  )
  select
    p_sync_id,
    btrim(record.source_record_id),
    btrim(record.display_name),
    nullif(upper(btrim(record.registration_type)), ''),
    btrim(record.registration_number),
    btrim(record.registration_number_key),
    record.registration_year::smallint
  from jsonb_to_recordset(p_records) as record (
    source_record_id text,
    display_name text,
    registration_type text,
    registration_number text,
    registration_number_key text,
    registration_year integer
  )
  on conflict (sync_id, source_record_id) do update
  set display_name = excluded.display_name,
      registration_type = excluded.registration_type,
      registration_number = excluded.registration_number,
      registration_number_key = excluded.registration_number_key,
      registration_year = excluded.registration_year,
      indexed_at = now();

  get diagnostics v_inserted_count = row_count;
  return v_inserted_count;
end;
$$;

create or replace function public.activate_airtable_registry_sync(
  p_sync_id uuid,
  p_expected_count integer,
  p_secret text
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_secret_hash bytea;
  v_actual_count integer;
  v_current_count integer;
begin
  select sync_secret_hash, record_count
  into v_secret_hash, v_current_count
  from public.airtable_registry_sync_state
  where singleton = true;

  if v_secret_hash is null
     or extensions.digest(coalesce(p_secret, ''), 'sha256') <> v_secret_hash then
    raise insufficient_privilege using message = 'Invalid registry sync credentials';
  end if;

  if p_sync_id is null or p_expected_count is null or p_expected_count < 1 then
    raise exception 'A valid sync ID and positive expected count are required';
  end if;

  select count(*)::integer
  into v_actual_count
  from public.airtable_registry_index
  where sync_id = p_sync_id;

  if v_actual_count <> p_expected_count then
    raise exception 'Registry sync count mismatch: expected %, found %',
      p_expected_count,
      v_actual_count;
  end if;

  if v_current_count > 0 and v_actual_count < floor(v_current_count * 0.8) then
    raise exception 'Registry sync rejected because the record count dropped unexpectedly';
  end if;

  update public.airtable_registry_sync_state
  set active_sync_id = p_sync_id,
      record_count = v_actual_count,
      synced_at = now(),
      updated_at = now()
  where singleton = true;

  delete from public.airtable_registry_index
  where sync_id <> p_sync_id;

  return v_actual_count;
end;
$$;

create or replace function public.discard_airtable_registry_sync(
  p_sync_id uuid,
  p_secret text
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_secret_hash bytea;
  v_deleted_count integer;
begin
  select sync_secret_hash
  into v_secret_hash
  from public.airtable_registry_sync_state
  where singleton = true;

  if v_secret_hash is null
     or extensions.digest(coalesce(p_secret, ''), 'sha256') <> v_secret_hash then
    raise insufficient_privilege using message = 'Invalid registry sync credentials';
  end if;

  delete from public.airtable_registry_index as index_record
  where index_record.sync_id = p_sync_id
    and not exists (
      select 1
      from public.airtable_registry_sync_state as state
      where state.singleton = true
        and state.active_sync_id = index_record.sync_id
    );

  get diagnostics v_deleted_count = row_count;
  return v_deleted_count;
end;
$$;

create or replace function public.search_airtable_registry_index(
  p_query text default null,
  p_registration_type text default null,
  p_registration_year integer default null,
  p_limit integer default 25,
  p_offset integer default 0
)
returns table (
  nurse_name text,
  registration_type text,
  registration_number text,
  registration_year integer,
  total_count bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    i.display_name,
    i.registration_type,
    i.registration_number,
    i.registration_year::integer,
    count(*) over() as total_count
  from public.airtable_registry_index as i
  inner join public.airtable_registry_sync_state as state
    on state.singleton = true
   and state.active_sync_id = i.sync_id
  where
    (
      nullif(btrim(p_query), '') is null
      or i.display_name ilike '%' || btrim(p_query) || '%'
      or i.registration_number ilike '%' || btrim(p_query) || '%'
    )
    and (
      nullif(btrim(p_registration_type), '') is null
      or i.registration_type = upper(btrim(p_registration_type))
    )
    and (
      p_registration_year is null
      or i.registration_year = p_registration_year
    )
  order by i.display_name, i.registration_number
  limit least(greatest(coalesce(p_limit, 25), 1), 100)
  offset greatest(coalesce(p_offset, 0), 0);
$$;

revoke all on function public.stage_airtable_registry_sync(uuid, jsonb, text)
  from public, anon, authenticated;
revoke all on function public.activate_airtable_registry_sync(uuid, integer, text)
  from public, anon, authenticated;
revoke all on function public.discard_airtable_registry_sync(uuid, text)
  from public, anon, authenticated;
revoke all on function public.search_airtable_registry_index(text, text, integer, integer, integer)
  from public, anon, authenticated;

grant execute on function public.stage_airtable_registry_sync(uuid, jsonb, text)
  to anon, service_role;
grant execute on function public.activate_airtable_registry_sync(uuid, integer, text)
  to anon, service_role;
grant execute on function public.discard_airtable_registry_sync(uuid, text)
  to anon, service_role;
grant execute on function public.search_airtable_registry_index(text, text, integer, integer, integer)
  to anon, authenticated, service_role;
