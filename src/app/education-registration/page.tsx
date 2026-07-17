'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  DollarSign,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  Users,
  WalletCards,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

type ServicePanelProps = {
  title: string;
  description: string;
  icon: LucideIcon;
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
  steps,
  requirements,
  fee,
  feeDescription,
  primaryAction,
  secondaryActions,
}: ServicePanelProps) {
  return (
    <div className="overflow-hidden rounded-tl-[3.5rem] bg-council-primary shadow-xl lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <div className="p-7 text-white md:p-10 lg:p-12">
        <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
          <span className="h-px w-8 bg-council-accent" />
          Education & registration
        </p>
        <h2 className="font-heading mb-4 text-4xl font-bold leading-tight">{title}</h2>
        <p className="max-w-xl text-lg leading-relaxed text-white/85">{description}</p>

        <div className="mt-10 space-y-10">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-council-primary">
              <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading mb-3 text-2xl font-bold">How it works</h3>
              <ol className="space-y-2 text-white/90">
                {steps.map((step, index) => <li key={step} className="flex gap-3"><span className="font-semibold text-council-accent">0{index + 1}</span><span>{step}</span></li>)}
              </ol>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-council-primary">
              <FileCheck2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading mb-3 text-2xl font-bold">What you will need</h3>
              <ul className="space-y-2 text-white/90">
                {requirements.map((requirement) => <li key={requirement} className="flex gap-3"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-council-accent" aria-hidden="true" /><span>{requirement}</span></li>)}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-council-primary">
              <WalletCards className="h-6 w-6" aria-hidden="true" />
            </div>
            <div><h3 className="font-heading text-2xl font-bold">Fees</h3><p className="mt-2 text-lg text-white/90"><span className="font-bold text-council-accent">{fee}</span> — {feeDescription}</p></div>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-white p-5 md:p-8 lg:p-10">
        <div className="w-full rounded-2xl bg-gray-50 p-6 shadow-sm md:p-8">
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-council-primary text-white"><Icon className="h-7 w-7" aria-hidden="true" /></div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Online portal</p>
          <h3 className="font-heading mb-3 text-3xl font-bold text-council-dark">Ready to get started?</h3>
          <p className="mb-7 leading-relaxed text-gray-600">Use the secure Nursing Council portal to submit your application and manage your next steps.</p>
          <Link href={primaryAction.href} className="mb-3 flex min-h-14 w-full items-center justify-between rounded-md bg-council-primary px-5 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">
            {primaryAction.label}<ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <div className="mt-5 space-y-2 border-t border-slate-200 pt-5">
            {secondaryActions.map((action) => <Link key={action.label} href={action.href} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-council-primary transition-colors hover:border-council-primary hover:bg-council-primary/5 focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">{action.label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>)}
          </div>
        </div>
      </div>
    </div>
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

        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="register" className="mx-auto max-w-7xl">
              <TabsList className="mb-0 grid h-auto w-full grid-cols-3 gap-2 rounded-none bg-transparent p-0 md:mx-auto md:max-w-3xl">
                <TabsTrigger value="register" className="min-h-14 rounded-t-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-council-primary shadow-none data-[state=active]:border-council-primary data-[state=active]:bg-council-primary data-[state=active]:text-white data-[state=active]:shadow-none sm:text-base">First-Time Registration</TabsTrigger>
                <TabsTrigger value="renewal" className="min-h-14 rounded-t-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-council-primary shadow-none data-[state=active]:border-council-secondary data-[state=active]:bg-council-secondary data-[state=active]:text-white data-[state=active]:shadow-none sm:text-base">Renew Your Licence</TabsTrigger>
                <TabsTrigger value="agencies" className="min-h-14 rounded-t-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-council-primary shadow-none data-[state=active]:border-council-primary data-[state=active]:bg-council-primary data-[state=active]:text-white data-[state=active]:shadow-none sm:text-base">Nursing Agencies</TabsTrigger>
              </TabsList>

              <TabsContent value="register" className="mt-0">
                <ServicePanel
                  title="Start your nursing registration"
                  description="Take the first step toward nursing practice in The Bahamas with a clear, supported online application process."
                  icon={GraduationCap}
                  steps={['Review the registration requirements', 'Prepare your supporting documents', 'Submit your online application']}
                  requirements={registrationRequirements}
                  fee="BS$300"
                  feeDescription="initial nursing registration"
                  primaryAction={{ label: 'Start registration application', href: portalPath('/register?type=registration') }}
                  secondaryActions={[{ label: 'Apply for student indexing', href: portalPath('/register?type=indexing') }, { label: 'Apply for registration exam', href: portalPath('/register?type=exam') }]}
                />
              </TabsContent>

              <TabsContent value="renewal" className="mt-0">
                <ServicePanel
                  title="Renew your licence today"
                  description="Maintain your registration by completing your annual renewal requirements and continuing education obligations."
                  icon={ShieldCheck}
                  steps={['Confirm your registration details are current', 'Prepare your continuing education records', 'Submit your renewal before the deadline']}
                  requirements={renewalRequirements}
                  fee="BS$150"
                  feeDescription="annual nursing licence renewal"
                  primaryAction={{ label: 'Start licence renewal', href: portalPath('/register?type=renewal') }}
                  secondaryActions={[{ label: 'Submit continuing education records', href: portalPath('/login?next=%2Fnursing%2Feducation') }, { label: 'Verify your licence status', href: portalPath('/verify') }]}
                />
              </TabsContent>

              <TabsContent value="agencies" className="mt-0">
                <ServicePanel
                  title="License your nursing agency"
                  description="Operate a nursing agency in The Bahamas by meeting regulatory requirements and maintaining professional standards."
                  icon={Users}
                  steps={['Review agency licensing requirements', 'Prepare policy and staff documents', 'Apply and complete the compliance review']}
                  requirements={agencyRequirements}
                  fee="BS$500"
                  feeDescription="annual nursing agency licence"
                  primaryAction={{ label: 'Begin agency licence application', href: '/contact' }}
                  secondaryActions={[{ label: 'Request licensing guidance', href: '/contact' }, { label: 'View compliance standards', href: '/committees' }]}
                />
              </TabsContent>
            </Tabs>
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
