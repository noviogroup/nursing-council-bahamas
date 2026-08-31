import Link from 'next/link';
import Image from 'next/image';
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
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';
import { featuredNewsArticles, formatNewsDate } from '@/lib/news';

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
    title: 'Public Protection',
    description: 'Protect the public through accountable regulation of nursing and midwifery practice.',
  },
  {
    icon: CheckCircle,
    title: 'Professional Standards',
    description: 'Set standards for nursing education, registration, conduct, and continuing professional practice.',
  },
  {
    icon: Building,
    title: 'Education & Registration',
    description: 'Maintain the nursing register, oversee nursing education standards, and support high-quality nursing care across The Bahamas.',
  },
];

const councilFacts = [
  { value: '1972', label: 'Established' },
  { value: '11', label: 'Council Members' },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative isolate min-h-[530px] overflow-hidden bg-council-primary text-white md:min-h-[565px]"
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
          <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/45 to-transparent" />
          <div className="relative container mx-auto flex min-h-[530px] items-center px-4 py-20 md:min-h-[565px]">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Official regulatory authority
              </p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight md:text-6xl">
                The Nursing Council of&nbsp;the<br />
                Commonwealth of The Bahamas.
              </h1>
              <p className="max-w-2xl text-xl font-light leading-relaxed text-white/95 md:text-2xl">
                Guiding and promoting excellence in the practice of nursing.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/indexing"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary"
                >
                  Nursing Student Indexing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/verification"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary"
                >
                  Verification
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16" aria-label="Online services">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-10 bg-council-accent" />
                  Online services
                </p>
                <h2 className="font-heading text-3xl font-bold text-council-dark md:text-4xl">Get started online</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-council-primary hover:shadow-xl">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${service.imagePosition}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-council-primary/35 to-transparent" />
                      <div className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-council-primary text-white shadow-lg">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">{service.title}</h3>
                      <p className="mb-7 leading-relaxed text-gray-600">{service.description}</p>
                      <Link href={service.href} className="inline-flex items-center gap-2 font-semibold text-council-primary transition-colors hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                        {service.action}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28" aria-label="About the Nursing Council">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">
            <div className="relative min-h-[520px] overflow-hidden rounded-[4px] bg-slate-100 shadow-sm">
              <Image
                src="/assets/approved/nurses-bahamas.png"
                alt="Nurses seated together during a ceremony in The Bahamas"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-council-primary/70 via-council-primary/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-[4px] bg-council-primary/95 p-6 text-white shadow-xl backdrop-blur-sm md:left-auto md:w-[68%]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Since 1972</p>
                <p className="mt-3 text-lg font-semibold leading-relaxed">
                  Safeguarding the public through nursing regulation, education standards, and professional accountability.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                <span className="h-[2px] w-8 bg-council-accent" />
                Get to know us
              </p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                Guiding the future of nursing in The Bahamas
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                The Nursing Council safeguards the public through the regulation of nursing education, registration, and professional standards practice across the Commonwealth of The Bahamas.
              </p>

              <div className="mt-8 space-y-5">
                {councilHighlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <article key={highlight.title} className="grid grid-cols-[3.5rem_1fr] gap-5 rounded-[4px] bg-gray-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-council-primary text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-council-dark">{highlight.title}</h3>
                        <p className="mt-2 leading-relaxed text-gray-600">{highlight.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-8 grid overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-sm sm:grid-cols-2">
                {councilFacts.map((fact) => (
                  <div key={fact.label} className="border-b border-slate-200 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                    <p className="font-heading text-3xl font-bold text-council-primary">{fact.value}</p>
                    <p className="mt-1 text-sm font-medium text-gray-600">{fact.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-[4px] bg-council-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                Learn about the Council
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28" aria-labelledby="latest-news-heading">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  News and updates
                </p>
                <h2 id="latest-news-heading" className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">Nursing news from The Bahamas.</h2>
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 font-semibold text-council-primary transition-colors hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                View all news
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredNewsArticles.map((article) => (
                <article key={article.href} className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image src={article.image} alt={article.imageAlt} fill sizes="(min-width: 1280px) 23vw, (min-width: 768px) 46vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      <span>{article.publisher}</span>
                      <time dateTime={article.publishedAt}>{formatNewsDate(article)}</time>
                    </div>
                    <h3 className="font-heading mt-4 text-xl font-bold leading-snug text-council-dark">{article.title}</h3>
                    <a href={article.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-council-primary transition-colors hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                      Read source article
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16" aria-label="Need assistance contact section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading mb-4 text-3xl font-bold text-council-primary">Need Assistance?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">Our team is here to help with your nursing registration, licensing, and professional development needs.</p>
            <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><Phone className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Call Us</h3><a href="tel:+12426046015" className="text-gray-600 hover:underline">(242) 604-6015 / 6017</a><p className="mt-1 text-sm text-gray-500">Mon-Fri: 9:00am - 5:00pm</p></div>
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><Mail className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Email Us</h3><a href="mailto:info@nursingcouncilbahamas.com" className="text-gray-600 hover:underline">info@nursingcouncilbahamas.com</a></div>
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><MapPin className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Visit Us</h3><address className="not-italic text-gray-600">#23 Capitol House<br />Virginia & Augusta Street<br />Nassau, Bahamas</address></div>
            </div>
            <Link href="/contact" className="inline-flex items-center rounded-sm bg-council-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">Get in Touch <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
