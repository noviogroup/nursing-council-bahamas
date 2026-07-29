import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  DownloadSimple,
  FileText,
  Gavel,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const frameworks = [
  {
    id: 'act',
    title: 'Nurses and Midwives Act References',
    description:
      'Official Act-related references for nursing and midwifery education, registration, licensure, and professional practice.',
    status: 'Official links available',
    links: [
      {
        label: 'Nurses and Midwives Act, 1971',
        href: 'https://laws.bahamas.gov.bs/cms/images/LEGISLATION/PRINCIPAL/1971/1971-0012/1971-0012_1.pdf',
      },
      {
        label: '2024 Appointed Day Notice',
        href: 'https://laws.bahamas.gov.bs/cms/images/LEGISLATION/SUBORDINATE/2024/2024-0069/2024-0069.pdf',
      },
    ],
    note: 'The full official Nurses and Midwives Act, 2023 PDF is pending confirmation before publication on this website.',
    icon: Gavel,
  },
  {
    id: 'code-of-ethics',
    title: 'Code of Ethics for Nurses 2025',
    description:
      'The ethical framework for nurses, midwives, students, educators, administrators, and researchers.',
    status: 'PDF available',
    links: [
      {
        label: 'Code of Ethics for Nurses 2025',
        href: '/documents/code-of-ethics-for-nurses-2025.pdf',
      },
    ],
    note: '',
    icon: BookOpen,
  },
];

const ethicsSummary = [
  'Trustworthy patient-centred care',
  'Safe practice environments',
  'A respected profession',
  'Health and wellbeing',
];

export default function LegalEthicsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Legal & ethical frameworks
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Laws, ethics, and professional accountability.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Access the Council framework that guides nursing and midwifery education, registration, conduct, and professional practice.
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
                  Act and Code of Ethics.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                The Code of Ethics is linked now. Available official Act-related references are linked while the full 2023 Act PDF remains pending confirmation.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 md:grid-cols-2">
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

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                <span className="h-px w-9 bg-council-accent" />
                Ethics summary
              </p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                The 2025 Code in four core elements.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                This summary supports public understanding. The full Code remains the authoritative reference.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {ethicsSummary.map((item, index) => (
                <div key={item} className="bg-white p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <ShieldCheck className="h-8 w-8 text-council-primary" aria-hidden="true" />
                    <span className="font-heading text-xl font-bold text-council-accent">0{index + 1}</span>
                  </div>
                  <p className="font-heading text-xl font-bold text-council-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Need help interpreting a requirement?</p>
              <h2 className="font-heading text-4xl font-bold">Contact the Council for legal or ethical framework guidance.</h2>
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
