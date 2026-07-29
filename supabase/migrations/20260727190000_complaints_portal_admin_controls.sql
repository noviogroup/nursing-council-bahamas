drop policy if exists "Admins manage complaint statuses" on public.complaint_statuses;
create policy "Admins manage complaint statuses"
on public.complaint_statuses for all
to authenticated
using (public.current_complaint_role() = 'admin')
with check (public.current_complaint_role() = 'admin');

drop policy if exists "Admins manage complaint categories" on public.complaint_categories;
create policy "Admins manage complaint categories"
on public.complaint_categories for all
to authenticated
using (public.current_complaint_role() = 'admin')
with check (public.current_complaint_role() = 'admin');

drop policy if exists "Admins manage complaint priorities" on public.complaint_priorities;
create policy "Admins manage complaint priorities"
on public.complaint_priorities for all
to authenticated
using (public.current_complaint_role() = 'admin')
with check (public.current_complaint_role() = 'admin');

grant insert, update, delete on public.complaint_statuses, public.complaint_categories, public.complaint_priorities to authenticated;

create or replace function public.admin_update_complaint_setting(p_kind text, p_code text, p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row jsonb;
begin
  if public.current_complaint_role() <> 'admin' then
    raise exception 'Only admin users can update complaint portal settings.';
  end if;

  if p_kind = 'status' then
    update public.complaint_statuses
    set internal_label = coalesce(nullif(trim(p_payload ->> 'internal_label'), ''), internal_label),
        public_label = coalesce(nullif(trim(p_payload ->> 'public_label'), ''), public_label),
        public_description = coalesce(nullif(trim(p_payload ->> 'public_description'), ''), public_description),
        visible_to_public = coalesce((p_payload ->> 'visible_to_public')::boolean, visible_to_public),
        closes_case = coalesce((p_payload ->> 'closes_case')::boolean, closes_case),
        sort_order = coalesce((p_payload ->> 'sort_order')::integer, sort_order)
    where code = p_code
    returning to_jsonb(complaint_statuses.*) into v_row;
  elsif p_kind = 'category' then
    update public.complaint_categories
    set label = coalesce(nullif(trim(p_payload ->> 'label'), ''), label),
        description = coalesce(trim(p_payload ->> 'description'), description),
        active = coalesce((p_payload ->> 'active')::boolean, active),
        sort_order = coalesce((p_payload ->> 'sort_order')::integer, sort_order)
    where code = p_code
    returning to_jsonb(complaint_categories.*) into v_row;
  elsif p_kind = 'priority' then
    update public.complaint_priorities
    set label = coalesce(nullif(trim(p_payload ->> 'label'), ''), label),
        description = coalesce(trim(p_payload ->> 'description'), description),
        sla_days = greatest(1, coalesce((p_payload ->> 'sla_days')::integer, sla_days)),
        alert_supervisor = coalesce((p_payload ->> 'alert_supervisor')::boolean, alert_supervisor),
        sort_order = coalesce((p_payload ->> 'sort_order')::integer, sort_order)
    where code = p_code
    returning to_jsonb(complaint_priorities.*) into v_row;
  else
    raise exception 'Unsupported setting type.';
  end if;

  if v_row is null then
    raise exception 'Setting was not found.';
  end if;

  begin
    insert into public.audit_events (actor_profile_id, entity_type, action, after_data)
    values (auth.uid(), 'complaint_setting', 'complaint_setting_updated', v_row);
  exception when others then
    null;
  end;

  return v_row;
end;
$$;

create or replace function public.staff_update_complaint(
  p_complaint_id uuid,
  p_status text default null,
  p_priority text default null,
  p_assigned_to uuid default null,
  p_public_status_note text default null,
  p_internal_note text default null,
  p_closure_summary text default null
)
returns public.complaints
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text := public.current_complaint_role();
  v_existing public.complaints;
  v_updated public.complaints;
  v_status text;
begin
  if v_role is null then
    raise exception 'Not authorized.';
  end if;

  if v_role = 'viewer' then
    raise exception 'View-only users cannot update complaints.';
  end if;

  select * into v_existing
  from public.complaints
  where id = p_complaint_id
  for update;

  if v_existing.id is null then
    raise exception 'Complaint not found.';
  end if;

  v_status := coalesce(p_status, v_existing.status);

  if p_status is not null and not exists (select 1 from public.complaint_statuses where code = p_status) then
    raise exception 'Invalid complaint status.';
  end if;

  if p_priority is not null and not exists (select 1 from public.complaint_priorities where code = p_priority) then
    raise exception 'Invalid complaint priority.';
  end if;

  if v_status in ('resolved', 'dismissed', 'closed', 'referred', 'not_within_jurisdiction') and not public.can_close_complaints() then
    raise exception 'Only admin and supervisor users can close or dispose complaints.';
  end if;

  if p_assigned_to is not null and v_role not in ('admin', 'supervisor') then
    raise exception 'Only admin and supervisor users can assign complaints.';
  end if;

  update public.complaints
  set status = v_status,
      priority = coalesce(p_priority, priority),
      assigned_to = coalesce(p_assigned_to, assigned_to),
      public_status_note = coalesce(nullif(p_public_status_note, ''), public_status_note),
      closure_summary = case
        when v_status in ('resolved', 'dismissed', 'closed', 'referred', 'not_within_jurisdiction')
        then coalesce(nullif(p_closure_summary, ''), closure_summary)
        else closure_summary
      end,
      closed_by = case
        when v_status in ('resolved', 'dismissed', 'closed', 'referred', 'not_within_jurisdiction')
        then auth.uid()
        else closed_by
      end,
      closed_at = case
        when v_status in ('resolved', 'dismissed', 'closed', 'referred', 'not_within_jurisdiction')
        then coalesce(closed_at, now())
        else null
      end
  where id = p_complaint_id
  returning * into v_updated;

  if p_status is not null and p_status <> v_existing.status then
    insert into public.complaint_status_history (complaint_id, status, changed_by, public_note, internal_note, visible_to_public)
    values (
      p_complaint_id,
      p_status,
      auth.uid(),
      nullif(p_public_status_note, ''),
      nullif(p_internal_note, ''),
      (select visible_to_public from public.complaint_statuses where code = p_status)
    );
  end if;

  begin
    insert into public.audit_events (actor_profile_id, entity_type, entity_id, action, before_data, after_data)
    values (auth.uid(), 'complaint', p_complaint_id, 'complaint_updated', to_jsonb(v_existing), to_jsonb(v_updated));
  exception when others then
    null;
  end;

  return v_updated;
end;
$$;

create or replace function public.staff_add_complaint_note(p_complaint_id uuid, p_note text, p_visibility text default 'internal')
returns public.complaint_notes
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text := public.current_complaint_role();
  v_note public.complaint_notes;
begin
  if v_role is null then
    raise exception 'Not authorized.';
  end if;

  if v_role = 'viewer' then
    raise exception 'View-only users cannot add complaint notes.';
  end if;

  if p_visibility not in ('internal', 'public') then
    raise exception 'Invalid note visibility.';
  end if;

  insert into public.complaint_notes (complaint_id, author_profile_id, note, visibility)
  values (p_complaint_id, auth.uid(), trim(p_note), p_visibility)
  returning * into v_note;

  if p_visibility = 'public' then
    update public.complaints
    set public_status_note = trim(p_note)
    where id = p_complaint_id;
  end if;

  begin
    insert into public.audit_events (actor_profile_id, entity_type, entity_id, action, after_data)
    values (auth.uid(), 'complaint_note', v_note.id, 'complaint_note_added', to_jsonb(v_note));
  exception when others then
    null;
  end;

  return v_note;
end;
$$;

create or replace function public.staff_log_complaint_communication(
  p_complaint_id uuid,
  p_channel text,
  p_template_code text,
  p_contact_with text,
  p_summary text,
  p_outcome text default ''
)
returns public.complaint_communications
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text := public.current_complaint_role();
  v_log public.complaint_communications;
begin
  if v_role is null then
    raise exception 'Not authorized.';
  end if;

  if v_role = 'viewer' then
    raise exception 'View-only users cannot log complaint communications.';
  end if;

  if p_channel = 'email' and (p_template_code is null or p_template_code = '') then
    raise exception 'Email communications must use an approved template.';
  end if;

  if p_template_code is not null and p_template_code <> '' and not exists (
    select 1 from public.notification_templates where code = p_template_code and category = 'complaints' and active = true
  ) then
    raise exception 'Invalid complaint email template.';
  end if;

  insert into public.complaint_communications (complaint_id, staff_profile_id, channel, template_code, contact_with, summary, outcome)
  values (p_complaint_id, auth.uid(), p_channel, nullif(p_template_code, ''), trim(p_contact_with), trim(p_summary), trim(coalesce(p_outcome, '')))
  returning * into v_log;

  begin
    insert into public.audit_events (actor_profile_id, entity_type, entity_id, action, after_data)
    values (auth.uid(), 'complaint_communication', v_log.id, 'complaint_communication_logged', to_jsonb(v_log));
  exception when others then
    null;
  end;

  return v_log;
end;
$$;

grant execute on function public.admin_update_complaint_setting(text, text, jsonb) to authenticated;
grant execute on function public.staff_update_complaint(uuid, text, text, uuid, text, text, text) to authenticated;
grant execute on function public.staff_add_complaint_note(uuid, text, text) to authenticated;
grant execute on function public.staff_log_complaint_communication(uuid, text, text, text, text, text) to authenticated;
