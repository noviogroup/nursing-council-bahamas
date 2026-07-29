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
  returning complaints.id, complaints.reference_number, complaints.submitted_at
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

grant execute on function public.submit_complaint(jsonb, text) to anon, authenticated;
