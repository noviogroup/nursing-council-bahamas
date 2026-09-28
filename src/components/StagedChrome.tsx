import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Phone } from '@phosphor-icons/react/dist/ssr';
import { councilContact } from '@/lib/councilContent';

// Slim header and footer used on the few full pages reachable during the staged launch
// (complaints and legal notices). They match the landing page instead of exposing the
// main-site navigation, which still points at pages that are not public yet.

export function StagedHeader() {
  return (
    <header className="border-b-[3px] border-council-accent bg-[#03033e] text-white" role="banner">
      <div className="container mx-auto flex min-h-[72px] items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-council-accent focus:ring-offset-2 focus:ring-offset-[#03033e]">
          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-council-accent/80 bg-white">
            <Image src="/nursing-council-logo.png" alt="" width={44} height={44} unoptimized className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-sm font-extrabold tracking-tight">The Nursing Council</strong>
            <span className="block truncate text-xs text-white/75">Commonwealth of The Bahamas</span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${councilContact.phoneLink}`}
            className="hidden min-h-10 items-center gap-2 rounded-[8px] px-3 text-sm font-semibold text-white/85 transition-colors hover:text-white md:inline-flex"
          >
            <Phone size={17} weight="bold" aria-hidden="true" />
            {councilContact.phoneDisplay}
          </a>
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-[8px] border border-white/40 px-3 sm:px-4 text-sm font-semibold transition-colors hover:border-council-accent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-council-accent"
          >
            <ArrowLeft size={17} weight="bold" aria-hidden="true" />
            <span className="sm:hidden">Home</span>
            <span className="hidden sm:inline">Back to home</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function StagedFooter() {
  return (
    <footer className="bg-[#03033e] text-white/75">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} The Nursing Council of the Commonwealth of The Bahamas</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
          <Link href="/privacy" className="hover:text-council-accent">Privacy</Link>
          <Link href="/terms" className="hover:text-council-accent">Terms</Link>
          <Link href="/accessibility" className="hover:text-council-accent">Accessibility</Link>
          <a href={councilContact.whatsappChannel} target="_blank" rel="noreferrer" className="hover:text-council-accent">WhatsApp channel</a>
        </nav>
      </div>
    </footer>
  );
}
