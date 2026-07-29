'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Copy, FloppyDisk, UploadSimple, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  allowedComplaintFileTypes,
  complaintCategories,
  contactMethodOptions,
  defaultComplaintFormData,
  maxComplaintUploadFiles,
  maxComplaintUploadMb,
  relationshipOptions,
  respondentTypes,
  type ComplaintFormData,
} from '@/lib/complaints';
import { complaintStorageBucket, getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase';

type DraftResponse = {
  draft_id: string;
  resume_token: string;
  expires_at: string;
};

type SubmitResponse = {
  complaint_id: string;
  reference_number: string;
  submitted_at: string;
};

const steps = ['Complainant', 'Respondent', 'Category', 'Incident', 'Prior action', 'Documents', 'Review'];

type ComplaintFormSection = Exclude<keyof ComplaintFormData, 'category'>;

function updateNested<T extends ComplaintFormSection, K extends keyof ComplaintFormData[T]>(
  data: ComplaintFormData,
  section: T,
  field: K,
  value: ComplaintFormData[T][K],
) {
  return {
    ...data,
    [section]: {
      ...data[section],
      [field]: value,
    },
  };
}

function normalizeDraftData(value: unknown): ComplaintFormData {
  if (!value || typeof value !== 'object') return defaultComplaintFormData;
  const incoming = value as Partial<ComplaintFormData>;

  return {
    complainant: { ...defaultComplaintFormData.complainant, ...incoming.complainant },
    respondent: { ...defaultComplaintFormData.respondent, ...incoming.respondent },
    category: incoming.category || '',
    incident: { ...defaultComplaintFormData.incident, ...incoming.incident },
    priorAction: { ...defaultComplaintFormData.priorAction, ...incoming.priorAction },
    acknowledgement: { ...defaultComplaintFormData.acknowledgement, ...incoming.acknowledgement },
  };
}

function buildResumeUrl(token: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${siteUrl.replace(/\/$/, '')}/complaints/resume/${token}`;
}

function fieldClassName() {
  return 'mt-2 min-h-12 rounded-sm border-slate-300 bg-white text-base shadow-none focus-visible:ring-council-primary';
}

function selectClassName() {
  return 'mt-2 min-h-12 w-full rounded-sm border border-slate-300 bg-white px-3 text-base text-council-dark focus:outline-none focus:ring-1 focus:ring-council-primary';
}

function checkboxClassName() {
  return 'mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-council-primary focus:ring-council-primary';
}

export default function PublicComplaintForm({ draftToken }: { draftToken?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ComplaintFormData>(defaultComplaintFormData);
  const [files, setFiles] = useState<File[]>([]);
  const [resumeToken, setResumeToken] = useState(draftToken || '');
  const [resumeUrl, setResumeUrl] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(Boolean(draftToken));
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allAcknowledged = Object.values(formData.acknowledgement).every(Boolean);

  const selectedCategory = useMemo(
    () => complaintCategories.find((category) => category.code === formData.category),
    [formData.category],
  );

  useEffect(() => {
    async function loadDraft() {
      if (!draftToken) return;
      if (!hasSupabaseConfig()) {
        setError('Supabase is not configured for this environment.');
        setIsLoading(false);
        return;
      }

      const supabase = getSupabaseClient();
      const { data, error: draftError } = await supabase.rpc('get_complaint_draft', {
        p_resume_token: draftToken,
      });

      if (draftError || !data?.[0]) {
        setError('This draft link is invalid, expired, or already submitted.');
      } else {
        setFormData(normalizeDraftData(data[0].form_data));
        setResumeUrl(buildResumeUrl(draftToken));
      }

      setIsLoading(false);
    }

    loadDraft();
  }, [draftToken]);

  const setSectionValue = <T extends ComplaintFormSection, K extends keyof ComplaintFormData[T]>(
    section: T,
    field: K,
    value: ComplaintFormData[T][K],
  ) => {
    setFormData((current) => updateNested(current, section, field, value));
  };

  const handleFiles = (fileList: FileList | null) => {
    setError('');
    if (!fileList) return;

    const nextFiles = Array.from(fileList);
    if (files.length + nextFiles.length > maxComplaintUploadFiles) {
      setError(`Upload up to ${maxComplaintUploadFiles} files total.`);
      return;
    }

    const invalidFile = nextFiles.find(
      (file) => !allowedComplaintFileTypes.includes(file.type) || file.size > maxComplaintUploadMb * 1024 * 1024,
    );

    if (invalidFile) {
      setError(`Files must be PDF, JPG, PNG, DOC, or DOCX and ${maxComplaintUploadMb}MB or smaller.`);
      return;
    }

    setFiles((current) => [...current, ...nextFiles]);
  };

  const saveDraft = async () => {
    setError('');
    setStatus('');

    if (!formData.complainant.email) {
      setError('Enter an email address before saving a draft.');
      setStep(0);
      return;
    }

    if (!hasSupabaseConfig()) {
      setError('Supabase is not configured for this environment.');
      return;
    }

    setIsSaving(true);
    const supabase = getSupabaseClient();

    if (resumeToken) {
      const { error: updateError } = await supabase.rpc('update_complaint_draft', {
        p_resume_token: resumeToken,
        p_payload: formData,
      });

      setIsSaving(false);
      if (updateError) {
        setError(updateError.message);
        return;
      }

      setStatus('Draft updated. Email delivery is not enabled yet, so keep the resume link shown below.');
      setResumeUrl(buildResumeUrl(resumeToken));
      return;
    }

    const { data, error: draftError } = await supabase.rpc('create_complaint_draft', {
      p_contact_email: formData.complainant.email,
      p_payload: formData,
    });

    setIsSaving(false);
    if (draftError) {
      setError(draftError.message);
      return;
    }

    const draft = data?.[0] as DraftResponse | undefined;
    if (!draft) {
      setError('Draft could not be created.');
      return;
    }

    setResumeToken(draft.resume_token);
    setResumeUrl(buildResumeUrl(draft.resume_token));
    setStatus('Draft saved for 30 days. Email delivery is not enabled yet, so keep the resume link shown below.');
  };

  const uploadDocuments = async (referenceNumber: string) => {
    if (!files.length) return;

    const supabase = getSupabaseClient();
    const uploadedDocuments = [];

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const storagePath = `incoming/${referenceNumber}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from(complaintStorageBucket).upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

      if (uploadError) throw uploadError;

      uploadedDocuments.push({
        storagePath,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      });
    }

    const { error: registerError } = await supabase.rpc('register_complaint_documents', {
      p_reference_number: referenceNumber,
      p_contact_email: formData.complainant.email,
      p_documents: uploadedDocuments,
    });

    if (registerError) throw registerError;
  };

  const submitComplaint = async () => {
    setError('');
    setStatus('');

    if (!allAcknowledged) {
      setError('Complete all acknowledgement checkboxes before submitting.');
      setStep(6);
      return;
    }

    if (!hasSupabaseConfig()) {
      setError('Supabase is not configured for this environment.');
      return;
    }

    setIsSubmitting(true);
    const supabase = getSupabaseClient();
    const { data, error: submitError } = await supabase.rpc('submit_complaint', {
      p_payload: formData,
      p_draft_token: resumeToken || null,
    });

    if (submitError) {
      setIsSubmitting(false);
      setError(submitError.message);
      return;
    }

    const submitted = data?.[0] as SubmitResponse | undefined;
    if (!submitted) {
      setIsSubmitting(false);
      setError('Complaint could not be submitted.');
      return;
    }

    try {
      await uploadDocuments(submitted.reference_number);
    } catch (documentError) {
      setStatus(
        `Complaint ${submitted.reference_number} was submitted, but one or more documents could not be uploaded. Staff can advise on next steps.`,
      );
      setIsSubmitting(false);
      return;
    }

    router.push(`/complaints/submitted/${submitted.reference_number}`);
  };

  const canContinue = () => {
    if (step === 0) return formData.complainant.name && formData.complainant.email && formData.complainant.phone;
    if (step === 1) return formData.respondent.type && formData.respondent.name;
    if (step === 2) return formData.category;
    if (step === 3) return formData.incident.summary && formData.incident.description;
    return true;
  };

  if (isLoading) {
    return <div className="border border-slate-200 bg-white p-8 text-gray-600 shadow-sm">Loading saved draft...</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
      <aside className="bg-council-primary p-6 text-white lg:sticky lg:top-8 lg:self-start">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Complaint steps</p>
        <h2 className="font-heading text-3xl font-bold">Submit a complaint</h2>
        <div className="mt-8 space-y-2">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm transition-colors ${
                step === index ? 'bg-white text-council-primary' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-current text-xs font-bold">
                {index + 1}
              </span>
              {label}
            </button>
          ))}
        </div>
        <div className="mt-8 border-l-2 border-council-accent pl-4 text-sm leading-relaxed text-white/80">
          Complaints must include contact details and must concern an individual nurse, midwife, applicant, or licensee.
        </div>
      </aside>

      <section className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {error && (
          <div className="mb-6 flex gap-3 border-l-4 border-council-alert bg-red-50 p-4 text-sm text-red-900">
            <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {status && (
          <div className="mb-6 flex gap-3 border-l-4 border-council-primary bg-blue-50 p-4 text-sm text-council-primary">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{status}</p>
          </div>
        )}

        {resumeUrl && (
          <div className="mb-6 border border-slate-200 bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-council-dark">Draft resume link</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input readOnly value={resumeUrl} className="min-h-11 rounded-sm bg-white" />
              <Button
                type="button"
                variant="outline"
                className="min-h-11 rounded-sm"
                onClick={() => navigator.clipboard.writeText(resumeUrl)}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
        )}

        <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Step {step + 1} of 7</p>
            <h1 className="font-heading mt-2 text-3xl font-bold text-council-dark">{steps[step]}</h1>
          </div>
          <Button type="button" variant="outline" onClick={saveDraft} disabled={isSaving} className="hidden min-h-11 rounded-sm sm:inline-flex">
            <FloppyDisk className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save draft'}
          </Button>
        </div>

        {step === 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Full name *
              <Input value={formData.complainant.name} onChange={(event) => setSectionValue('complainant', 'name', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Email address *
              <Input type="email" value={formData.complainant.email} onChange={(event) => setSectionValue('complainant', 'email', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Phone number *
              <Input type="tel" value={formData.complainant.phone} onChange={(event) => setSectionValue('complainant', 'phone', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Preferred contact
              <select value={formData.complainant.preferredContact} onChange={(event) => setSectionValue('complainant', 'preferredContact', event.target.value.toLowerCase())} className={selectClassName()}>
                {contactMethodOptions.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              Address or location
              <Input value={formData.complainant.address} onChange={(event) => setSectionValue('complainant', 'address', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              Relationship to the matter
              <select value={formData.complainant.relationship} onChange={(event) => setSectionValue('complainant', 'relationship', event.target.value)} className={selectClassName()}>
                <option value="">Select relationship</option>
                {relationshipOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Complaint is about *
              <select value={formData.respondent.type} onChange={(event) => setSectionValue('respondent', 'type', event.target.value)} className={selectClassName()}>
                <option value="">Select respondent type</option>
                {respondentTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Name *
              <Input value={formData.respondent.name} onChange={(event) => setSectionValue('respondent', 'name', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Registration or licence number
              <Input value={formData.respondent.registrationNumber} onChange={(event) => setSectionValue('respondent', 'registrationNumber', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Employer or facility context
              <Input value={formData.respondent.employer} onChange={(event) => setSectionValue('respondent', 'employer', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Department or unit
              <Input value={formData.respondent.department} onChange={(event) => setSectionValue('respondent', 'department', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Contact details, if known
              <Input value={formData.respondent.contact} onChange={(event) => setSectionValue('respondent', 'contact', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              Location
              <Input value={formData.respondent.location} onChange={(event) => setSectionValue('respondent', 'location', event.target.value)} className={fieldClassName()} />
            </label>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2">
              {complaintCategories.map((category) => (
                <button
                  key={category.code}
                  type="button"
                  onClick={() => setFormData((current) => ({ ...current, category: category.code }))}
                  className={`bg-white p-5 text-left transition-colors ${
                    formData.category === category.code ? 'ring-2 ring-inset ring-council-primary' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-heading text-lg font-bold text-council-dark">{category.label}</span>
                </button>
              ))}
            </div>
            {selectedCategory && <p className="mt-4 text-sm text-gray-600">Selected: {selectedCategory.label}</p>}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Incident date
              <Input type="date" value={formData.incident.date} onChange={(event) => setSectionValue('incident', 'date', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Incident location
              <Input value={formData.incident.location} onChange={(event) => setSectionValue('incident', 'location', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              Short summary *
              <Input value={formData.incident.summary} onChange={(event) => setSectionValue('incident', 'summary', event.target.value)} className={fieldClassName()} />
            </label>
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              Detailed description *
              <Textarea rows={8} value={formData.incident.description} onChange={(event) => setSectionValue('incident', 'description', event.target.value)} className="mt-2 rounded-sm border-slate-300 text-base shadow-none focus-visible:ring-council-primary" />
            </label>
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              People involved
              <Textarea rows={3} value={formData.incident.peopleInvolved} onChange={(event) => setSectionValue('incident', 'peopleInvolved', event.target.value)} className="mt-2 rounded-sm border-slate-300 text-base shadow-none focus-visible:ring-council-primary" />
            </label>
            <label className="flex gap-3 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={formData.incident.ongoing} onChange={(event) => setSectionValue('incident', 'ongoing', event.target.checked)} className={checkboxClassName()} />
              This matter is ongoing.
            </label>
            <label className="flex gap-3 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={formData.incident.immediateRisk} onChange={(event) => setSectionValue('incident', 'immediateRisk', event.target.checked)} className={checkboxClassName()} />
              There may be immediate risk or public safety concern.
            </label>
            <label className="text-sm font-medium text-gray-700 md:col-span-2">
              Outcome requested
              <Textarea rows={4} value={formData.incident.outcome} onChange={(event) => setSectionValue('incident', 'outcome', event.target.value)} className="mt-2 rounded-sm border-slate-300 text-base shadow-none focus-visible:ring-council-primary" />
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <label className="flex gap-3 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={formData.priorAction.taken} onChange={(event) => setSectionValue('priorAction', 'taken', event.target.checked)} className={checkboxClassName()} />
              I have already contacted a nurse, employer, facility, police, court, regulator, or other agency.
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Prior action details
              <Textarea rows={5} value={formData.priorAction.details} onChange={(event) => setSectionValue('priorAction', 'details', event.target.value)} className="mt-2 rounded-sm border-slate-300 text-base shadow-none focus-visible:ring-council-primary" />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Response received
              <Textarea rows={4} value={formData.priorAction.response} onChange={(event) => setSectionValue('priorAction', 'response', event.target.value)} className="mt-2 rounded-sm border-slate-300 text-base shadow-none focus-visible:ring-council-primary" />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Existing case or reference numbers
              <Input value={formData.priorAction.referenceNumbers} onChange={(event) => setSectionValue('priorAction', 'referenceNumbers', event.target.value)} className={fieldClassName()} />
            </label>
          </div>
        )}

        {step === 5 && (
          <div>
            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-slate-300 bg-gray-50 p-8 text-center transition-colors hover:border-council-primary">
              <UploadSimple className="mb-4 h-10 w-10 text-council-primary" />
              <span className="font-heading text-xl font-bold text-council-dark">Upload supporting documents</span>
              <span className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
                PDF, JPG, PNG, DOC, or DOCX only. Up to {maxComplaintUploadFiles} files, {maxComplaintUploadMb}MB each. Only include sensitive information where relevant.
              </span>
              <input type="file" multiple className="sr-only" accept={allowedComplaintFileTypes.join(',')} onChange={(event) => handleFiles(event.target.files)} />
            </label>
            <div className="mt-5 space-y-2">
              {files.map((file) => (
                <div key={`${file.name}-${file.size}`} className="flex items-center justify-between border border-slate-200 px-4 py-3 text-sm">
                  <span className="truncate">{file.name}</span>
                  <button type="button" className="font-semibold text-council-alert" onClick={() => setFiles((current) => current.filter((item) => item !== file))}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2">
              <div className="bg-white p-5"><p className="text-sm text-gray-500">Complainant</p><p className="font-semibold text-council-dark">{formData.complainant.name || 'Not provided'}</p><p className="text-sm text-gray-600">{formData.complainant.email || 'No email'} / {formData.complainant.phone || 'No phone'}</p></div>
              <div className="bg-white p-5"><p className="text-sm text-gray-500">Respondent</p><p className="font-semibold text-council-dark">{formData.respondent.name || 'Not provided'}</p><p className="text-sm text-gray-600">{formData.respondent.type || 'No type'} / {formData.respondent.registrationNumber || 'No number'}</p></div>
              <div className="bg-white p-5"><p className="text-sm text-gray-500">Category</p><p className="font-semibold text-council-dark">{selectedCategory?.label || 'Not selected'}</p></div>
              <div className="bg-white p-5"><p className="text-sm text-gray-500">Documents</p><p className="font-semibold text-council-dark">{files.length} file(s)</p></div>
            </div>

            <div className="space-y-4 border border-slate-200 bg-gray-50 p-5">
              {[
                ['accurate', 'I confirm that the information provided is true and accurate to the best of my knowledge.'],
                ['contact', 'I understand that the Nursing Council may contact me for additional information.'],
                ['review', 'I understand that this complaint may be reviewed by authorized Council staff, supervisors, and relevant committee members.'],
                ['truthful', 'I understand that knowingly submitting false or misleading information may affect the handling of this complaint.'],
                ['consent', 'I agree that the Nursing Council may use the information submitted to assess, investigate, refer, or close this matter in accordance with its regulatory responsibilities.'],
              ].map(([key, label]) => (
                <label key={key} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.acknowledgement[key as keyof ComplaintFormData['acknowledgement']]}
                    onChange={(event) => setSectionValue('acknowledgement', key as keyof ComplaintFormData['acknowledgement'], event.target.checked)}
                    className={checkboxClassName()}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col-reverse justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
          <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="min-h-12 rounded-sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="outline" onClick={saveDraft} disabled={isSaving} className="min-h-12 rounded-sm sm:hidden">
              <FloppyDisk className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save draft'}
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" disabled={!canContinue()} onClick={() => setStep((current) => current + 1)} className="min-h-12 rounded-sm bg-council-primary px-7 hover:bg-council-secondary">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" disabled={isSubmitting || !allAcknowledged} onClick={submitComplaint} className="min-h-12 rounded-sm bg-council-primary px-7 hover:bg-council-secondary">
                {isSubmitting ? 'Submitting...' : 'Submit complaint'}
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
