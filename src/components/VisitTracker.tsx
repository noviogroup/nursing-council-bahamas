'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Live sessions in the licensing portal (Administration > Live sessions): tells
// the shared record-visit Edge Function which page is open, when a page opens
// and every minute while it stays open. Website visitors are anonymous; the
// function adds the address they came from.
const VISITOR_ID_STORAGE_KEY = 'nursing-council-visitor-id';
const HEARTBEAT_MS = 60_000;
const MAX_CONSECUTIVE_FAILURES = 3;

let consecutiveFailures = 0;

function visitorId() {
  try {
    const stored = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);
    if (stored) return stored;
    const created = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, created);
    return created;
  } catch {
    return null;
  }
}

async function recordVisit(path: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const id = visitorId();
  if (!url || !anonKey || !id || consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) return;

  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/functions/v1/record-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      body: JSON.stringify({ visitorId: id, site: 'website', path }),
      keepalive: true,
    });
    consecutiveFailures = response.ok ? 0 : consecutiveFailures + 1;
  } catch {
    consecutiveFailures += 1;
  }
}

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    void recordVisit(pathname);
    const beat = () => {
      if (document.visibilityState === 'visible') void recordVisit(pathname);
    };
    const timer = window.setInterval(beat, HEARTBEAT_MS);
    document.addEventListener('visibilitychange', beat);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', beat);
    };
  }, [pathname]);

  return null;
}
