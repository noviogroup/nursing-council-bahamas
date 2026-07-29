import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Medal as Award,
  Buildings as Building,
  CheckCircle,
  FileText,
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
  {
    year: '1971',
    title: 'Nurses and Midwives Act Passed',
    description:
      'With the repeal of the Midwives Ordinances of 1936, the Nurses and Midwives Act, 1971 became the statutory instrument for regulating nursing and midwifery education and practice in The Bahamas.',
  },
  {
    year: 'Jan 1972',
    title: 'Council Established',
    description:
      'The Nursing Council was established by the Minister of Health with a public-protection mandate to supervise nurses and midwives practising in the country.',
  },
  {
    year: '1972',
    title: 'First Regulations Approved',
    description:
      'The first regulations formulated by the Council were approved by the Minister of Health and passed as law in the House of Parliament.',
  },
  {
    year: '2023',
    title: 'Modern Act Awaiting Full Force',
    description:
      'The Nurses and Midwives Act, 2023 repealed the 1971 Act, but the Council continues to be guided by the 1971 Act until all components of the 2023 Act are brought fully into force.',
  },
];

const foundingMembers = [
  'Ms. Hilda Bowen, Chairperson',
  'Mrs. Ironaca Morris, Secretary elect',
  'Mrs. Dorothy Philips, Treasurer elect',
  'Mrs. Ophelia Munnings',
  'Mrs. Brendel Cox',
  'Mr. T. G. Glover',
  'Dr. Kirkland Culmer',
  'Mrs. Eloise Penn',
  'Ms. Sylvia Davis',
  'Mrs. Ruby Nottage',
  'Mrs. Beverly Ford, Registrar',
];

const councilRoles = [
  'Chairperson',
  'Deputy Chairperson',
  'Registrar',
  'Deputy Registrar',
  'Representative from Nursing Association',
  'Representative from Medical Association',
  'Representative from Midwives Association',
  'Representative from Ministry of Education',
  'Member',
];

const values = [
  {
    icon: Shield,
    title: 'Professionalism',
    description:
      'The Council upholds ethical principles and conducts business with utmost professionalism. Council matters are kept confidential and disclosed only to appropriate stakeholders as required.',
  },
  {
    icon: CheckCircle,
    title: 'Integrity',
    description:
      'The Council conducts its business guided by honesty, fairness, and respect, operating on reliable evidence for the best possible outcome.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description:
      'The Council is committed to high-quality standards, advancement, and sustainability of evidence-informed nursing and midwifery practice.',
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description:
      'The Council keeps current with national, regional, and global standards and makes every effort to respond quickly to questions, concerns, and requests.',
  },
];

const councilFunctions = [
  'Maintain the nursing register and licence qualified professionals',
  'Set standards for nursing education and professional practice',
  'Control education, training, and practice of nurses and midwives',
  'Enforce quality nursing education, training, and practice',
];

const ethicsElements = [
  {
    icon: Users,
    title: 'Trustworthy Patient-Centred Care',
    description:
      'Nurses are expected to respect dignity, culture, privacy, informed decision-making, confidentiality, and equitable access to care.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Practice Environments',
    description:
      'The Code emphasizes competent practice, safe delegation, lifelong learning, appropriate use of technology, and action when care is at risk.',
  },
  {
    icon: Star,
    title: 'A Respected Profession',
    description:
      'Nurses must uphold honesty, integrity, compassion, professional conduct, public trust, and responsible conduct in person and online.',
  },
  {
    icon: Zap,
    title: 'Health and Wellbeing',
    description:
      'The Code calls nurses to support public health, emergency readiness, mental wellness, health equity, sustainability, and community collaboration.',
  },
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
                Established 1972
              </p>
              <h1 className="font-heading mb-7 text-5xl font-bold leading-[1.08] md:text-6xl lg:text-7xl">
                Protecting the public.
                <br />
                Advancing nursing.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                To protect the public through the enforcement of quality nursing education, training, and practice.
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
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                <span className="h-px w-9 bg-council-accent" />
                Our mandate
              </p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                The legal framework for nursing and midwifery practice.
              </h2>
            </div>
            <div className="space-y-8">
              <p className="text-xl leading-relaxed text-gray-700">
                Develop and execute regulations and byelaws to govern the education and practice of nurses and midwives in accordance with the Nurses and Midwives Act and Subsidiary Regulations.
              </p>
              <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2">
                <div className="bg-white p-7">
                  <Target className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                  <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Mission</h3>
                  <p className="leading-relaxed text-gray-600">
                    Provide the legal framework to control education, training, and practice of nurses and midwives in the Commonwealth of The Bahamas.
                  </p>
                </div>
                <div className="bg-white p-7">
                  <Award className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                  <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Standards</h3>
                  <p className="leading-relaxed text-gray-600">
                    Establish and monitor standards of professional nursing and midwifery through ongoing collaboration with statutory accreditation bodies, nursing schools, and health professionals.
                  </p>
                </div>
                <div className="bg-white p-7">
                  <Star className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                  <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Vision</h3>
                  <p className="leading-relaxed text-gray-600">
                    A trusted, responsive Council that advances public confidence in nursing and midwifery practice across The Bahamas.
                  </p>
                </div>
                <div className="bg-white p-7">
                  <FileText className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                  <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Code of Ethics</h3>
                  <p className="leading-relaxed text-gray-600">
                    The 2025 Code provides the ethical framework for nurses and midwives across care, education, administration, research, and professional practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  The Council works to
                </p>
                <h2 className="font-heading text-4xl font-bold text-council-dark md:text-5xl">
                  Maintain standards that protect the public.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                The Council regulates nursing and midwifery education, registration, licensure, and professional standards practice across the Commonwealth of The Bahamas.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 md:grid-cols-2">
              {councilFunctions.map((item, index) => (
                <div key={item} className="flex gap-5 bg-white p-8 transition-colors hover:bg-council-primary hover:text-white">
                  <span className="font-heading text-4xl font-bold text-council-accent">0{index + 1}</span>
                  <p className="max-w-md pt-2 text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                  <span className="h-px w-9 bg-council-accent" />
                  Code of ethics
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight md:text-5xl">
                  Ethical guidance for nursing practice.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-white/80">
                Revised in February 2025, the Code of Ethics guides ethical decision-making, accountability, professionalism, and safe care for nurses, midwives, students, educators, administrators, and researchers.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm bg-white/20 md:grid-cols-2 xl:grid-cols-4">
              {ethicsElements.map((element) => {
                const Icon = element.icon;
                return (
                  <article key={element.title} className="bg-council-primary p-7">
                    <Icon className="mb-8 h-9 w-9 text-council-accent" aria-hidden="true" />
                    <h3 className="font-heading mb-3 text-2xl font-bold">{element.title}</h3>
                    <p className="leading-relaxed text-white/75">{element.description}</p>
                  </article>
                );
              })}
            </div>
            <Link
              href="/documents/code-of-ethics-for-nurses-2025.pdf"
              className="mt-10 inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
            >
              View Code of Ethics
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto grid gap-14 px-4 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                <span className="h-px w-9 bg-council-accent" />
                Our story
              </p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                A statutory Council rooted in public protection.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                The basis on which the Council was created remains the reason for its operation to date: protecting citizens and all who require health care services within the country.
              </p>
            </div>
            <ol className="border-l-2 border-council-accent">
              {timelineEvents.map((event) => (
                <li key={`${event.year}-${event.title}`} className="relative grid gap-3 border-b border-slate-200 py-7 pl-8 last:border-b-0 md:grid-cols-[112px_1fr] md:gap-7">
                  <span className="absolute -left-[7px] top-9 h-3 w-3 rounded-full bg-council-primary ring-4 ring-white" />
                  <time className="font-heading text-xl font-bold text-council-primary">{event.year}</time>
                  <div>
                    <h3 className="font-heading mb-2 text-xl font-bold text-council-dark">{event.title}</h3>
                    <p className="leading-relaxed text-gray-600">{event.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="container mx-auto mt-16 grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/5] bg-gray-100">
                <Image
                  src="/assets/history/first-council-members.png"
                  alt="Historical page showing the first Nursing Council members"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
              <p className="border-t border-slate-200 p-4 text-sm text-gray-600">
                Founding Council members from Bird's Eye View of Nurses: Footprint by Hilda V. Bowen, M.B.E.
              </p>
            </div>
            <div>
              <h3 className="font-heading mb-5 text-3xl font-bold text-council-dark">Founding members</h3>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                The first appointed Council brought together leaders across nursing, medicine, and public service to regulate education, registration, practice, and discipline.
              </p>
              <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2">
                {foundingMembers.map((member) => (
                  <div key={member} className="bg-white p-4 text-sm font-medium text-council-dark">
                    {member}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="container mx-auto mt-16 px-4">
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-council-primary p-8 text-white md:p-10">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Common Seal of the Council</p>
                <h3 className="font-heading mb-5 text-3xl font-bold">Healing hands, the conch shell, and the flame.</h3>
                <p className="leading-relaxed text-white/82">
                  The Common Seal was designed in 1971 by Student Nurse Dorothy Hepburn nee Morris. The hands represent healing hands and compassionate care, the conch shell represents The Bahamas, and the flame signifies Florence Nightingale.
                </p>
              </div>
              <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
                <figure className="bg-white p-5">
                  <div className="relative aspect-[4/5]">
                    <Image src="/assets/history/seal-presentation.png" alt="Historical photo of the Council seal presentation" fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-contain" />
                  </div>
                  <figcaption className="mt-4 text-sm text-gray-600">Seal presentation to the first Chairman of the Council.</figcaption>
                </figure>
                <figure className="bg-white p-5">
                  <div className="relative aspect-square">
                    <Image src="/assets/history/nursing-council-seal.png" alt="Historical Nursing Council seal illustration" fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-contain" />
                  </div>
                  <figcaption className="mt-4 text-sm text-gray-600">The seal incorporated into the Nursing Council pin.</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Governance
                </p>
                <h2 className="font-heading text-4xl font-bold text-council-dark md:text-5xl">
                  A Council representing the profession.
                </h2>
              </div>
              <Link href="/committees" className="inline-flex items-center gap-2 font-semibold text-council-primary hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                Explore committees
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mb-10 grid gap-6 rounded-sm border border-slate-200 bg-white p-7 md:grid-cols-[auto_1fr] md:items-start">
              <Building className="h-11 w-11 text-council-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Council members</h3>
                <p className="leading-relaxed text-gray-600">
                  The Council consists of 10 appointed members: five selected by the Minister, three nominated by the Nurses' Association, one nominated by the Minister of Education, and one registered medical practitioner selected by the Minister in association with the Medical Association.
                </p>
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {councilRoles.map((role, index) => (
                <article key={role} className="min-h-44 bg-white p-6 transition-colors hover:bg-gray-50">
                  <span className="mb-8 block text-sm font-bold text-council-primary">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-heading text-lg font-bold text-council-dark">{role}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                  <span className="h-px w-9 bg-council-accent" />
                  Our principles
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight md:text-5xl">
                  Our core values.
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-white/80">
                These values guide Council decisions, regulatory activities, and interactions with nursing and midwifery personnel and the public.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm bg-white/20 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="bg-council-primary p-7">
                    <Icon className="mb-8 h-9 w-9 text-council-accent" aria-hidden="true" />
                    <h3 className="font-heading mb-3 text-2xl font-bold">{value.title}</h3>
                    <p className="leading-relaxed text-white/75">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <ShieldCheck className="mx-auto mb-5 h-11 w-11 text-council-primary" aria-hidden="true" />
            <h2 className="font-heading mb-4 text-4xl font-bold text-council-dark">Ready to begin your nursing journey?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
              Whether you are starting your nursing career or maintaining your professional licence, the Council provides the regulatory pathway.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={portalPath('/register?type=registration')} className="inline-flex items-center justify-center gap-2 rounded-sm bg-council-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                Start registration
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-sm border border-council-primary px-7 py-3 font-semibold text-council-primary transition-colors hover:bg-council-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
