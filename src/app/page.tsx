import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Buildings as Building,
  CheckCircle,
  GraduationCap,
  EnvelopeSimple as Mail,
  MapPin,
  Phone,
  ArrowsClockwise as RotateCcw,
  ShieldCheck,
  UserPlus,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { portalPath } from "@/lib/portal";
import { featuredNewsArticles, formatNewsDate } from "@/lib/news";

const services = [
  {
    icon: UserPlus,
    title: 'Register',
    description: 'Begin your nursing registration process and submit your application online.',
    action: 'Start registration',
    href: portalPath('/register?type=registration'),
    image: '/assets/approved/register-card.jpg',
    imageAlt: 'Nurse in blue scrubs ready to begin professional registration',
    imagePosition: 'object-center',
  },
  {
    icon: RotateCcw,
    title: 'Renew Licence',
    description: 'Keep your annual nursing licence current with a simple online renewal.',
    action: 'Renew online',
    href: portalPath('/register?type=renewal'),
    image: '/assets/approved/renew-card.jpg',
    imageAlt: 'Nurse in blue scrubs representing professional licence renewal',
    imagePosition: 'object-center',
  },
  {
    icon: GraduationCap,
    title: 'Education & Training',
    description: 'Review approved nursing education pathways, training institutions, clinical sites, CPD providers, and professional-development requirements.',
    action: 'View education standards',
    href: '/education-training',
    image: '/assets/approved/tcn-nurses-1.jpg',
    imageAlt: 'Trained Clinical Nurses at a formal nursing ceremony',
    imagePosition: 'object-center',
  },
];

const councilHighlights = [
  {
    icon: ShieldCheck,
    title: "Public Protection",
    description:
      "Protect the public through accountable regulation of nursing and midwifery practice.",
  },
  {
    icon: CheckCircle,
    title: "Professional Standards",
    description:
      "Set standards for nursing education, registration, conduct, and continuing professional practice.",
  },
  {
    icon: Building,
    title: 'Education & Registration',
    description: 'Maintain the nursing register, oversee nursing education standards, and support high-quality nursing care across The Bahamas.',
  },
];

const councilFacts = [
  { value: "1972", label: "Established" },
  { value: "11", label: "Council Members" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative isolate min-h-[560px] overflow-hidden bg-council-primary text-white md:min-h-[570px]"
          aria-label="The Nursing Council of the Commonwealth of The Bahamas"
        >
          <Image
            src="/assets/approved/hero-image-nursing.jpg"
            alt="Nursing students seated during a formal nursing ceremony in The Bahamas"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,90,0.98)_0%,rgba(0,0,100,0.88)_38%,rgba(0,0,100,0.28)_72%,rgba(0,0,100,0.08)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-council-primary/25 to-transparent" />
          <div className="relative container mx-auto flex min-h-[560px] items-center px-4 py-14 md:min-h-[570px] md:py-16">
            <div className="max-w-4xl">
              <h1 className="font-heading max-w-[15ch] text-balance text-4xl font-bold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:max-w-[28ch] lg:text-[3.25rem] xl:text-[3.5rem]">
                The Nursing Council of the Commonwealth of The Bahamas.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                Guiding and promoting excellence in the practice of nursing.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/indexing"
                  className="council-action inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] bg-council-accent px-6 py-3 font-semibold text-council-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary"
                >
                  Indexing
                  <ArrowRight
                    className="council-arrow h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/verification"
                  className="council-action inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] border border-white/75 bg-white px-6 py-3 font-semibold text-council-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary"
                >
                  Verification
                  <ArrowRight
                    className="council-arrow h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-slate-50 py-16 lg:py-20"
          aria-label="Online services"
        >
          <div className="container mx-auto px-4">
            <div className="mb-9 max-w-2xl">
              <h2 className="font-heading text-3xl font-bold tracking-[-0.025em] text-council-dark md:text-4xl">
                Get started online
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Access the Council services used most often by nurses,
                applicants, and education providers.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isFeatured = index === 0;
                return (
                  <article
                    key={service.title}
                    className={`council-card group overflow-hidden rounded-[4px] border border-slate-200 bg-white ${isFeatured ? "lg:col-span-7 lg:row-span-2 lg:grid lg:grid-cols-[1.05fr_0.95fr]" : "lg:col-span-5 lg:grid lg:grid-cols-[minmax(180px,0.85fr)_1.15fr]"}`}
                  >
                    <div
                      className={`relative overflow-hidden ${isFeatured ? "h-64 lg:h-full lg:min-h-[520px]" : "h-56 lg:h-full lg:min-h-[250px]"}`}
                    >
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes={
                          isFeatured
                            ? "(min-width: 1024px) 38vw, 100vw"
                            : "(min-width: 1024px) 18vw, 100vw"
                        }
                        className={`council-card-image object-cover ${service.imagePosition}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-council-primary/45 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-council-primary text-white shadow-[0_8px_24px_rgba(0,0,70,0.22)]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    </div>
                    <div
                      className={`flex flex-col p-6 ${isFeatured ? "justify-center lg:p-8" : "justify-center lg:p-6"}`}
                    >
                      <h3
                        className={`font-heading font-bold tracking-[-0.02em] text-council-dark ${isFeatured ? "text-2xl lg:text-3xl" : "text-2xl"}`}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-slate-600">
                        {service.description}
                      </p>
                      <Link
                        href={service.href}
                        className="council-text-link mt-5 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-council-primary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4"
                      >
                        {service.action}
                        <ArrowRight
                          className="council-arrow h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="bg-white py-20 lg:py-24"
          aria-label="About the Nursing Council"
        >
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">
            <div className="relative min-h-[500px] overflow-hidden rounded-[4px] bg-slate-100 lg:min-h-[620px]">
              <Image
                src="/assets/approved/nurses-bahamas.png"
                alt="Nurses seated together during a ceremony in The Bahamas"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-council-primary/70 via-council-primary/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[4px] bg-council-primary p-6 text-white shadow-[0_18px_50px_rgba(0,0,70,0.26)] md:bottom-6 md:left-auto md:right-6 md:w-[68%]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                  Since 1972
                </p>
                <p className="mt-3 text-lg font-semibold leading-relaxed">
                  Safeguarding the public through nursing regulation, education
                  standards, and professional accountability.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-council-dark md:text-5xl">
                Guiding the future of nursing in The Bahamas
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                The Nursing Council safeguards the public through the regulation
                of nursing education, registration, and professional standards
                practice across the Commonwealth of The Bahamas.
              </p>

              <div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">
                {councilHighlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <article
                      key={highlight.title}
                      className="grid grid-cols-[3.5rem_1fr] gap-4 py-6"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-slate-100 text-council-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold tracking-[-0.015em] text-council-dark">
                          {highlight.title}
                        </h3>
                        <p className="mt-2 leading-relaxed text-slate-600">
                          {highlight.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-8 grid overflow-hidden rounded-[4px] border border-slate-200 bg-white sm:grid-cols-2">
                {councilFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-b border-slate-200 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                  >
                    <p className="font-heading text-3xl font-bold text-council-primary">
                      {fact.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {fact.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="council-action mt-8 inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-council-primary px-6 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4"
              >
                Learn about the Council
                <ArrowRight
                  className="council-arrow h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="bg-gray-50 py-20 lg:py-28"
          aria-labelledby="latest-news-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  News and updates
                </p>
                <h2
                  id="latest-news-heading"
                  className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl"
                >
                  Nursing news from The Bahamas.
                </h2>
              </div>
              <Link
                href="/news"
                className="council-text-link inline-flex min-h-11 items-center gap-2 font-semibold text-council-primary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4"
              >
                View all news
                <ArrowRight
                  className="council-arrow h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredNewsArticles.map((article) => (
                <article
                  key={article.href}
                  className="council-card group flex h-full flex-col overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 23vw, (min-width: 768px) 46vw, 100vw"
                      className="council-card-image object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      <span>{article.publisher}</span>
                      <time dateTime={article.publishedAt}>
                        {formatNewsDate(article)}
                      </time>
                    </div>
                    <h3 className="font-heading mt-4 text-xl font-bold leading-snug text-council-dark">
                      {article.title}
                    </h3>
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noreferrer"
                      className="council-text-link mt-6 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-council-primary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4"
                    >
                      Read source article
                      <ArrowRight
                        className="council-arrow h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative isolate overflow-hidden bg-slate-50 py-16 lg:py-20"
          aria-label="Need assistance contact section"
        >
          <Image
            src="/assets/brand/nursing-council-healthcare-pattern-landscape-16x9.webp"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-[0.055]"
            aria-hidden="true"
          />
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-[4px] border border-slate-200 bg-white">
              <div className="px-6 py-9 text-center md:px-10">
                <h2 className="font-heading text-3xl font-bold tracking-[-0.025em] text-council-primary">
                  Need Assistance?
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
                  Our team is here to help with your nursing registration,
                  licensing, and professional development needs.
                </p>
              </div>
              <div className="grid border-t border-slate-200 md:grid-cols-3 md:divide-x md:divide-slate-200">
                <article className="flex gap-4 border-b border-slate-200 p-6 md:border-b-0 lg:p-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-council-primary text-white">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-council-dark">
                      Call Us
                    </h3>
                    <a
                      href="tel:+12426046015"
                      className="council-text-link mt-2 inline-flex min-h-11 items-center text-slate-700"
                    >
                      (242) 604-6015 / 6017
                    </a>
                    <p className="text-sm text-slate-500">
                      Mon-Fri: 9:00am - 5:00pm
                    </p>
                  </div>
                </article>
                <article className="flex gap-4 border-b border-slate-200 p-6 md:border-b-0 lg:p-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-council-primary text-white">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-bold text-council-dark">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@nursingcouncilbahamas.com"
                      className="council-text-link mt-2 inline-flex min-h-11 max-w-full items-center break-all text-slate-700"
                    >
                      info@nursingcouncilbahamas.com
                    </a>
                  </div>
                </article>
                <article className="flex gap-4 p-6 lg:p-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-council-primary text-white">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-council-dark">
                      Visit Us
                    </h3>
                    <address className="mt-2 not-italic leading-relaxed text-slate-700">
                      #23 Capitol House
                      <br />
                      Virginia & Augusta Street
                      <br />
                      Nassau, Bahamas
                    </address>
                  </div>
                </article>
              </div>
              <div className="border-t border-slate-200 px-6 py-6 text-center">
                <Link
                  href="/contact"
                  className="council-action inline-flex min-h-11 items-center rounded-[4px] bg-council-primary px-8 py-3 font-semibold text-white focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                >
                  Get in Touch
                  <ArrowRight
                    className="council-arrow ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
