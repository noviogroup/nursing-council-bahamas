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
  GlobeHemisphereWest,
  IdentificationCard,
  ShieldCheck,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComingSoon from '@/components/ComingSoon';
import Nurse360IntroVideo from '@/components/Nurse360IntroVideo';
import WhatsAppChannelCard from '@/components/WhatsAppChannelCard';
import NewsCard from '@/components/NewsCard';
import HomeWelcome from '@/components/HomeWelcome';
import Nurse360Videos from '@/components/Nurse360Videos';
import { portalPath } from '@/lib/portal';
import { featuredNewsArticles } from '@/lib/news';
import { createPageMetadata, organizationStructuredData, SITE_NAME } from '@/lib/seo';
import { councilContact } from '@/lib/councilContent';

const publicSiteLive = process.env.PUBLIC_SITE_LIVE === 'true';

export const metadata = publicSiteLive
  ? createPageMetadata({
      title: SITE_NAME,
      description: 'The Nursing Council is going digital. Get started with indexing, registration, examinations and existing-nurse services in Nurse 360.',
      path: '/',
    })
  : {
      title: `Nursing is going digital | ${SITE_NAME}`,
      description: 'The Nursing Council is preparing a simpler digital experience for registration, renewals, verification, and professional guidance.',
      robots: { index: false, follow: false },
    };

const services = [
  {
    icon: GraduationCap,
    title: 'Indexing',
    description: 'Starting nursing school? Begin with student indexing.',
    action: 'Start student indexing',
    href: portalPath('/start/indexing'),
    image: '/assets/approved/hero-education.png',
    imageAlt: 'Nursing students receiving clinical skills instruction',
    imagePosition: 'object-top',
  },
  {
    icon: IdentificationCard,
    title: 'I’m already a nurse',
    description: 'Access Council services and keep your details current.',
    action: 'Get started with Nurse 360',
    href: portalPath('/start/registered-nurse'),
    image: '/assets/approved/nurses-bahamas.png',
    imageAlt: 'Nurses gathered at a professional ceremony in The Bahamas',
    imagePosition: 'object-[center_25%] sm:object-[center_18%] md:object-[center_25%]',
  },
  {
    icon: GlobeHemisphereWest,
    title: 'International application',
    description: 'Trained outside The Bahamas? Explore your registration route.',
    action: 'Start international application',
    href: portalPath('/start/international'),
    image: '/assets/approved/tcn-nurses-1.jpg',
    imageAlt: 'Trained Clinical Nurses at a formal nursing ceremony',
    imagePosition: 'object-[center_18%] sm:object-[center_10%] md:object-[center_18%]',
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
    description: 'Set standards for nursing education, registration, enrollment, conduct, and continuing professional practice.',
  },
  {
    icon: Building,
    title: 'Education, Registration & Enrollment',
    description: 'Maintain the nurse registry, oversee nursing education standards, and support high-quality nursing care across The Bahamas.',
  },
];

export default function HomePage() {
  if (!publicSiteLive) {
    return <ComingSoon />;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <HomeWelcome>
      <Header />
      <main className="[overflow-wrap:anywhere] flex-1">
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
            <div className="min-w-0 max-w-3xl break-words">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Commonwealth of The Bahamas
              </p>
              <h1 id="home-title" tabIndex={-1} className="font-heading mb-6 text-4xl font-bold leading-tight outline-none md:text-6xl">
                The Nursing Council<br />
                is going digital.
              </h1>
              <p className="max-w-2xl text-xl font-light leading-relaxed text-white/95 md:text-2xl">
                A simpler way to access Council services, from your first day
                of training to your nursing career.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Nurse360IntroVideo logo className="min-h-12 rounded-[8px] border border-white bg-white px-6 py-3 text-council-primary transition-colors hover:bg-rose-50 focus-visible:!outline-white" />
                <Link href="/complaints/new" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-[#f23d5c] bg-[#f23d5c] px-6 py-3 font-semibold text-white transition-colors hover:border-[#df2f4d] hover:bg-[#df2f4d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">File a complaint <ArrowRight size={18} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12" aria-label="Online services">
          <div className="container mx-auto px-4">
            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="font-heading text-3xl font-bold text-council-dark md:text-4xl">Get started online</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="group flex min-w-0 flex-col overflow-hidden rounded-[8px] bg-council-primary text-white">
                    <div className="relative h-28 overflow-hidden lg:h-32">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className={`object-cover opacity-60 ${service.imagePosition}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-council-primary via-council-primary/20 to-transparent" />
                      <div className="absolute bottom-2 left-6 text-white">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col px-6 pb-5 pt-3">
                      <h3 className="font-heading mb-2 text-xl font-bold leading-snug text-white lg:text-2xl">{service.title}</h3>
                      <p className="mb-3 text-sm leading-relaxed text-white/90">{service.description}</p>
                      <Link href={service.href} className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                        {service.action}
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap">
              <Link href="/education-training" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[8px] border border-council-primary/25 bg-white px-5 py-3 font-semibold text-council-primary transition-colors hover:border-council-primary hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">Approved schools &amp; programmes <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/verification" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[8px] border border-council-primary/25 bg-white px-5 py-3 font-semibold text-council-primary transition-colors hover:border-council-primary hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">Verification services <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="border-y border-rose-100 bg-[#fff4f5] py-10" aria-labelledby="nurse360-heading">
          <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_auto]">
            <Image src="/assets/nurse360/logo.png" alt="Nurse 360" width={1200} height={239} className="h-auto w-56 max-w-full" />
            <div>
              <h2 id="nurse360-heading" className="font-heading text-2xl font-bold text-council-dark md:text-3xl">The Council’s online services portal.</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-700">Review the guidance, start your application and follow Council updates in one place.</p>
            </div>
            <Nurse360IntroVideo className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-council-primary/20 bg-white px-5 py-3 font-semibold text-council-primary transition-colors hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary md:col-start-2 xl:col-start-auto" />
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20" aria-labelledby="about-council-heading">
          <div className="container mx-auto grid grid-cols-1 gap-6 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-x-10 lg:gap-y-6 xl:gap-x-12">
            <h2 id="about-council-heading" className="font-heading text-3xl font-bold leading-tight text-council-dark sm:text-4xl lg:col-start-2 lg:row-start-1 lg:text-5xl">Guiding the future of nursing in The Bahamas</h2>
            <div className="relative min-w-0 overflow-hidden rounded-[8px] bg-slate-100 shadow-sm lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-[480px]">
              <div className="relative h-[320px] sm:h-[420px] lg:absolute lg:inset-0 lg:h-auto">
                <Image
                  src="/assets/approved/nurses-bahamas.png"
                  alt="Nurses seated together during a ceremony in The Bahamas"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-council-primary/70 via-council-primary/10 to-transparent" />
              </div>
              <div className="relative mx-4 -mt-8 mb-4 min-w-0 rounded-[8px] bg-council-primary/95 p-6 text-white shadow-xl backdrop-blur-sm lg:absolute lg:bottom-6 lg:right-6 lg:m-0 lg:w-[68%]">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
                    <Image
                      src="/nursing-council-logo.png"
                      alt="Nursing Council of The Bahamas"
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Since 1972</p>
                </div>
                <p className="mt-3 break-words text-lg font-semibold leading-relaxed">
                  Safeguarding the public through nursing regulation, education standards, and professional accountability.
                </p>
              </div>
            </div>

            <div className="lg:col-start-2 lg:row-start-2">
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                The Nursing Council safeguards the public through the regulation of nursing education, registration, enrollment, and practice across the Commonwealth of The Bahamas.
              </p>

              <div className="mt-6 space-y-4">
                {councilHighlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <article key={highlight.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 rounded-[8px] bg-gray-50 p-5 transition-all duration-300 hover:bg-white hover:shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-council-primary text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 break-words">
                        <h3 className="font-heading text-xl font-bold text-council-dark">{highlight.title}</h3>
                        <p className="mt-2 leading-relaxed text-gray-600">{highlight.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <Link href="/about" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-council-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                Learn about the Council
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <Nurse360Videos />

        <section className="bg-slate-50 py-14 lg:py-16" aria-labelledby="latest-news-heading">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <span className="mb-4 block h-1 w-10 rounded-full bg-[#f23d5c]" aria-hidden="true" />
                <h2 id="latest-news-heading" className="font-heading text-3xl font-bold leading-tight text-council-primary md:text-4xl">Nursing &amp; midwifery news</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">News and updates from the original publishers.</p>
              </div>
              <Link href="/news" className="inline-flex min-h-11 w-fit shrink-0 items-center gap-3 rounded-[8px] border border-council-primary/20 bg-white px-4 text-sm font-semibold text-council-primary transition-colors hover:border-council-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">
                View all news
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
              {featuredNewsArticles[0] && <NewsCard article={featuredNewsArticles[0]} variant="featured" />}
              <div className="grid gap-4">
                {featuredNewsArticles.slice(1).map((article) => (
                  <NewsCard key={article.href} article={article} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16" aria-label="Need assistance contact section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading mb-4 text-3xl font-bold text-council-primary">Need Assistance?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">Our team is here to help with nursing registration, enrollment, licensing, and professional development needs.</p>
            <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><Phone className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Call Us</h3><a href="tel:+12426046015" className="text-gray-600 hover:underline">(242) 604-6015 / 6017</a><p className="mt-1 text-sm text-gray-500">Mon-Fri: 9:00am - 5:00pm</p></div>
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><Mail className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Email Us</h3><a href="mailto:info@nursingcouncilbahamas.com" className="break-words text-gray-600 hover:underline">info@nursingcouncilbahamas.com</a></div>
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><MapPin className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Visit Us</h3><address className="not-italic text-gray-600">#23 Capitol House<br />Virginia and Augusta Streets<br />Nassau, Bahamas</address></div>
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366]"><WhatsappLogo className="h-8 w-8 text-[#063b23]" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-[#075e54]">Stay Informed</h3><a href={councilContact.whatsappChannel} target="_blank" rel="noreferrer" className="text-[#075e54] hover:underline">Follow our WhatsApp channel</a><p className="mt-1 text-sm text-gray-500">Official Council announcements</p></div>
            </div>
            <Link href="/contact" className="inline-flex items-center rounded-[8px] bg-council-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">Get in Touch <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
          </div>
        </section>
        <WhatsAppChannelCard />
      </main>
      <Footer />
      </HomeWelcome>
    </>
  );
}
