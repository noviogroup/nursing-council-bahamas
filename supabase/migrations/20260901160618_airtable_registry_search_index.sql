create extension if not exists pg_trgm with schema extensions;

create table if not exists public.airtable_registry_index (
  sync_id uuid not null,
  source_record_id text not null,
  display_name text not null check (btrim(display_name) <> ''),
  registration_type text,
  registration_number text not null check (btrim(registration_number) <> ''),
  registration_number_key text not null check (btrim(registration_number_key) <> ''),
  registration_year smallint check (registration_year between 1800 and 2100),
  indexed_at timestamptz not null default now(),
  primary key (sync_id, source_record_id),
  unique (sync_id, registration_number_key)
);

comment on table public.airtable_registry_index is
  'Server-managed public registry search index derived exclusively from approved Airtable fields.';

create table if not exists public.airtable_registry_sync_state (
  singleton boolean primary key default true check (singleton),
  active_sync_id uuid,
  record_count integer not null default 0 check (record_count >= 0),
  synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.airtable_registry_sync_state (singleton)
values (true)
on conflict (singleton) do nothing;

alter table public.airtable_registry_index enable row level security;
alter table public.airtable_registry_sync_state enable row level security;

revoke all on table public.airtable_registry_index from public, anon, authenticated;
revoke all on table public.airtable_registry_sync_state from public, anon, authenticated;

grant select, insert, update, delete on table public.airtable_registry_index to service_role;
grant select, insert, update, delete on table public.airtable_registry_sync_state to service_role;

create index if not exists airtable_registry_index_sync_name_idx
  on public.airtable_registry_index (sync_id, display_name);

create index if not exists airtable_registry_index_sync_type_idx
  on public.airtable_registry_index (sync_id, registration_type);

create index if not exists airtable_registry_index_sync_year_idx
  on public.airtable_registry_index (sync_id, registration_year);

create index if not exists airtable_registry_index_name_trgm_idx
  on public.airtable_registry_index
  using gin (display_name extensions.gin_trgm_ops);

create index if not exists airtable_registry_index_number_trgm_idx
  on public.airtable_registry_index
  using gin (registration_number extensions.gin_trgm_ops);

create or replace function public.activate_airtable_registry_sync(
  p_sync_id uuid,
  p_expected_count integer
)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_actual_count integer;
begin
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
security invoker
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

revoke all on function public.activate_airtable_registry_sync(uuid, integer)
  from public, anon, authenticated;
revoke all on function public.search_airtable_registry_index(text, text, integer, integer, integer)
  from public, anon, authenticated;

grant execute on function public.activate_airtable_registry_sync(uuid, integer)
  to service_role;
grant execute on function public.search_airtable_registry_index(text, text, integer, integer, integer)
  to service_role;
