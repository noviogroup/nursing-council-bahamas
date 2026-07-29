create extension if not exists pgcrypto with schema extensions;

create table if not exists public.complaint_statuses (
  code text primary key,
  internal_label text not null,
  public_label text not null,
  public_description text not null,
  visible_to_public boolean not null default true,
  closes_case boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.complaint_categories (
  code text primary key,
  label text not null,
  description text not null default '',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.complaint_priorities (
  code text primary key,
  label text not null,
  description text not null default '',
  sla_days integer not null default 10,
  alert_supervisor boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.complaint_staff_roles (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  role text not null check (role in ('admin', 'supervisor', 'case_officer', 'viewer')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.complaint_sequence (
  year integer primary key,
  next_value integer not null default 1,
  updated_at timestamptz not null default now()
);

create table if not exists public.complaint_drafts (
  id uuid primary key default extensions.gen_random_uuid(),
  contact_email text not null,
  token_hash text not null unique,
  form_data jsonb not null default '{}'::jsonb,
  expires_at timestamptz not null,
  submitted_at timestamptz,
  submitted_complaint_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.complaints (
  id uuid primary key default extensions.gen_random_uuid(),
  reference_number text not null unique,
  complainant_name text not null,
  complainant_email text not null,
  complainant_phone text not null,
  complainant_address text not null default '',
  preferred_contact_method text not null default 'email',
  relationship_to_matter text not null default '',
  respondent_type text not null check (respondent_type in ('nurse', 'midwife', 'applicant', 'licensee')),
  respondent_name text not null,
  respondent_registration_number text,
  respondent_employer text,
  respondent_department text,
  respondent_contact text,
  respondent_location text,
  category text not null references public.complaint_categories(code),
  incident_date date,
  incident_location text not null default '',
  summary text not null,
  detailed_description text not null,
  people_involved text,
  is_ongoing boolean not null default false,
  immediate_risk boolean not null default false,
  desired_outcome text,
  prior_action_taken boolean not null default false,
  prior_action_details text,
  prior_response text,
  prior_reference_numbers text,
  status text not null references public.complaint_statuses(code) default 'new',
  priority text not null references public.complaint_priorities(code) default 'standard',
  assigned_to uuid references public.profiles(id),
  public_status_note text,
  closure_summary text,
  closed_by uuid references public.profiles(id),
  closed_at timestamptz,
  submitted_at timestamptz not null default now(),
  triage_due_at timestamptz,
  review_due_at timestamptz,
  next_update_due_at timestamptz,
  source text not null default 'public_portal',
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.complaint_documents (
  id uuid primary key default extensions.gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  file_size bigint not null default 0,
  mime_type text not null default '',
  uploaded_by_profile_id uuid references public.profiles(id),
  uploaded_by_type text not null default 'public' check (uploaded_by_type in ('public', 'staff')),
  created_at timestamptz not null default now()
);

create table if not exists public.complaint_notes (
  id uuid primary key default extensions.gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  author_profile_id uuid not null references public.profiles(id),
  note text not null,
  visibility text not null default 'internal' check (visibility in ('internal', 'public')),
  created_at timestamptz not null default now()
);

create table if not exists public.complaint_communications (
  id uuid primary key default extensions.gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  staff_profile_id uuid not null references public.profiles(id),
  channel text not null check (channel in ('email', 'phone', 'meeting', 'letter', 'other')),
  template_code text,
  contact_with text not null,
  summary text not null,
  outcome text not null default '',
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint complaint_email_template_required check (channel <> 'email' or template_code is not null)
);

create table if not exists public.complaint_tasks (
  id uuid primary key default extensions.gen_random_uuid(),
  complaint_id uuid references public.complaints(id) on delete cascade,
  title text not null,
  task_type text not null default 'follow_up',
  assigned_to uuid references public.profiles(id),
  priority text not null references public.complaint_priorities(code) default 'standard',
  due_date date,
  status text not null default 'new' check (status in ('new', 'in_progress', 'awaiting_response', 'overdue', 'completed')),
  notes text not null default '',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.complaint_status_history (
  id uuid primary key default extensions.gen_random_uuid(),
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  status text not null references public.complaint_statuses(code),
  changed_by uuid references public.profiles(id),
  public_note text,
  internal_note text,
  visible_to_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.complaint_notification_log (
  id uuid primary key default extensions.gen_random_uuid(),
  complaint_id uuid references public.complaints(id) on delete cascade,
  draft_id uuid references public.complaint_drafts(id) on delete set null,
  template_code text not null,
  recipient_email text not null,
  subject text not null,
  body text not null,
  status text not null default 'drafted' check (status in ('drafted', 'queued', 'sent', 'failed')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

insert into public.complaint_statuses (code, internal_label, public_label, public_description, visible_to_public, closes_case, sort_order)
values
  ('new', 'New', 'Received', 'Your complaint has been received by the Nursing Council.', true, false, 10),
  ('under_review', 'Under Review', 'Under review', 'Council staff are reviewing the complaint information.', true, false, 20),
  ('awaiting_documents', 'Awaiting Documents', 'More information requested', 'The Council has requested additional information before review can continue.', true, false, 30),
  ('under_investigation', 'Under Investigation', 'Under investigation', 'The matter is under investigation by authorized Council staff.', true, false, 40),
  ('pending_response', 'Pending Response', 'Awaiting response', 'The Council is awaiting a response related to this matter.', true, false, 50),
  ('disciplinary_and_penal_cases_review', 'Disciplinary and Penal Cases Review', 'Committee review', 'The matter is being reviewed through the Council committee process.', true, false, 60),
  ('referred', 'Referred', 'Referred', 'The matter has been referred or directed to the appropriate process or authority.', true, true, 70),
  ('not_within_jurisdiction', 'Not Within Jurisdiction', 'Outside Council jurisdiction', 'The matter is not within the Council jurisdiction and has been closed or referred as appropriate.', true, true, 80),
  ('resolved', 'Resolved', 'Resolved', 'The complaint has been resolved.', true, true, 90),
  ('dismissed', 'Dismissed', 'Dismissed', 'The complaint has been dismissed after review.', true, true, 100),
  ('closed', 'Closed', 'Closed', 'The complaint file is closed.', true, true, 110)
on conflict (code) do update
set internal_label = excluded.internal_label,
    public_label = excluded.public_label,
    public_description = excluded.public_description,
    visible_to_public = excluded.visible_to_public,
    closes_case = excluded.closes_case,
    sort_order = excluded.sort_order;

insert into public.complaint_categories (code, label, description, sort_order)
values
  ('nurse_conduct', 'Nurse conduct', 'Professional conduct concerns involving an individual nurse, midwife, applicant, or licensee.', 10),
  ('patient_safety', 'Patient safety', 'Concerns about patient safety or risk of harm.', 20),
  ('registration_issue', 'Registration issue', 'Concerns related to registration or professional standing.', 30),
  ('licensing_concern', 'Licensing concern', 'Concerns related to licensing, licence use, or licence status.', 40),
  ('facility_context', 'Facility-context issue', 'A complaint involving an individual practitioner in a facility or employer context.', 50),
  ('education_provider_issue', 'Education provider issue', 'Concerns involving an individual applicant or licensee in an education or training setting.', 60),
  ('workplace_concern', 'Workplace concern', 'Workplace-related concerns involving an individual practitioner.', 70),
  ('communication_issue', 'Communication issue', 'Concerns about communication or professional interaction.', 80),
  ('other', 'Other', 'Other complaint type requiring Council review.', 90)
on conflict (code) do update
set label = excluded.label,
    description = excluded.description,
    sort_order = excluded.sort_order,
    active = true;

insert into public.complaint_priorities (code, label, description, sla_days, alert_supervisor, sort_order)
values
  ('standard', 'Standard', 'Standard complaint handling timeline.', 10, false, 10),
  ('urgent', 'Urgent', 'Requires expedited staff review.', 2, true, 20),
  ('public_safety_concern', 'Public safety concern', 'Potential immediate or serious public safety concern.', 1, true, 30),
  ('vulnerable_person', 'Vulnerable person', 'Matter involves a vulnerable person or heightened safeguarding concern.', 2, true, 40),
  ('professional_misconduct', 'Professional misconduct', 'Potential serious professional misconduct.', 5, true, 50),
  ('repeat_or_systemic_issue', 'Repeat or systemic issue', 'Potential repeat complaint or wider systemic concern.', 5, true, 60)
on conflict (code) do update
set label = excluded.label,
    description = excluded.description,
    sla_days = excluded.sla_days,
    alert_supervisor = excluded.alert_supervisor,
    sort_order = excluded.sort_order;

insert into public.notification_templates (code, label, category, subject_template, body_template, default_channels, active)
values
  ('complaint_received', 'Complaint received', 'complaints', 'Complaint received: {{reference_number}}', 'The Nursing Council has received complaint {{reference_number}}. Staff will complete initial triage within 2 business days.', array['email'], true),
  ('complaint_draft_resume', 'Complaint draft resume link', 'complaints', 'Resume your saved Nursing Council complaint draft', 'Use the secure resume link to continue your saved complaint draft. Draft links expire after 30 days.', array['email'], true),
  ('complaint_status_update', 'Complaint status update', 'complaints', 'Complaint status update: {{reference_number}}', 'There is an update to complaint {{reference_number}}. Please use the public tracking page for current status information.', array['email'], true),
  ('complaint_information_request', 'Request for additional information', 'complaints', 'Information requested: {{reference_number}}', 'The Nursing Council has requested additional information for complaint {{reference_number}}.', array['email'], true),
  ('complaint_staff_assignment', 'Staff assignment', 'complaints', 'Complaint assigned: {{reference_number}}', 'Complaint {{reference_number}} has been assigned for review.', array['portal','email'], true),
  ('complaint_sla_overdue', 'SLA overdue alert', 'complaints', 'Overdue complaint alert: {{reference_number}}', 'Complaint {{reference_number}} has reached or passed a target review date.', array['portal','email'], true),
  ('complaint_case_closure', 'Case closure', 'complaints', 'Complaint closed: {{reference_number}}', 'Complaint {{reference_number}} has been closed. Use the public tracking page for the public closure status.', array['email'], true)
on conflict (code) do update
set label = excluded.label,
    category = excluded.category,
    subject_template = excluded.subject_template,
    body_template = excluded.body_template,
    default_channels = excluded.default_channels,
    active = excluded.active,
    updated_at = now();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists complaint_staff_roles_touch_updated_at on public.complaint_staff_roles;
create trigger complaint_staff_roles_touch_updated_at
before update on public.complaint_staff_roles
for each row execute function public.touch_updated_at();

drop trigger if exists complaint_drafts_touch_updated_at on public.complaint_drafts;
create trigger complaint_drafts_touch_updated_at
before update on public.complaint_drafts
for each row execute function public.touch_updated_at();

drop trigger if exists complaints_touch_updated_at on public.complaints;
create trigger complaints_touch_updated_at
before update on public.complaints
for each row execute function public.touch_updated_at();

drop trigger if exists complaint_tasks_touch_updated_at on public.complaint_tasks;
create trigger complaint_tasks_touch_updated_at
before update on public.complaint_tasks
for each row execute function public.touch_updated_at();

create or replace function public.current_complaint_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select csr.role
      from public.complaint_staff_roles csr
      where csr.profile_id = auth.uid()
        and csr.active = true
      limit 1
    ),
    case lower(coalesce(public.current_app_role(), ''))
      when 'system_admin' then 'admin'
      when 'admin' then 'admin'
      when 'registrar' then 'admin'
      when 'reviewer' then 'supervisor'
      when 'board_readonly' then 'viewer'
      when 'finance' then 'viewer'
      else null
    end
  );
$$;

create or replace function public.is_complaint_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_complaint_role() is not null;
$$;

create or replace function public.can_close_complaints()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_complaint_role() in ('admin', 'supervisor');
$$;

create or replace function public.next_complaint_reference()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year integer := extract(year from now())::integer;
  v_sequence integer;
begin
  insert into public.complaint_sequence as cs (year, next_value)
  values (v_year, 2)
  on conflict (year)
  do update set next_value = cs.next_value + 1,
                updated_at = now()
  returning next_value - 1 into v_sequence;

  return 'NC-' || v_year::text || '-' || lpad(v_sequence::text, 5, '0');
end;
$$;

create or replace function public.complaint_token_hash(p_token text)
returns text
language sql
immutable
set search_path = public, extensions
as $$
  select encode(extensions.digest(p_token, 'sha256'), 'hex');
$$;

create or replace function public.create_complaint_draft(p_contact_email text, p_payload jsonb)
returns table (draft_id uuid, resume_token text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_token text := rtrim(translate(encode(extensions.gen_random_bytes(32), 'base64'), '/+', '_-'), '=');
  v_expires_at timestamptz := now() + interval '30 days';
begin
  if nullif(trim(p_contact_email), '') is null then
    raise exception 'Contact email is required to save a draft.';
  end if;

  insert into public.complaint_drafts (contact_email, token_hash, form_data, expires_at)
  values (lower(trim(p_contact_email)), public.complaint_token_hash(v_token), coalesce(p_payload, '{}'::jsonb), v_expires_at)
  returning id, v_token, complaint_drafts.expires_at into draft_id, resume_token, expires_at;

  insert into public.complaint_notification_log (draft_id, template_code, recipient_email, subject, body, status)
  values (
    draft_id,
    'complaint_draft_resume',
    lower(trim(p_contact_email)),
    'Resume your saved Nursing Council complaint draft',
    'Draft resume link prepared. Email delivery is not enabled yet.',
    'drafted'
  );

  return next;
end;
$$;

create or replace function public.get_complaint_draft(p_resume_token text)
returns table (draft_id uuid, contact_email text, form_data jsonb, expires_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select d.id, d.contact_email, d.form_data, d.expires_at
  from public.complaint_drafts d
  where d.token_hash = public.complaint_token_hash(p_resume_token)
    and d.expires_at > now()
    and d.submitted_at is null
  limit 1;
end;
$$;

create or replace function public.update_complaint_draft(p_resume_token text, p_payload jsonb)
returns table (draft_id uuid, expires_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.complaint_drafts d
  set form_data = coalesce(p_payload, '{}'::jsonb),
      updated_at = now()
  where d.token_hash = public.complaint_token_hash(p_resume_token)
    and d.expires_at > now()
    and d.submitted_at is null
  returning d.id, d.expires_at into draft_id, expires_at;

  if draft_id is null then
    raise exception 'Draft link is invalid or expired.';
  end if;

  return next;
end;
$$;

create or replace function public.submit_complaint(p_payload jsonb, p_draft_token text default null)
returns table (complaint_id uuid, reference_number text, submitted_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reference text;
  v_email text := lower(trim(coalesce(p_payload #>> '{complainant,email}', '')));
  v_name text := trim(coalesce(p_payload #>> '{complainant,name}', ''));
  v_phone text := trim(coalesce(p_payload #>> '{complainant,phone}', ''));
  v_respondent_type text := trim(coalesce(p_payload #>> '{respondent,type}', ''));
  v_respondent_name text := trim(coalesce(p_payload #>> '{respondent,name}', ''));
  v_category text := trim(coalesce(p_payload ->> 'category', ''));
  v_summary text := trim(coalesce(p_payload #>> '{incident,summary}', ''));
  v_description text := trim(coalesce(p_payload #>> '{incident,description}', ''));
  v_immediate_risk boolean := coalesce((p_payload #>> '{incident,immediateRisk}')::boolean, false);
  v_priority text := case when v_immediate_risk then 'public_safety_concern' else 'standard' end;
begin
  if v_name = '' or v_email = '' or v_phone = '' then
    raise exception 'Complainant name, email, and phone are required.';
  end if;

  if v_respondent_type not in ('nurse', 'midwife', 'applicant', 'licensee') then
    raise exception 'Complaints must name an individual nurse, midwife, applicant, or licensee.';
  end if;

  if v_respondent_name = '' then
    raise exception 'Respondent name is required.';
  end if;

  if not exists (select 1 from public.complaint_categories where code = v_category and active = true) then
    raise exception 'A valid complaint category is required.';
  end if;

  if v_summary = '' or v_description = '' then
    raise exception 'Complaint summary and detailed description are required.';
  end if;

  v_reference := public.next_complaint_reference();

  insert into public.complaints (
    reference_number,
    complainant_name,
    complainant_email,
    complainant_phone,
    complainant_address,
    preferred_contact_method,
    relationship_to_matter,
    respondent_type,
    respondent_name,
    respondent_registration_number,
    respondent_employer,
    respondent_department,
    respondent_contact,
    respondent_location,
    category,
    incident_date,
    incident_location,
    summary,
    detailed_description,
    people_involved,
    is_ongoing,
    immediate_risk,
    desired_outcome,
    prior_action_taken,
    prior_action_details,
    prior_response,
    prior_reference_numbers,
    priority,
    public_status_note,
    triage_due_at,
    review_due_at,
    next_update_due_at,
    raw_payload
  )
  values (
    v_reference,
    v_name,
    v_email,
    v_phone,
    trim(coalesce(p_payload #>> '{complainant,address}', '')),
    trim(coalesce(p_payload #>> '{complainant,preferredContact}', 'email')),
    trim(coalesce(p_payload #>> '{complainant,relationship}', '')),
    v_respondent_type,
    v_respondent_name,
    nullif(trim(coalesce(p_payload #>> '{respondent,registrationNumber}', '')), ''),
    nullif(trim(coalesce(p_payload #>> '{respondent,employer}', '')), ''),
    nullif(trim(coalesce(p_payload #>> '{respondent,department}', '')), ''),
    nullif(trim(coalesce(p_payload #>> '{respondent,contact}', '')), ''),
    nullif(trim(coalesce(p_payload #>> '{respondent,location}', '')), ''),
    v_category,
    nullif(p_payload #>> '{incident,date}', '')::date,
    trim(coalesce(p_payload #>> '{incident,location}', '')),
    v_summary,
    v_description,
    nullif(trim(coalesce(p_payload #>> '{incident,peopleInvolved}', '')), ''),
    coalesce((p_payload #>> '{incident,ongoing}')::boolean, false),
    v_immediate_risk,
    nullif(trim(coalesce(p_payload #>> '{incident,outcome}', '')), ''),
    coalesce((p_payload #>> '{priorAction,taken}')::boolean, false),
    nullif(trim(coalesce(p_payload #>> '{priorAction,details}', '')), ''),
    nullif(trim(coalesce(p_payload #>> '{priorAction,response}', '')), ''),
    nullif(trim(coalesce(p_payload #>> '{priorAction,referenceNumbers}', '')), ''),
    v_priority,
    'Complaint received. Council staff will complete initial triage within 2 business days.',
    now() + interval '2 days',
    now() + interval '10 days',
    now() + interval '30 days',
    coalesce(p_payload, '{}'::jsonb)
  )
  returning id, complaints.reference_number, complaints.submitted_at
  into complaint_id, reference_number, submitted_at;

  insert into public.complaint_status_history (complaint_id, status, public_note, visible_to_public)
  values (complaint_id, 'new', 'Complaint received.', true);

  insert into public.complaint_notification_log (complaint_id, template_code, recipient_email, subject, body, status)
  values (
    complaint_id,
    'complaint_received',
    v_email,
    'Complaint received: ' || v_reference,
    'Complaint received confirmation prepared. Email delivery is not enabled yet.',
    'drafted'
  );

  if p_draft_token is not null and trim(p_draft_token) <> '' then
    update public.complaint_drafts
    set submitted_at = now(),
        submitted_complaint_id = complaint_id,
        updated_at = now()
    where token_hash = public.complaint_token_hash(p_draft_token)
      and complaint_drafts.submitted_at is null;
  end if;

  return next;
end;
$$;

create or replace function public.register_complaint_documents(p_reference_number text, p_contact_email text, p_documents jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_complaint_id uuid;
  v_document jsonb;
  v_count integer := 0;
begin
  select c.id into v_complaint_id
  from public.complaints c
  where c.reference_number = upper(trim(p_reference_number))
    and c.complainant_email = lower(trim(p_contact_email))
  limit 1;

  if v_complaint_id is null then
    raise exception 'Complaint was not found for document registration.';
  end if;

  for v_document in select value from jsonb_array_elements(coalesce(p_documents, '[]'::jsonb))
  loop
    insert into public.complaint_documents (complaint_id, storage_path, file_name, file_size, mime_type, uploaded_by_type)
    values (
      v_complaint_id,
      v_document ->> 'storagePath',
      v_document ->> 'fileName',
      coalesce((v_document ->> 'fileSize')::bigint, 0),
      coalesce(v_document ->> 'mimeType', ''),
      'public'
    );
    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$$;

create or replace function public.track_complaint(p_reference_number text, p_contact_email text)
returns table (
  complaint_id uuid,
  reference_number text,
  submitted_at timestamptz,
  status text,
  public_label text,
  public_description text,
  public_status_note text,
  timeline jsonb,
  information_requested boolean
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select
    c.id,
    c.reference_number,
    c.submitted_at,
    c.status,
    s.public_label,
    s.public_description,
    c.public_status_note,
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'status', h.status,
            'label', hs.public_label,
            'note', h.public_note,
            'createdAt', h.created_at
          )
          order by h.created_at
        )
        from public.complaint_status_history h
        join public.complaint_statuses hs on hs.code = h.status
        where h.complaint_id = c.id
          and h.visible_to_public = true
      ),
      '[]'::jsonb
    ) as timeline,
    c.status = 'awaiting_documents' as information_requested
  from public.complaints c
  join public.complaint_statuses s on s.code = c.status
  where c.reference_number = upper(trim(p_reference_number))
    and c.complainant_email = lower(trim(p_contact_email))
  limit 1;
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

  insert into public.audit_events (actor_profile_id, entity_type, entity_id, action, before_data, after_data)
  values (
    auth.uid(),
    'complaint',
    p_complaint_id,
    'complaint_updated',
    to_jsonb(v_existing),
    to_jsonb(v_updated)
  );

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
  v_note public.complaint_notes;
begin
  if public.current_complaint_role() is null then
    raise exception 'Not authorized.';
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

  insert into public.audit_events (actor_profile_id, entity_type, entity_id, action, after_data)
  values (auth.uid(), 'complaint_note', v_note.id, 'complaint_note_added', to_jsonb(v_note));

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
  v_log public.complaint_communications;
begin
  if public.current_complaint_role() is null then
    raise exception 'Not authorized.';
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

  insert into public.audit_events (actor_profile_id, entity_type, entity_id, action, after_data)
  values (auth.uid(), 'complaint_communication', v_log.id, 'complaint_communication_logged', to_jsonb(v_log));

  return v_log;
end;
$$;

create index if not exists complaints_reference_number_idx on public.complaints (reference_number);
create index if not exists complaints_email_idx on public.complaints (complainant_email);
create index if not exists complaints_status_idx on public.complaints (status);
create index if not exists complaints_priority_idx on public.complaints (priority);
create index if not exists complaints_assigned_to_idx on public.complaints (assigned_to);
create index if not exists complaints_submitted_at_idx on public.complaints (submitted_at desc);
create index if not exists complaint_documents_complaint_id_idx on public.complaint_documents (complaint_id);
create index if not exists complaint_notes_complaint_id_idx on public.complaint_notes (complaint_id, created_at desc);
create index if not exists complaint_communications_complaint_id_idx on public.complaint_communications (complaint_id, occurred_at desc);
create index if not exists complaint_tasks_complaint_id_idx on public.complaint_tasks (complaint_id);
create index if not exists complaint_tasks_assigned_to_idx on public.complaint_tasks (assigned_to, status);
create index if not exists complaint_status_history_complaint_id_idx on public.complaint_status_history (complaint_id, created_at);
create index if not exists complaint_notification_log_complaint_id_idx on public.complaint_notification_log (complaint_id);
create index if not exists complaint_drafts_token_hash_idx on public.complaint_drafts (token_hash);
create index if not exists complaint_drafts_expires_at_idx on public.complaint_drafts (expires_at) where submitted_at is null;

alter table public.complaint_statuses enable row level security;
alter table public.complaint_categories enable row level security;
alter table public.complaint_priorities enable row level security;
alter table public.complaint_staff_roles enable row level security;
alter table public.complaint_sequence enable row level security;
alter table public.complaint_drafts enable row level security;
alter table public.complaints enable row level security;
alter table public.complaint_documents enable row level security;
alter table public.complaint_notes enable row level security;
alter table public.complaint_communications enable row level security;
alter table public.complaint_tasks enable row level security;
alter table public.complaint_status_history enable row level security;
alter table public.complaint_notification_log enable row level security;

drop policy if exists "Public read complaint statuses" on public.complaint_statuses;
create policy "Public read complaint statuses"
on public.complaint_statuses for select
to anon, authenticated
using (true);

drop policy if exists "Public read complaint categories" on public.complaint_categories;
create policy "Public read complaint categories"
on public.complaint_categories for select
to anon, authenticated
using (active = true or public.is_complaint_staff());

drop policy if exists "Public read complaint priorities" on public.complaint_priorities;
create policy "Public read complaint priorities"
on public.complaint_priorities for select
to anon, authenticated
using (true);

drop policy if exists "Staff read complaint staff roles" on public.complaint_staff_roles;
create policy "Staff read complaint staff roles"
on public.complaint_staff_roles for select
to authenticated
using (public.is_complaint_staff());

drop policy if exists "Admins manage complaint staff roles" on public.complaint_staff_roles;
create policy "Admins manage complaint staff roles"
on public.complaint_staff_roles for all
to authenticated
using (public.current_complaint_role() = 'admin')
with check (public.current_complaint_role() = 'admin');

drop policy if exists "Staff read complaints" on public.complaints;
create policy "Staff read complaints"
on public.complaints for select
to authenticated
using (public.is_complaint_staff());

drop policy if exists "Staff read complaint documents" on public.complaint_documents;
create policy "Staff read complaint documents"
on public.complaint_documents for select
to authenticated
using (public.is_complaint_staff());

drop policy if exists "Staff manage complaint documents" on public.complaint_documents;
create policy "Staff manage complaint documents"
on public.complaint_documents for all
to authenticated
using (public.is_complaint_staff())
with check (public.is_complaint_staff());

drop policy if exists "Staff read complaint notes" on public.complaint_notes;
create policy "Staff read complaint notes"
on public.complaint_notes for select
to authenticated
using (public.is_complaint_staff());

drop policy if exists "Staff manage complaint notes" on public.complaint_notes;
create policy "Staff manage complaint notes"
on public.complaint_notes for all
to authenticated
using (public.is_complaint_staff())
with check (public.is_complaint_staff());

drop policy if exists "Staff read complaint communications" on public.complaint_communications;
create policy "Staff read complaint communications"
on public.complaint_communications for select
to authenticated
using (public.is_complaint_staff());

drop policy if exists "Staff manage complaint communications" on public.complaint_communications;
create policy "Staff manage complaint communications"
on public.complaint_communications for all
to authenticated
using (public.is_complaint_staff())
with check (public.is_complaint_staff());

drop policy if exists "Staff read complaint tasks" on public.complaint_tasks;
create policy "Staff read complaint tasks"
on public.complaint_tasks for select
to authenticated
using (public.is_complaint_staff());

drop policy if exists "Staff manage complaint tasks" on public.complaint_tasks;
create policy "Staff manage complaint tasks"
on public.complaint_tasks for all
to authenticated
using (public.is_complaint_staff())
with check (public.is_complaint_staff());

drop policy if exists "Staff read complaint status history" on public.complaint_status_history;
create policy "Staff read complaint status history"
on public.complaint_status_history for select
to authenticated
using (public.is_complaint_staff());

drop policy if exists "Staff manage complaint status history" on public.complaint_status_history;
create policy "Staff manage complaint status history"
on public.complaint_status_history for all
to authenticated
using (public.is_complaint_staff())
with check (public.is_complaint_staff());

drop policy if exists "Staff read complaint notification log" on public.complaint_notification_log;
create policy "Staff read complaint notification log"
on public.complaint_notification_log for select
to authenticated
using (public.is_complaint_staff());

grant select on public.complaint_statuses, public.complaint_categories, public.complaint_priorities to anon, authenticated;
grant select on public.complaints, public.complaint_documents, public.complaint_notes, public.complaint_communications, public.complaint_tasks, public.complaint_status_history, public.complaint_notification_log, public.complaint_staff_roles to authenticated;
grant insert, update, delete on public.complaint_documents, public.complaint_notes, public.complaint_communications, public.complaint_tasks, public.complaint_status_history, public.complaint_staff_roles to authenticated;
grant execute on function public.current_complaint_role() to authenticated;
grant execute on function public.is_complaint_staff() to authenticated;
grant execute on function public.can_close_complaints() to authenticated;
grant execute on function public.create_complaint_draft(text, jsonb) to anon, authenticated;
grant execute on function public.get_complaint_draft(text) to anon, authenticated;
grant execute on function public.update_complaint_draft(text, jsonb) to anon, authenticated;
grant execute on function public.submit_complaint(jsonb, text) to anon, authenticated;
grant execute on function public.register_complaint_documents(text, text, jsonb) to anon, authenticated;
grant execute on function public.track_complaint(text, text) to anon, authenticated;
grant execute on function public.staff_update_complaint(uuid, text, text, uuid, text, text, text) to authenticated;
grant execute on function public.staff_add_complaint_note(uuid, text, text) to authenticated;
grant execute on function public.staff_log_complaint_communication(uuid, text, text, text, text, text) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'complaint-attachments',
  'complaint-attachments',
  false,
  10485760,
  array[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public upload complaint attachments" on storage.objects;
create policy "Public upload complaint attachments"
on storage.objects for insert
to anon, authenticated
with check (
  bucket_id = 'complaint-attachments'
  and (storage.foldername(name))[1] = 'incoming'
);

drop policy if exists "Staff read complaint attachments" on storage.objects;
create policy "Staff read complaint attachments"
on storage.objects for select
to authenticated
using (
  bucket_id = 'complaint-attachments'
  and public.is_complaint_staff()
);

drop policy if exists "Staff manage complaint attachments" on storage.objects;
create policy "Staff manage complaint attachments"
on storage.objects for all
to authenticated
using (
  bucket_id = 'complaint-attachments'
  and public.is_complaint_staff()
)
with check (
  bucket_id = 'complaint-attachments'
  and public.is_complaint_staff()
);
