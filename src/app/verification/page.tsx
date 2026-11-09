import Link from "next/link";
import {
  ArrowRight,
  IdentificationCard,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import {
  InteriorPageHeader,
  PageAction,
  PageAssistance,
} from "@/components/InteriorPage";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { portalPath } from "@/lib/portal";

export const metadata = createPageMetadata({
  title: "Registration and Licence Verification",
  description:
    "Browse the nurse registry, access licence verification, or request official good-standing guidance from the Nursing Council.",
  path: "/verification",
});

const verificationOptions = [
  {
    audience: "For the public",
    title: "Verify a nurse’s registration or enrollment",
    description:
      "Search the public registry by name or registration/enrollment number.",
    icon: IdentificationCard,
    action: "Browse the nurse registry",
    href: "/registry",
  },
  {
    audience: "For nurses",
    title: "Request a Letter of Good Standing",
    description:
      "Sign in to Nurse 360 and choose Certificate of good standing in Certificates & Letters. Have the purpose and recipient details ready.",
    icon: SealCheck,
    action: "Open Certificates & Letters",
    href: portalPath("/nursing/certificates"),
  },
];

const publicInfo = [
  "Nurse’s name",
  "Registration or enrollment type",
  "Registration or enrollment number",
  "Original registration or enrollment year",
];

export default function VerificationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Verification services"
          description="Search the public nurse registry or request an official Letter of Good Standing through Nurse 360."
        />
        <section
          className="bg-white py-10 lg:py-12"
          aria-label="Choose a verification service"
        >
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
            {verificationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <article
                  key={option.title}
                  className="flex flex-col items-start rounded-lg border border-slate-200 bg-white p-6 sm:p-8"
                >
                  <div className="mb-5 flex items-center gap-3 text-council-primary">
                    <Icon size={28} aria-hidden="true" />
                    <p className="text-sm font-semibold">{option.audience}</p>
                  </div>
                  <h2 className="max-w-sm text-2xl font-bold leading-snug text-council-dark">
                    {option.title}
                  </h2>
                  <p className="mb-6 mt-3 max-w-lg leading-relaxed text-slate-600">
                    {option.description}
                  </p>
                  <div className="mt-auto">
                    <PageAction href={option.href}>{option.action}</PageAction>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section className="bg-slate-50 py-10 lg:py-12">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold text-council-dark">
                What the public registry shows
              </h2>
              <p className="mt-3 max-w-lg leading-relaxed text-slate-600">
                The registry lists registration and enrollment information. A
                registry entry is not a Letter of Good Standing. Contact the
                Council if you need clarification about a record.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Ask about a record <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {publicInfo.map((item) => (
                <li key={item} className="py-3.5 font-medium text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <PageAssistance
          title="Looking for a different letter or service?"
          description="Forms & Applications explains the available services, including Graduate Nurse Letters and Council-assisted requests."
          href="/forms"
          action="View Forms & Applications"
        />
      </main>
      <Footer />
    </>
  );
}
