import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Medal as Award,
  Buildings as Building,
  CheckCircle,
  Shield,
  ShieldCheck,
  Star,
  Target,
  Users,
  Lightning as Zap,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

const timelineEvents = [
  { year: '1971', title: 'Nursing Council Established', description: 'The Nursing Council of the Bahamas was founded under the Nursing Act to regulate nursing practice throughout the Commonwealth.' },
  { year: '1980', title: 'First Nursing Standards', description: 'Implementation of comprehensive nursing practice standards and educational requirements for registration.' },
  { year: '1995', title: 'Continuing Education Requirements', description: 'Introduction of mandatory continuing education requirements for nursing licence renewal.' },
  { year: '2005', title: 'Digital Registration System', description: 'Launch of a computerized registration and licence management system to improve efficiency.' },
  { year: '2015', title: 'International Collaboration', description: 'Partnerships with regional nursing councils and international nursing organizations for best-practice sharing.' },
  { year: '2025', title: 'Modern Healthcare Standards', description: 'Updated practice standards reflecting modern healthcare delivery and emerging nursing specialties.' },
];

const councilMembers = [
  { role: 'Chairperson', description: 'Leads council meetings and represents the Council publicly.' },
  { role: 'Vice-Chairperson', description: 'Assists the Chairperson and chairs in their absence.' },
  { role: 'Secretary', description: 'Maintains official records and correspondence.' },
  { role: 'Treasurer', description: 'Oversees financial affairs and budget management.' },
  { role: 'Education Representative', description: 'Liaison with nursing education institutions.' },
  { role: 'Hospital Representative', description: 'Represents hospital-based nursing practice.' },
  { role: 'Community Health Representative', description: 'Represents community and public health nursing.' },
  { role: 'Private Practice Representative', description: 'Represents private sector nursing practice.' },
  { role: 'Government Representative', description: 'Liaison with Ministry of Health and government services.' },
  { role: 'Legal Advisor', description: 'Provides legal guidance on regulatory matters.' },
];

const values = [
  { icon: Shield, title: 'Professionalism', description: 'Maintaining the highest standards of professional conduct, ethics, and competence.' },
  { icon: CheckCircle, title: 'Integrity', description: 'Acting with honesty, transparency, and accountability in every regulatory activity.' },
  { icon: Star, title: 'Excellence', description: 'Pursuing continuous improvement in nursing education, practice, and regulation.' },
  { icon: Zap, title: 'Efficiency', description: 'Providing timely, effective, and accessible regulatory services.' },
];

const mandates = [
  'Register qualified nursing professionals and maintain the nursing register.',
  'Establish and enforce standards of nursing education and practice.',
  'Approve nursing education programs and continuing education requirements.',
  'Investigate complaints and conduct disciplinary proceedings when necessary.',
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden">
        <section className="relative isolate min-h-[560px] bg-council-primary text-white lg:min-h-[620px]">
          <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
            <Image
              src="/assets/nursing-ceremony-2.jpg"
              alt="Nurses gathered at a ceremony in The Bahamas"
              fill
              priority
              sizes="48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          </div>
          <div className="container relative mx-auto flex min-h-[560px] items-center px-4 py-20 lg:min-h-[620px]">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Established 1971
              </p>
              <h1 className="font-heading mb-7 text-5xl font-bold leading-[1.08] md:text-6xl lg:text-7xl">Protecting the public.<br />Advancing nursing.</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                The Nursing Council regulates nursing practice across the Commonwealth of The Bahamas, upholding the standards that strengthen our profession and protect every community we serve.
              </p>
            </div>
          </div>
          <div className="container absolute inset-x-0 bottom-0 mx-auto hidden px-4 lg:block">
            <div className="ml-auto w-[45%] bg-council-accent px-8 py-6 text-council-dark">
              <p className="text-4xl font-bold">50+ years</p>
              <p className="mt-1 font-medium">of guiding excellence in nursing practice</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Our purpose</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">A trusted standard for nursing in The Bahamas.</h2>
            </div>
            <div className="space-y-8">
              <p className="text-xl leading-relaxed text-gray-700">
                We safeguard the public through the regulation of nursing education, registration, and professional standards. Our work supports nurses throughout their professional journey and helps maintain safe, ethical care nationwide.
              </p>
              <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
                <div className="bg-white p-7"><Target className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" /><h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Our Mission</h3><p className="leading-relaxed text-gray-600">To regulate nursing practice through standards that protect the public, promote safe care, and advance the nursing profession.</p></div>
                <div className="bg-white p-7"><Award className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" /><h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Our Mandate</h3><p className="leading-relaxed text-gray-600">To provide accountable oversight of registration, education, conduct, and continuing professional development.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl"><p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />What we do</p><h2 className="font-heading text-4xl font-bold text-council-dark md:text-5xl">Our regulatory responsibilities</h2></div>
              <p className="max-w-md leading-relaxed text-gray-600">Clear standards and effective oversight help protect patients, nurses, and the integrity of the profession.</p>
            </div>
            <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2">
              {mandates.map((mandate, index) => (
                <div key={mandate} className="flex gap-5 bg-white p-8 transition-colors hover:bg-council-primary hover:text-white">
                  <span className="font-heading text-4xl font-bold text-council-accent">0{index + 1}</span>
                  <p className="max-w-md pt-2 text-lg leading-relaxed">{mandate}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto grid gap-14 px-4 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Our story</p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">Evolving with the profession.</h2>
              <p className="max-w-md leading-relaxed text-gray-600">From our founding in 1971 to today, the Council has evolved to meet the changing needs of healthcare and nursing practice in The Bahamas.</p>
            </div>
            <ol className="border-l-2 border-council-accent">
              {timelineEvents.map((event) => (
                <li key={event.year} className="relative grid gap-3 border-b border-slate-200 py-7 pl-8 last:border-b-0 md:grid-cols-[92px_1fr] md:gap-7">
                  <span className="absolute -left-[7px] top-9 h-3 w-3 rounded-full bg-council-primary ring-4 ring-white" />
                  <time className="font-heading text-xl font-bold text-council-primary">{event.year}</time>
                  <div><h3 className="font-heading mb-2 text-xl font-bold text-council-dark">{event.title}</h3><p className="leading-relaxed text-gray-600">{event.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div><p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent"><span className="h-px w-9 bg-council-accent" />Our principles</p><h2 className="font-heading text-4xl font-bold leading-tight md:text-5xl">The values behind every decision.</h2></div>
              <p className="max-w-xl text-lg leading-relaxed text-white/80">These principles guide our decisions, actions, and interactions as we fulfil our regulatory responsibilities.</p>
            </div>
            <div className="grid gap-px bg-white/20 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return <article key={value.title} className="bg-council-primary p-7"><Icon className="mb-8 h-9 w-9 text-council-accent" aria-hidden="true" /><h3 className="font-heading mb-3 text-2xl font-bold">{value.title}</h3><p className="leading-relaxed text-white/75">{value.description}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl"><p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Governance</p><h2 className="font-heading text-4xl font-bold text-council-dark md:text-5xl">A Council representing the profession.</h2></div>
              <Link href="/committees" className="inline-flex items-center gap-2 font-semibold text-council-primary hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">Explore our committees <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-5">
              {councilMembers.map((member, index) => (
                <article key={member.role} className="min-h-52 bg-white p-6 transition-colors hover:bg-gray-50"><span className="mb-10 block text-sm font-bold text-council-primary">{String(index + 1).padStart(2, '0')}</span><h3 className="font-heading mb-3 text-lg font-bold text-council-dark">{member.role}</h3><p className="text-sm leading-relaxed text-gray-600">{member.description}</p></article>
              ))}
            </div>
            <div className="mt-10 grid gap-6 border-l-4 border-council-accent bg-gray-50 p-8 md:grid-cols-[auto_1fr] md:items-start">
              <Building className="h-11 w-11 text-council-primary" aria-hidden="true" />
              <div><h3 className="font-heading mb-2 text-2xl font-bold text-council-dark">Council duties</h3><p className="max-w-4xl leading-relaxed text-gray-600">The Council meets quarterly to review registration applications, establish practice standards, oversee continuing education requirements, and address disciplinary matters to ensure the integrity of nursing practice in The Bahamas.</p></div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <ShieldCheck className="mx-auto mb-5 h-11 w-11 text-council-primary" aria-hidden="true" />
            <h2 className="font-heading mb-4 text-4xl font-bold text-council-dark">Ready to begin your nursing journey?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">Whether you are starting your nursing career or maintaining your professional licence, we are here to support you.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row"><Link href={portalPath('/register?type=registration')} className="inline-flex items-center justify-center gap-2 bg-council-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">Start registration <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/contact" className="inline-flex items-center justify-center border border-council-primary px-7 py-3 font-semibold text-council-primary transition-colors hover:bg-council-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">Contact us</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
