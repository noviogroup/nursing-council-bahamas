import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  DownloadSimple,
  FileText,
  Gavel,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const frameworks = [
  {
    id: 'act',
    title: 'Nurses and Midwives Act, 2023',
    description:
      'The current Act governing nursing and midwifery education, registration, licensure, conduct, and professional practice.',
    status: '2023 Act available',
    links: [
      {
        label: 'Nurses and Midwives Act, 2023',
        href: '/documents/nurses-and-midwives-act-2023.pdf',
      },
      {
        label: '2024 Appointed Day Notice',
        href: 'https://laws.bahamas.gov.bs/cms/images/LEGISLATION/SUBORDINATE/2024/2024-0069/2024-0069.pdf',
      },
    ],
    note: 'This updated Act document was supplied for publication by the Council.',
    icon: Gavel,
  },
];

export default function LegalEthicsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative isolate min-h-[520px] overflow-hidden bg-council-primary text-white lg:min-h-[580px]"
          data-page-hero="legal"
        >
          <div className="absolute inset-y-0 right-0 w-[88%] sm:w-[72%] lg:w-[52%]">
            <Image
              src="/assets/approved/legal-hero-nurse.jpg"
              alt="Nursing professional wearing a stethoscope"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 88vw"
              className="object-cover object-[60%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          </div>
          <div className="container relative mx-auto flex min-h-[520px] items-center px-4 py-20 lg:min-h-[580px] lg:py-28">
            <div className="max-w-[88%] sm:max-w-2xl lg:max-w-[58%]">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Legal framework
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Laws and professional accountability.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Access the legal framework that guides nursing and midwifery education, registration, conduct, and professional practice.
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
                  Council documents
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Act and regulations.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                The 2023 Act is linked now. Related regulations can be added when approved for publication.
              </p>
            </div>

            <div className="grid max-w-3xl gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200">
              {frameworks.map((framework) => {
                const Icon = framework.icon;
                return (
                  <article id={framework.id} key={framework.title} className="bg-white p-8 scroll-mt-24">
                    <Icon className="mb-8 h-10 w-10 text-council-primary" aria-hidden="true" />
                    <span className="mb-4 inline-flex rounded-sm bg-council-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-council-primary">
                      {framework.status}
                    </span>
                    <h3 className="font-heading mb-4 text-3xl font-bold text-council-dark">{framework.title}</h3>
                    <p className="mb-8 leading-relaxed text-gray-600">{framework.description}</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      {framework.links.map((link) => {
                        const isExternal = link.href.startsWith('http');
                        const className = 'inline-flex items-center gap-2 rounded-sm bg-council-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-council-secondary';

                        return isExternal ? (
                          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={className}>
                            <DownloadSimple className="h-4 w-4" aria-hidden="true" />
                            {link.label}
                          </a>
                        ) : (
                          <Link key={link.href} href={link.href} className={className}>
                            <DownloadSimple className="h-4 w-4" aria-hidden="true" />
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                    {framework.note && (
                      <p className="mt-5 flex gap-3 rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-council-primary" aria-hidden="true" />
                        {framework.note}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Need help interpreting a requirement?</p>
              <h2 className="font-heading text-4xl font-bold">Contact the Council for legal framework guidance.</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
