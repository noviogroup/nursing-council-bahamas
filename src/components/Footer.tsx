import Link from 'next/link';
import {
  EnvelopeSimple as Mail,
  FacebookLogo as Facebook,
  LinkedinLogo as Linkedin,
  MapPin,
  Phone,
  TwitterLogo as Twitter,
} from '@phosphor-icons/react/dist/ssr';
import { portalPath } from '@/lib/portal';

export default function Footer() {
  const quickLinks = [
    { name: 'Register', href: portalPath('/register?type=registration') },
    { name: 'Renew Licence', href: portalPath('/register?type=renewal') },
    { name: 'Confirm Registration', href: portalPath('/verify') },
    { name: 'Committees', href: '/committees' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  const committees = [
    'Education Committee',
    'Examination Committee',
    'Finance Committee',
    'Registration Committee',
    'Standards & Practice',
    'Disciplinary Committee',
  ];

  return (
    <footer className="bg-council-primary text-white border-t-2 border-council-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/nursing-council-logo.png"
                alt="Nursing Council of the Bahamas Logo"
                className="h-10 w-auto"
              />
              <div>
                <h3 className="font-heading text-lg font-bold">Nursing Council</h3>
                <p className="text-sm text-gray-300">Commonwealth of The Bahamas</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Guide and promote excellence in the practice of nursing throughout the Commonwealth of The Bahamas since 1971.
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

          {/* Committees */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Committees</h4>
            <ul className="space-y-2">
              {committees.map((committee) => (
                <li key={committee}>
                  <Link
                    href="/committees"
                    className="text-gray-300 hover:text-council-accent transition-colors text-sm"
                  >
                    {committee}
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
                  Virginia & Augusta Streets<br />
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
                <div className="text-sm text-gray-300">
                  info@nursingcouncilbahamas.com
                </div>
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
              © 2025 Nursing Council of the Bahamas. All rights reserved.
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
        </div>
      </div>
    </footer>
  );
}
