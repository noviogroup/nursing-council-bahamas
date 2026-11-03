-- Keep the database catalogue aligned with the reviewable complaint email copy
-- in src/lib/complaint-email-templates.ts. Delivery remains disabled until an
-- email provider is configured.

insert into public.notification_templates (
  code,
  label,
  category,
  subject_template,
  body_template,
  default_channels,
  active
)
values
  (
    'complaint_draft_resume',
    'Draft resume link',
    'complaints',
    'Resume your saved Nursing Council complaint',
    $template$Dear {{recipient_name}},

You started a complaint with the Nursing Council but have not yet submitted it.

Use the secure link below to continue your draft:
{{resume_url}}

This link will expire on {{draft_expiry_date}}. If you did not create this draft, you may disregard this message.

For assistance, contact the Council and mention that you are completing an online complaint.

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_received',
    'Complaint received',
    'complaints',
    'Complaint received: {{reference_number}}',
    $template$Dear {{recipient_name}},

The Nursing Council has received your complaint on {{submitted_date}}.

Reference number: {{reference_number}}

Please keep this reference number for all communication about your complaint. The Council aims to acknowledge and triage new complaints within two business days. Triage does not mean that a finding or decision has been made.

You can view the public status and timeline for your complaint here:
{{tracking_url}}

The Council will contact you if additional information is required. For assistance, quote your reference number when contacting us.

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_status_update',
    'Complaint status update',
    'complaints',
    'Status update for complaint {{reference_number}}',
    $template$Dear {{recipient_name}},

There is an update to your Nursing Council complaint.

Reference number: {{reference_number}}
Current status: {{public_status}}

{{public_status_note}}

View the public status and timeline here:
{{tracking_url}}

This update is provided for your information and does not by itself represent a final finding or decision.

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_information_request',
    'Request for additional information',
    'complaints',
    'Information requested for complaint {{reference_number}}',
    $template$Dear {{recipient_name}},

The Nursing Council requires additional information to continue reviewing your complaint.

Reference number: {{reference_number}}
Requested information: {{request_details}}
Requested response date: {{response_due_date}}

Please provide the requested information using the contact instructions supplied by Council staff and quote your reference number. Do not send unrelated personal or medical information.

You can view the public status and request notice here:
{{tracking_url}}

If you need clarification about this request, contact the Council before the response date.

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_periodic_update',
    'Periodic investigation update',
    'complaints',
    'Progress update for complaint {{reference_number}}',
    $template$Dear {{recipient_name}},

This is a scheduled progress update about your Nursing Council complaint.

Reference number: {{reference_number}}
Current status: {{public_status}}

{{public_status_note}}

The matter remains active. No action is required from you unless the Council separately requests information.

View the public status and timeline here:
{{tracking_url}}

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_committee_review',
    'Committee review notice',
    'complaints',
    'Committee review update for complaint {{reference_number}}',
    $template$Dear {{recipient_name}},

Your complaint has progressed to review by the Disciplinary and Penal Cases Committee.

Reference number: {{reference_number}}

Committee review is part of the Council's formal process and does not mean that a finding has been made. The Council will provide a further update when the review reaches its next stage or if additional information is required.

View the public status and timeline here:
{{tracking_url}}

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_referred',
    'Complaint referred',
    'complaints',
    'Referral update for complaint {{reference_number}}',
    $template$Dear {{recipient_name}},

The Nursing Council has completed its review of how your complaint should be handled.

Reference number: {{reference_number}}
Referred to: {{referred_to}}

{{referral_summary}}

The receiving organization or process is responsible for its own timelines and next steps. Unless stated above, referral does not mean that the Nursing Council has made a finding about the complaint.

View the final public status and timeline here:
{{tracking_url}}

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_not_within_jurisdiction',
    'Outside Council jurisdiction',
    'complaints',
    'Jurisdiction decision for complaint {{reference_number}}',
    $template$Dear {{recipient_name}},

The Nursing Council has reviewed your complaint and determined that the matter is not within the Council's jurisdiction.

Reference number: {{reference_number}}

{{jurisdiction_summary}}

{{referral_guidance}}

View the final public status and timeline here:
{{tracking_url}}

This decision concerns the Council's authority to handle the matter and is not a finding on the underlying allegations.

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_case_closure',
    'Complaint case closure',
    'complaints',
    'Complaint closed: {{reference_number}}',
    $template$Dear {{recipient_name}},

The Nursing Council has closed your complaint file.

Reference number: {{reference_number}}
Closure status: {{closure_status}}

{{closure_summary}}

View the final public status and timeline here:
{{tracking_url}}

If you have a question about this notice, contact the Council and quote your reference number.

Regards,
The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['email'],
    true
  ),
  (
    'complaint_new_staff_alert',
    'New complaint staff alert',
    'complaints',
    'New complaint requires triage: {{reference_number}}',
    $template$A new complaint has been submitted to the Nursing Council.

Reference number: {{reference_number}}
Submitted: {{submitted_date}}
Category: {{category_label}}
Respondent type: {{respondent_type}}
Initial priority: {{priority_label}}
Triage due: {{triage_due_date}}

Review and triage the complaint in the secure staff portal:
{{portal_case_url}}

Do not forward this message or discuss complaint information outside authorized Council channels.

The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['portal', 'email'],
    true
  ),
  (
    'complaint_staff_assignment',
    'Staff assignment',
    'complaints',
    'Complaint assigned to you: {{reference_number}}',
    $template$A Nursing Council complaint has been assigned to you.

Reference number: {{reference_number}}
Priority: {{priority_label}}
Current status: {{internal_status}}
Initial review due: {{review_due_date}}
Next update due: {{next_update_due_date}}

Open the complaint in the secure staff portal:
{{portal_case_url}}

Please review the case record, confirm the next action, and update the assigned tasks. Do not forward this message outside authorized Council channels.

The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['portal', 'email'],
    true
  ),
  (
    'complaint_sla_due_soon',
    'SLA due soon alert',
    'complaints',
    'Complaint milestone due soon: {{reference_number}}',
    $template$A complaint milestone is approaching its target date.

Reference number: {{reference_number}}
Assigned user: {{assigned_staff_name}}
Milestone: {{milestone_label}}
Target date: {{target_date}}
Current status: {{internal_status}}

Open the complaint in the secure staff portal:
{{portal_case_url}}

Review the outstanding action and update the case record before the target date.

The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['portal', 'email'],
    true
  ),
  (
    'complaint_sla_overdue',
    'SLA overdue alert',
    'complaints',
    'Overdue complaint action: {{reference_number}}',
    $template$A complaint milestone has passed its target date and requires attention.

Reference number: {{reference_number}}
Assigned user: {{assigned_staff_name}}
Milestone: {{milestone_label}}
Target date: {{target_date}}
Days overdue: {{days_overdue}}
Current status: {{internal_status}}

Open the complaint in the secure staff portal:
{{portal_case_url}}

Review the case, record the reason for delay, and update the next action. Administrators and supervisors should reassign or escalate the matter where required.

The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com$template$,
    array['portal', 'email'],
    true
  )
on conflict (code) do update
set label = excluded.label,
    category = excluded.category,
    subject_template = excluded.subject_template,
    body_template = excluded.body_template,
    default_channels = excluded.default_channels,
    active = excluded.active,
    updated_at = now();
