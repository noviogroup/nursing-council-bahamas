'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CaretDown, EnvelopeSimple, List, MapPin, Phone, X } from '@phosphor-icons/react/dist/ssr';
import Nurse360Link from '@/components/Nurse360Link';
import { councilContact } from '@/lib/councilContent';
import { portalPath } from '@/lib/portal';
import { isLinkAvailable, publicSiteLive } from '@/lib/siteAvailability';
import { StagedHeader } from '@/components/StagedChrome';
import styles from './Header.module.css';

type NavigationLink = { label: string; href: string };
type NavigationItem = NavigationLink | { id: string; label: string; links: NavigationLink[] };

const navigation: NavigationItem[] = [
  {
    id: 'services',
    label: 'Services',
    links: [
      { label: 'Student indexing', href: portalPath('/start/indexing') },
      { label: 'I’m already a nurse', href: portalPath('/start/registered-nurse') },
      { label: 'International application', href: portalPath('/start/international') },
      { label: 'Registration & enrollment', href: portalPath('/start/registration') },
      { label: 'Apply for an exam', href: portalPath('/start/exam') },
      { label: 'Verification services', href: '/verification' },
      { label: 'Forms & Applications', href: '/forms' },
      { label: 'Nursing agencies', href: '/nursing-agencies' },
    ],
  },
  { label: 'Education', href: '/education-training' },
  { label: 'Nurse Registry', href: '/registry' },
  {
    id: 'about',
    label: 'About',
    links: [
      { label: 'About the Council', href: '/about' },
      { label: 'Council committees', href: '/committees' },
      { label: 'Legal & ethics', href: '/legal-ethics' },
    ],
  },
  { label: 'News', href: '/news' },
  {
    id: 'help',
    label: 'Help',
    links: [
      { label: 'Contact the Council', href: '/contact' },
      { label: 'Complaints & concerns', href: '/complaints' },
      { label: 'Track a complaint', href: '/complaints/track' },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const groupButtons = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
        setOpenGroup(null);
      }
    };
    const breakpoint = window.matchMedia('(min-width: 1024px)');
    const closeOnResize = () => {
      setMobileOpen(false);
      setOpenGroup(null);
    };
    document.addEventListener('pointerdown', closeOutside);
    breakpoint.addEventListener('change', closeOnResize);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      breakpoint.removeEventListener('change', closeOnResize);
    };
  }, []);

  if (!publicSiteLive) return <StagedHeader />;

  const isWithin = (href: string) => href.startsWith('/') && (pathname === href || pathname.startsWith(`${href}/`));
  const closeNavigation = () => {
    setMobileOpen(false);
    setOpenGroup(null);
  };

  return (
    <header
      ref={headerRef}
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return;
        if (openGroup) {
          event.preventDefault();
          groupButtons.current[openGroup]?.focus();
          setOpenGroup(null);
        } else if (mobileOpen) {
          event.preventDefault();
          setMobileOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
      }}
    >
      <div className={styles.contactBar}>
        <div className={`container mx-auto px-4 ${styles.contacts}`}>
          <Link href="/contact#office-location" className={styles.address}>
            <MapPin size={15} aria-hidden="true" />
            <span>{councilContact.address}</span>
          </Link>
          <div className={styles.phones}>
            <Phone size={15} aria-hidden="true" />
            <a href={`tel:${councilContact.phoneLink}`} aria-label="Call the Nursing Council at (242) 604-6015">
              (242) 604-6015
            </a>
            <a href="tel:+12426046017" aria-label="Call the Nursing Council at (242) 604-6017">
              (242) 604-6017
            </a>
          </div>
          <a href={`mailto:${councilContact.email}`} className={styles.email}>
            <EnvelopeSimple size={15} aria-hidden="true" />
            <span>{councilContact.email}</span>
          </a>
        </div>
      </div>

      <nav aria-label="Main navigation" className={`container mx-auto px-4 ${styles.main}`}>
        <Link href="/" className={styles.brand} aria-label="The Nursing Council of the Commonwealth of The Bahamas — homepage" onClick={closeNavigation}>
          <Image src="/nursing-council-logo.png" alt="" width={60} height={60} priority className={styles.crest} />
          <span className={styles.wordmark}>
            <strong>The Nursing Council</strong>
            <span>of the Commonwealth of The Bahamas</span>
          </span>
        </Link>

        <div className={styles.actions}>
          <Nurse360Link compact />
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={mobileOpen}
            aria-controls="site-navigation"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setOpenGroup(null);
            }}
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <List size={24} aria-hidden="true" />}
          </button>
        </div>

        <ul id="site-navigation" className={`${styles.navigation} ${mobileOpen ? styles.navigationOpen : ''}`}>
          {navigation.map((item) => {
            if ('href' in item) {
              if (!isLinkAvailable(item.href)) return null;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navItem} data-active={isWithin(item.href)} aria-current={pathname === item.href ? 'page' : undefined} onClick={closeNavigation}>
                    {item.label}
                  </Link>
                </li>
              );
            }
            const links = item.links.filter((link) => isLinkAvailable(link.href));
            if (!links.length) return null;
            const expanded = openGroup === item.id;
            return (
              <li key={item.id} className={styles.group} onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup((current) => current === item.id ? null : current);
              }}>
                <button
                  ref={(node) => { groupButtons.current[item.id] = node; }}
                  type="button"
                  className={styles.navItem}
                  data-active={links.some((link) => isWithin(link.href))}
                  aria-expanded={expanded}
                  aria-controls={`navigation-${item.id}`}
                  onClick={() => setOpenGroup(expanded ? null : item.id)}
                >
                  {item.label}
                  <CaretDown size={15} aria-hidden="true" className={expanded ? styles.expandedCaret : ''} />
                </button>
                <ul id={`navigation-${item.id}`} hidden={!expanded} className={`${styles.panel} ${item.id === 'services' ? styles.servicesPanel : ''}`}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.panelLink} aria-current={pathname === link.href ? 'page' : undefined} onClick={closeNavigation}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
