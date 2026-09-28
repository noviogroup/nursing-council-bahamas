export const complaintCategories = [
  { code: 'nurse_conduct', label: 'Nurse conduct' },
  { code: 'patient_safety', label: 'Patient safety' },
  { code: 'registration_issue', label: 'Registration issue' },
  { code: 'licensing_concern', label: 'Licensing concern' },
  { code: 'facility_context', label: 'Facility-context issue' },
  { code: 'education_provider_issue', label: 'Education provider issue' },
  { code: 'workplace_concern', label: 'Workplace concern' },
  { code: 'communication_issue', label: 'Communication issue' },
  { code: 'other', label: 'Other' },
];

export const respondentTypes = [
  { value: 'nurse', label: 'Nurse' },
  { value: 'midwife', label: 'Midwife' },
  { value: 'applicant', label: 'Applicant' },
  { value: 'licensee', label: 'Licensee' },
];

export const relationshipOptions = [
  'Patient',
  'Family member',
  'Nurse',
  'Employer',
  'Healthcare facility representative',
  'Member of the public',
  'Other',
];

export const contactMethodOptions = ['Email', 'Phone', 'Mail'];

export const complaintStatuses = [
  { code: 'new', label: 'New' },
  { code: 'under_review', label: 'Under review' },
  { code: 'awaiting_documents', label: 'Awaiting documents' },
  { code: 'under_investigation', label: 'Under investigation' },
  { code: 'pending_response', label: 'Pending response' },
  { code: 'disciplinary_and_penal_cases_review', label: 'Disciplinary and Penal Cases review' },
  { code: 'referred', label: 'Referred' },
  { code: 'not_within_jurisdiction', label: 'Not within jurisdiction' },
  { code: 'resolved', label: 'Resolved' },
  { code: 'dismissed', label: 'Dismissed' },
  { code: 'closed', label: 'Closed' },
];

export const complaintPriorities = [
  { code: 'standard', label: 'Standard' },
  { code: 'urgent', label: 'Urgent' },
  { code: 'public_safety_concern', label: 'Public safety concern' },
  { code: 'vulnerable_person', label: 'Vulnerable person' },
  { code: 'professional_misconduct', label: 'Professional misconduct' },
  { code: 'repeat_or_systemic_issue', label: 'Repeat or systemic issue' },
];

export const complaintEmailTemplates = [
  { code: 'complaint_received', label: 'Complaint received' },
  { code: 'complaint_draft_resume', label: 'Draft resume link' },
  { code: 'complaint_status_update', label: 'Status update' },
  { code: 'complaint_information_request', label: 'Request for information' },
  { code: 'complaint_staff_assignment', label: 'Staff assignment' },
  { code: 'complaint_sla_overdue', label: 'SLA overdue alert' },
  { code: 'complaint_case_closure', label: 'Case closure' },
];

export const allowedComplaintFileTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const maxComplaintUploadMb = 10;
export const maxComplaintUploadFiles = 5;

export type ComplaintFormData = {
  complainant: {
    name: string;
    email: string;
    phone: string;
    address: string;
    preferredContact: string;
    relationship: string;
  };
  respondent: {
    type: string;
    name: string;
    registrationNumber: string;
    employer: string;
    department: string;
    contact: string;
    location: string;
  };
  category: string;
  incident: {
    date: string;
    location: string;
    summary: string;
    description: string;
    peopleInvolved: string;
    ongoing: boolean;
    immediateRisk: boolean;
    outcome: string;
  };
  priorAction: {
    taken: boolean;
    details: string;
    response: string;
    referenceNumbers: string;
  };
  acknowledgement: {
    accurate: boolean;
    contact: boolean;
    review: boolean;
    truthful: boolean;
    consent: boolean;
  };
};

export const defaultComplaintFormData: ComplaintFormData = {
  complainant: {
    name: '',
    email: '',
    phone: '',
    address: '',
    preferredContact: 'email',
    relationship: '',
  },
  respondent: {
    type: '',
    name: '',
    registrationNumber: '',
    employer: '',
    department: '',
    contact: '',
    location: '',
  },
  category: '',
  incident: {
    date: '',
    location: '',
    summary: '',
    description: '',
    peopleInvolved: '',
    ongoing: false,
    immediateRisk: false,
    outcome: '',
  },
  priorAction: {
    taken: false,
    details: '',
    response: '',
    referenceNumbers: '',
  },
  acknowledgement: {
    accurate: false,
    contact: false,
    review: false,
    truthful: false,
    consent: false,
  },
};

export function formatComplaintDate(value?: string | null) {
  if (!value) return 'Not set';

  return new Intl.DateTimeFormat('en-BS', {
    dateStyle: 'medium',
    timeStyle: value.includes('T') ? 'short' : undefined,
  }).format(new Date(value));
}

export function humanizeComplaintValue(value?: string | null) {
  if (!value) return 'Not set';
  const knownStatus = complaintStatuses.find((status) => status.code === value);
  const knownPriority = complaintPriorities.find((priority) => priority.code === value);
  const knownCategory = complaintCategories.find((category) => category.code === value);
  return knownStatus?.label || knownPriority?.label || knownCategory?.label || value.replace(/_/g, ' ');
}
