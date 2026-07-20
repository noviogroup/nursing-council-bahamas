import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarBlank as Calendar,
  CurrencyDollar as DollarSign,
  FileText as FileCheck,
  Gavel,
  GraduationCap,
  EnvelopeSimple as Mail,
  Phone,
  Shield,
  Users,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Committee = {
  id: string;
  name: string;
  icon: PhosphorIcon;
  description: string;
  responsibilities: string[];
  meetingSchedule: string;
  contactEmail: string;
  chairperson: string;
};

const committees: Committee[] = [
  { id: 'education', name: 'Education Committee', icon: GraduationCap, description: 'Oversees nursing education standards, curriculum approval, and educational institution accreditation throughout The Bahamas.', responsibilities: ['Review and approve nursing education programs', 'Establish educational standards and competencies', 'Monitor compliance with accreditation requirements', 'Evaluate continuing education providers and programs'], meetingSchedule: 'Quarterly', contactEmail: 'education@nursingcouncilbahamas.com', chairperson: 'Dr. Patricia Williams, RN, PhD' },
  { id: 'examination', name: 'Examination Committee', icon: FileCheck, description: 'Develops and oversees nursing competency examinations, ensures fair testing practices, and maintains examination standards.', responsibilities: ['Develop nursing licensing examination content', 'Review examination results and pass rates', 'Ensure examination security and integrity', 'Establish testing accommodations and policies'], meetingSchedule: 'Bi-monthly', contactEmail: 'examination@nursingcouncilbahamas.com', chairperson: 'Prof. Michael Thompson, RN, MSN' },
  { id: 'finance', name: 'Finance Committee', icon: DollarSign, description: 'Manages Council finances, oversees budgeting, and ensures responsible fiscal management of Council resources.', responsibilities: ['Prepare annual budgets and financial forecasts', 'Monitor Council expenditures and revenue', 'Review fee structures and payment policies', 'Oversee audit processes and financial reporting'], meetingSchedule: 'Monthly', contactEmail: 'finance@nursingcouncilbahamas.com', chairperson: 'Ms. Sandra Johnson, CPA, RN' },
  { id: 'registration', name: 'Registration Committee', icon: Users, description: 'Reviews registration applications, maintains the nursing register, and processes licensing matters.', responsibilities: ['Review nursing registration applications', 'Maintain accurate nursing register database', 'Process licence renewals and verifications', 'Handle registration appeals and special cases'], meetingSchedule: 'Bi-weekly', contactEmail: 'registration@nursingcouncilbahamas.com', chairperson: 'Mrs. Jennifer Davis, RN, BSN' },
  { id: 'standards-practice', name: 'Standards & Practice Committee', icon: Shield, description: 'Establishes nursing practice standards, develops professional guidelines, and ensures quality of nursing care.', responsibilities: ['Develop nursing practice standards and guidelines', 'Review scope of practice for nursing specialties', 'Address practice-related inquiries and concerns', 'Monitor healthcare trends and practice evolution'], meetingSchedule: 'Quarterly', contactEmail: 'standards@nursingcouncilbahamas.com', chairperson: 'Dr. Robert Clarke, RN, DNP' },
  { id: 'disciplinary', name: 'Disciplinary Committee', icon: Gavel, description: 'Investigates complaints against registered nurses and conducts disciplinary proceedings to protect public safety.', responsibilities: ['Investigate complaints against registered nurses', 'Conduct disciplinary hearings and proceedings', 'Determine appropriate sanctions and remedial actions', 'Ensure due process and fair treatment for all parties'], meetingSchedule: 'As needed', contactEmail: 'disciplinary@nursingcouncilbahamas.com', chairperson: 'Hon. Margaret Brown, JD, RN' },
];

export default function CommitteesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div><p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent"><span className="h-px w-10 bg-council-accent" />Governance & oversight</p><h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">Guiding the profession together.</h1><p className="max-w-2xl text-xl leading-relaxed text-white/85">Six specialized committees bring the expertise, accountability, and care that support nursing practice in The Bahamas.</p></div>
            <div className="border-l-4 border-council-accent bg-white/10 p-8"><p className="font-heading text-6xl font-bold text-council-accent">6</p><p className="mt-2 text-xl font-semibold">Specialized committees</p><p className="mt-3 leading-relaxed text-white/75">Working across education, registration, standards, finance, examinations, and professional conduct.</p></div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4"><div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Committee structure</p><h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">Six areas of focused expertise.</h2></div><p className="max-w-2xl text-lg leading-relaxed text-gray-600">Each committee guides Council decisions and helps maintain the highest standards of nursing practice, education, and regulation.</p></div>
            <nav className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3" aria-label="Committee quick links">{committees.map((committee, index) => { const Icon = committee.icon; return <Link key={committee.id} href={`#${committee.id}`} className="group bg-white p-7 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-council-primary"><div className="mb-9 flex items-start justify-between"><Icon className="h-8 w-8 text-council-primary" aria-hidden="true" /><span className="font-heading text-xl font-bold text-council-accent">0{index + 1}</span></div><h3 className="font-heading mb-2 text-xl font-bold text-council-dark">{committee.name}</h3><p className="mb-5 text-sm leading-relaxed text-gray-600">{committee.description}</p><span className="inline-flex items-center gap-2 text-sm font-semibold text-council-primary">Explore committee <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>; })}</nav>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4"><div className="mb-14 text-center"><p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Committee details</p><h2 className="font-heading mb-4 text-4xl font-bold text-council-dark md:text-5xl">Meet the work behind the standards.</h2><p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">Responsibilities, leadership, and meeting information for every Council committee.</p></div>
            <div className="mx-auto max-w-6xl space-y-6">{committees.map((committee, index) => { const Icon = committee.icon; return <article id={committee.id} key={committee.id} className="scroll-mt-8 bg-white shadow-sm"><div className="grid lg:grid-cols-[0.35fr_0.65fr]"><div className="bg-council-primary p-8 text-white lg:p-10"><div className="mb-12 flex items-start justify-between"><Icon className="h-10 w-10 text-council-accent" aria-hidden="true" /><span className="font-heading text-3xl font-bold text-council-accent">0{index + 1}</span></div><h3 className="font-heading mb-4 text-3xl font-bold leading-tight">{committee.name}</h3><p className="leading-relaxed text-white/80">{committee.description}</p></div><div className="p-8 lg:p-10"><div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]"><div><h4 className="font-heading mb-5 text-xl font-bold text-council-dark">Key responsibilities</h4><ul className="space-y-3">{committee.responsibilities.map((responsibility) => <li key={responsibility} className="flex gap-3 text-gray-700"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-council-accent" />{responsibility}</li>)}</ul></div><dl className="space-y-5 border-l-2 border-council-accent pl-5"><div><dt className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-council-primary"><Calendar className="h-4 w-4" aria-hidden="true" />Meeting schedule</dt><dd className="text-gray-700">{committee.meetingSchedule}</dd></div><div><dt className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-council-primary"><Users className="h-4 w-4" aria-hidden="true" />Chairperson</dt><dd className="text-gray-700">{committee.chairperson}</dd></div><div><dt className="mb-1 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-council-primary"><Mail className="h-4 w-4" aria-hidden="true" />Contact</dt><dd><a href={`mailto:${committee.contactEmail}`} className="break-all text-council-primary hover:underline">{committee.contactEmail}</a></dd></div></dl></div></div></div></article>; })}</div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white"><div className="container mx-auto px-4"><div className="mx-auto max-w-5xl text-center"><p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent"><span className="h-px w-9 bg-council-accent" />Public participation</p><h2 className="font-heading mb-5 text-4xl font-bold">Committee meeting information</h2><p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/85">Committee meetings are generally open to the public, with exceptions for confidential matters such as disciplinary proceedings.</p><div className="grid gap-px bg-white/20 md:grid-cols-3"><div className="bg-council-primary p-7"><Calendar className="mx-auto mb-4 h-8 w-8 text-council-accent" /><h3 className="font-heading mb-2 text-xl font-bold">Meeting Notices</h3><p className="text-white/75">Public meetings are announced at least 7 days in advance.</p></div><div className="bg-council-primary p-7"><Mail className="mx-auto mb-4 h-8 w-8 text-council-accent" /><h3 className="font-heading mb-2 text-xl font-bold">Meeting Minutes</h3><p className="text-white/75">Minutes are published within 2 weeks of each meeting.</p></div><div className="bg-council-primary p-7"><Phone className="mx-auto mb-4 h-8 w-8 text-council-accent" /><h3 className="font-heading mb-2 text-xl font-bold">Public Input</h3><p className="text-white/75">Public comment periods are included in regular meetings.</p></div></div><Link href="/contact" className="mt-10 inline-flex items-center gap-2 bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary">Contact Committee Services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>
      </main>
      <Footer />
    </>
  );
}
