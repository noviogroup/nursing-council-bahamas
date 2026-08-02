import Link from "next/link";
import Image from "next/image";
import {
  EnvelopeSimple as Mail,
  FacebookLogo as Facebook,
  LinkedinLogo as Linkedin,
  MapPin,
  Phone,
  TwitterLogo as Twitter,
} from "@phosphor-icons/react/dist/ssr";
import { portalPath } from "@/lib/portal";

export default function Footer() {
  const quickLinks = [
    { name: "Register", href: portalPath("/register?type=registration") },
    { name: "Renew Licence", href: portalPath("/register?type=renewal") },
    { name: "Education", href: "/education-training" },
    { name: "Forms & Documents", href: "/forms" },
    { name: "Legal", href: "/legal-ethics" },
    { name: "Verification", href: "/verification" },
    { name: "Submit Complaint", href: "/complaints/new" },
    { name: "Track Complaint", href: "/complaints/track" },
    { name: "Committees", href: "/committees" },
    { name: "Contact", href: "/contact" },
  ];

  const committees = [
    "Education Committee",
    "Examination Committee",
    "Finance Committee",
    "Registration Committee",
    "Standards and Practice Committee",
    "Disciplinary and Penal Cases Committee",
  ];

  return (
    <footer className="border-t-2 border-council-accent bg-council-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* About Section */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/nursing-council-logo.png"
                alt="The Nursing Council of the Commonwealth of The Bahamas Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div>
                <h3 className="font-heading text-lg font-bold">
                  The Nursing Council
                </h3>
                <p className="text-sm text-gray-300">
                  of the Commonwealth of The Bahamas
                </p>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-gray-300">
              Guiding and promoting excellence in the practice of nursing
              throughout the Commonwealth of The Bahamas.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/nursingcouncilbahamas"
                className="council-action inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gray-200 hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
                aria-label="Nursing Council on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/nursingcouncilbs"
                className="council-action inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gray-200 hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
                aria-label="Nursing Council on X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/nursing-council-bahamas"
                className="council-action inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gray-200 hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
                aria-label="Nursing Council on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading mb-3 text-lg font-semibold">
              Quick Links
            </h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="council-action inline-flex min-h-9 items-center text-sm text-gray-300 hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Committees */}
          <div>
            <h4 className="font-heading mb-3 text-lg font-semibold">
              Committees
            </h4>
            <ul>
              {committees.map((committee) => (
                <li key={committee}>
                  <Link
                    href="/committees"
                    className="council-action inline-flex min-h-9 items-center text-sm text-gray-300 hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
                  >
                    {committee}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading mb-4 text-lg font-semibold">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-council-accent mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  #23 Capitol House
                  <br />
                  Virginia & Augusta Street
                  <br />
                  Nassau, Bahamas
                </div>
              </div>
              <a
                href="tel:+12426046015"
                className="council-action flex min-h-11 items-center gap-3 text-gray-300 hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
              >
                <Phone className="h-4 w-4 text-council-accent flex-shrink-0" />
                <span className="text-sm">(242) 604-6015 / 6017</span>
              </a>
              <a
                href="mailto:info@nursingcouncilbahamas.com"
                className="council-action flex min-h-11 items-center gap-3 text-gray-300 hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-council-primary"
              >
                <Mail className="h-4 w-4 text-council-accent flex-shrink-0" />
                <span className="break-all text-sm">
                  info@nursingcouncilbahamas.com
                </span>
              </a>
              <div className="text-sm text-gray-300 mt-2">
                <strong>Office Hours:</strong>
                <br />
                Monday - Friday: 9:00am - 5:00pm
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-gray-300 md:mb-0">
              © 2026 The Nursing Council of the Commonwealth of The Bahamas. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 text-sm text-gray-300">
              <Link
                href="/privacy"
                className="council-action inline-flex min-h-11 items-center hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="council-action inline-flex min-h-11 items-center hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="council-action inline-flex min-h-11 items-center hover:text-council-accent focus:outline-none focus:ring-2 focus:ring-council-accent"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
