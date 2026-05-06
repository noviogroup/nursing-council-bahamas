'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="bg-council-primary text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Virginia & Augusta Streets, Nassau</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a
                  href="mailto:info@nursingcouncilbahamas.com"
                  className="hover:underline"
                  aria-label="Email the Nursing Council at info@nursingcouncilbahamas.com"
                >
                  info@nursingcouncilbahamas.com
                </a>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a
                  href="tel:+12426046015"
                  className="hover:underline"
                  aria-label="Call the Nursing Council at (242) 604-6015"
                >
                  (242) 604-6015 / 6017
                </a>
              </div>
              <div className="flex items-center gap-2">
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
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 rounded-md"
              aria-label="Nursing Council of the Bahamas - Go to homepage"
            >
              <Image
                src="/nursing-council-logo.png"
                alt="Nursing Council of the Bahamas Official Logo"
                width={60}
                height={60}
                priority
                className="h-14 w-14"
              />
              <div>
                <h1 className="font-heading text-lg md:text-xl font-bold text-council-dark">
                  Nursing Council
                </h1>
                <p className="text-sm text-gray-600">Commonwealth of The Bahamas</p>
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
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
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
              className="lg:hidden border-t border-gray-200 py-4"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-medium text-gray-700 hover:text-council-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 rounded-md px-2 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-label={`Navigate to ${item.label} page`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
