-- Register search: apostrophes are ignored on both sides, so "ORiley",
-- "O'Riley" and "O’Riley" all find "O'RILEY".
create or replace function public.search_airtable_registry_index(
  p_query text default null,
  p_registration_type text default null,
  p_registration_year_from integer default null,
  p_registration_year_to integer default null,
  p_limit integer default 25,
  p_offset integer default 0
)
returns table (nurse_name text, registration_type text, registration_number text, registration_year integer, total_count bigint)
language sql
stable
security definer
set search_path = ''
as $$
  with terms as (
    select coalesce(array(
      select word
        from unnest(regexp_split_to_array(btrim(regexp_replace(regexp_replace(coalesce(p_query, ''), '[''’‘`]', '', 'g'), '[,;()\[\]]+', ' ', 'g')), '\s+')) as word
       where word <> ''
    ), '{}'::text[]) as words,
    upper(regexp_replace(coalesce(p_query, ''), '[^A-Za-z0-9]', '', 'g')) as compact
  ),
  matches as (
    select index_record.display_name,
           index_record.registration_type,
           index_record.registration_number,
           index_record.registration_year::integer as registration_year
      from public.airtable_registry_index as index_record
      join public.airtable_registry_sync_state as state
        on state.singleton = true
       and state.active_sync_id = index_record.sync_id
      cross join terms
     where (
             cardinality(terms.words) = 0
             -- The whole query as a number, e.g. "RN23-5381".
             or (length(terms.compact) >= 3 and index_record.registration_number_key like '%' || terms.compact || '%')
             -- Or every word in the name or the number.
             or not exists (
               select 1
                 from unnest(terms.words) as word
                where not (
                  regexp_replace(index_record.display_name, '[''’‘`]', '', 'g') ilike '%' || replace(replace(replace(word, '\', '\\'), '%', '\%'), '_', '\_') || '%'
                  or (
                    regexp_replace(word, '[^A-Za-z0-9]', '', 'g') <> ''
                    and index_record.registration_number_key like '%' || upper(regexp_replace(word, '[^A-Za-z0-9]', '', 'g')) || '%'
                  )
                )
             )
           )
       and (nullif(btrim(p_registration_type), '') is null or index_record.registration_type = upper(btrim(p_registration_type)))
       and (p_registration_year_from is null or index_record.registration_year >= p_registration_year_from)
       and (p_registration_year_to is null or index_record.registration_year <= p_registration_year_to)
  )
  select matches.display_name,
         matches.registration_type,
         matches.registration_number,
         matches.registration_year,
         count(*) over () as total_count
    from matches
   order by matches.display_name, matches.registration_number
   limit least(greatest(coalesce(p_limit, 25), 1), 100)
  offset greatest(coalesce(p_offset, 0), 0);
$$;
