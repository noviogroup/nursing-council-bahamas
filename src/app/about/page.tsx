import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Medal as Award,
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
    year: '1993',
    title: 'Agency Regulations Added',
    description:
      'Agency regulations strengthened the Council framework for nursing agency oversight and regulatory requirements.',
  },
  {
    year: '2023',
    title: 'Modern Act Passed',
    description:
      'The Nurses and Midwives Act, 2023 repealed the 1971 Act. The Council is guided by the 2023 Act and continues to apply the 1971 Regulations until new regulations are passed.',
  },
];

const foundingMembers = [
  { name: 'Ms. Hilda Bowen', role: 'Chairperson' },
  { name: 'Mrs. Ironaca Morris', role: 'Secretary elect' },
  { name: 'Mrs. Dorothy Philips', role: 'Treasurer elect' },
  { name: 'Mrs. Ophelia Munnings', role: 'Member' },
  { name: 'Mrs. Brendel Cox', role: 'Member' },
  { name: 'Mr. T. G. Glover', role: 'Member' },
  { name: 'Dr. Kirkland Culmer', role: 'Member' },
  { name: 'Mrs. Eloise Penn', role: 'Member' },
  { name: 'Ms. Sylvia Davis', role: 'Member' },
  { name: 'Mrs. Ruby Nottage', role: 'Member' },
];

const governanceGroups = [
  {
    seats: '1 seat',
    title: 'Nursing leadership',
    roles: ['Director of Nursing, serving ex officio'],
  },
  {
    seats: '6 seats',
    title: 'Nursing representation',
    roles: [
      'Four nurses from different categories, including a nursing educator and advanced practice nurse',
      'Two nurses nominated by the Nurses Association of The Commonwealth of The Bahamas',
    ],
  },
  {
    seats: '2 seats',
    title: 'Professional partners',
    roles: ['One Midwives Association nominee', 'One Medical Association nominee'],
  },
  {
    seats: '2 seats',
    title: 'Legal and education appointments',
    roles: [
      'One Legal Counsel/Attorney nominated by the Minister, with at least ten years standing at The Bahamas Bar',
      'One Minister of Education nominee',
    ],
  },
];

const administrationRoles = [
  {
    title: 'Registrar',
    description: 'Leads Council administration and supports the Council’s statutory and operational work.',
  },
  {
    title: 'Deputy Registrar',
    description: 'Supports the Registrar and continuity of Council administration.',
  },
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
              src="/assets/approved/nursing-image-card-1.webp"
              alt="Nurses gathered at a formal ceremony in The Bahamas"
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
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                <span className="h-px w-9 bg-council-accent" />
                Our mandate
              </p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                Mandate and guiding statements.
              </h2>
              </div>
              <p className="text-xl leading-relaxed text-gray-700">
                The Council's mandate is to develop and execute regulations and byelaws that govern the education and practice of nurses and midwives in accordance with the Nurses and Midwives Act and subsidiary regulations.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-7">
                <Target className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Mission</h3>
                <p className="leading-relaxed text-gray-600">
                  Protect the public through the enforcement of quality nursing education, training, and practice across the Commonwealth of The Bahamas.
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

          <div className="container mx-auto mt-16 px-4">
            <div className="overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="bg-council-primary p-4 md:p-6">
                  <figure className="overflow-hidden rounded-[4px] bg-white">
                    <div className="relative aspect-[16/10] bg-gray-100">
                      <Image
                        src="/assets/history/council-seal-presentation-group.jpg"
                        alt="Council representatives gathered with a historical Nursing Council seal presentation"
                        fill
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="border-t border-slate-200 p-4 text-sm text-gray-600">
                      Council representatives pictured with historical Council imagery and the Nursing Council seal.
                    </figcaption>
                  </figure>

                  <div className="mt-4 grid gap-4 sm:grid-cols-[0.78fr_1fr]">
                    <figure className="rounded-[4px] bg-white p-4">
                      <div className="relative aspect-[4/5]">
                        <Image
                          src="/assets/history/seal-presentation.png"
                          alt="Historical photo of the Council seal presentation"
                          fill
                          sizes="(min-width: 1024px) 16vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                    </figure>
                    <div className="rounded-[4px] bg-white p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Founding Council</p>
                      <p className="mt-5 font-heading text-5xl font-bold text-council-primary">10</p>
                      <p className="mt-2 text-sm font-medium text-gray-600">founding Council members</p>
                      <div className="mt-5 border-t border-slate-200 pt-5">
                        <p className="font-heading text-2xl font-bold text-council-dark">1972</p>
                        <p className="mt-1 text-sm text-gray-600">Council established with a public-protection mandate.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                    <span className="h-px w-9 bg-council-accent" />
                    Founding members
                  </p>
                  <h3 className="font-heading mb-5 text-3xl font-bold text-council-dark md:text-4xl">
                    The founding Council members.
                  </h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                    The first appointed Council brought together leaders across nursing, medicine, and public service to regulate education, registration, practice, and discipline.
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
                    Historical administration record: Mrs. Beverly Ford served as Registrar and is not listed as a Council member.
                  </p>

                  <div className="mt-8 space-y-3 md:hidden">
                    {foundingMembers.map((member, index) => (
                      <div key={member.name} className="grid grid-cols-[3rem_1fr] gap-4 rounded-[4px] border border-slate-200 bg-white p-4">
                        <span className="font-heading text-sm font-bold text-council-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="font-semibold text-council-dark">{member.name}</p>
                          <p className="mt-1 text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 hidden overflow-hidden rounded-[4px] border border-slate-200 md:block">
                    <table className="w-full text-left">
                      <caption className="sr-only">Founding Council members of the Nursing Council</caption>
                      <thead className="bg-council-primary text-white">
                        <tr>
                          <th scope="col" className="w-16 px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-council-accent">No.</th>
                          <th scope="col" className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em]">Name</th>
                          <th scope="col" className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em]">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {foundingMembers.map((member, index) => (
                          <tr key={member.name} className="transition-colors hover:bg-gray-50">
                            <td className="px-4 py-4 align-top font-heading text-sm font-bold text-council-primary">
                              {String(index + 1).padStart(2, '0')}
                            </td>
                            <td className="px-4 py-4 align-top font-semibold text-council-dark">{member.name}</td>
                            <td className="px-4 py-4 align-top text-sm text-gray-600">{member.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Governance / Council Members
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Council composition under the 2023 Act.
                </h2>
              </div>
              <div className="max-w-3xl">
                <p className="text-lg leading-relaxed text-gray-600">
                  The First Schedule of the Nurses and Midwives Act, 2023 establishes an eleven-member Council appointed by the Minister, with representation across nursing, midwifery, medicine, Legal Counsel/Attorney, and education.
                </p>
                <Link href="/committees" className="mt-6 inline-flex items-center gap-2 rounded-[4px] bg-council-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                  Explore committees
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mx-auto max-w-5xl" aria-label="Statutory Council hierarchy">
              <article className="rounded-[4px] bg-council-primary p-7 text-white shadow-sm md:p-8">
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-white/25 bg-white/10">
                    <Users className="h-7 w-7 text-council-accent" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Statutory body</p>
                </div>
                <h3 className="font-heading text-3xl font-bold">The Nursing Council</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-white/80">
                  Eleven statutory members bring nursing leadership, professional expertise, legal counsel, and education representation into one Council.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-white/70">
                  Source: Nurses and Midwives Act, 2023, First Schedule, Constitution and Procedure of the Council.
                </p>
              </article>

              <div className="mx-auto hidden h-12 w-px bg-council-primary lg:block" aria-hidden="true" />
              <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                Representation on the Council
              </p>

              <div className="grid gap-px overflow-hidden rounded-[4px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
                {governanceGroups.map((group) => (
                  <article key={group.title} className="border-t-4 border-council-primary bg-white p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">{group.seats}</p>
                    <h3 className="font-heading mt-4 text-xl font-bold text-council-dark">{group.title}</h3>
                    <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5">
                      {group.roles.map((role) => (
                        <li key={role} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-council-accent" aria-hidden="true" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-slate-200 bg-slate-200 lg:grid-cols-2">
                <article className="bg-white p-7 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Council Members</p>
                  <h3 className="font-heading mt-4 text-3xl font-bold text-council-dark">Current appointments</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-gray-600">
                    Confirmed names, official titles, appointment terms, and consistent professional photographs will be published once they are supplied and approved by the Council.
                  </p>
                </article>
                <article className="bg-council-primary p-7 text-white md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Administration</p>
                  <h3 className="font-heading mt-4 text-3xl font-bold">Office of the Registrar</h3>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {administrationRoles.map((role) => (
                      <div key={role.title} className="border-t border-white/25 pt-4">
                        <h4 className="font-heading text-xl font-bold text-council-accent">{role.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/80">{role.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-white/70">General support staff are not publicly listed.</p>
                </article>
              </div>
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

      </main>
      <Footer />
    </>
  );
}
