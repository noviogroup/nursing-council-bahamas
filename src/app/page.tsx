import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Buildings as Building,
  CalendarBlank as Calendar,
  CheckCircle,
  GraduationCap,
  EnvelopeSimple as Mail,
  MapPin,
  Phone,
  ArrowsClockwise as RotateCcw,
  ShieldCheck,
  UserPlus,
  Users,
} from '@phosphor-icons/react/dist/ssr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

const services = [
  {
    icon: UserPlus,
    title: 'Register',
    description: 'Begin your nursing registration process and submit your application online.',
    action: 'Start registration',
    href: portalPath('/register?type=registration'),
    image: '/assets/services/registration-welcome.png',
    imageAlt: 'Nurse assisting an applicant at a registration desk',
    imagePosition: 'object-center',
  },
  {
    icon: RotateCcw,
    title: 'Renew Licence',
    description: 'Keep your annual nursing licence current with a simple online renewal.',
    action: 'Renew online',
    href: portalPath('/register?type=renewal'),
    image: '/assets/services/registration-review.webp',
    imageAlt: 'Nursing licence documents being reviewed at an office desk',
    imagePosition: 'object-center',
  },
  {
    icon: GraduationCap,
    title: 'Education & Training',
    description: 'Explore registration requirements, continuing education, and nursing agencies.',
    action: 'View requirements',
    href: '/education-registration',
    image: '/assets/services/agency-compliance.webp',
    imageAlt: 'Nursing professionals reviewing agency compliance paperwork',
    imagePosition: 'object-center',
  },
];

const newsItems = [
  {
    title: 'New Continuing Education Requirements Announced',
    date: 'January 15, 2025',
    excerpt: 'Updated CE requirements for 2025 nursing licence renewals now available.',
    href: '/news/continuing-education-2025',
    image: '/assets/nursing-ceremony-1.jpg',
    urgent: true,
  },
  {
    title: 'Annual Nursing Conference Registration Open',
    date: 'January 10, 2025',
    excerpt: 'Join us for the 2025 Annual Bahamas Nursing Conference this March.',
    href: '/news/annual-conference-2025',
    image: '/assets/nurse-pinning-ceremony.webp',
  },
  {
    title: 'Standards of Practice Update',
    date: 'December 20, 2024',
    excerpt: 'Review the updated standards of practice for nursing professionals.',
    href: '/news/standards-update-2024',
    image: '/assets/nursing-ceremony-2.jpg',
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative isolate min-h-[530px] overflow-hidden bg-council-primary text-white md:min-h-[565px]"
          aria-label="Nursing Council of the Bahamas"
        >
          <Image
            src="/assets/homepage-hero-nurses.png"
            alt="Registered nurses in The Bahamas"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          <div className="relative container mx-auto flex min-h-[530px] items-center px-4 py-20 md:min-h-[565px]">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Official regulatory authority
              </p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight md:text-6xl">
                Nursing Council,<br />
                Commonwealth of The Bahamas
              </h1>
              <p className="max-w-2xl text-xl font-light leading-relaxed text-white/95 md:text-2xl">
                Guide and promote excellence in the practice of nursing.
              </p>
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
              <p className="max-w-xl text-gray-600">Access the most frequently used Nursing Council services quickly and securely.</p>
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

        <section className="overflow-hidden bg-white pb-16" aria-label="About the Nursing Council">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[380px] lg:min-h-[570px]">
              <Image
                src="/assets/nursing-ceremony-1.jpg"
                alt="A nurse taking part in a nursing ceremony in The Bahamas"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center px-6 py-16 lg:px-16 xl:px-24">
              <div className="max-w-xl">
                <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-8 bg-council-accent" />
                  Get to know us
                  <span className="h-px w-8 bg-council-accent" />
                </p>
                <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Guiding the future of nursing in The Bahamas
                </h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  Established in 1971, the Nursing Council safeguards the public through the regulation of nursing education, registration, and professional standards across the Commonwealth of The Bahamas.
                </p>
              </div>
            </div>
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:-mt-32">
            <div className="ml-auto grid max-w-5xl gap-8 bg-gray-100 p-7 shadow-lg lg:grid-cols-[1.45fr_0.8fr] lg:p-12">
              <div>
                <ul className="space-y-4 text-council-dark">
                  {[
                    'Maintain the nursing register and licence qualified professionals',
                    'Set standards for nursing education and professional practice',
                    'Support continuing education and high-quality nursing care',
                    'Protect the public through accountable professional regulation',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-council-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/about" className="mt-8 inline-flex items-center gap-2 bg-council-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                  Learn about the Council
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="divide-y divide-slate-200 rounded-lg bg-white shadow-sm">
                <div className="flex items-center gap-5 p-6">
                  <Building className="h-10 w-10 shrink-0 text-council-primary" aria-hidden="true" />
                  <div><p className="text-3xl font-bold text-council-dark">1971</p><p className="text-sm text-gray-600">Established</p></div>
                </div>
                <div className="flex items-center gap-5 p-6">
                  <Users className="h-10 w-10 shrink-0 text-council-primary" aria-hidden="true" />
                  <div><p className="text-3xl font-bold text-council-dark">10</p><p className="text-sm text-gray-600">Council Members</p></div>
                </div>
                <div className="flex items-center gap-5 p-6">
                  <ShieldCheck className="h-10 w-10 shrink-0 text-council-primary" aria-hidden="true" />
                  <div><p className="text-3xl font-bold text-council-dark">7,000+</p><p className="text-sm text-gray-600">Active Registrants</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16" aria-label="Latest news and updates">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="font-heading mb-4 text-3xl font-bold text-council-dark">Latest News & Updates</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">Stay informed with the latest news, announcements, and updates from the Nursing Council.</p>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {newsItems.map((item) => (
                <article key={item.title} className="group overflow-hidden bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-council-primary focus-within:ring-offset-2">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-council-primary/35 to-transparent" />
                    {item.urgent && <span className="absolute left-4 top-4 bg-council-alert px-2 py-1 text-xs font-semibold text-white">URGENT</span>}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500"><Calendar className="mr-2 h-4 w-4" aria-hidden="true" /><time dateTime={item.date}>{item.date}</time></div>
                    </div>
                    <CardTitle className="font-heading text-lg font-semibold text-council-dark transition-colors hover:text-council-primary">
                      <Link href={item.href} className="focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">{item.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">{item.excerpt}</p>
                    <Link href={item.href} className="inline-flex items-center font-medium text-council-primary transition-colors hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">
                      Read More <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </article>
              ))}
            </div>
            <div className="text-center"><Link href="/news" className="inline-flex items-center px-3 py-2 text-lg font-medium text-council-primary transition-colors hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">View All News & Updates <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section className="bg-white py-16" aria-label="Need assistance contact section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading mb-4 text-3xl font-bold text-council-primary">Need Assistance?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">Our team is here to help with your nursing registration, licensing, and professional development needs.</p>
            <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><Phone className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Call Us</h3><a href="tel:+12426046015" className="text-gray-600 hover:underline">(242) 604-6015 / 6017</a><p className="mt-1 text-sm text-gray-500">Mon-Fri: 9:00am - 5:00pm</p></div>
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><Mail className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Email Us</h3><a href="mailto:info@nursingcouncilbahamas.com" className="text-gray-600 hover:underline">info@nursingcouncilbahamas.com</a><p className="mt-1 text-sm text-gray-500">We respond within 24 hours</p></div>
              <div><div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-council-primary"><MapPin className="h-8 w-8 text-white" aria-hidden="true" /></div><h3 className="mb-2 text-lg font-semibold text-council-primary">Visit Us</h3><address className="not-italic text-gray-600">Virginia & Augusta Streets<br />Nassau, Bahamas</address></div>
            </div>
            <Link href="/contact" className="inline-flex items-center rounded-md bg-council-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2">Get in Touch <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
