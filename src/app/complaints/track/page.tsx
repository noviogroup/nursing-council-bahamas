'use client';

import { useState } from 'react';
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

  const trackComplaint = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setResult(null);

    if (!hasSupabaseConfig()) {
      setError('Supabase is not configured for this environment.');
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
      setError(trackError.message);
      return;
    }

    if (!data?.[0]) {
      setError('No complaint was found for that reference number and email address.');
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
              Public tracking
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight md:text-6xl">Track complaint status.</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/85">
              View safe public progress details using the reference number and contact email provided with the complaint.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.42fr_0.58fr]">
            <form onSubmit={trackComplaint} className="bg-white p-7 shadow-sm">
              <FileSearch className="mb-8 h-10 w-10 text-council-primary" />
              <label className="block text-sm font-medium text-gray-700">
                Complaint reference number
                <Input required value={referenceNumber} onChange={(event) => setReferenceNumber(event.target.value.toUpperCase())} placeholder="NC-2026-00001" className="mt-2 min-h-12 rounded-sm" />
              </label>
              <label className="mt-5 block text-sm font-medium text-gray-700">
                Contact email
                <Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 rounded-sm" />
              </label>
              <Button type="submit" disabled={isLoading} className="mt-6 min-h-12 w-full rounded-sm bg-council-primary hover:bg-council-secondary">
                {isLoading ? 'Checking...' : 'Track complaint'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-5 text-sm leading-relaxed text-gray-500">
                Internal notes, staff comments, private attachments, and committee deliberations are never shown in public tracking.
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
                <div className="flex min-h-80 items-center justify-center bg-gray-50 p-8 text-center text-gray-600">
                  Enter complaint tracking details to view the public status timeline.
                </div>
              )}

              {result && (
                <article>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Reference {result.reference_number}</p>
                  <h2 className="font-heading mt-3 text-4xl font-bold text-council-dark">{result.public_label}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">{result.public_description}</p>
                  {result.public_status_note && <p className="mt-5 border-l-4 border-council-accent bg-yellow-50 p-4 text-gray-700">{result.public_status_note}</p>}
                  <dl className="mt-8 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2">
                    <div className="bg-white p-4"><dt className="text-sm text-gray-500">Submitted</dt><dd className="font-semibold text-council-dark">{formatComplaintDate(result.submitted_at)}</dd></div>
                    <div className="bg-white p-4"><dt className="text-sm text-gray-500">Information requested</dt><dd className="font-semibold text-council-dark">{result.information_requested ? 'Yes' : 'No'}</dd></div>
                  </dl>
                  <div className="mt-8">
                    <h3 className="font-heading mb-4 text-2xl font-bold text-council-dark">Public timeline</h3>
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
