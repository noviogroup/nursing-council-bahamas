import Image from 'next/image';
import {
  Clock,
  EnvelopeSimple,
  MapPinLine,
  Phone,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr';
import LandingPanels from '@/components/LandingPanels';
import { councilContact } from '@/lib/councilContent';
import styles from './ComingSoon.module.css';

const COUNCIL_PHONE_DISPLAY = councilContact.phoneDisplay;
const COUNCIL_PHONE_LINK = councilContact.phoneLink;
const COUNCIL_EMAIL = councilContact.email;
const COUNCIL_WHATSAPP_CHANNEL = councilContact.whatsappChannel;

export default function ComingSoon() {
  return (
    <main className={styles.shell}>
      <Image
        className={styles.photo}
        src="/assets/approved/hero-image-nursing.jpg"
        alt="Nurses gathered at a formal ceremony in The Bahamas"
        fill
        priority
        sizes="100vw"
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.accent} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logoWrap}>
            <Image
              src="/nursing-council-logo.png"
              alt="The Nursing Council of the Commonwealth of The Bahamas logo"
              width={64}
              height={64}
              priority
              unoptimized
            />
          </span>
          <span className={styles.brandCopy}>
            <strong>The Nursing Council</strong>
            <span>Commonwealth of The Bahamas</span>
          </span>
        </div>
        <p className={styles.status}>Website update in progress</p>
      </header>

      <section className={styles.content} aria-labelledby="coming-soon-title">
        <div className={styles.message}>
          <p className={styles.kicker}>A better online service is on the way</p>
          <h1 id="coming-soon-title">
            Nursing is going <span>digital.</span>
          </h1>
          <p className={styles.intro}>
            Registration, renewals, verification, and guidance are coming together in one simpler online experience.
          </p>
          <LandingPanels />
        </div>

        <aside className={styles.support} aria-labelledby="support-title">
          <div className={styles.supportCopy}>
            <p className={styles.supportLabel}>Council services continue</p>
            <h2 id="support-title">Need assistance now?</h2>
            <p>Our office remains available while we prepare the new website.</p>
          </div>

          <div className={styles.contactLinks}>
            <a className={`${styles.contact} ${styles.primaryContact}`} href={`tel:${COUNCIL_PHONE_LINK}`}>
              <Phone size={21} weight="bold" aria-hidden="true" />
              <span>
                <small>Call the Council</small>
                <strong>{COUNCIL_PHONE_DISPLAY}</strong>
              </span>
            </a>
            <a className={styles.contact} href={`mailto:${COUNCIL_EMAIL}`}>
              <EnvelopeSimple size={21} weight="bold" aria-hidden="true" />
              <span>
                <small>Email the Council</small>
                <strong className={styles.emailAddress}>
                  <span>info@</span>
                  <span>nursingcouncilbahamas.com</span>
                </strong>
              </span>
            </a>
          </div>

          <div className={styles.details}>
            <p>
              <Clock size={19} weight="bold" aria-hidden="true" />
              <span>Monday-Friday, 9:00am-5:00pm</span>
            </p>
            <p>
              <MapPinLine size={19} weight="bold" aria-hidden="true" />
              <span>#23 Capitol House, Virginia and Augusta Streets, Nassau</span>
            </p>
          </div>

          <div className={styles.whatsapp}>
            <Image
              className={styles.whatsappQr}
              src="/assets/whatsapp/nursing-council-whatsapp-qr.png"
              alt="QR code for the Nursing Council WhatsApp channel"
              width={112}
              height={112}
              unoptimized
            />
            <div className={styles.whatsappCopy}>
              <p className={styles.supportLabel}>Stay informed</p>
              <p>
                Follow the Council&apos;s official WhatsApp channel for announcements as new online services go live.
                <span className={styles.scanHint}> Scan the code with your phone camera, or open the link.</span>
              </p>
            </div>
            <a
              className={`${styles.contact} ${styles.whatsappLink}`}
              href={COUNCIL_WHATSAPP_CHANNEL}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsappLogo size={22} weight="bold" aria-hidden="true" />
              <span>
                <small>WhatsApp channel</small>
                <strong>Follow the Council</strong>
              </span>
            </a>
          </div>
        </aside>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} The Nursing Council of the Commonwealth of The Bahamas</p>
        <div className={styles.partner}>
          <span>Digital transformation delivered in partnership with</span>
          <Image
            className={styles.partnerLogo}
            src="/assets/brand/novio-logo-reverse.png"
            alt="Novio Group"
            width={94}
            height={30}
            unoptimized
          />
        </div>
      </footer>
    </main>
  );
}
