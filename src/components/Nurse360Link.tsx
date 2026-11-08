import Image from 'next/image';
import { portalPath } from '@/lib/portal';

type Props = { className?: string; compact?: boolean };

export default function Nurse360Link({ className = '', compact = false }: Props) {
  return (
    <a
      href={portalPath('/')}
      aria-label="Open Nurse 360"
      className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-[8px] border border-council-primary/20 bg-white px-3 py-2 transition-colors hover:border-[#f23d5c] hover:bg-[#fff8fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary motion-reduce:transition-none ${className}`}
    >
      <Image
        src="/assets/nurse360/logo.png"
        alt="Nurse 360"
        width={1200}
        height={239}
        className={compact ? 'h-auto w-24 sm:w-28' : 'h-auto w-36'}
      />
    </a>
  );
}
