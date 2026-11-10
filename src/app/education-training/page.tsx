import Image from "next/image";
import {
  InteriorPageHeader,
  PageSectionNav,
  PageAssistance,
} from "@/components/InteriorPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import {
  otherTrainingInstitutions,
  universityOfTheBahamas,
} from "@/lib/councilContent";

export const metadata = createPageMetadata({
  title: "Nursing Education and Training",
  description:
    "Review Council-approved nursing training institutions, programmes, and clinical learning sites in The Bahamas.",
  path: "/education-training",
  image: "/assets/approved/hero-education.png",
});

const clinicalSites = [
  {
    name: "Princess Margaret Hospital",
    network: "Public Hospitals Authority",
    location: "New Providence",
    logo: "/assets/clinical-sites/public-hospitals-authority.png",
    logoAlt: "Public Hospitals Authority logo",
    logoClass: "",
  },
  {
    name: "Doctors Hospital",
    network: "Doctors Hospital Health System",
    location: "New Providence",
    logo: "/assets/clinical-sites/doctors-hospital.png",
    logoAlt: "Doctors Hospital Health System logo",
    logoClass: "",
  },
  {
    name: "Community Clinics",
    network: "Ministry of Health & Wellness",
    location: "Across The Bahamas",
    logo: "/assets/clinical-sites/ministry-health-wellness.webp",
    logoAlt: "Ministry of Health and Wellness Bahamas logo",
    logoClass: "",
  },
  {
    name: "Rand Memorial Hospital and Grand Bahama Community Clinics",
    network: "Public Hospitals Authority / Grand Bahama Health Services",
    location: "Grand Bahama",
    logo: "/assets/clinical-sites/public-hospitals-authority.png",
    logoAlt: "Public Hospitals Authority logo",
    logoClass: "",
  },
];

export default function EducationRegistrationPage() {
  return (
    <>
      <Header />
      <main className="[overflow-wrap:anywhere] flex-1">
        <InteriorPageHeader
          title="Education & training"
          description="Find Council-approved institutions, nursing programmes and clinical learning sites in The Bahamas."
          image={{
            src: "/assets/approved/hero-education.png",
            alt: "Nursing students receiving clinical skills instruction",
          }}
        />
        <PageSectionNav
          links={[
            {
              label: "Institutions & programmes",
              href: "#approved-institutions",
            },
            { label: "Clinical learning sites", href: "#clinical-sites" },
            { label: "Starting nursing school", href: "#student-indexing" },
          ]}
        />

        <section
          id="approved-institutions"
          className="scroll-mt-6 bg-white py-10 lg:py-12"
          aria-labelledby="approved-institutions-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mb-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <h2
                  id="approved-institutions-heading"
                  className="font-heading text-xl font-bold leading-tight text-council-dark md:text-3xl"
                >
                  Approved institutions & programmes
                </h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-gray-600">
                The Council has approved the institutions and programmes listed
                below. Southern College&apos;s Bachelor of Science in Nursing is
                identified as provisional in the supplied Council list.
              </p>
            </div>

            <article className="grid grid-cols-1 overflow-hidden rounded-[8px] bg-council-primary text-white lg:grid-cols-[0.78fr_1.22fr]">
                <div className="m-6 mb-0 flex flex-col gap-5 border-b border-white/20 pb-7 sm:m-8 sm:mb-0 sm:flex-row sm:items-center lg:col-start-2 lg:row-start-1">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[8px] bg-white p-3">
                    <Image
                      src={universityOfTheBahamas.logo}
                      alt={universityOfTheBahamas.logoAlt}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
                      {universityOfTheBahamas.name}
                    </h3>
                  </div>
                </div>
              <div className="relative min-h-[230px] lg:min-h-full lg:col-start-1 lg:row-start-1 lg:row-span-2">
                <Image
                  src="/assets/approved/nurses-graduates-ub.jpg"
                  alt="Nursing graduates from the University of The Bahamas"
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-council-primary/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-council-primary/35" />
              </div>
              <div className="p-6 pt-0 sm:p-8 sm:pt-0 lg:col-start-2 lg:row-start-2">
                <p className="mt-6 text-sm font-semibold text-white/80">
                  Programmes
                </p>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {universityOfTheBahamas.programmes.map((programme) => (
                    <li
                      key={programme}
                      className="flex gap-3 text-sm leading-relaxed text-white/90"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f23d5c]"
                        aria-hidden="true"
                      />
                      <span>{programme}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="mt-6 overflow-hidden rounded-[8px] border border-slate-200 bg-white">
              {otherTrainingInstitutions.map((institution) => (
                <article
                  key={institution.name}
                  className="grid grid-cols-1 gap-5 border-b border-slate-200 p-6 last:border-b-0 md:grid-cols-[5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-6 md:p-6"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-[8px] border border-slate-100 bg-white p-2">
                    <Image
                      src={institution.logo}
                      alt={institution.logoAlt}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold leading-tight text-council-dark">
                      {institution.name}
                    </h3>
                  </div>
                  <div className="border-t border-slate-200 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <p className="mb-3 text-sm font-semibold text-gray-600">
                      Programme{institution.programmes.length > 1 ? "s" : ""}
                    </p>
                    <ul className="space-y-3">
                      {institution.programmes.map((programme) => {
                        const provisional = programme.includes("(Provisional)");
                        const programmeName = programme.replace(
                          " (Provisional)",
                          "",
                        );

                        return (
                          <li
                            key={programme}
                            className="flex gap-3 text-sm leading-relaxed text-gray-700"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-council-primary"
                              aria-hidden="true"
                            />
                            <span>
                              {programmeName}
                              {provisional && (
                                <span className="ml-2 inline-block border border-council-accent/60 bg-council-accent/10 px-2 py-0.5 text-xs font-semibold text-council-dark">
                                  Provisional
                                </span>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="clinical-sites"
          className="scroll-mt-6 bg-slate-50 py-10 lg:py-12"
        >
          <div className="container mx-auto px-4">
            <div className="mb-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <h2 className="font-heading text-xl font-bold leading-tight text-council-dark md:text-3xl">
                  Clinical learning sites
                </h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-gray-600">
                These Council-identified hospitals and community health services
                support nursing education and supervised clinical practice.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {clinicalSites.map((site) => (
                <article
                  key={site.name}
                  className="flex flex-col items-start gap-5 rounded-lg sm:flex-row border border-slate-200 bg-white p-5 sm:p-6"
                >
                  <div className="relative h-20 w-20 shrink-0">
                    <Image
                      src={site.logo}
                      alt={site.logoAlt}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-council-dark">
                      {site.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {site.network}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {site.location}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div id="student-indexing" className="scroll-mt-6">
          <PageAssistance
            title="Starting nursing school?"
            description="Learn how student indexing works and what to prepare before you start your application in Nurse 360."
            href="/indexing"
            action="Student indexing guidance"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
