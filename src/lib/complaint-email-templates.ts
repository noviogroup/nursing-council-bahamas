export type ComplaintEmailAudience = 'complainant' | 'staff';

export type ComplaintEmailTemplate = {
  code: string;
  label: string;
  audience: ComplaintEmailAudience;
  trigger: string;
  subject: string;
  body: string;
  selectableByStaff: boolean;
};

const councilSignature = `The Nursing Council of the Commonwealth of The Bahamas
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas
(242) 604-6015 / 6017
info@nursingcouncilbahamas.com`;

export const complaintEmailTemplates: ComplaintEmailTemplate[] = [
  {
    code: 'complaint_draft_resume',
    label: 'Draft resume link',
    audience: 'complainant',
    trigger: 'When a complainant saves an unfinished complaint',
    subject: 'Resume your saved Nursing Council complaint',
    body: `Dear {{recipient_name}},

You started a complaint with the Nursing Council but have not yet submitted it.

Use the secure link below to continue your draft:
{{resume_url}}

This link will expire on {{draft_expiry_date}}. If you did not create this draft, you may disregard this message.

For assistance, contact the Council and mention that you are completing an online complaint.

Regards,
${councilSignature}`,
    selectableByStaff: false,
  },
  {
    code: 'complaint_received',
    label: 'Complaint received',
    audience: 'complainant',
    trigger: 'Immediately after a complaint is submitted',
    subject: 'Complaint received: {{reference_number}}',
    body: `Dear {{recipient_name}},

The Nursing Council has received your complaint on {{submitted_date}}.

Reference number: {{reference_number}}

Please keep this reference number for all communication about your complaint. The Council aims to acknowledge and triage new complaints within two business days. Triage does not mean that a finding or decision has been made.

You can view the public status and timeline for your complaint here:
{{tracking_url}}

The Council will contact you if additional information is required. For assistance, quote your reference number when contacting us.

Regards,
${councilSignature}`,
    selectableByStaff: false,
  },
  {
    code: 'complaint_status_update',
    label: 'Complaint status update',
    audience: 'complainant',
    trigger: 'When staff publish a new complaint status',
    subject: 'Status update for complaint {{reference_number}}',
    body: `Dear {{recipient_name}},

There is an update to your Nursing Council complaint.

Reference number: {{reference_number}}
Current status: {{public_status}}

{{public_status_note}}

View the public status and timeline here:
{{tracking_url}}

This update is provided for your information and does not by itself represent a final finding or decision.

Regards,
${councilSignature}`,
    selectableByStaff: true,
  },
  {
    code: 'complaint_information_request',
    label: 'Request for additional information',
    audience: 'complainant',
    trigger: 'When staff require more information to continue review',
    subject: 'Information requested for complaint {{reference_number}}',
    body: `Dear {{recipient_name}},

The Nursing Council requires additional information to continue reviewing your complaint.

Reference number: {{reference_number}}
Requested information: {{request_details}}
Requested response date: {{response_due_date}}

Please provide the requested information using the contact instructions supplied by Council staff and quote your reference number. Do not send unrelated personal or medical information.

You can view the public status and request notice here:
{{tracking_url}}

If you need clarification about this request, contact the Council before the response date.

Regards,
${councilSignature}`,
    selectableByStaff: true,
  },
  {
    code: 'complaint_periodic_update',
    label: 'Periodic investigation update',
    audience: 'complainant',
    trigger: 'Every 30 days while an investigation remains open',
    subject: 'Progress update for complaint {{reference_number}}',
    body: `Dear {{recipient_name}},

This is a scheduled progress update about your Nursing Council complaint.

Reference number: {{reference_number}}
Current status: {{public_status}}

{{public_status_note}}

The matter remains active. No action is required from you unless the Council separately requests information.

View the public status and timeline here:
{{tracking_url}}

Regards,
${councilSignature}`,
    selectableByStaff: true,
  },
  {
    code: 'complaint_committee_review',
    label: 'Committee review notice',
    audience: 'complainant',
    trigger: 'When a matter enters Disciplinary and Penal Cases review',
    subject: 'Committee review update for complaint {{reference_number}}',
    body: `Dear {{recipient_name}},

Your complaint has progressed to review by the Disciplinary and Penal Cases Committee.

Reference number: {{reference_number}}

Committee review is part of the Council's formal process and does not mean that a finding has been made. The Council will provide a further update when the review reaches its next stage or if additional information is required.

View the public status and timeline here:
{{tracking_url}}

Regards,
${councilSignature}`,
    selectableByStaff: true,
  },
  {
    code: 'complaint_referred',
    label: 'Complaint referred',
    audience: 'complainant',
    trigger: 'When the Council refers a matter to another process or authority',
    subject: 'Referral update for complaint {{reference_number}}',
    body: `Dear {{recipient_name}},

The Nursing Council has completed its review of how your complaint should be handled.

Reference number: {{reference_number}}
Referred to: {{referred_to}}

{{referral_summary}}

The receiving organization or process is responsible for its own timelines and next steps. Unless stated above, referral does not mean that the Nursing Council has made a finding about the complaint.

View the final public status and timeline here:
{{tracking_url}}

Regards,
${councilSignature}`,
    selectableByStaff: true,
  },
  {
    code: 'complaint_not_within_jurisdiction',
    label: 'Outside Council jurisdiction',
    audience: 'complainant',
    trigger: 'When staff determine that a complaint is outside Council jurisdiction',
    subject: 'Jurisdiction decision for complaint {{reference_number}}',
    body: `Dear {{recipient_name}},

The Nursing Council has reviewed your complaint and determined that the matter is not within the Council's jurisdiction.

Reference number: {{reference_number}}

{{jurisdiction_summary}}

{{referral_guidance}}

View the final public status and timeline here:
{{tracking_url}}

This decision concerns the Council's authority to handle the matter and is not a finding on the underlying allegations.

Regards,
${councilSignature}`,
    selectableByStaff: true,
  },
  {
    code: 'complaint_case_closure',
    label: 'Complaint case closure',
    audience: 'complainant',
    trigger: 'When an authorized administrator or supervisor closes a complaint',
    subject: 'Complaint closed: {{reference_number}}',
    body: `Dear {{recipient_name}},

The Nursing Council has closed your complaint file.

Reference number: {{reference_number}}
Closure status: {{closure_status}}

{{closure_summary}}

View the final public status and timeline here:
{{tracking_url}}

If you have a question about this notice, contact the Council and quote your reference number.

Regards,
${councilSignature}`,
    selectableByStaff: true,
  },
  {
    code: 'complaint_new_staff_alert',
    label: 'New complaint staff alert',
    audience: 'staff',
    trigger: 'Immediately after submission; sent to administrators and supervisors',
    subject: 'New complaint requires triage: {{reference_number}}',
    body: `A new complaint has been submitted to the Nursing Council.

Reference number: {{reference_number}}
Submitted: {{submitted_date}}
Category: {{category_label}}
Respondent type: {{respondent_type}}
Initial priority: {{priority_label}}
Triage due: {{triage_due_date}}

Review and triage the complaint in the secure staff portal:
{{portal_case_url}}

Do not forward this message or discuss complaint information outside authorized Council channels.

${councilSignature}`,
    selectableByStaff: false,
  },
  {
    code: 'complaint_staff_assignment',
    label: 'Staff assignment',
    audience: 'staff',
    trigger: 'When a complaint is assigned or reassigned to a staff user',
    subject: 'Complaint assigned to you: {{reference_number}}',
    body: `A Nursing Council complaint has been assigned to you.

Reference number: {{reference_number}}
Priority: {{priority_label}}
Current status: {{internal_status}}
Initial review due: {{review_due_date}}
Next update due: {{next_update_due_date}}

Open the complaint in the secure staff portal:
{{portal_case_url}}

Please review the case record, confirm the next action, and update the assigned tasks. Do not forward this message outside authorized Council channels.

${councilSignature}`,
    selectableByStaff: false,
  },
  {
    code: 'complaint_sla_due_soon',
    label: 'SLA due soon alert',
    audience: 'staff',
    trigger: 'Before a complaint milestone reaches its target date',
    subject: 'Complaint milestone due soon: {{reference_number}}',
    body: `A complaint milestone is approaching its target date.

Reference number: {{reference_number}}
Assigned user: {{assigned_staff_name}}
Milestone: {{milestone_label}}
Target date: {{target_date}}
Current status: {{internal_status}}

Open the complaint in the secure staff portal:
{{portal_case_url}}

Review the outstanding action and update the case record before the target date.

${councilSignature}`,
    selectableByStaff: false,
  },
  {
    code: 'complaint_sla_overdue',
    label: 'SLA overdue alert',
    audience: 'staff',
    trigger: 'When a complaint milestone passes its target date',
    subject: 'Overdue complaint action: {{reference_number}}',
    body: `A complaint milestone has passed its target date and requires attention.

Reference number: {{reference_number}}
Assigned user: {{assigned_staff_name}}
Milestone: {{milestone_label}}
Target date: {{target_date}}
Days overdue: {{days_overdue}}
Current status: {{internal_status}}

Open the complaint in the secure staff portal:
{{portal_case_url}}

Review the case, record the reason for delay, and update the next action. Administrators and supervisors should reassign or escalate the matter where required.

${councilSignature}`,
    selectableByStaff: false,
  },
];

export const complaintStaffSelectableEmailTemplates = complaintEmailTemplates.filter(
  (template) => template.selectableByStaff,
);
