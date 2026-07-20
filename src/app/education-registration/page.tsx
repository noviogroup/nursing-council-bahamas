import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  ClipboardText as ClipboardCheck,
  CurrencyDollar as DollarSign,
  FileText as FileCheck2,
  GraduationCap,
  ShieldCheck,
  Users,
  Wallet as WalletCards,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

type ServicePanelProps = {
  title: string;
  description: string;
  icon: PhosphorIcon;
  imageSrc: string;
  imageAlt: string;
  steps: string[];
  requirements: string[];
  fee: string;
  feeDescription: string;
  primaryAction: { label: string; href: string };
  secondaryActions: { label: string; href: string }[];
};

function ServicePanel({
  title,
  description,
  icon: Icon,
  imageSrc,
  imageAlt,
  steps,
  requirements,
  fee,
  feeDescription,
  primaryAction,
  secondaryActions,
}: ServicePanelProps) {
  return (
    <article className="flex h-full flex-col rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-md border-b border-slate-200">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="border-b border-slate-200 p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-council-primary text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Fee</p>
            <p className="text-xl font-bold text-council-primary">{fee}</p>
          </div>
        </div>
        <h2 className="font-heading text-2xl font-bold leading-tight text-council-dark">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <section aria-label={`${title} process`}>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-council-primary/10 text-council-primary">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-lg font-bold text-council-dark">Process</h3>
          </div>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-relaxed text-slate-700">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-council-accent bg-council-accent/20 text-xs font-bold text-council-primary">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label={`${title} requirements`}>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-council-primary/10 text-council-primary">
              <FileCheck2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-lg font-bold text-council-dark">Requirements</h3>
          </div>
          <ul className="space-y-3">
            {requirements.map((requirement) => (
              <li key={requirement} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-council-primary" aria-hidden="true" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-auto border-t border-slate-200 pt-5" aria-label={`${title} actions`}>
          <div className="mb-4 flex items-center gap-3 text-sm text-slate-600">
            <WalletCards className="h-5 w-5 text-council-primary" aria-hidden="true" />
            <span>{feeDescription}</span>
          </div>
          <Link href={primaryAction.href} className="flex min-h-11 w-full items-center justify-between rounded-md bg-council-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">
            {primaryAction.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <div className="mt-3 space-y-2">
            {secondaryActions.map((action) => (
              <Link key={action.label} href={action.href} className="flex min-h-10 items-center justify-between rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-council-primary transition-colors hover:border-council-primary hover:bg-council-primary/5 focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">
                {action.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export default function EducationRegistrationPage() {
  const registrationRequirements = [
    'Approved nursing education programme',
    'Successful completion of the licensing examination',
    'Professional references and required documentation',
    'Registration fee of BS$300',
  ];

  const renewalRequirements = [
    'Current nursing registration in good standing',
    '24 continuing education units annually',
    'Updated contact and employment information',
    'Annual renewal fee of BS$150',
  ];

  const agencyRequirements = [
    'Valid business registration in The Bahamas',
    'A designated nursing supervisor with current registration',
    'Policies, procedures, and insurance coverage',
    'Annual inspection and compliance review',
  ];

  const feeStructure = [
    { service: 'Initial Registration', fee: 'BS$300', description: 'First-time nursing registration' },
    { service: 'Annual Renewal', fee: 'BS$150', description: 'Yearly licence renewal' },
    { service: 'Late Renewal Penalty', fee: 'BS$75', description: 'Additional fee for late renewals' },
    { service: 'Duplicate Certificate', fee: 'BS$50', description: 'Replacement registration certificate' },
    { service: 'Verification Letter', fee: 'BS$25', description: 'Official verification of registration status' },
    { service: 'Nursing Agency Licence', fee: 'BS$500', description: 'Annual nursing agency licensing' },
    { service: 'Examination Fee', fee: 'BS$200', description: 'Nursing competency examination' },
    { service: 'Reinstatement', fee: 'BS$400', description: 'Restoration of lapsed registration' },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-16 text-white">
          <div className="container mx-auto px-4"><div className="max-w-3xl"><p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent"><span className="h-px w-9 bg-council-accent" />Professional services</p><h1 className="font-heading mb-6 text-4xl font-bold md:text-5xl">Education & Registration</h1><p className="text-xl text-white/90">Your pathway to nursing practice in The Bahamas. Find information about registration, licence renewal, and nursing agency licensing.</p></div></div>
        </section>

        <section className="bg-gray-50 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                <div>
                  <p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                    <span className="h-px w-9 bg-council-accent" />
                    Service pathways
                  </p>
                  <h2 className="font-heading text-3xl font-bold text-council-dark md:text-4xl">Choose the correct application path</h2>
                </div>
                <p className="max-w-2xl leading-relaxed text-slate-600">
                  Compare the main Council services before starting in the portal. Each path shows the core steps, common requirements, and available online actions.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                <ServicePanel
                  title="Start your nursing registration"
                  description="Take the first step toward nursing practice in The Bahamas with a clear, supported online application process."
                  icon={GraduationCap}
                  imageSrc="/assets/services/registration-review.webp"
                  imageAlt="An applicant reviewing registration documents with a Council registry officer"
                  steps={['Review the registration requirements', 'Prepare your supporting documents', 'Submit your online application']}
                  requirements={registrationRequirements}
                  fee="BS$300"
                  feeDescription="initial nursing registration"
                  primaryAction={{ label: 'Start registration application', href: portalPath('/register?type=registration') }}
                  secondaryActions={[{ label: 'Apply for student indexing', href: portalPath('/register?type=indexing') }, { label: 'Apply for registration exam', href: portalPath('/register?type=exam') }]}
                />

                <ServicePanel
                  title="Renew your licence today"
                  description="Maintain your registration by completing your annual renewal requirements and continuing education obligations."
                  icon={ShieldCheck}
                  imageSrc="/assets/services/licence-renewal.webp"
                  imageAlt="A nurse completing an online licence renewal with supporting documents"
                  steps={['Confirm your registration details are current', 'Prepare your continuing education records', 'Submit your renewal before the deadline']}
                  requirements={renewalRequirements}
                  fee="BS$150"
                  feeDescription="annual nursing licence renewal"
                  primaryAction={{ label: 'Start licence renewal', href: portalPath('/register?type=renewal') }}
                  secondaryActions={[{ label: 'Submit continuing education records', href: portalPath('/login?next=%2Fnursing%2Feducation') }, { label: 'Verify your licence status', href: portalPath('/verify') }]}
                />

                <ServicePanel
                  title="License your nursing agency"
                  description="Operate a nursing agency in The Bahamas by meeting regulatory requirements and maintaining professional standards."
                  icon={Users}
                  imageSrc="/assets/services/agency-compliance.webp"
                  imageAlt="A nursing agency team reviewing records for a compliance assessment"
                  steps={['Review agency licensing requirements', 'Prepare policy and staff documents', 'Apply and complete the compliance review']}
                  requirements={agencyRequirements}
                  fee="BS$500"
                  feeDescription="annual nursing agency licence"
                  primaryAction={{ label: 'Begin agency licence application', href: '/contact' }}
                  secondaryActions={[{ label: 'Request licensing guidance', href: '/contact' }, { label: 'View compliance standards', href: '/committees' }]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div><p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Fees</p><h2 className="font-heading text-4xl font-bold text-council-dark md:text-5xl">Clear, transparent fees.</h2></div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">Review the current costs for registration, renewal, verification, and licensing services before you begin.</p>
            </div>
            <div className="mb-8 grid gap-px bg-slate-200 lg:grid-cols-4">
              {feeStructure.map((item, index) => (
                <article key={item.service} className={`p-6 ${item.service === 'Nursing Agency Licence' ? 'bg-council-primary text-white' : 'bg-gray-50 text-council-dark'}`}>
                  <span className={`mb-8 flex h-10 w-10 items-center justify-center rounded-full ${item.service === 'Nursing Agency Licence' ? 'bg-council-accent text-council-dark' : 'bg-white text-council-primary'}`}><DollarSign className="h-5 w-5" aria-hidden="true" /></span>
                  <p className={`mb-3 text-sm font-semibold uppercase tracking-wide ${item.service === 'Nursing Agency Licence' ? 'text-council-accent' : 'text-council-primary'}`}>0{index + 1}</p>
                  <h3 className="font-heading mb-5 text-xl font-bold">{item.service}</h3>
                  <p className={`mb-2 text-3xl font-bold ${item.service === 'Nursing Agency Licence' ? 'text-council-accent' : 'text-council-primary'}`}>{item.fee}</p>
                  <p className={item.service === 'Nursing Agency Licence' ? 'text-white/75' : 'text-gray-600'}>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-6 border-l-4 border-council-accent bg-gray-50 p-7 md:grid-cols-[auto_1fr] md:items-start"><DollarSign className="h-9 w-9 text-council-primary" aria-hidden="true" /><p className="leading-relaxed text-gray-700"><strong>Payment information:</strong> All fees are payable in Bahamian dollars. Payment methods include cash, certified cheque, or money order. Credit card payments may be accepted with additional processing fees.</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
