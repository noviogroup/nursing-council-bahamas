import Image from 'next/image';
import { ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { councilContact } from '@/lib/councilContent';

export default function WhatsAppChannelCard() {
  return (
    <section className="bg-white py-10" aria-labelledby="whatsapp-updates-heading">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-6 [overflow-wrap:anywhere] rounded-[8px] border border-[#25d366] bg-[#effbf3] p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-8 xl:grid-cols-[auto_minmax(0,1fr)_auto]">
          <Image
            src="/assets/whatsapp/nursing-council-whatsapp-qr.png"
            alt="QR code for the Nursing Council’s official WhatsApp channel"
            width={430}
            height={431}
            className="h-auto w-36 max-w-full rounded-[8px] bg-white"
            unoptimized
          />
          <div className="min-w-0">
            <h2 id="whatsapp-updates-heading" className="font-heading flex flex-wrap items-start gap-3 text-2xl font-bold leading-tight text-[#14532d] md:text-3xl">
              <WhatsappLogo size={28} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0" />
              <span>Follow the Council on WhatsApp</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
              Stay informed about Council announcements and online services.
              Scan the QR code with your phone camera, or use the link to open
              our official channel.
            </p>
          </div>
          <a
            href={councilContact.whatsappChannel}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#166534] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#166534] focus:ring-offset-4 focus:ring-offset-[#effbf3] sm:col-start-2 sm:justify-self-start xl:col-start-auto"
          >
            Open WhatsApp channel
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
