-- Public registry search: when a name search finds nothing, return close
-- matches instead, so a misspelt name ("Fergusson", "Jonh Smyth") still finds
-- the nurse. Close matches are flagged (match_kind = 'close') so the page can
-- say they are not exact. Numbers are never matched loosely: a search with
-- any digit only returns exact results.
--
-- Each word typed must be close to some word of the name, by any of:
--   - containment ("rolle" in "Rollete")
--   - trigram similarity >= 0.4 ("Fergusson" / "Ferguson")
--   - edit distance <= 1, or <= 2 for words of 7+ letters ("Cartwrigt", "Smyth")
--   - two letters swapped ("Jonh" / "John")
-- Words of one or two letters (initials) must start a word of the name.
-- Close matches are ranked by how closely all the words match.
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA extensions;

DROP FUNCTION IF EXISTS public.search_airtable_registry_index(text, text, integer, integer, integer, integer);

CREATE FUNCTION public.search_airtable_registry_index(p_query text DEFAULT NULL::text, p_registration_type text DEFAULT NULL::text, p_registration_year_from integer DEFAULT NULL::integer, p_registration_year_to integer DEFAULT NULL::integer, p_limit integer DEFAULT 25, p_offset integer DEFAULT 0)
 RETURNS TABLE(nurse_name text, registration_type text, registration_number text, registration_year integer, total_count bigint, match_kind text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  with terms as (
    select coalesce(array(
      select word
        from unnest(regexp_split_to_array(btrim(regexp_replace(regexp_replace(coalesce(p_query, ''), '[''’‘`]', '', 'g'), '[,;()\[\]]+', ' ', 'g')), '\s+')) as word
       where word <> ''
    ), '{}'::text[]) as words,
    upper(regexp_replace(coalesce(p_query, ''), '[^A-Za-z0-9]', '', 'g')) as compact,
    coalesce(array(
      select word
        from unnest(regexp_split_to_array(lower(regexp_replace(coalesce(p_query, ''), '[''’‘`]', '', 'g')), '[^[:alpha:]]+')) as word
       where word <> ''
    ), '{}'::text[]) as name_words,
    coalesce(p_query, '') !~ '[0-9]' as allow_close
  ),
  pool as (
    select index_record.display_name,
           index_record.registration_type,
           index_record.registration_number,
           index_record.registration_number_key,
           index_record.registration_year::integer as registration_year,
           keys.public_key
      from public.airtable_registry_index as index_record
      join public.airtable_registry_sync_state as state
        on state.singleton = true
       and state.active_sync_id = index_record.sync_id
      cross join lateral (
        select case when index_record.registration_type in ('EN', 'TCN')
                    then regexp_replace(index_record.registration_number_key, '^(EN|TCN)', 'LPN')
                    else index_record.registration_number_key
               end as public_key
      ) as keys
     where (nullif(btrim(p_registration_type), '') is null
            or index_record.registration_type = upper(btrim(p_registration_type))
            or (upper(btrim(p_registration_type)) = 'LPN' and index_record.registration_type in ('EN', 'TCN')))
       and (p_registration_year_from is null or index_record.registration_year >= p_registration_year_from)
       and (p_registration_year_to is null or index_record.registration_year <= p_registration_year_to)
  ),
  matches as (
    select pool.*
      from pool
      cross join terms
     where (
             cardinality(terms.words) = 0
             or (length(terms.compact) >= 3 and (pool.registration_number_key like '%' || terms.compact || '%'
                                                 or pool.public_key like '%' || terms.compact || '%'))
             or not exists (
               select 1
                 from unnest(terms.words) as word
                where not (
                  regexp_replace(pool.display_name, '[''’‘`]', '', 'g') ilike '%' || replace(replace(replace(word, '\', '\\'), '%', '\%'), '_', '\_') || '%'
                  or (
                    regexp_replace(word, '[^A-Za-z0-9]', '', 'g') <> ''
                    and (pool.registration_number_key like '%' || upper(regexp_replace(word, '[^A-Za-z0-9]', '', 'g')) || '%'
                         or pool.public_key like '%' || upper(regexp_replace(word, '[^A-Za-z0-9]', '', 'g')) || '%')
                  )
                )
             )
           )
  ),
  close_matches as (
    select pool.*, scored.score
      from pool
      cross join terms
      cross join lateral (
        select array(
          select name_word
            from regexp_split_to_table(lower(regexp_replace(pool.display_name, '[''’‘`]', '', 'g')), '[^[:alpha:]]+') as name_word
           where name_word <> ''
        ) as name_words
      ) as name_parts
      cross join lateral (
        select count(best.score) as matched, sum(best.score) as score
          from unnest(terms.name_words) as query_word
          cross join lateral (
            select max(case
                         when name_word = query_word then 1.0
                         when length(query_word) < 3 then case when name_word like query_word || '%' then 0.9 end
                         when name_word like '%' || query_word || '%' then 0.9
                         when extensions.similarity(query_word, name_word) >= 0.4 then 0.5 + extensions.similarity(query_word, name_word) / 2
                         when length(query_word) >= 4
                              and extensions.levenshtein(query_word, name_word) <= case when length(query_word) >= 7 then 2 else 1 end then 0.6
                         when length(query_word) >= 4
                              and length(query_word) = length(name_word)
                              and extensions.levenshtein(query_word, name_word) = 2
                              and (select string_agg(letter, '' order by letter) from regexp_split_to_table(query_word, '') as letter)
                                = (select string_agg(letter, '' order by letter) from regexp_split_to_table(name_word, '') as letter) then 0.7
                       end) as score
              from unnest(name_parts.name_words) as name_word
          ) as best
      ) as scored
     where terms.allow_close
       and cardinality(terms.name_words) > 0
       and not exists (select 1 from matches)
       and scored.matched = cardinality(terms.name_words)
  ),
  results as (
    select matches.display_name, matches.registration_type, matches.registration_number, matches.registration_year,
           'exact'::text as match_kind, null::numeric as score
      from matches
    union all
    select close_matches.display_name, close_matches.registration_type, close_matches.registration_number, close_matches.registration_year,
           'close'::text, close_matches.score
      from close_matches
  )
  select results.display_name,
         results.registration_type,
         results.registration_number,
         results.registration_year,
         count(*) over () as total_count,
         results.match_kind
    from results
   order by results.score desc nulls last, results.display_name, results.registration_number
   limit least(greatest(coalesce(p_limit, 25), 1), 100)
  offset greatest(coalesce(p_offset, 0), 0);
$function$;

REVOKE ALL ON FUNCTION public.search_airtable_registry_index(text, text, integer, integer, integer, integer) FROM public;
GRANT EXECUTE ON FUNCTION public.search_airtable_registry_index(text, text, integer, integer, integer, integer) TO anon, authenticated, service_role;
