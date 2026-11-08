'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle, PlayCircle } from '@phosphor-icons/react';
import { portalPath } from '@/lib/portal';

const videos = [
  {
    id: 'launch',
    title: 'Meet Nurse 360',
    duration: '0:27',
    poster: 'nurse360-launch',
    portrait: false,
    description: 'An introduction to the Council’s online services portal. Explore the guidance and choose the service that fits your next step.',
    guide: '/',
    action: 'Explore Nurse 360',
  },
  {
    id: 'im-already-a-nurse',
    title: 'Get started with Nurse 360',
    duration: '1:05',
    poster: 'im-already-a-nurse',
    portrait: false,
    description: 'A step-by-step demonstration for existing nurses, using illustrative people and account information. Follow the existing-nurse guide for your own setup.',
    guide: '/start/registered-nurse',
    action: 'Get started with Nurse 360',
  },
  {
    id: 'registered-nurses',
    title: 'I’m already a nurse',
    duration: '0:30',
    poster: 'registered-nurses',
    portrait: true,
    description: 'A short introduction for nurses already registered or enrolled with the Council. Review the guide before getting started in Nurse 360.',
    guide: '/start/registered-nurse',
    action: 'Read the existing-nurse guide',
  },
  {
    id: 'nursing-students',
    title: 'Student indexing',
    duration: '0:30',
    poster: 'nursing-students',
    portrait: true,
    description: 'Your student journey starts with indexing. Review the indexing requirements and prepare your supporting documents before starting your application.',
    guide: '/start/indexing',
    action: 'Read the indexing guide',
  },
  {
    id: 'trained-abroad',
    title: 'Trained outside The Bahamas?',
    duration: '0:30',
    poster: 'trained-abroad',
    portrait: true,
    description: 'An introduction for internationally trained nurses and midwives. Read the international-applicant guide for the required documents and next steps.',
    guide: '/start/international',
    action: 'Read the international guide',
  },
  {
    id: 'exam-candidates',
    title: 'Applying for an examination',
    duration: '0:30',
    poster: 'exam-candidates',
    portrait: true,
    description: 'From student indexing to the Council examination. If you are already indexed, keep your index number and review the examination guide.',
    guide: '/start/exam',
    action: 'Read the examination guide',
  },
] as const;

export default function Nurse360Videos() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const selected = videos[selectedIndex];
  const videoSource = `/videos/nurse360/${selected.id}.mp4`;

  function selectVideo(index: number) {
    if (index === selectedIndex) return;
    const currentPlayer = playerRef.current;
    if (currentPlayer) {
      currentPlayer.pause();
      currentPlayer.currentTime = 0;
    }
    setLoadError(false);
    setSelectedIndex(index);
  }

  function retryVideo() {
    setLoadError(false);
    playerRef.current?.load();
  }

  return (
    <section id="nurse360-videos" className="bg-[#f5f7fb] py-14 lg:py-16" aria-labelledby="nurse360-videos-heading">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-2xl">
          <span className="mb-4 block h-1 w-10 rounded-full bg-[#f23d5c]" aria-hidden="true" />
          <h2 id="nurse360-videos-heading" className="font-heading text-3xl font-bold leading-tight text-council-primary md:text-4xl">Get to know Nurse 360</h2>
          <p className="mt-3 leading-relaxed text-slate-600">Short introductions and a step-by-step guide to getting started. Choose a video, then press play.</p>
        </div>

        <div className="mb-4 lg:hidden">
          <label htmlFor="nurse360-video-choice" className="mb-2 block text-sm font-semibold text-council-primary">Choose a video</label>
          <select
            id="nurse360-video-choice"
            value={selectedIndex}
            onChange={(event) => selectVideo(Number(event.target.value))}
            className="min-h-12 w-full rounded-[8px] border border-slate-300 bg-white px-3 py-2 text-sm text-council-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-council-primary"
          >
            {videos.map((video, index) => <option key={video.id} value={index}>{video.title} ({video.duration})</option>)}
          </select>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
          <figure className="min-w-0 overflow-hidden rounded-[8px] border border-slate-200 bg-white">
            <video
              key={selected.id}
              ref={playerRef}
              controls
              playsInline
              preload="none"
              poster={`/assets/nurse360/${selected.poster}.jpg`}
              aria-label={`${selected.title} video`}
              aria-describedby="nurse360-video-description"
              className={`block w-full bg-[#080b20] object-contain ${selected.portrait ? 'aspect-[9/16] max-h-[70svh] sm:aspect-video sm:max-h-none' : 'aspect-video'}`}
              onError={() => setLoadError(true)}
              onCanPlay={() => setLoadError(false)}
            >
              <source src={videoSource} type="video/mp4" onError={() => setLoadError(true)} />
              Your browser does not support this video. Use the separate video link below.
            </video>
            <figcaption className="p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-heading text-xl font-bold text-council-dark">{selected.title}</h3>
                <span className="text-sm tabular-nums text-slate-500">{selected.duration}</span>
              </div>
              <p id="nurse360-video-description" className="mt-3 text-sm leading-relaxed text-slate-600">{selected.description}</p>
              {loadError && (
                <div className="mt-4 rounded-[6px] border border-rose-200 bg-rose-50 p-4 text-sm text-slate-800" role="status">
                  <p>The video could not be loaded. Try again, open it separately, or continue with the written guide.</p>
                  <button type="button" onClick={retryVideo} className="mt-2 inline-flex min-h-11 items-center font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">Try loading again</button>
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
                <a href={portalPath(selected.guide)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-council-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">
                  {selected.action}<ArrowRight size={17} className="shrink-0" aria-hidden="true" />
                </a>
                <a href={videoSource} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-600 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">
                  Open video separately<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </figcaption>
          </figure>

          <div role="group" aria-label="Choose a Nurse 360 video" className="hidden min-w-0 gap-3 lg:grid lg:grid-cols-1">
            {videos.map((video, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  key={video.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectVideo(index)}
                  className={`flex min-h-20 min-w-0 items-center gap-3 rounded-[8px] border p-3 text-left transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary ${active ? 'border-council-primary bg-white shadow-[inset_3px_0_0_#f23d5c]' : 'border-slate-200 bg-white hover:border-council-primary/50'}`}
                >
                  <span className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-[#080b20]">
                    <Image src={`/assets/nurse360/${video.poster}.jpg`} alt="" fill sizes="80px" className="object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-council-primary">{video.title}</span>
                    <span className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                      <span className="tabular-nums">{video.duration}</span>
                      {active && <span className="font-semibold">Selected</span>}
                    </span>
                  </span>
                  {active ? <CheckCircle size={20} className="shrink-0 text-council-primary" aria-hidden="true" /> : <PlayCircle size={20} className="shrink-0 text-slate-500" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
        <p className="sr-only" role="status">{selected.title} selected. Press play in the video player to watch.</p>
      </div>
    </section>
  );
}
