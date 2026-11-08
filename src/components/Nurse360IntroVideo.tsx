'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, PlayCircle, X } from '@phosphor-icons/react';
import styles from './Nurse360IntroVideo.module.css';

type Props = {
  className?: string;
  label?: string;
};

const videoSource = '/videos/nurse360/launch.mp4';

export default function Nurse360IntroVideo({
  className = '',
  label = 'Play introduction video',
}: Props) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const playRequest = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [playbackHint, setPlaybackHint] = useState(false);

  useEffect(() => {
    setIsReady(true);
    return () => {
      playRequest.current += 1;
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
      }
    };
  }, []);

  function openVideo() {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video || dialog.open) return;

    const request = ++playRequest.current;
    setPlaybackHint(false);
    if (loadError) {
      setLoadError(false);
      video.load();
    }
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    // Playback is requested only in response to this explicit user gesture.
    void video.play().catch(() => {
      if (playRequest.current === request && dialog.open) setPlaybackHint(true);
    });
  }

  function finishClosing() {
    playRequest.current += 1;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    buttonRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={openVideo}
        disabled={!isReady}
        className={`${styles.trigger} ${className}`}
        aria-haspopup="dialog"
      >
        <PlayCircle size={22} aria-hidden="true" />
        {label}
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={finishClosing}
      >
        <div className={styles.header}>
          <div>
            <h2 id={titleId}>Meet Nurse 360</h2>
            <p id={descriptionId}>A 27-second introduction to the Council’s online services portal.</p>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={() => dialogRef.current?.close()}
            aria-label="Close introduction video"
            autoFocus
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <video
          ref={videoRef}
          className={styles.video}
          controls
          playsInline
          preload="none"
          poster="/assets/nurse360/nurse360-launch-10s.jpg"
          aria-label="Nurse 360 introduction"
          onError={() => setLoadError(true)}
          onCanPlay={() => setLoadError(false)}
          onPlay={() => setPlaybackHint(false)}
        >
          <source src={videoSource} type="video/mp4" onError={() => setLoadError(true)} />
          Your browser does not support this video. Use the video link below.
        </video>
        <div className={styles.guidance}>
          {(loadError || playbackHint) && (
            <p className={styles.status} role="status">
              {loadError
                ? 'The video could not be loaded. You can open it separately or read the introduction below.'
                : 'Use the player’s play button to start, or open the video separately.'}
            </p>
          )}
          <h3>The Council’s online services portal</h3>
          <p>
            Nurse 360 brings student indexing, examination applications,
            registration and services for existing nurses online. Choose the
            guidance that fits your next step, then continue in Nurse 360.
          </p>
          <a href={videoSource} target="_blank" rel="noreferrer">
            Open video separately
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </>
  );
}
