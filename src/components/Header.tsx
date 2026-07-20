'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, EnvelopeSimple as Mail, List as Menu, MapPin, Phone, X } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { portalPath } from '@/lib/portal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/education-registration', label: 'Education & Registration' },
    { href: '/committees', label: 'Committees' },
    { href: '/news', label: 'News & Updates' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm" role="banner">
      {/* Top Contact Bar */}
      <div className="bg-council-primary py-2 text-xs text-white sm:text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-4">
              <div className="hidden items-center gap-2 md:flex">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Virginia & Augusta Streets, Nassau</span>
              </div>
              <div className="flex min-w-0 items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@nursingcouncilbahamas.com"
                  className="truncate hover:underline"
                  aria-label="Email the Nursing Council at info@nursingcouncilbahamas.com"
                >
                  <span className="sm:hidden">Email Council</span>
                  <span className="hidden sm:inline">info@nursingcouncilbahamas.com</span>
                </a>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="tel:+12426046015"
                  className="whitespace-nowrap hover:underline"
                  aria-label="Call the Nursing Council at (242) 604-6015"
                >
                  <span className="sm:hidden">604-6015</span>
                  <span className="hidden sm:inline">(242) 604-6015 / 6017</span>
                </a>
              </div>
              <div className="hidden items-center gap-2 lg:flex">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>Mon-Fri: 9:00am - 5:00pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-3 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
              aria-label="Nursing Council of the Bahamas - Go to homepage"
            >
              <Image
                src="/nursing-council-logo.png"
                alt="Nursing Council of the Bahamas Official Logo"
                width={60}
                height={60}
                priority
                className="h-11 w-11 shrink-0 sm:h-14 sm:w-14"
              />
              <div className="min-w-0">
                <div className="whitespace-nowrap font-heading text-base font-bold text-council-dark sm:text-lg md:text-xl">
                  Nursing Council
                </div>
                <p className="hidden text-sm text-gray-600 sm:block">Commonwealth of The Bahamas</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-council-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 rounded-md px-2 py-1"
                  aria-label={`Navigate to ${item.label} page`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={portalPath('/verify')}
                className="font-medium text-council-primary hover:text-council-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 rounded-md px-2 py-1"
              >
                Verify Licence
              </Link>
              <Button asChild className="bg-council-primary hover:bg-council-secondary">
                <Link href={portalPath('/login')}>Portal Access</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="shrink-0 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                className="text-council-dark hover:text-council-primary"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="border-t border-gray-200 py-2 lg:hidden"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col gap-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-slate-50 hover:text-council-primary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} page`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={portalPath('/verify')}
                  className="mt-1 flex min-h-11 items-center border-t border-slate-200 px-3 pt-3 text-sm font-semibold text-council-primary transition-colors duration-200 hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  role="menuitem"
                >
                  Verify Licence
                </Link>
                <Link
                  href={portalPath('/login')}
                  className="flex min-h-11 items-center rounded-md bg-council-primary px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  role="menuitem"
                >
                  Portal Access
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
