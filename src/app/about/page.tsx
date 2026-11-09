import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import {
  councilDocuments,
  currentCouncilMembers,
  councilMandate,
  councilVision,
  councilMission,
} from "@/lib/councilContent";
import {
  InteriorPageHeader,
  PageSectionNav,
  PageAction,
} from "@/components/InteriorPage";

export const metadata = createPageMetadata({
  title: "About the Council",
  description:
    "Learn about the Nursing Council’s history, statutory mandate, governance, current Council, administration, past chairpersons, registrars, and common seal.",
  path: "/about",
});

const timelineEvents = [
  {
    year: "1971",
    title: "Nurses and Midwives Act Passed",
    description:
      "With the repeal of the Midwives Ordinances of 1936, the Nurses and Midwives Act, 1971 became the statutory instrument for regulating nursing and midwifery education and practice in The Bahamas.",
  },
  {
    year: "Jan 1972",
    title: "Council Established",
    description:
      "The Nursing Council was established by the Minister of Health with a public-protection mandate to supervise nurses and midwives practising in the country.",
  },
  {
    year: "1972",
    title: "First Regulations Approved",
    description:
      "The first regulations formulated by the Council were approved by the Minister of Health and passed as law in the House of Parliament.",
  },
  {
    year: "1993",
    title: "Agency Regulations Added",
    description:
      "Agency regulations strengthened the Council framework for nursing agency oversight and regulatory requirements.",
  },
  {
    year: "2023",
    title: "Modern Act Passed",
    description:
      "The Nurses and Midwives Act, 2023 repealed the 1971 Act. The Council is guided by the 2023 Act and continues to apply the 1971 Regulations until new regulations are passed.",
  },
];

const foundingMembers = [
  { name: "Ms. Hilda Bowen", role: "Chairperson" },
  { name: "Mrs. Ironaca Morris", role: "Secretary elect" },
  { name: "Mrs. Dorothy Philips", role: "Treasurer elect" },
  { name: "Mrs. Ophelia Munnings", role: "Member" },
  { name: "Mrs. Brendel Cox", role: "Member" },
  { name: "Mr. T. G. Glover", role: "Member" },
  { name: "Dr. Kirkland Culmer", role: "Member" },
  { name: "Mrs. Eloise Penn", role: "Member" },
  { name: "Ms. Sylvia Davis", role: "Member" },
  { name: "Mrs. Ruby Nottage", role: "Member" },
];

const pastChairpersons = [
  { name: "Ms. Hilda Bowen", period: "1972 - 1976" },
  { name: "Mrs. Dorothy Phillips", period: "1977" },
  { name: "Ms. Hilda Bowen", period: "1978 - 1983" },
  { name: "Mrs. Ironaca Morris-Baker", period: "1984 - 1992" },
  { name: "Mrs. Castella Bowleg", period: "1993 - 1996" },
  { name: "Mrs. Beverley Ford", period: "1997 - 1999" },
  { name: "Mr. Andil LaRoda", period: "2000" },
  { name: "Mrs. Jacqueline Dean", period: "2001 - 2003" },
  { name: "Mrs. Philabertha Carter", period: "2004 - 2007" },
  { name: "Ms. Ivy Wilson", period: "2007 - 2008" },
  { name: "Mrs. Maggie Turner", period: "2008 - 2011" },
  { name: "Mrs. Coral Dean", period: "2011 - 2013" },
  { name: "Mrs. Gwendolyn Brice-Sealy", period: "2013 - 2014" },
  { name: "Carol Markey", period: null },
  { name: "Patricia Newbold", period: null },
  { name: "Patricia Brown", period: null },
  { name: "Ferneka Deleveaux", period: null },
];

const pastRegistrars = [
  { name: "Mrs. Theda Godet", period: null },
  { name: "Ms. Mary Johnson", period: "2010 - 2022" },
  { name: "Mrs. Ruth Albury", period: "2022 - Present" },
];

const governanceGroups = [
  {
    seats: "1 seat",
    title: "Nursing leadership",
    roles: ["Director of Nursing, serving ex officio"],
  },
  {
    seats: "6 seats",
    title: "Nursing representation",
    roles: [
      "Four nurses from different categories, including a nursing educator and advanced practice nurse",
      "Two nurses nominated by the Nurses Association of The Commonwealth of The Bahamas",
    ],
  },
  {
    seats: "2 seats",
    title: "Professional partners",
    roles: [
      "One Midwives Association nominee",
      "One Medical Association nominee",
    ],
  },
  {
    seats: "1 seat",
    title: "Legal Counsel/Attorney",
    roles: [
      "One Legal Counsel/Attorney nominated by the Minister, with at least ten years standing at The Bahamas Bar",
    ],
  },
  {
    seats: "1 seat",
    title: "Education appointment",
    roles: ["One Minister of Education nominee"],
  },
];

const administrationRoles = [
  {
    title: "Registrar",
    description:
      "Leads Council administration and supports the Council’s statutory and operational work.",
  },
  {
    title: "Deputy Registrar",
    description:
      "Supports the Registrar and continuity of Council administration.",
  },
];

const values = [
  {
    title: "Professionalism",
    description:
      "The Nursing Council upholds ethical principles and conducts its business with utmost objectivity and confidentiality.",
  },
  {
    title: "Integrity",
    description:
      "The Nursing Council is guided by honesty, fairness and respect.",
  },
  {
    title: "Excellence",
    description:
      "The Nursing Council is committed to maintaining high standards and ensuring the advancement of evidence-informed nursing and midwifery practice.",
  },
  {
    title: "Responsiveness",
    description:
      "The Nursing Council acts promptly and efficiently to address requests and matters of concern in a timely manner and provide feedback.",
  },
];

const councilFunctionGroups = [
  {
    title: "Standards, education and practice",
    meaning:
      "Sets the foundation for safe, consistent nursing and midwifery practice in The Bahamas.",
    functions: [
      "Establish qualifications and standards for the education, training and practice of nursing personnel.",
      "Control education, training, practice, registration or enrollment, and licensing of nursing personnel.",
      "Monitor education, training and practice in nursing and midwifery.",
    ],
    statutoryFunctions: [
      {
        reference: "8(a)",
        text: "Establish the qualifications, standards of education, training and practice for nursing personnel.",
      },
      {
        reference: "8(b)",
        text: "Control the education, training, practice, registration or enrollment, and licensing of nursing personnel.",
      },
      {
        reference: "8(c)",
        text: "Monitor education, training and practice in nursing and midwifery.",
      },
    ],
  },
  {
    title: "Public interest and professional conduct",
    meaning:
      "Places people receiving care first while safeguarding public confidence in the profession.",
    functions: [
      "Treat the health and well-being of persons who require nursing or midwifery services as paramount.",
      "Consider the interests of nursing personnel and other professions referred to under the Act.",
      "Ensure that standards of professional conduct are followed by nursing personnel.",
    ],
    statutoryFunctions: [
      {
        reference: "8(d)",
        text: "Consider the health and well-being of persons who require nursing or midwifery services as paramount.",
      },
      {
        reference: "8(e)",
        text: "Consider the interests of licensed practical nurses, registered nurses, student midwives, midwives and advanced practice nurses, and any other profession referred to under the Act.",
      },
      {
        reference: "8(f)",
        text: "Ensure that standards of professional conduct are adhered to by nurse interns, licensed practical nurses, registered nurses, student midwives, midwives and advanced practice nurses.",
      },
    ],
  },
  {
    title: "Competence and professional development",
    meaning:
      "Keeps nursing personnel competent and current throughout their professional practice.",
    functions: [
      "Ensure continuing professional development and competency in nursing and midwifery practice.",
      "Determine continuing professional development credits and requirements for nursing personnel.",
      "Prescribe codes of conduct for nursing personnel.",
    ],
    statutoryFunctions: [
      {
        reference: "8(g)",
        text: "Ensure continuing professional development of nursing personnel in the practice of nursing, and competency in the practice of nursing and midwifery.",
      },
      {
        reference: "8(h)",
        text: "Determine continuing professional development credits and requirements for nursing personnel.",
      },
      {
        reference: "8(i)",
        text: "Prescribe codes of conduct for nursing personnel.",
      },
    ],
  },
  {
    title: "Partnerships and assistive personnel",
    meaning:
      "Connects the Council with the organisations and people that support safe nursing care.",
    functions: [
      "Collaborate with employers, training institutions, and national, regional and international professional and regulatory bodies.",
      "Control the training and practice of Unlicensed Assistive Personnel and determine their continuing education requirements.",
      "Consider the interests of Unlicensed Assistive Personnel, nursing students and nurse interns.",
    ],
    statutoryFunctions: [
      {
        reference: "8(j)",
        text: "Collaborate with employers of nursing personnel, educational institutions that provide training for nursing personnel, and national, regional and international professional and regulatory bodies.",
      },
      {
        reference: "8(k)",
        text: "Control the training and practice of Unlicensed Assistive Personnel.",
      },
      {
        reference: "8(l)",
        text: "Determine continuing education requirements for Unlicensed Assistive Personnel.",
      },
      {
        reference: "8(m)",
        text: "Consider the interests of Unlicensed Assistive Personnel, nursing students and nurse interns.",
      },
    ],
  },
  {
    title: "Agencies, registration and authorisation",
    meaning:
      "Provides the formal routes for recognition, licensing, authorisation and agency oversight.",
    functions: [
      "Set standards for, regulate and monitor nursing agencies.",
      "Grant certificates of enrollment or registration and licences to nursing personnel, and issue authorisation letters to nurse interns.",
      "Record Unlicensed Assistive Personnel and grant registration certificates and licences to nursing agencies.",
    ],
    statutoryFunctions: [
      {
        reference: "8(n)",
        text: "Establish the standards, and regulate and monitor the operations, of nursing agencies.",
      },
      {
        reference: "8(o)",
        text: "Grant certificates of enrollment or registration, and licences to nursing personnel.",
      },
      {
        reference: "8(p)",
        text: "Issue letters of authorisation to nurse interns.",
      },
      { reference: "8(q)", text: "Record Unlicensed Assistive Personnel." },
      {
        reference: "8(r)",
        text: "Grant certificates of registration, and licences to nursing agencies.",
      },
    ],
  },
  {
    title: "Records, oversight and advice",
    meaning:
      "Maintains accountable records, investigates concerns and supports national health policy.",
    functions: [
      "Maintain an electronic database of enrollment or registration, licensure, location and professional activities of nursing personnel.",
      "Investigate professional conduct or competence, the conduct of Unlicensed Assistive Personnel, and the operations of nursing agencies.",
      "Advise the Minister on matters under the Act and carry out any other function conferred by it.",
    ],
    statutoryFunctions: [
      {
        reference: "8(s)",
        text: "Maintain an electronic database on the enrollment or registration, licence, location, professional activities of nursing personnel and any other information as determined by the Council.",
      },
      {
        reference: "8(t)",
        text: "Investigate professional conduct, or the competency, of nursing personnel to practise nursing and midwifery.",
      },
      {
        reference: "8(u)",
        text: "Investigate the conduct of Unlicensed Assistive Personnel.",
      },
      {
        reference: "8(v)",
        text: "Investigate the operations of nursing agencies.",
      },
      {
        reference: "8(w)",
        text: "Advise the Minister on matters pertaining to the Act.",
      },
      {
        reference: "8(x)",
        text: "Carry out any other function conferred on the Council under the Act.",
      },
    ],
  },
];

const ethicsElements = [
  {
    title: "Trustworthy Patient-Centred Care",
    description:
      "Nurses are expected to respect dignity, culture, privacy, informed decision-making, confidentiality, and equitable access to care.",
  },
  {
    title: "Safe Practice Environments",
    description:
      "The Code emphasizes competent practice, safe delegation, lifelong learning, appropriate use of technology, and action when care is at risk.",
  },
  {
    title: "A Respected Profession",
    description:
      "Nurses must uphold honesty, integrity, compassion, professional conduct, public trust, and responsible conduct in person and online.",
  },
  {
    title: "Health and Wellbeing",
    description:
      "The Code calls nurses to support public health, emergency readiness, mental wellness, health equity, sustainability, and community collaboration.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="About the Council"
          description="Protecting the public through nursing and midwifery education, professional standards and accountable practice in The Bahamas since 1972."
          image={{
            src: "/assets/approved/nursing-image-card-1.webp",
            alt: "Nurses gathered at a formal ceremony in The Bahamas",
            position: "center 40%",
          }}
        />
        <PageSectionNav
          links={[
            { label: "Our purpose", href: "#purpose" },
            { label: "Current Council", href: "#current-council" },
            { label: "Council functions", href: "#functions" },
            { label: "Our history", href: "#history" },
            { label: "Governance", href: "#governance" },
          ]}
        />

        <section id="purpose" className="scroll-mt-6 bg-white py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
              <h2 className="text-3xl font-bold text-council-dark">
                Our purpose
              </h2>
              <p className="max-w-3xl leading-relaxed text-slate-600">
                {councilMandate}
              </p>
            </div>
            <div className="mt-8 grid gap-8 border-y border-slate-200 py-7 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h3 className="text-xl font-bold text-council-primary">
                  Vision
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                  {councilVision}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-council-primary">
                  Mission
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                  {councilMission}
                </p>
              </div>
            </div>
            <div
              className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              aria-label="Council values"
            >
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="text-lg font-bold text-council-dark">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="current-council"
          className="scroll-mt-6 bg-slate-50 py-10 lg:py-12"
        >
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-council-dark">
                Current Council
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-slate-600">
                Nursing leadership, professional representatives, legal counsel,
                education and medical expertise support the Council’s work.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Council-supplied appointments, August 2026.
              </p>
              <div className="mt-5">
                <PageAction href="/committees" secondary>
                  Council committees
                </PageAction>
              </div>
            </div>
            <dl className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              {currentCouncilMembers.map((member) => (
                <div
                  key={`${member.role}-${member.name ?? "vacant"}`}
                  className="grid gap-2 border-b border-slate-200 px-5 py-4 last:border-b-0 sm:grid-cols-2 sm:gap-6"
                >
                  <dt className="text-sm leading-relaxed text-slate-600">
                    {member.role}
                  </dt>
                  <dd className="font-semibold text-council-dark">
                    {member.name ?? (
                      <span className="inline-block rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-sm text-amber-900">
                        Vacant
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="functions" className="scroll-mt-6 bg-white py-10 lg:py-12">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-council-dark">
                What the Council does
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-slate-600">
                Section 8 of the Nurses and Midwives Act, 2023 sets out the
                Council’s functions. Select an area to read the statutory
                wording.
              </p>
              <div className="mt-5">
                <PageAction href={councilDocuments.act.href} secondary>
                  Read the Act (PDF)
                </PageAction>
              </div>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {councilFunctionGroups.map((group) => (
                <details key={group.title} className="group py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-5 rounded py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block text-lg font-bold text-council-dark">
                        {group.title}
                      </span>
                      <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-slate-600">
                        {group.meaning}
                      </span>
                    </span>
                    <span
                      className="mt-1 text-xl text-council-primary group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <ol className="mb-5 space-y-4 border-l-2 border-[#f23d5c]/40 pl-5">
                    {group.statutoryFunctions.map((item) => (
                      <li
                        key={item.reference}
                        className="text-sm leading-relaxed text-slate-600"
                      >
                        <span className="mr-2 font-bold text-council-primary">
                          {item.reference}
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>
          </div>
          <div className="container mx-auto mt-10 px-4">
            <details className="group rounded-lg border border-rose-100 bg-[#fff4f5] p-5 sm:p-7">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded text-xl font-bold text-council-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                Code of Ethics for nursing practice
                <span
                  className="text-2xl group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
                Revised in February 2025, the Code of Ethics guides ethical
                decision-making, accountability, professionalism, and safe care
                for nurses, midwives, students, educators, administrators, and
                researchers.
              </p>
              <div className="my-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {ethicsElements.map((element) => (
                  <div key={element.title}>
                    <h3 className="text-lg font-bold text-council-dark">
                      {element.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {element.description}
                    </p>
                  </div>
                ))}
              </div>
              <PageAction href={councilDocuments.codeOfEthics.href} secondary>
                Read the Code of Ethics (PDF)
              </PageAction>
            </details>
          </div>
        </section>

        <section
          id="history"
          className="scroll-mt-6 bg-slate-50 py-10 lg:py-12"
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
              <div>
                <h2 className="text-3xl font-bold text-council-dark">
                  Our history
                </h2>
                <p className="mt-3 max-w-md leading-relaxed text-slate-600">
                  Established in 1972, the Council continues its founding
                  purpose: protecting citizens and all who require health care
                  services in The Bahamas.
                </p>
                <figure className="mt-6 max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <Image
                    src="/assets/history/council-seal-presentation-group.jpg"
                    alt="Council representatives gathered with a historical Nursing Council seal presentation"
                    width={640}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                  <figcaption className="p-3 text-xs leading-relaxed text-slate-500">
                    Council representatives with historical imagery of the
                    Nursing Council seal.
                  </figcaption>
                </figure>
              </div>
              <ol className="border-l-2 border-[#f23d5c]/40">
                {timelineEvents.map((event) => (
                  <li
                    key={`${event.year}-${event.title}`}
                    className="relative border-b border-slate-200 pb-6 pl-6 pt-1 last:border-b-0 [&+li]:pt-6"
                  >
                    <time className="font-bold text-council-primary">
                      {event.year}
                    </time>
                    <h3 className="mt-2 text-lg font-bold text-council-dark">
                      {event.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                      {event.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <details className="group p-5 sm:px-7">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded text-lg font-bold text-council-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary [&::-webkit-details-marker]:hidden">
                  The founding Council
                  <span
                    aria-hidden="true"
                    className="text-xl text-council-primary group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                  The first appointed Council brought together leaders across
                  nursing, medicine and public service. Historical
                  administration record: Mrs. Beverly Ford served as Registrar
                  and is not listed as a Council member.
                </p>
                <dl className="mt-5 grid gap-x-10 sm:grid-cols-2">
                  {foundingMembers.map((member) => (
                    <div
                      key={member.name}
                      className="flex flex-wrap justify-between gap-2 border-t border-slate-100 py-3"
                    >
                      <dt className="font-semibold text-council-dark">
                        {member.name}
                      </dt>
                      <dd className="text-sm text-slate-600">{member.role}</dd>
                    </div>
                  ))}
                </dl>
              </details>
              <details className="group p-5 sm:px-7">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded text-lg font-bold text-council-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary [&::-webkit-details-marker]:hidden">
                  Chairpersons through the years
                  <span
                    aria-hidden="true"
                    className="text-xl text-council-primary group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Council-supplied historical record. Service periods are shown
                  where they were supplied.
                </p>
                <ol className="mt-5 grid gap-x-10 sm:grid-cols-2">
                  {pastChairpersons.map((person, index) => (
                    <li
                      key={`${person.name}-${person.period ?? index}`}
                      className="flex flex-wrap justify-between gap-2 border-t border-slate-100 py-3"
                    >
                      <span className="font-semibold text-council-dark">
                        {person.name}
                      </span>
                      {person.period && (
                        <span className="text-sm text-slate-600">
                          {person.period}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </details>
              <details className="group p-5 sm:px-7">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded text-lg font-bold text-council-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary [&::-webkit-details-marker]:hidden">
                  Registrars through the years
                  <span
                    aria-hidden="true"
                    className="text-xl text-council-primary group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  The Registrar leads the Council’s administration. Service
                  periods are shown where supplied in the Council record.
                </p>
                <dl className="mt-5">
                  {pastRegistrars.map((person) => (
                    <div
                      key={person.name}
                      className="flex flex-wrap justify-between gap-2 border-t border-slate-100 py-3"
                    >
                      <dt className="font-semibold text-council-dark">
                        {person.name}
                      </dt>
                      {person.period && (
                        <dd className="text-sm text-slate-600">
                          {person.period}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </details>
              <details className="group p-5 sm:px-7">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded text-lg font-bold text-council-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary [&::-webkit-details-marker]:hidden">
                  The Council seal
                  <span
                    aria-hidden="true"
                    className="text-xl text-council-primary group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
                  Designed in 1971 by Student Nurse Dorothy Hepburn nee Morris,
                  the seal’s healing hands represent compassionate care, the
                  conch shell represents The Bahamas, and the flame represents
                  Florence Nightingale.
                </p>
                <div className="mt-5 grid max-w-xl gap-5 sm:grid-cols-2">
                  <figure>
                    <Image
                      src="/assets/history/seal-presentation.png"
                      alt="Historical photo of the Council seal presentation"
                      width={280}
                      height={180}
                      className="h-40 w-full object-contain"
                    />
                    <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">
                      Seal presentation to the first Chairman of the Council.
                    </figcaption>
                  </figure>
                  <figure>
                    <Image
                      src="/assets/history/nursing-council-seal.png"
                      alt="Historical Nursing Council seal illustration"
                      width={280}
                      height={180}
                      className="h-40 w-full object-contain"
                    />
                    <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">
                      The seal incorporated into the Nursing Council pin.
                    </figcaption>
                  </figure>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section
          id="governance"
          className="scroll-mt-6 bg-white py-10 lg:py-12"
        >
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-council-dark">
                Council governance
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-slate-600">
                The First Schedule of the Nurses and Midwives Act, 2023
                establishes an eleven-member Council appointed by the Minister.
              </p>
              <div className="mt-5">
                <PageAction href="/committees" secondary>
                  View Council committees
                </PageAction>
              </div>
            </div>
            <div>
              <dl className="divide-y divide-slate-200 border-y border-slate-200">
                {governanceGroups.map((group) => (
                  <div key={group.title} className="py-4">
                    <dt className="flex items-baseline justify-between gap-4 font-bold text-council-dark">
                      {group.title}
                      <span className="shrink-0 text-sm font-medium text-slate-500">
                        {group.seats}
                      </span>
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-2">
                        {group.roles.map((role) => (
                          <li
                            key={role}
                            className="text-sm leading-relaxed text-slate-600"
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-7 text-xl font-bold text-council-primary">
                Office of the Registrar
              </h3>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {administrationRoles.map((role) => (
                  <div key={role.title}>
                    <h4 className="font-bold text-council-dark">
                      {role.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {role.description}
                    </p>
                  </div>
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
