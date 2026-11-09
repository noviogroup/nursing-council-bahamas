import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Link from "next/link";
import {
  ArrowRight,
  CurrencyDollar,
  FileText,
  Gavel,
  GraduationCap,
  Shield,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import { InteriorPageHeader } from "@/components/InteriorPage";
import Footer from "@/components/Footer";
import { portalPath } from "@/lib/portal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Council Committees",
  description:
    "Learn about the Nursing Council committees supporting education, examinations, finance, registration, standards, and professional conduct.",
  path: "/committees",
});

type Committee = {
  id: string;
  name: string;
  icon: PhosphorIcon;
  description: string;
  link: { label: string; href: string };
};

const committees: Committee[] = [
  {
    id: "education",
    name: "Education Committee",
    icon: GraduationCap,
    description:
      "Supports Council oversight of nursing education and training standards.",
    link: { label: "Education and training", href: "/education-training" },
  },
  {
    id: "examination",
    name: "Examination Committee",
    icon: FileText,
    description:
      "Supports fair and secure examinations for entry to nursing practice.",
    link: {
      label: "Apply for an examination",
      href: portalPath("/start/exam"),
    },
  },
  {
    id: "finance",
    name: "Finance Committee",
    icon: CurrencyDollar,
    description:
      "Supports the Council’s financial oversight and responsible use of resources.",
    link: { label: "Contact the Council", href: "/contact" },
  },
  {
    id: "registration",
    name: "Registration Committee",
    icon: Users,
    description:
      "Supports the Council’s review of registration and enrolment matters.",
    link: {
      label: "Registration and enrolment",
      href: portalPath("/start/registration"),
    },
  },
  {
    id: "standards-practice",
    name: "Standards and Practice Committee",
    icon: Shield,
    description:
      "Supports nursing and midwifery practice standards and professional guidance.",
    link: { label: "Legal and ethics guidance", href: "/legal-ethics" },
  },
  {
    id: "disciplinary",
    name: "Disciplinary and Penal Cases Committee",
    icon: Gavel,
    description:
      "Supports the Council’s review of complaints and professional conduct matters through its established process.",
    link: { label: "Complaints and concerns", href: "/complaints" },
  },
];

export default function CommitteesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Council committees"
          description="Six committees support the Council’s work in education, examinations, finance, registration, practice standards and professional conduct."
        />

        <section
          className="bg-slate-50 py-12 lg:py-16"
          aria-label="Council committee roles"
        >
          <div className="container mx-auto px-4">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {committees.map((committee) => {
                const Icon = committee.icon;
                return (
                  <article
                    id={committee.id}
                    key={committee.id}
                    aria-labelledby={`${committee.id}-title`}
                    className="flex scroll-mt-8 flex-col rounded-lg border border-slate-200 bg-white p-6 md:p-7"
                  >
                    <Icon
                      className="mb-5 h-8 w-8 text-council-primary"
                      aria-hidden="true"
                    />
                    <h2
                      id={`${committee.id}-title`}
                      className="font-heading mb-3 text-2xl font-bold leading-tight text-council-dark"
                    >
                      {committee.name}
                    </h2>
                    <p className="mb-6 leading-relaxed text-slate-600">
                      {committee.description}
                    </p>
                    <Link
                      href={committee.link.href}
                      className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm font-semibold text-council-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary"
                    >
                      {committee.link.label}
                      <ArrowRight
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
