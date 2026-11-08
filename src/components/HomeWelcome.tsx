'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './HomeWelcome.module.css';

const storageKey = 'council-welcome-seen';
// Run before the page paints so repeat visits and deep links do not flash the welcome.
const welcomeGate = `(function(){try{var replay=new URLSearchParams(location.search).get('welcome')==='1';var skip=matchMedia('(prefers-reduced-motion: reduce)').matches||!!location.hash||(!replay&&sessionStorage.getItem('${storageKey}')==='1');document.documentElement.dataset.councilWelcome=skip?'skip':'play';}catch(e){}})();`;

export default function HomeWelcome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const overflowRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback((remember = true) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const restoreFocus = document.activeElement === skipRef.current;
    if (contentRef.current) contentRef.current.inert = false;
    if (overflowRef.current !== null) {
      document.body.style.overflow = overflowRef.current;
      overflowRef.current = null;
    }
    document.documentElement.dataset.councilWelcome = 'skip';
    if (remember) {
      try { sessionStorage.setItem(storageKey, '1'); } catch { /* Storage is optional. */ }
    }
    setOpen(false);
    if (restoreFocus) {
      contentRef.current?.querySelector<HTMLElement>('#home-title')?.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const replay = new URLSearchParams(window.location.search).get('welcome') === '1';
    let seen = false;
    try { seen = sessionStorage.getItem(storageKey) === '1'; } catch { /* Storage is optional. */ }
    if (motion.matches || window.location.hash || (seen && !replay)) {
      finish(false);
      return;
    }

    document.documentElement.dataset.councilWelcome = 'play';
    // CSS can finish before a slow connection delivers the interactive bundle.
    // Never lock the page behind an introduction that has already disappeared.
    if (overlayRef.current && getComputedStyle(overlayRef.current).visibility === 'hidden') {
      finish();
      return;
    }
    const content = contentRef.current;
    if (content) content.inert = true;
    setReady(true);
    overflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    timerRef.current = setTimeout(() => finish(), 2450);
    const onMotionChange = () => { if (motion.matches) finish(); };
    motion.addEventListener('change', onMotionChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      motion.removeEventListener('change', onMotionChange);
      if (content) content.inert = false;
      if (overflowRef.current !== null) {
        document.body.style.overflow = overflowRef.current;
        overflowRef.current = null;
      }
    };
  }, [finish]);

  useEffect(() => {
    if (ready && open) skipRef.current?.focus({ preventScroll: true });
  }, [ready, open]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: welcomeGate }} />
      <noscript><style>{`.${styles.overlay}{display:none!important}.${styles.entering}{animation:none!important;opacity:1!important;transform:none!important}`}</style></noscript>
      {open && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
          onAnimationEnd={(event) => { if (event.target === event.currentTarget) finish(); }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') { event.preventDefault(); finish(); }
            if (event.key === 'Tab') { event.preventDefault(); skipRef.current?.focus(); }
          }}
        >
          <div className={styles.message}>
            <Image
              src="/nursing-council-logo.png"
              alt="The Nursing Council of the Commonwealth of The Bahamas"
              width={120}
              height={120}
              priority
              className={styles.logo}
            />
            <h2 id="welcome-title" className={styles.title}>
              <span>Nursing is</span>
              <span className={styles.digital}>going digital.</span>
            </h2>
          </div>
          <button ref={skipRef} type="button" disabled={!ready} className={styles.skip} onClick={() => finish()}>
            Skip introduction
          </button>
        </div>
      )}
      <div ref={contentRef} className={open ? styles.entering : undefined}>
        {children}
      </div>
    </>
  );
}
