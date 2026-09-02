import Image from 'next/image';
import {
  GraduationCap,
  Stethoscope,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Nursing Education and Training',
  description: 'Review Council-approved nursing training institutions, programmes, and clinical learning sites in The Bahamas.',
  path: '/education-training',
  image: '/assets/approved/hero-education.png',
});

const clinicalSites = [
  {
    name: 'Princess Margaret Hospital',
    network: 'Public Hospitals Authority',
    location: 'New Providence',
    logo: '/assets/clinical-sites/public-hospitals-authority.webp',
    logoAlt: 'Public Hospitals Authority logo',
    logoClass: 'scale-[3]',
  },
  {
    name: 'Doctors Hospital',
    network: 'Doctors Hospital Health System',
    location: 'New Providence',
    logo: '/assets/clinical-sites/doctors-hospital.png',
    logoAlt: 'Doctors Hospital Health System logo',
    logoClass: '',
  },
  {
    name: 'Community Clinics',
    network: 'Ministry of Health & Wellness',
    location: 'Across The Bahamas',
    logo: '/assets/clinical-sites/ministry-health-wellness.webp',
    logoAlt: 'Ministry of Health and Wellness Bahamas logo',
    logoClass: '',
  },
  {
    name: 'Rand Memorial Hospital and Grand Bahama Community Clinics',
    network: 'Public Hospitals Authority / Grand Bahama Health Services',
    location: 'Grand Bahama',
    logo: '/assets/clinical-sites/public-hospitals-authority.webp',
    logoAlt: 'Public Hospitals Authority logo',
    logoClass: 'scale-[3]',
  },
];

const universityOfTheBahamas = {
  name: 'The University of The Bahamas',
  programmes: [
    'Master of Science Nursing Education | Nursing Administration | Adult Gerontology',
    'Diploma of Midwifery',
    'Diploma of Community Health Nursing',
    'Bachelor of Science in Nursing',
    'Registered Nurse to Bachelor of Science in Nursing',
    'Trained Clinical Nursing Program',
  ],
};

const otherTrainingInstitutions = [
  {
    name: 'Bahamas Baptist University College',
    programmes: ['Trained Clinical Nursing Program'],
  },
  {
    name: 'Public Hospitals Authority Academy',
    programmes: ['Trained Clinical Nursing Program'],
  },
  {
    name: 'Southern College',
    programmes: ['Bachelor of Science in Nursing (Provisional)'],
  },
  {
    name: 'Terreve University College',
    programmes: ['Bachelor of Science in Nursing', 'Trained Clinical Nursing Program'],
  },
];

export default function EducationRegistrationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative isolate min-h-[520px] overflow-hidden bg-council-primary text-white lg:min-h-[580px]"
          data-page-hero="education"
        >
          <div className="absolute inset-y-0 right-0 w-[88%] sm:w-[72%] lg:w-[52%]">
            <Image
              src="/assets/approved/hero-education.png"
              alt="Nursing students receiving clinical skills instruction"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 88vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          </div>
          <div className="container relative mx-auto flex min-h-[520px] items-center px-4 py-20 lg:min-h-[580px] lg:py-28">
            <div className="max-w-[88%] sm:max-w-2xl lg:max-w-[58%]">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Education & training
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Approved pathways for nursing education.
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Review Council-approved nursing training institutions, programmes, and clinical learning sites.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Approved institutions
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Nursing training institutions and programmes.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                The Council has approved the institutions and programmes listed below. Southern College&apos;s Bachelor of Science in Nursing is identified as provisional in the supplied Council list.
              </p>
            </div>

            <article className="grid overflow-hidden rounded-[8px] bg-council-primary text-white lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative min-h-[310px] lg:min-h-full">
                <Image
                  src="/assets/approved/nurses-graduates-ub.jpg"
                  alt="Nursing graduates from the University of The Bahamas"
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-council-primary/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-council-primary/35" />
                <span className="absolute bottom-5 left-6 border border-white/30 bg-council-primary/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  Featured institution
                </span>
              </div>
              <div className="p-7 sm:p-9 lg:p-11">
                <div className="flex items-start justify-between gap-5 border-b border-white/20 pb-7">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-council-accent">Approved institution</p>
                    <h3 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">{universityOfTheBahamas.name}</h3>
                  </div>
                  <span className="font-heading text-3xl font-bold text-council-accent">01</span>
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/65">Approved programmes</p>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {universityOfTheBahamas.programmes.map((programme) => (
                    <li key={programme} className="flex gap-3 text-sm leading-relaxed text-white/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-council-accent" aria-hidden="true" />
                      <span>{programme}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="mt-6 overflow-hidden rounded-[8px] border border-slate-200 bg-white">
              {otherTrainingInstitutions.map((institution, index) => (
                <article
                  key={institution.name}
                  className="grid gap-5 border-b border-slate-200 p-6 last:border-b-0 md:grid-cols-[5.5rem_minmax(15rem,0.8fr)_1.2fr] md:items-start md:gap-8 md:p-8"
                >
                  <div className="flex items-center gap-3 md:block">
                    <span className="font-heading text-3xl font-bold text-council-accent">0{index + 2}</span>
                    <GraduationCap className="h-6 w-6 text-council-primary md:mt-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-council-primary">Approved institution</p>
                    <h3 className="font-heading text-2xl font-bold leading-tight text-council-dark">{institution.name}</h3>
                  </div>
                  <div className="border-t border-slate-200 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Approved programme{institution.programmes.length > 1 ? 's' : ''}</p>
                    <ul className="space-y-3">
                      {institution.programmes.map((programme) => {
                        const provisional = programme.includes('(Provisional)');
                        const programmeName = programme.replace(' (Provisional)', '');

                        return (
                          <li key={programme} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-council-primary" aria-hidden="true" />
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

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Approved clinical sites
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Clinical learning environments.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                These Council-identified hospitals and community health services support nursing education and supervised clinical practice.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {clinicalSites.map((site, index) => (
                <article key={site.name} className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                  <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-slate-200 bg-white p-6">
                    <Image
                      src={site.logo}
                      alt={site.logoAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`object-contain p-6 ${site.logoClass}`}
                    />
                    <span className="absolute right-4 top-4 bg-council-primary px-2.5 py-1 text-xs font-semibold text-white">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] bg-council-primary text-white">
                      <Stethoscope className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold leading-tight text-council-dark">{site.name}</h3>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-council-primary">{site.network}</p>
                    <p className="mt-2 text-sm text-gray-600">{site.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
