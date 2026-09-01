drop function if exists public.search_airtable_registry_index(
  text,
  text,
  integer,
  integer,
  integer
);

create or replace function public.search_airtable_registry_index(
  p_query text default null,
  p_registration_type text default null,
  p_registration_year_from integer default null,
  p_registration_year_to integer default null,
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
    index_record.display_name,
    index_record.registration_type,
    index_record.registration_number,
    index_record.registration_year::integer,
    count(*) over() as total_count
  from public.airtable_registry_index as index_record
  inner join public.airtable_registry_sync_state as state
    on state.singleton = true
   and state.active_sync_id = index_record.sync_id
  where
    (
      nullif(btrim(p_query), '') is null
      or index_record.display_name ilike '%' || btrim(p_query) || '%'
      or index_record.registration_number ilike '%' || btrim(p_query) || '%'
    )
    and (
      nullif(btrim(p_registration_type), '') is null
      or index_record.registration_type = upper(btrim(p_registration_type))
    )
    and (
      p_registration_year_from is null
      or index_record.registration_year >= p_registration_year_from
    )
    and (
      p_registration_year_to is null
      or index_record.registration_year <= p_registration_year_to
    )
  order by index_record.display_name, index_record.registration_number
  limit least(greatest(coalesce(p_limit, 25), 1), 100)
  offset greatest(coalesce(p_offset, 0), 0);
$$;

revoke all on function public.search_airtable_registry_index(
  text,
  text,
  integer,
  integer,
  integer,
  integer
) from public, anon, authenticated;

grant execute on function public.search_airtable_registry_index(
  text,
  text,
  integer,
  integer,
  integer,
  integer
) to anon, authenticated, service_role;
