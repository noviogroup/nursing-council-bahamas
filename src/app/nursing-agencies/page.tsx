import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ClipboardText,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Licensed Nursing Agencies',
  description: 'Find nursing agency licensing information, the Council review pathway, and the current list of licensed nursing agencies in The Bahamas.',
  path: '/nursing-agencies',
  image: '/assets/approved/agency-hero-home-care.jpg',
});

const agencyHighlights = [
  {
    title: 'Current Forms & Documents',
    description: 'Agency application, renewal, and compliance documents will be published after Council approval.',
    icon: ClipboardText,
    status: 'Approved documents pending',
  },
  {
    title: 'Agency Process',
    description: 'Overview of the review pathway for operating a nursing agency in The Bahamas.',
    icon: ClipboardText,
    items: ['Submit application documents', 'Council compliance review', 'Licensure, renewal, or follow-up decision'],
  },
];

const licensedAgencies = [
  {
    name: 'Angels Elite Nursing Services',
    logo: '/assets/agencies/angels-elite.jpg',
    logoAlt: 'Angels Elite Nursing Services logo',
    logoClassName: 'object-contain p-7 sm:p-8',
    logoPanelClassName: 'bg-white',
  },
  {
    name: 'Blessed Beginnings Midwifery and Nursing Agency',
    logo: '/assets/agencies/blessed-beginning.jpg',
    logoAlt: 'Blessed Beginning Midwifery and Nursing Agency logo',
    logoClassName: 'object-contain p-5',
    logoPanelClassName: 'bg-[#fbf7fc]',
  },
  {
    name: 'Happy Healing Home Care',
    logo: '/assets/agencies/happy-healing.png',
    logoAlt: 'Happy Healing Homecare logo',
    logoClassName: 'object-contain p-7 sm:p-8',
    logoPanelClassName: 'bg-council-primary',
  },
];

export default function NursingAgenciesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative isolate min-h-[520px] overflow-hidden bg-council-primary text-white lg:min-h-[580px]"
          data-page-hero="nursing-agencies"
        >
          <div className="absolute inset-y-0 right-0 w-[88%] sm:w-[72%] lg:w-[52%]">
            <Image
              src="/assets/approved/agency-hero-home-care.jpg"
              alt="Nurse providing care and medication guidance to an older adult at home"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 88vw"
              className="object-cover object-[35%_center] lg:object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          </div>
          <div className="container relative mx-auto flex min-h-[520px] items-center px-4 py-20 lg:min-h-[580px] lg:py-28">
            <div className="max-w-[88%] sm:max-w-2xl lg:max-w-[58%]">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Nursing agencies
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Agency licensing and compliance.
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Review licensed nursing agencies, required documents, and the Council process for agency licensing and renewal.
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
                  Public agency information
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Current licensed nursing agencies.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                The following names are from the current nursing-agency list supplied by the Council. Contact the Council to confirm licence status or obtain additional information.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {licensedAgencies.map((agency, index) => (
                <article key={agency.name} className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
                  <div className={`relative h-44 border-b border-slate-200 ${agency.logoPanelClassName}`}>
                    <Image
                      src={agency.logo}
                      alt={agency.logoAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className={agency.logoClassName}
                    />
                  </div>
                  <div className="p-7">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-council-primary text-white">
                        <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="font-heading text-2xl font-bold text-council-accent">0{index + 1}</span>
                    </div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-council-primary">Current agency</p>
                    <h3 className="font-heading text-2xl font-bold leading-tight text-council-dark">{agency.name}</h3>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 lg:grid-cols-2">
              {agencyHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <article key={highlight.title} className="bg-white p-7">
                    <div className="mb-8 flex items-start justify-between">
                      <Icon className="h-9 w-9 text-council-primary" aria-hidden="true" />
                      <span className="font-heading text-2xl font-bold text-council-accent">0{index + 4}</span>
                    </div>
                    <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">{highlight.title}</h3>
                    <p className="mb-6 leading-relaxed text-gray-600">{highlight.description}</p>
                    {highlight.items ? (
                      <ol className="space-y-3 border-t border-slate-200 pt-5">
                        {highlight.items.map((item, itemIndex) => (
                          <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-relaxed text-gray-700">
                            <span className="font-heading font-bold text-council-accent">0{itemIndex + 1}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="border-t border-slate-200 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-council-primary">
                        {highlight.status}
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Agency enquiries</p>
              <h2 className="font-heading text-4xl font-bold">Contact the Council for current agency guidance.</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
              Contact the Council
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
