'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowSquareOut,
  Buildings,
  ChatCircleText,
  FilePdf,
  GraduationCap,
  Info,
  MagnifyingGlass,
  Phone,
  Scales,
  WarningCircle,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import RegistrySampleClient from '@/components/registry/RegistrySampleClient';
import {
  councilContact,
  councilCoreValues,
  councilDocuments,
  councilMandate,
  councilMission,
  councilVision,
  currentCouncilMembers,
  licensedAgencies,
  otherTrainingInstitutions,
  universityOfTheBahamas,
} from '@/lib/councilContent';
import { complaintsPublic } from '@/lib/siteAvailability';
import styles from './ComingSoon.module.css';
import panelStyles from './LandingPanels.module.css';

type Panel = {
  id: string;
  label: string;
  note: string;
  icon: PhosphorIcon;
  primary?: boolean;
  wide?: boolean;
  kicker: string;
  title: string;
  intro: string;
  content: () => ReactNode;
};

const allPanels: Panel[] = [
  {
    id: 'complaints',
    label: 'Submit a complaint',
    note: 'Report a concern',
    icon: ChatCircleText,
    primary: true,
    kicker: 'Public complaints',
    title: 'Submit a complaint or concern',
    intro: 'Report a concern involving an individual nurse, midwife, applicant, or licensee. You will receive a reference number to track progress.',
    content: ComplaintsPanel,
  },
  {
    id: 'registry',
    label: 'Nurse registry',
    note: 'Search by name or number',
    icon: MagnifyingGlass,
    primary: !complaintsPublic,
    wide: true,
    kicker: 'Official nurse registry',
    title: 'Search the nurse registry',
    intro: 'Search the published registry by name, registration number, type, or original registration year.',
    content: () => <RegistrySampleClient />,
  },
  {
    id: 'about',
    label: 'About the Council',
    note: 'Mandate and members',
    icon: Info,
    kicker: 'About the Council',
    title: 'Protecting the public. Advancing nursing.',
    intro: 'The Nursing Council regulates nursing and midwifery education, registration, enrollment, and practice in The Bahamas.',
    content: AboutPanel,
  },
  {
    id: 'legal',
    label: 'Code of Ethics & the Act',
    note: 'Law and standards',
    icon: Scales,
    kicker: 'Legal framework',
    title: 'Code of Ethics and the Act',
    intro: 'The law and professional standards that govern nursing and midwifery practice in The Bahamas.',
    content: LegalPanel,
  },
  {
    id: 'agencies',
    label: 'Licensed agencies',
    note: 'Current nursing agencies',
    icon: Buildings,
    kicker: 'Nursing agencies',
    title: 'Currently licensed nursing agencies',
    intro: 'These agencies appear on the current nursing-agency list supplied by the Council.',
    content: AgenciesPanel,
  },
  {
    id: 'programmes',
    label: 'Approved programmes',
    note: 'Programmes and institutions',
    icon: GraduationCap,
    kicker: 'Education and training',
    title: 'Approved institutions and programmes',
    intro: 'Nursing training institutions and programmes approved by the Council.',
    content: ProgrammesPanel,
  },
];

const panels = allPanels.filter((panel) => complaintsPublic || panel.id !== 'complaints');

function findPanel(id: string) {
  return panels.find((panel) => panel.id === id) ?? null;
}

export default function LandingPanels() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // True when the panel was opened by a click on this page, so closing can step back
  // through history instead of leaving a dangling #hash entry.
  const openedFromPage = useRef(false);

  useEffect(() => {
    const syncWithHash = () => {
      const panel = findPanel(window.location.hash.slice(1));
      setActiveId(panel?.id ?? null);
    };

    syncWithHash();
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeId && !dialog.open) dialog.showModal();
    if (!activeId && dialog.open) dialog.close();
    document.documentElement.style.overflow = activeId ? 'hidden' : '';
    // Following a panel link (e.g. to the complaint form) unmounts this component while
    // the panel is open, so the scroll lock must be released here too.
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [activeId]);

  const closePanel = () => {
    if (openedFromPage.current) {
      openedFromPage.current = false;
      window.history.back();
      return;
    }

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setActiveId(null);
  };

  const activePanel = activeId ? findPanel(activeId) : null;
  const PanelContent = activePanel?.content;

  return (
    <>
      <nav className={styles.infoLinks} aria-label="Council information available now">
        {panels.map(({ id, label, note, icon: Icon, primary }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => {
              openedFromPage.current = true;
            }}
            className={`${styles.infoLink} ${primary ? styles.primaryInfoLink : ''}`}
            aria-haspopup="dialog"
          >
            <Icon size={21} weight="bold" aria-hidden="true" />
            <span>
              <small>{note}</small>
              <strong>{label}</strong>
            </span>
            <ArrowRight className={styles.infoArrow} size={18} weight="bold" aria-hidden="true" />
          </a>
        ))}
      </nav>

      <dialog
        ref={dialogRef}
        className={`${panelStyles.dialog} ${activePanel?.wide ? panelStyles.wide : ''}`}
        aria-labelledby="landing-panel-title"
        onCancel={(event) => {
          event.preventDefault();
          closePanel();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePanel();
        }}
      >
        {activePanel && PanelContent && (
          <div className={panelStyles.sheet}>
            <header className={panelStyles.header}>
              <div>
                <p className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-council-accent">
                  <span className="h-px w-8 bg-council-accent" />
                  {activePanel.kicker}
                </p>
                <h2 id="landing-panel-title" className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
                  {activePanel.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{activePanel.intro}</p>
              </div>
              <button type="button" className={panelStyles.close} onClick={closePanel} aria-label="Close panel">
                <X size={22} weight="bold" aria-hidden="true" />
              </button>
            </header>

            <div className={panelStyles.body}>
              <PanelContent />
            </div>

            <footer className={panelStyles.footer}>
              <p className="text-sm font-semibold text-council-dark">Questions? The Council office can help.</p>
              <div className="flex flex-wrap gap-2">
                <a href={`tel:${councilContact.phoneLink}`} className={panelStyles.footerLink}>
                  <Phone size={17} weight="bold" aria-hidden="true" />
                  {councilContact.phoneDisplay}
                </a>
                <a href={councilContact.whatsappChannel} target="_blank" rel="noreferrer" className={panelStyles.footerLink}>
                  <WhatsappLogo size={17} weight="bold" aria-hidden="true" />
                  WhatsApp channel
                </a>
              </div>
            </footer>
          </div>
        )}
      </dialog>
    </>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-council-primary">{children}</h3>;
}

function ComplaintsPanel() {
  const steps = [
    'Complete the online form with your contact details and what happened.',
    'Receive a Nursing Council reference number.',
    'Authorized Council staff review and follow up on the complaint.',
    'Track progress with your reference number and email address.',
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/complaints/new" className="group flex items-center justify-between gap-3 rounded-[8px] bg-council-primary p-5 text-white transition-colors hover:bg-council-secondary">
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-council-accent">Online form</span>
            <span className="font-heading mt-1 block text-lg font-bold">Start a complaint</span>
          </span>
          <ArrowRight size={20} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href="/complaints/track" className="group flex items-center justify-between gap-3 rounded-[8px] border border-slate-300 bg-white p-5 text-council-dark transition-colors hover:border-council-primary">
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-council-primary">Already submitted</span>
            <span className="font-heading mt-1 block text-lg font-bold">Track a complaint</span>
          </span>
          <ArrowRight size={20} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="flex gap-3 rounded-[8px] border-l-4 border-council-accent bg-amber-50 p-4 text-sm leading-relaxed text-council-dark">
        <WarningCircle size={20} weight="bold" aria-hidden="true" className="mt-0.5 shrink-0" />
        <p>This form is not an emergency service. If someone is in immediate danger, contact emergency services or the appropriate authority first.</p>
      </div>

      <div>
        <SectionLabel>How it works</SectionLabel>
        <ol className="space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 rounded-[8px] bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-sm">
              <span className="font-heading font-bold text-council-primary">{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="text-sm leading-relaxed text-gray-600">
        Complaints must concern an individual nurse, midwife, applicant, or licensee. Facility or employer details may be included as context.
      </p>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="space-y-6">
      <div>
        <SectionLabel>Our mandate</SectionLabel>
        <p className="leading-relaxed text-gray-700">{councilMandate}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[8px] bg-white p-5 shadow-sm">
          <SectionLabel>Vision</SectionLabel>
          <p className="text-sm leading-relaxed text-gray-700">{councilVision}</p>
        </div>
        <div className="rounded-[8px] bg-white p-5 shadow-sm">
          <SectionLabel>Core values</SectionLabel>
          <ul className="flex flex-wrap gap-2">
            {councilCoreValues.map((value) => (
              <li key={value} className="rounded-full bg-council-primary/10 px-3 py-1 text-sm font-semibold text-council-primary">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-[8px] bg-white p-5 shadow-sm">
        <SectionLabel>Mission</SectionLabel>
        <p className="text-sm leading-relaxed text-gray-700">{councilMission}</p>
      </div>

      <div>
        <SectionLabel>Current Council</SectionLabel>
        <ul className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
          {currentCouncilMembers.map((member) => (
            <li
              key={`${member.role}-${member.name ?? 'vacant'}`}
              className="flex flex-col gap-0.5 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <span className="font-semibold text-council-dark">{member.name ?? 'Vacant'}</span>
              <span className="text-sm text-gray-600 sm:text-right">{member.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DocumentLink({ label, href, detail }: { label: string; href: string; detail: string }) {
  const isPdf = href.endsWith('.pdf');

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-[8px] border border-slate-200 bg-white p-5 transition-colors hover:border-council-primary"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-council-primary text-white">
        <FilePdf size={22} weight="bold" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-heading block font-bold text-council-dark">{label}</span>
        <span className="mt-0.5 block text-sm text-gray-600">{detail}</span>
      </span>
      <ArrowSquareOut size={19} weight="bold" aria-hidden="true" className="shrink-0 text-council-primary" />
      <span className="sr-only">{isPdf ? '(PDF, opens in a new tab)' : '(opens in a new tab)'}</span>
    </a>
  );
}

function LegalPanel() {
  return (
    <div className="space-y-3">
      <DocumentLink {...councilDocuments.codeOfEthics} detail="Professional conduct and ethical standards for nurses" />
      <DocumentLink {...councilDocuments.act} detail="The Act governing nursing and midwifery in The Bahamas" />
      <DocumentLink {...councilDocuments.appointedDayNotice} detail="Official notice bringing the 2023 Act into force" />
    </div>
  );
}

function AgenciesPanel() {
  return (
    <div className="space-y-5">
      <ul className="grid gap-3 sm:grid-cols-3">
        {licensedAgencies.map((agency) => (
          <li key={agency.name} className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
            <div className={`relative h-28 ${agency.logoPanelClassName}`}>
              <Image src={agency.logo} alt={agency.logoAlt} fill sizes="200px" className={agency.logoClassName} />
            </div>
            <p className="font-heading border-t border-slate-100 p-4 text-sm font-bold leading-snug text-council-dark">{agency.name}</p>
          </li>
        ))}
      </ul>
      <p className="text-sm leading-relaxed text-gray-600">
        Contact the Council to confirm an agency&apos;s current licence status or to obtain additional information.
      </p>
    </div>
  );
}

function ProgrammesPanel() {
  return (
    <div className="space-y-3">
      <div className="rounded-[8px] bg-council-primary p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-council-accent">Approved institution</p>
        <h3 className="font-heading mt-1 text-xl font-bold">{universityOfTheBahamas.name}</h3>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/85">
          {universityOfTheBahamas.programmes.map((programme) => (
            <li key={programme} className="border-t border-white/15 pt-2">{programme}</li>
          ))}
        </ul>
      </div>
      {otherTrainingInstitutions.map((institution) => (
        <div key={institution.name} className="rounded-[8px] border border-slate-200 bg-white p-5">
          <h3 className="font-heading text-lg font-bold text-council-dark">{institution.name}</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {institution.programmes.map((programme) => (
              <li key={programme}>{programme}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="pt-2 text-sm leading-relaxed text-gray-600">
        Southern College&apos;s Bachelor of Science in Nursing is identified as provisional in the Council&apos;s list.
      </p>
    </div>
  );
}
