'use client';

import { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';

/** Copies the tracking number; falls back to selecting it where the clipboard is blocked. */
export default function CopyTrackingNumber({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const node = document.getElementById('tracking-number');
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="inline-flex min-h-10 items-center gap-2 border border-slate-300 bg-white px-4 text-sm font-semibold text-council-dark transition-colors hover:bg-gray-100"
    >
      {copied ? <Check className="h-4 w-4 text-green-700" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
