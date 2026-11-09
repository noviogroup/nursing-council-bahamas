import Link from 'next/link';
import Image from 'next/image';
import {
  EnvelopeSimple as Mail,
  FacebookLogo as Facebook,
  LinkedinLogo as Linkedin,
  MapPin,
  Phone,
  TwitterLogo as Twitter,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr';
import { portalPath } from '@/lib/portal';
import { isLinkAvailable, publicSiteLive } from '@/lib/siteAvailability';
import { StagedFooter } from '@/components/StagedChrome';
import { councilContact } from '@/lib/councilContent';

export default function Footer() {
  if (!publicSiteLive) {
    return <StagedFooter />;
  }

  const quickLinks = [
    { name: 'Register / Enroll', href: portalPath('/start/registration') },
    { name: 'Licence renewal', href: '/forms#licence-renewal' },
    { name: 'Education', href: '/education-training' },
    { name: 'Forms & Applications', href: '/forms' },
    { name: 'Nurse Registry', href: '/registry' },
    { name: 'Code of Ethics & the Act', href: '/legal-ethics' },
    { name: 'Submit a Complaint', href: '/complaints/new' },
    { name: 'Track Complaint', href: '/complaints/track' },
  ].filter((link) => isLinkAvailable(link.href));

  return (
    <footer className="bg-council-primary text-white border-t-2 border-council-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/nursing-council-logo.png"
                alt="The Nursing Council of the Commonwealth of The Bahamas Logo"
                className="h-10 w-auto"
              />
              <div>
                <h3 className="font-heading text-lg font-bold">The Nursing Council</h3>
                <p className="text-sm text-gray-300">of the Commonwealth of The Bahamas</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Guiding and promoting excellence in the practice of nursing throughout the Commonwealth of The Bahamas.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/nursingcouncilbahamas" className="text-gray-300 hover:text-council-accent transition-colors" aria-label="Nursing Council on Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/nursingcouncilbs" className="text-gray-300 hover:text-council-accent transition-colors" aria-label="Nursing Council on X">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/nursing-council-bahamas" className="text-gray-300 hover:text-council-accent transition-colors" aria-label="Nursing Council on LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={councilContact.whatsappChannel} target="_blank" rel="noreferrer" className="text-[#25d366] hover:text-[#7bedaa] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-4 focus:ring-offset-council-primary" aria-label="Nursing Council WhatsApp channel">
                <WhatsappLogo className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-council-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-council-accent mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  #23 Capitol House<br />
                  Virginia and Augusta Streets<br />
                  Nassau, Bahamas
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-council-accent flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  (242) 604-6015 / 6017
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-council-accent flex-shrink-0" />
                <a href="mailto:info@nursingcouncilbahamas.com" className="min-w-0 break-words text-sm text-gray-300 hover:text-white">
                  info@nursingcouncilbahamas.com
                </a>
              </div>
              <div className="text-sm text-gray-300 mt-2">
                <strong>Office Hours:</strong><br />
                Monday - Friday: 9:00am - 5:00pm
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2026 The Nursing Council of the Commonwealth of The Bahamas. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-council-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-council-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-council-accent transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-white/20 pt-6 text-center sm:flex-row sm:gap-5">
            <p className="text-sm leading-relaxed text-gray-300">
              Digital transformation delivered in partnership with
            </p>
            <Image
              src="/assets/brand/novio-logo-reverse.png"
              alt="Novio Group"
              width={112}
              height={36}
              className="h-auto w-28 shrink-0 object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
