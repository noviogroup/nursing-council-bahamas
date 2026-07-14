'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, UserPlus, RotateCcw, GraduationCap, ArrowRight, Phone, Mail, MapPin, Calendar, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = useMemo(() => [
    {
      url: '/assets/hero-1.jpg',
      alt: 'Nursing graduation ceremony in the Bahamas - new nurses in traditional white uniforms receiving their credentials'
    },
    {
      url: '/assets/hero-2.jpg',
      alt: 'Bahamas nursing graduates proudly displaying their certificates at the official pinning ceremony'
    },
    {
      url: '/assets/hero-3.jpg',
      alt: 'Traditional nursing graduation procession - Commonwealth of the Bahamas nursing professionals being honored'
    }
  ], []);

  // Preload images for smooth transitions
  useEffect(() => {
    heroImages.forEach((image) => {
      const img = new window.Image();
      img.src = image.url;
    });
  }, [heroImages]);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleCarouselNavigation = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleKeyboardCarouselNavigation = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCurrentImageIndex(index);
    }
  };

  const iconCards = [
    {
      image: '/assets/register-card.png',
      icon: <UserPlus className="h-6 w-6" aria-hidden="true" />,
      title: "Register",
      description: "Begin your nursing registration process",
      href: portalPath('/register?type=registration')
    },
    {
      image: '/assets/renew-license-card.png',
      icon: <RotateCcw className="h-6 w-6" aria-hidden="true" />,
      title: "Renew Licence",
      description: "Renew your annual nursing licence",
      href: portalPath('/register?type=renewal')
    },
    {
      image: '/assets/education-training-card.png',
      icon: <GraduationCap className="h-6 w-6" aria-hidden="true" />,
      title: "Education & Training",
      description: "Nursing education requirements and opportunities",
      href: "/education-registration"
    }
  ];

  const newsItems = [
    {
      title: "New Continuing Education Requirements Announced",
      date: "January 15, 2025",
      excerpt: "Updated CE requirements for 2025 nursing licence renewals now available.",
      href: "/news/continuing-education-2025",
      urgent: true
    },
    {
      title: "Annual Nursing Conference Registration Open",
      date: "January 10, 2025",
      excerpt: "Join us for the 2025 Annual Bahamas Nursing Conference this March.",
      href: "/news/annual-conference-2025"
    },
    {
      title: "Standards of Practice Update",
      date: "December 20, 2024",
      excerpt: "Review the updated standards of practice for nursing professionals.",
      href: "/news/standards-update-2024"
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative text-white overflow-hidden h-[450px]"
          role="banner"
          aria-label="Hero section with image carousel and registration search"
        >
          {/* Image Carousel */}
          <div
            className="absolute inset-0"
            role="img"
            aria-label={`Hero image carousel, currently showing: ${heroImages[currentImageIndex].alt}`}
            aria-live="polite"
          >
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: `url('${image.url}')`
                }}
                aria-hidden={index !== currentImageIndex}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-council-primary/95 via-council-primary/85 to-council-secondary/75" />
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl">
              <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
                Nursing Council,<br />
                Commonwealth of The Bahamas
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 opacity-90">
                Guide and promote excellence in the practice of nursing.
              </p>

              {/* Carousel Navigation Dots */}
              <div
                className="flex justify-center space-x-2 mt-8"
                role="tablist"
                aria-label="Hero image carousel navigation"
              >
                {heroImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleCarouselNavigation(index)}
                    onKeyDown={(e) => handleKeyboardCarouselNavigation(e, index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary ${
                      index === currentImageIndex
                        ? 'bg-white'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    role="tab"
                    aria-selected={index === currentImageIndex}
                    aria-label={`Show image ${index + 1}: ${image.alt}`}
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Cards */}
        <section className="py-16 bg-white" aria-label="Quick access services">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {iconCards.map((card, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-council-primary focus-within:ring-offset-2 group"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={`${card.title} - ${card.description}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-council-primary rounded-lg flex items-center justify-center text-white mr-3">
                        {card.icon}
                      </div>
                      <CardTitle className="font-heading text-xl font-semibold text-council-dark">
                        {card.title}
                      </CardTitle>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                    <Link
                      href={card.href}
                      className="inline-flex items-center bg-council-primary text-white px-4 py-2 rounded-md hover:bg-council-secondary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                      aria-label={`Learn more about ${card.title}`}
                    >
                      {card.title === 'Education & Training' ? 'Learn More' : 'Start Online'}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Snippet */}
        <section className="py-16 bg-gray-50" aria-label="About the Nursing Council">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-council-dark mb-6">
                  About the Nursing Council
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Established in 1971, the Nursing Council of the Bahamas serves as the regulatory body for nursing practice throughout the Commonwealth. We are committed to safeguarding the public through the regulation of nursing education, registration, and professional standards. Our council ensures that all registered nurses meet the highest standards of competence, ethics, and professional conduct, protecting both the nursing profession and the communities we serve.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center bg-council-primary text-white px-6 py-3 rounded-md hover:bg-council-secondary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                  aria-label="Learn more about the Nursing Council"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6 bg-council-primary text-white">
                  <Building className="h-12 w-12 mx-auto mb-4" aria-hidden="true" />
                  <div className="text-3xl font-bold">1971</div>
                  <div className="text-sm opacity-90">Founded</div>
                </Card>
                <Card className="text-center p-6 bg-council-secondary text-white">
                  <Users className="h-12 w-12 mx-auto mb-4" aria-hidden="true" />
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-sm opacity-90">Council Members</div>
                </Card>
                <Card className="text-center p-6 text-white col-span-2 bg-[#a21010]">
                  <Users className="h-12 w-12 mx-auto mb-4" aria-hidden="true" />
                  <div className="text-3xl font-bold">7,000+</div>
                  <div className="text-sm opacity-90">Active Registrants</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-16 bg-white" aria-label="Latest news and updates">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-council-dark mb-4">
                Latest News & Updates
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Stay informed with the latest news, announcements, and updates from the Nursing Council.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {newsItems.map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-council-primary focus-within:ring-offset-2"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                        <time dateTime={item.date}>{item.date}</time>
                      </div>
                      {item.urgent && (
                        <span className="bg-council-alert text-white px-2 py-1 rounded text-xs font-semibold">
                          URGENT
                        </span>
                      )}
                    </div>
                    <CardTitle className="font-heading text-lg font-semibold text-council-dark hover:text-council-primary transition-colors">
                      <Link
                        href={item.href}
                        className="focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 rounded-md"
                        aria-label={`Read more about: ${item.title}`}
                      >
                        {item.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center text-council-primary hover:text-council-secondary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 rounded-md px-2 py-1"
                      aria-label={`Read full article: ${item.title}`}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/news"
                className="inline-flex items-center text-council-primary hover:text-council-secondary transition-colors duration-200 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 rounded-md px-3 py-2"
                aria-label="View all news and updates"
              >
                View All News & Updates
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-white bg-[#ffffff]" aria-label="Need assistance contact section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4 text-[#000080]">Need Assistance?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-[#616161]">
              Our team is here to help with your nursing registration, licensing, and professional development needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-[#000080] rounded-[36px]">
                  <Phone className="h-8 w-8 text-white bg-[transparent]" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#000080]">Call Us</h3>
                <a
                  href="tel:+12426046015"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary rounded-md px-2 py-1 text-[#616161] lg:font-medium"
                  aria-label="Call the Nursing Council at (242) 604-6015"
                >
                  (242) 604-6015 / 6017
                </a>
                <p className="text-sm opacity-75 mt-1 text-[#7D7D7D]">Mon-Fri: 9:00am - 5:00pm</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-[#000080] rounded-[36px]">
                  <Mail className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#000080]">Email Us</h3>
                <a
                  href="mailto:info@nursingcouncilbahamas.com"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary rounded-md px-2 py-1 text-[#7D7D7D]"
                  aria-label="Email the Nursing Council at info@nursingcouncilbahamas.com"
                >
                  info@nursingcouncilbahamas.com
                </a>
                <p className="text-sm opacity-75 mt-1 text-[#7d7d7d]">We respond within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-[#000080] rounded-[306px]">
                  <MapPin className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#000080]">Visit Us</h3>
                <address className="not-italic text-[#7D7D7D]">
                  Virginia & Augusta Streets<br />
                  Nassau, Bahamas
                </address>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-council-primary bg-[#000080] text-[#ffffff]"
              aria-label="Go to contact page for more information"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
