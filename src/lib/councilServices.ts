import { portalPath } from './portal';

export type CouncilService = {
  id: string;
  title: string;
  description: string;
  inquiryType: string;
  availability: 'online' | 'assisted' | 'guidance';
  action: string;
  href: string;
  preparation: string;
  followUp: string;
};

export const councilServiceGroups = [
  { id: 'registration', title: 'Registration, Enrollment & Licensure', description: 'Join the register or roll, request a letter, or ask about licensing.' },
  { id: 'education', title: 'Education & Examination', description: 'Student indexing, Council examinations, and institution approval.' },
  { id: 'cpd', title: 'Continuing Professional Development', description: 'Provider and event enquiries, and guidance on CPD requirements.' },
  { id: 'agencies-uaps', title: 'Nursing Agencies & UAPs', description: 'Council assistance for agency licensing and Unlicensed Assistive Personnel records.' },
] as const;

type ServiceWithGroup = CouncilService & { group: typeof councilServiceGroups[number]['id'] };

export function serviceContactPath(id: string) {
  return `/contact?service=${encodeURIComponent(id)}#enquiry-form`;
}

const assistedFollowUp = 'Keep the enquiry reference shown after submission and quote it when contacting the Council. The Council will advise how to proceed.';

// Availability follows the portal launch scope reviewed on 8 November 2026.
// Renewals and special registration remain closed by default. Do not expose
// an application link until its portal and submission gates are both open.
export const councilServices: ServiceWithGroup[] = [
  {
    id: 'graduate-nurse-letter', group: 'registration', title: 'Graduate Nurse Letter',
    description: 'For graduates who need guidance on requesting a Council letter.',
    inquiryType: 'documents', availability: 'assisted', action: 'Ask about a graduate nurse letter', href: serviceContactPath('graduate-nurse-letter'),
    preparation: 'Tell the Council what the letter is needed for and who will receive it. The Council must confirm eligibility, required evidence, and any fee before a request proceeds.',
    followUp: assistedFollowUp,
  },
  {
    id: 'registration-local', group: 'registration', title: 'Registration - Local',
    description: 'First registration or enrollment for nurses and midwives trained in The Bahamas who have passed the Council examination.',
    inquiryType: 'registration', availability: 'online', action: 'Start local registration', href: portalPath('/start/registration'),
    preparation: 'Have your index number and Council examination details ready. Read the portal guide, then create an account or sign in.',
    followUp: 'Complete the application in Nurse 360. Council review updates and the outcome are available in the portal.',
  },
  {
    id: 'registration-international', group: 'registration', title: 'Registration - International',
    description: 'For applicants trained outside The Bahamas seeking registration or enrollment.',
    inquiryType: 'registration', availability: 'online', action: 'Start international application', href: portalPath('/start/international'),
    preparation: 'Read the international applicant guide in Nurse 360 for the information and documents required for your route.',
    followUp: 'Submit and follow your application in Nurse 360. This route is for incoming applicants; overseas verification for an existing nurse is under Certificates & Letters.',
  },
  {
    id: 'provisional-temporary-licence', group: 'registration', title: 'Provisional (Temporary) Licence',
    description: 'Ask the Council which registration or licence route applies to your circumstances.',
    inquiryType: 'licensing', availability: 'assisted', action: 'Ask about the appropriate route', href: serviceContactPath('provisional-temporary-licence'),
    preparation: 'Explain your qualification, current registration, and the purpose of your request. Provisional, temporary, and special registration are not interchangeable; the Council will confirm the applicable route.',
    followUp: 'Online special-registration applications are not open in the current service offering. ' + assistedFollowUp,
  },
  {
    id: 'licence-renewal', group: 'registration', title: 'Licence Renewal',
    description: 'For nurses and midwives seeking guidance on renewing a licence.',
    inquiryType: 'renewal', availability: 'assisted', action: 'Ask about renewal', href: serviceContactPath('licence-renewal'),
    preparation: 'Have your registration or enrollment number available. Ask the Council to confirm the renewal window, required evidence, and applicable fees.',
    followUp: 'Online renewal is not open in the current service offering. ' + assistedFollowUp,
  },
  {
    id: 'good-standing', group: 'registration', title: 'Letter of Good Standing',
    description: 'For an existing nurse whose employer, school, or regulator needs the Council to confirm their standing.',
    inquiryType: 'verification', availability: 'online', action: 'Open Certificates & Letters', href: portalPath('/nursing/certificates'),
    preparation: 'Sign in to Nurse 360 and choose Certificate of good standing in Certificates & Letters. Have the purpose and recipient details ready. The portal shows the applicable fee when you create the request.',
    followUp: 'Follow the request in Nurse 360. The Council controls approval and release to the recipient recorded in your request.',
  },
  {
    id: 'student-indexing', group: 'education', title: 'Nursing Student Indexing',
    description: 'For nursing students in a Council-approved programme who have not yet been indexed.',
    inquiryType: 'indexing', availability: 'online', action: 'Start student indexing', href: portalPath('/start/indexing'),
    preparation: 'Read the portal checklist for personal information, academic qualifications, and supporting documents before you create an account.',
    followUp: 'Submit online for a tracking number, then follow the school-signature and document instructions. The Council notifies you in Nurse 360 when your index number is issued.',
  },
  {
    id: 'examination', group: 'education', title: 'Examination',
    description: 'For indexed students applying to sit the Council examination.',
    inquiryType: 'exam', availability: 'online', action: 'Apply for an examination', href: portalPath('/start/exam'),
    preparation: 'Have your index number, if known, the name used when indexed, and the year you were indexed. You do not need to index again.',
    followUp: 'The Council confirms your index details and examination eligibility. Follow updates in Nurse 360.',
  },
  {
    id: 'institution-approval', group: 'education', title: 'Training Institution Approval',
    description: 'For institutions seeking Council guidance on approval of a nursing training programme.',
    inquiryType: 'education_registration', availability: 'assisted', action: 'Ask about institution approval', href: serviceContactPath('institution-approval'),
    preparation: 'Identify the institution, proposed programme, and a contact person. Ask for the current approval process and required documents.',
    followUp: assistedFollowUp,
  },
  {
    id: 'cpd-provider', group: 'cpd', title: 'CPD Provider',
    description: 'For organisations seeking guidance on offering continuing professional development.',
    inquiryType: 'education_registration', availability: 'assisted', action: 'Ask about CPD provider approval', href: serviceContactPath('cpd-provider'),
    preparation: 'Describe your organisation and proposed CPD activities. The Council will confirm the provider approval requirements.',
    followUp: assistedFollowUp,
  },
  {
    id: 'cpd-event', group: 'cpd', title: 'CPD Event',
    description: 'For organisers seeking guidance on approval of a CPD course or event.',
    inquiryType: 'education_registration', availability: 'assisted', action: 'Ask about a CPD event', href: serviceContactPath('cpd-event'),
    preparation: 'Identify the organiser and proposed activity. Ask the Council which event information and supporting documents are required.',
    followUp: assistedFollowUp,
  },
  {
    id: 'cpd-requirements', group: 'cpd', title: 'Approved CPD Requirements',
    description: 'Guidance for nurses on the CPD requirements that apply to their registration and renewal.',
    inquiryType: 'education_registration', availability: 'guidance', action: 'Request current CPD guidance', href: serviceContactPath('cpd-requirements'),
    preparation: 'Tell the Council your registration type and the period you are asking about. Confirm current requirements before relying on a course or activity for CPD.',
    followUp: 'This is a request for guidance, not an application. ' + assistedFollowUp,
  },
  {
    id: 'agency-application', group: 'agencies-uaps', title: 'Nursing Agency Application',
    description: 'For organisations seeking guidance on applying for nursing-agency licensing.',
    inquiryType: 'agency', availability: 'assisted', action: 'Ask about agency licensing', href: serviceContactPath('agency-application'),
    preparation: 'Provide the organisation name and contact person. Ask the Council for the current licensing process and supporting documents.',
    followUp: assistedFollowUp,
  },
  {
    id: 'agency-renewal', group: 'agencies-uaps', title: 'Nursing Agency Renewal',
    description: 'For existing nursing agencies asking about renewal of their Council licence.',
    inquiryType: 'agency', availability: 'assisted', action: 'Ask about agency renewal', href: serviceContactPath('agency-renewal'),
    preparation: 'Identify your agency and existing licence, if available. Ask the Council to confirm renewal requirements and the applicable period.',
    followUp: assistedFollowUp,
  },
  {
    id: 'uap-recording', group: 'agencies-uaps', title: 'UAP Application to be Recorded',
    description: 'For Unlicensed Assistive Personnel seeking guidance on being recorded with the Council.',
    inquiryType: 'licensing', availability: 'assisted', action: 'Ask about UAP recording', href: serviceContactPath('uap-recording'),
    preparation: 'Explain your training and the type of work you intend to undertake. The Council will confirm the recording process and required evidence.',
    followUp: assistedFollowUp,
  },
  {
    id: 'uap-renewal', group: 'agencies-uaps', title: 'UAP Renewal',
    description: 'For Unlicensed Assistive Personnel seeking guidance on renewing their Council record.',
    inquiryType: 'licensing', availability: 'assisted', action: 'Ask about UAP renewal', href: serviceContactPath('uap-renewal'),
    preparation: 'Have your existing record details available. Ask the Council for the current renewal requirements and any applicable CPD guidance.',
    followUp: assistedFollowUp,
  },
];

export function findCouncilService(id: string) {
  return councilServices.find((service) => service.id === id);
}
