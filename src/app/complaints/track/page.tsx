'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileMagnifyingGlass as FileSearch, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatComplaintDate } from '@/lib/complaints';
import { getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase';

type TimelineItem = {
  status: string;
  label: string;
  note?: string | null;
  createdAt: string;
};

type TrackingResult = {
  reference_number: string;
  submitted_at: string;
  status: string;
  public_label: string;
  public_description: string;
  public_status_note: string | null;
  timeline: TimelineItem[];
  information_requested: boolean;
};

export default function ComplaintTrackPage() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // The confirmation page links here with the tracking number filled in.
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) setReferenceNumber(ref.toUpperCase());
  }, []);

  const trackComplaint = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setResult(null);

    if (!hasSupabaseConfig()) {
      setError('Tracking is not available right now. Please call the Council on (242) 604-6015.');
      return;
    }

    setIsLoading(true);
    const supabase = getSupabaseClient();
    const { data, error: trackError } = await supabase.rpc('track_complaint', {
      p_reference_number: referenceNumber,
      p_contact_email: email,
    });
    setIsLoading(false);

    if (trackError) {
      setError('Tracking is not available right now. Please try again, or call the Council on (242) 604-6015.');
      return;
    }

    if (!data?.[0]) {
      setError('We could not find a complaint with that tracking number and email address. Check both and try again.');
      return;
    }

    setResult(data[0] as TrackingResult);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
              <span className="h-px w-10 bg-council-accent" />
              Complaints
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight md:text-6xl">Track a complaint.</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/85">
              Enter your tracking number and the email address you used when you submitted your complaint.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.42fr_0.58fr]">
            <form onSubmit={trackComplaint} className="bg-white p-7 shadow-sm">
              <FileSearch className="mb-8 h-10 w-10 text-council-primary" />
              <label className="block text-sm font-medium text-gray-700">
                Tracking number
                <Input required value={referenceNumber} onChange={(event) => setReferenceNumber(event.target.value.toUpperCase())} placeholder="NC-2026-00001" autoComplete="off" autoCapitalize="characters" spellCheck={false} className="mt-2 min-h-12 rounded-[8px]" />
              </label>
              <label className="mt-5 block text-sm font-medium text-gray-700">
                Email address you used
                <Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" autoCapitalize="none" spellCheck={false} className="mt-2 min-h-12 rounded-[8px]" />
              </label>
              <Button type="submit" disabled={isLoading} className="mt-6 min-h-12 w-full rounded-[8px] bg-council-primary hover:bg-council-secondary">
                {isLoading ? 'Checking…' : 'Check status'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-5 text-sm leading-relaxed text-gray-500">
                You see the status and any updates the Council shares with you. Staff notes and internal records are not shown here.
              </p>
            </form>

            <div className="bg-white p-7 shadow-sm">
              {error && (
                <div className="flex gap-3 border-l-4 border-council-alert bg-red-50 p-4 text-sm text-red-900">
                  <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {!result && !error && (
                <div className="flex min-h-48 items-center justify-center bg-gray-50 p-8 text-center text-gray-600">
                  Your complaint&apos;s status will appear here.
                </div>
              )}

              {result && (
                <article>
                  <p className="text-sm font-semibold text-gray-500">Tracking number <span className="font-mono text-council-dark">{result.reference_number}</span></p>
                  <h2 className="font-heading mt-2 text-3xl font-bold text-council-dark">{result.public_label}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">{result.public_description}</p>
                  {result.public_status_note && <p className="mt-5 border-l-4 border-council-accent bg-yellow-50 p-4 text-gray-700">{result.public_status_note}</p>}
                  <p className="mt-5 text-sm text-gray-600">Submitted {formatComplaintDate(result.submitted_at)}</p>
                  {result.information_requested ? (
                    <p className="mt-3 border-l-4 border-council-alert bg-red-50 p-4 text-sm text-red-900">The Council has asked you for more information. Please check your email, or call the Council on (242) 604-6015.</p>
                  ) : null}
                  <div className="mt-7">
                    <h3 className="font-heading mb-3 text-xl font-bold text-council-dark">History</h3>
                    <div className="space-y-3">
                      {result.timeline.map((item) => (
                        <div key={`${item.status}-${item.createdAt}`} className="border-l-2 border-council-primary bg-gray-50 p-4">
                          <p className="font-semibold text-council-dark">{item.label}</p>
                          <p className="text-sm text-gray-500">{formatComplaintDate(item.createdAt)}</p>
                          {item.note && <p className="mt-2 text-sm text-gray-600">{item.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              )}
            </div>
          </div>
          <div className="container mx-auto mt-8 px-4 text-center">
            <Link href="/complaints/new" className="font-semibold text-council-primary hover:underline">Need to submit a new complaint?</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
