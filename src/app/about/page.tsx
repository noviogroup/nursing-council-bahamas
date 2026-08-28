import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
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

const pastChairpersons = [
  { name: 'Ms. Hilda Bowen', period: '1972 - 1976' },
  { name: 'Mrs. Dorothy Phillips', period: '1977' },
  { name: 'Ms. Hilda Bowen', period: '1978 - 1983' },
  { name: 'Mrs. Ironaca Morris-Baker', period: '1984 - 1992' },
  { name: 'Mrs. Castella Bowleg', period: '1993 - 1996' },
  { name: 'Mrs. Beverley Ford', period: '1997 - 1999' },
  { name: 'Mr. Andil LaRoda', period: '2000' },
  { name: 'Mrs. Jacqueline Dean', period: '2001 - 2003' },
  { name: 'Mrs. Philabertha Carter', period: '2004 - 2007' },
  { name: 'Ms. Ivy Wilson', period: '2007 - 2008' },
  { name: 'Mrs. Maggie Turner', period: '2008 - 2011' },
  { name: 'Mrs. Coral Dean', period: '2011 - 2013' },
  { name: 'Mrs. Gwendolyn Brice-Sealy', period: '2013 - 2014' },
  { name: 'Carol Markey' },
  { name: 'Patricia Newbold' },
  { name: 'Patricia Brown' },
  { name: 'Ferneka Deleveaux' },
];

const pastRegistrars = [
  { name: 'Mrs. Theda Godet', period: 'Service period to be confirmed' },
  { name: 'Ms. Mary Johnson', period: '2010 - 2022' },
  { name: 'Mrs. Ruth Albury', period: '2022 - Present' },
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
    seats: '1 seat',
    title: 'Legal Counsel/Attorney',
    roles: ['One Legal Counsel/Attorney nominated by the Minister, with at least ten years standing at The Bahamas Bar'],
  },
  {
    seats: '1 seat',
    title: 'Education appointment',
    roles: ['One Minister of Education nominee'],
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

const currentBoardMembers = [
  { name: 'Ferneka Deleveaux', role: 'Chairperson' },
  { name: 'Tamica Knowles', role: 'Deputy Chairperson' },
  { name: 'Ms. Genevieve Bowe', role: 'Director of Nursing (Ex-officio)' },
  { name: 'Ms. Vanria Jack', role: 'Ministry of Education' },
  { name: 'Ms. Morlette Johnson', role: 'Legal Counsel/Attorney' },
  { name: 'Ms. Andrea Nottage', role: 'Midwives Association' },
  { name: 'Ms. Jen Rolle', role: 'Nurses Association' },
  { name: 'Ms. Tandra Longley', role: 'Nurses Association' },
  { name: 'Ms. Valencia Rolle', role: 'Nurses Association' },
  { name: 'Ms. Shirley Bain', role: 'Other (Nursing)' },
  { name: 'Vacant', role: 'Medical Practitioner', vacant: true },
];

const values = [
  {
    icon: Shield,
    title: 'Professionalism',
    description:
      'The Nursing Council upholds ethical principles and conducts its business with utmost objectivity and confidentiality.',
  },
  {
    icon: CheckCircle,
    title: 'Integrity',
    description:
      'The Nursing Council is guided by honesty, fairness and respect.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description:
      'The Nursing Council is committed to maintaining high standards and ensuring the advancement of evidence-informed nursing and midwifery practice.',
  },
  {
    icon: Zap,
    title: 'Responsiveness',
    description:
      'The Nursing Council acts promptly and efficiently to address requests and matters of concern in a timely manner and provide feedback.',
  },
];

const councilFunctionGroups = [
  {
    title: 'Standards, education and practice',
    meaning: 'Sets the foundation for safe, consistent nursing and midwifery practice in The Bahamas.',
    functions: [
      'Establish qualifications and standards for the education, training and practice of nursing personnel.',
      'Control education, training, practice, registration or enrollment, and licensing of nursing personnel.',
      'Monitor education, training and practice in nursing and midwifery.',
    ],
    statutoryFunctions: [
      { reference: '8(a)', text: 'Establish the qualifications, standards of education, training and practice for nursing personnel.' },
      { reference: '8(b)', text: 'Control the education, training, practice, registration or enrollment, and licensing of nursing personnel.' },
      { reference: '8(c)', text: 'Monitor education, training and practice in nursing and midwifery.' },
    ],
  },
  {
    title: 'Public interest and professional conduct',
    meaning: 'Places people receiving care first while safeguarding public confidence in the profession.',
    functions: [
      'Treat the health and well-being of persons who require nursing or midwifery services as paramount.',
      'Consider the interests of nursing personnel and other professions referred to under the Act.',
      'Ensure that standards of professional conduct are followed by nursing personnel.',
    ],
    statutoryFunctions: [
      { reference: '8(d)', text: 'Consider the health and well-being of persons who require nursing or midwifery services as paramount.' },
      { reference: '8(e)', text: 'Consider the interests of licensed practical nurses, registered nurses, student midwives, midwives and advanced practice nurses, and any other profession referred to under the Act.' },
      { reference: '8(f)', text: 'Ensure that standards of professional conduct are adhered to by nurse interns, licensed practical nurses, registered nurses, student midwives, midwives and advanced practice nurses.' },
    ],
  },
  {
    title: 'Competence and professional development',
    meaning: 'Keeps nursing personnel competent and current throughout their professional practice.',
    functions: [
      'Ensure continuing professional development and competency in nursing and midwifery practice.',
      'Determine continuing professional development credits and requirements for nursing personnel.',
      'Prescribe codes of conduct for nursing personnel.',
    ],
    statutoryFunctions: [
      { reference: '8(g)', text: 'Ensure continuing professional development of nursing personnel in the practice of nursing, and competency in the practice of nursing and midwifery.' },
      { reference: '8(h)', text: 'Determine continuing professional development credits and requirements for nursing personnel.' },
      { reference: '8(i)', text: 'Prescribe codes of conduct for nursing personnel.' },
    ],
  },
  {
    title: 'Partnerships and assistive personnel',
    meaning: 'Connects the Council with the organisations and people that support safe nursing care.',
    functions: [
      'Collaborate with employers, training institutions, and national, regional and international professional and regulatory bodies.',
      'Control the training and practice of Unlicensed Assistive Personnel and determine their continuing education requirements.',
      'Consider the interests of Unlicensed Assistive Personnel, nursing students and nurse interns.',
    ],
    statutoryFunctions: [
      { reference: '8(j)', text: 'Collaborate with employers of nursing personnel, educational institutions that provide training for nursing personnel, and national, regional and international professional and regulatory bodies.' },
      { reference: '8(k)', text: 'Control the training and practice of Unlicensed Assistive Personnel.' },
      { reference: '8(l)', text: 'Determine continuing education requirements for Unlicensed Assistive Personnel.' },
      { reference: '8(m)', text: 'Consider the interests of Unlicensed Assistive Personnel, nursing students and nurse interns.' },
    ],
  },
  {
    title: 'Agencies, registration and authorisation',
    meaning: 'Provides the formal routes for recognition, licensing, authorisation and agency oversight.',
    functions: [
      'Set standards for, regulate and monitor nursing agencies.',
      'Grant certificates of enrollment or registration and licences to nursing personnel, and issue authorisation letters to nurse interns.',
      'Record Unlicensed Assistive Personnel and grant registration certificates and licences to nursing agencies.',
    ],
    statutoryFunctions: [
      { reference: '8(n)', text: 'Establish the standards, and regulate and monitor the operations, of nursing agencies.' },
      { reference: '8(o)', text: 'Grant certificates of enrollment or registration, and licences to nursing personnel.' },
      { reference: '8(p)', text: 'Issue letters of authorisation to nurse interns.' },
      { reference: '8(q)', text: 'Record Unlicensed Assistive Personnel.' },
      { reference: '8(r)', text: 'Grant certificates of registration, and licences to nursing agencies.' },
    ],
  },
  {
    title: 'Records, oversight and advice',
    meaning: 'Maintains accountable records, investigates concerns and supports national health policy.',
    functions: [
      'Maintain an electronic database of enrollment or registration, licensure, location and professional activities of nursing personnel.',
      'Investigate professional conduct or competence, the conduct of Unlicensed Assistive Personnel, and the operations of nursing agencies.',
      'Advise the Minister on matters under the Act and carry out any other function conferred by it.',
    ],
    statutoryFunctions: [
      { reference: '8(s)', text: 'Maintain an electronic database on the enrollment or registration, licence, location, professional activities of nursing personnel and any other information as determined by the Council.' },
      { reference: '8(t)', text: 'Investigate professional conduct, or the competency, of nursing personnel to practise nursing and midwifery.' },
      { reference: '8(u)', text: 'Investigate the conduct of Unlicensed Assistive Personnel.' },
      { reference: '8(v)', text: 'Investigate the operations of nursing agencies.' },
      { reference: '8(w)', text: 'Advise the Minister on matters pertaining to the Act.' },
      { reference: '8(x)', text: 'Carry out any other function conferred on the Council under the Act.' },
    ],
  },
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
      <main className="flex-1">
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
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 md:grid-cols-3">
              <div className="bg-white p-7">
                <Star className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Vision</h3>
                <p className="leading-relaxed text-gray-600">
                  To protect the public through the enforcement of quality nursing education, training, and practice.
                </p>
              </div>
              <div className="bg-white p-7">
                <Target className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Mission</h3>
                <p className="leading-relaxed text-gray-600">
                  Provide the legal framework to control education, training and practice of Nurses and Midwives in the Commonwealth of The Bahamas. Establish and monitor the standards of professional Nursing and Midwifery through on-going collaboration with statutory accreditation body, Nursing Schools, and Health Professionals.
                </p>
              </div>
              <div className="bg-white p-7">
                <ShieldCheck className="mb-5 h-9 w-9 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Core Values</h3>
                <p className="leading-relaxed text-gray-600">
                  Professionalism, Integrity, Excellence, and Responsiveness guide the Council&apos;s decisions, service, and public-protection work.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="bg-white p-6">
                    <Icon className="mb-5 h-8 w-8 text-council-primary" aria-hidden="true" />
                    <h3 className="font-heading text-xl font-bold text-council-dark">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Current Board Appointments
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  The Council&apos;s current leadership.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Current Council appointments supplied by the Nursing Council, including the vacant Medical Practitioner seat.
              </p>
            </div>

            <div className="mx-auto max-w-5xl overflow-hidden rounded-sm border border-slate-200 bg-white">
              <div className="max-h-[38rem] divide-y divide-slate-200 overflow-y-auto" aria-label="Current Board appointments">
                {currentBoardMembers.map((member, index) => (
                  <article key={`${member.role}-${member.name}`} className="grid gap-3 bg-white px-5 py-5 transition-colors hover:bg-gray-50 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(12rem,0.8fr)] sm:items-center sm:gap-5 sm:px-6">
                    <span className="font-heading text-sm font-bold text-council-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-council-dark">{member.name}</h3>
                    <p className="border-l-2 border-council-accent pl-3 text-sm font-semibold text-gray-600">{member.role}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="mx-auto mt-8 max-w-5xl rounded-sm border border-slate-200 bg-gray-50 p-7 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Administration</p>
              <h3 className="font-heading mt-4 text-3xl font-bold text-council-dark">Office of the Registrar</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {administrationRoles.map((role) => (
                  <div key={role.title} className="border-t border-slate-200 pt-4">
                    <h4 className="font-heading text-xl font-bold text-council-primary">{role.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{role.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Section 8 of the Act
                </p>
                <h2 className="font-heading text-4xl font-bold text-council-dark md:text-5xl">
                  Functions of the Council.
                </h2>
                <p className="mt-4 inline-flex border border-council-primary/20 bg-white px-3 py-2 text-sm font-semibold text-council-primary">
                  24 statutory functions
                </p>
              </div>
              <div className="max-w-2xl">
                <p className="text-lg leading-relaxed text-gray-600">
                  The Nurses and Midwives Act, 2023 sets out the Council&apos;s functions. They span public protection, professional standards, registration, enrollment, education, agencies, Unlicensed Assistive Personnel, investigations, and statutory advice.
                </p>
                <Link
                  href="/documents/nurses-and-midwives-act-2023.pdf"
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-council-primary transition-colors hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4"
                >
                  Read the Nurses and Midwives Act, 2023
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 md:grid-cols-2 xl:grid-cols-3">
              {councilFunctionGroups.map((group, index) => (
                <article key={group.title} className="bg-white p-7 md:p-8">
                  <span className="font-heading text-2xl font-bold text-council-accent">0{index + 1}</span>
                  <h3 className="font-heading mt-5 min-h-16 text-2xl font-bold leading-snug text-council-dark">{group.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{group.meaning}</p>
                  <ul className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                    {group.functions.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-council-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <details className="group mt-7 border-t border-slate-200 pt-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-council-primary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4 [&::-webkit-details-marker]:hidden">
                      <span>View exact statutory wording</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-council-primary/25 text-lg leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <ol className="mt-5 space-y-4 border-l-2 border-council-accent pl-4">
                      {group.statutoryFunctions.map((item) => (
                        <li key={item.reference} className="text-sm leading-relaxed text-gray-600">
                          <span className="mr-2 font-semibold text-council-primary">{item.reference}</span>
                          {item.text}
                        </li>
                      ))}
                    </ol>
                  </details>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/documents/nurses-and-midwives-act-2023.pdf"
                className="inline-flex items-center gap-2 rounded-sm bg-council-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4"
              >
                Read the full Act (PDF)
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
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
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <aside className="lg:sticky lg:top-28">
                <div className="rounded-[4px] bg-council-primary p-5 text-white shadow-sm">
                  <figure className="overflow-hidden rounded-[4px] bg-white text-council-dark">
                    <div className="relative h-40 bg-gray-100">
                      <Image
                        src="/assets/history/council-seal-presentation-group.jpg"
                        alt="Council representatives gathered with a historical Nursing Council seal presentation"
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="border-t border-slate-200 px-3 py-2 text-xs leading-relaxed text-gray-600">
                      Pictured with historical imagery of the Nursing Council seal.
                    </figcaption>
                  </figure>

                  <div className="mt-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Founding Council</p>
                    <h3 className="font-heading mt-2 text-2xl font-bold leading-tight">A legacy of public protection.</h3>
                  </div>

                  <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-[4px] bg-white/20">
                    <div className="bg-white/10 p-3">
                      <dd className="font-heading text-2xl font-bold text-council-accent">10</dd>
                      <dt className="mt-1 text-xs leading-relaxed text-white/75">Founding members</dt>
                    </div>
                    <div className="bg-white/10 p-3">
                      <dd className="font-heading text-2xl font-bold text-council-accent">1972</dd>
                      <dt className="mt-1 text-xs leading-relaxed text-white/75">Council established</dt>
                    </div>
                    <div className="bg-white/10 p-3">
                      <dd className="font-heading text-2xl font-bold text-council-accent">{pastChairpersons.length}</dd>
                      <dt className="mt-1 text-xs leading-relaxed text-white/75">Recorded Council Chairs</dt>
                    </div>
                  </dl>

                  <div className="mt-4 border-t border-white/20 pt-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Common Seal of the Council</p>
                    <h4 className="font-heading mt-2 text-lg font-bold leading-tight">Healing hands, the conch shell, and the flame.</h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/80">
                      Designed in 1971 by Student Nurse Dorothy Hepburn nee Morris, the seal represents healing hands and compassionate care, The Bahamas, and Florence Nightingale.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <figure className="grid grid-rows-[5rem_auto] rounded-[4px] bg-white p-2 text-council-dark">
                        <div className="relative">
                          <Image src="/assets/history/seal-presentation.png" alt="Historical photo of the Council seal presentation" fill sizes="(min-width: 1024px) 14vw, 45vw" className="object-contain" />
                        </div>
                        <figcaption className="mt-2 text-xs leading-relaxed text-gray-600">Seal presentation to the first Chairman of the Council.</figcaption>
                      </figure>
                      <figure className="grid grid-rows-[5rem_auto] rounded-[4px] bg-white p-2 text-council-dark">
                        <div className="relative">
                          <Image src="/assets/history/nursing-council-seal.png" alt="Historical Nursing Council seal illustration" fill sizes="(min-width: 1024px) 14vw, 45vw" className="object-contain" />
                        </div>
                        <figcaption className="mt-2 text-xs leading-relaxed text-gray-600">The seal incorporated into the Nursing Council pin.</figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="space-y-14">
                <section className="rounded-[4px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                  <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                    <span className="h-px w-9 bg-council-accent" />
                    Founding members
                  </p>
                  <h3 className="font-heading mb-5 text-3xl font-bold text-council-dark md:text-4xl">
                    The founding Council members.
                  </h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                    The first appointed Council brought together leaders across nursing, medicine, and public service to regulate education, registration, enrollment, practice, and discipline.
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
                </section>

                <section className="rounded-[4px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                  <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                    <span className="h-px w-9 bg-council-accent" />
                    Chairperson record
                  </p>
                  <h3 className="font-heading text-3xl font-bold text-council-dark md:text-4xl">Leadership through the years.</h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">
                    The following record is based on the Council-supplied list of past and current Chairpersons. Service periods are shown where they were supplied.
                  </p>

                  <ol className="mt-8 overflow-hidden rounded-[4px] border border-slate-200">
                    {pastChairpersons.map((chairperson, index) => (
                      <li key={chairperson.name} className={`grid gap-3 border-b border-slate-200 bg-white px-5 py-4 last:border-b-0 sm:items-center sm:gap-5 sm:px-6 ${chairperson.period ? 'sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(10rem,0.7fr)]' : 'sm:grid-cols-[3.5rem_minmax(0,1fr)]'}`}>
                        <span className="font-heading text-sm font-bold text-council-primary">{String(index + 1).padStart(2, '0')}</span>
                        <p className="font-heading text-lg font-bold text-council-dark">{chairperson.name}</p>
                        {chairperson.period && <p className="border-l-2 border-council-accent pl-3 text-sm font-semibold text-gray-600 sm:justify-self-start">{chairperson.period}</p>}
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="rounded-[4px] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                  <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                    <span className="h-px w-9 bg-council-accent" />
                    Administrative leadership
                  </p>
                  <h3 className="font-heading text-3xl font-bold text-council-dark md:text-4xl">Registrars through the years.</h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-gray-600">
                    The Registrar leads the Council’s administration and supports continuity in its statutory and operational work.
                  </p>

                  <ol className="mt-8 overflow-hidden rounded-[4px] border border-slate-200">
                    {pastRegistrars.map((registrar, index) => (
                      <li
                        key={`${registrar.name}-${registrar.period}`}
                        className="grid gap-3 border-b border-slate-200 bg-white px-5 py-5 last:border-b-0 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(12rem,0.8fr)] sm:items-center sm:gap-5 sm:px-6"
                      >
                        <span className="font-heading text-sm font-bold text-council-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="font-heading text-lg font-bold text-council-dark">{registrar.name}</p>
                        <p className="border-l-2 border-council-accent pl-3 text-sm font-semibold text-gray-600 sm:justify-self-start">
                          {registrar.period}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
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

              <div className="grid gap-px overflow-hidden rounded-[4px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-5">
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

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
