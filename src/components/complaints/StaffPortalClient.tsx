'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  Bell,
  ChartBar,
  CheckSquare,
  ClipboardText,
  Clock,
  DownloadSimple,
  EnvelopeSimple,
  FileText,
  FunnelSimple,
  Gear,
  LockKey,
  MagnifyingGlass,
  NotePencil,
  ShieldCheck,
  SignOut,
  SquaresFour,
  Users,
  WarningCircle,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  allowedComplaintFileTypes,
  complaintCategories,
  complaintEmailTemplates,
  complaintPriorities,
  complaintStatuses,
  contactMethodOptions,
  defaultComplaintFormData,
  formatComplaintDate,
  humanizeComplaintValue,
  maxComplaintUploadFiles,
  maxComplaintUploadMb,
  relationshipOptions,
  respondentTypes,
  type ComplaintFormData,
} from '@/lib/complaints';
import { complaintStorageBucket, getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase';

type StaffSession = {
  profileId: string;
  email: string;
  role: string;
  fullName: string;
};

type ComplaintRecord = {
  id: string;
  reference_number: string;
  complainant_name: string;
  complainant_email: string;
  complainant_phone: string;
  respondent_type: string;
  respondent_name: string;
  respondent_registration_number: string | null;
  respondent_employer: string | null;
  category: string;
  summary: string;
  detailed_description: string;
  status: string;
  priority: string;
  assigned_to: string | null;
  public_status_note: string | null;
  closure_summary: string | null;
  submitted_at: string;
  triage_due_at: string | null;
  review_due_at: string | null;
  next_update_due_at: string | null;
  raw_payload: Record<string, unknown>;
};

type ComplaintDocument = {
  id: string;
  storage_path: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  created_at: string;
};

type ComplaintNote = {
  id: string;
  note: string;
  visibility: string;
  created_at: string;
};

type ComplaintCommunication = {
  id: string;
  channel: string;
  template_code: string | null;
  contact_with: string;
  summary: string;
  outcome: string;
  occurred_at: string;
};

type ComplaintTask = {
  id: string;
  title: string;
  task_type: string;
  priority: string;
  due_date: string | null;
  status: string;
  notes: string;
};

type ComplaintHistory = {
  id: string;
  status: string;
  public_note: string | null;
  internal_note: string | null;
  visible_to_public: boolean;
  created_at: string;
};

type ProfileOption = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

type PortalRole = 'admin' | 'supervisor' | 'case_officer' | 'viewer';

type PortalNavigationGroup = {
  label: string;
  links: Array<{
    href: string;
    label: string;
    icon: typeof ClipboardText;
    roles?: PortalRole[];
  }>;
};

type ComplaintStatusSetting = {
  code: string;
  internal_label: string;
  public_label: string;
  public_description: string;
  visible_to_public: boolean;
  closes_case: boolean;
  sort_order: number;
};

type ComplaintCategorySetting = {
  code: string;
  label: string;
  description: string;
  active: boolean;
  sort_order: number;
};

type ComplaintPrioritySetting = {
  code: string;
  label: string;
  description: string;
  sla_days: number;
  alert_supervisor: boolean;
  sort_order: number;
};

type SubmitResponse = {
  complaint_id: string;
  reference_number: string;
  submitted_at: string;
};

type ComplaintFormSection = Exclude<keyof ComplaintFormData, 'category'>;

const adminRoles: PortalRole[] = ['admin'];
const supervisorRoles: PortalRole[] = ['admin', 'supervisor'];

const portalNavigationGroups = [
  {
    label: 'Operations',
    links: [
      { href: '/portal', label: 'Dashboard', icon: SquaresFour },
      { href: '/portal/complaints', label: 'Complaints', icon: FileText },
      { href: '/portal/walk-in', label: 'File for Walk-In', icon: NotePencil },
      { href: '/portal/tasks', label: 'Tasks & Follow-Ups', icon: CheckSquare },
    ],
  },
  {
    label: 'Management',
    links: [
      { href: '/portal/reports', label: 'Reports', icon: ChartBar, roles: supervisorRoles },
      { href: '/portal/users', label: 'Users', icon: Users, roles: adminRoles },
      { href: '/portal/audit-log', label: 'Audit Log', icon: ShieldCheck, roles: supervisorRoles },
    ],
  },
  {
    label: 'System',
    links: [
      { href: '/portal/notifications', label: 'Notifications', icon: Bell },
      { href: '/portal/settings', label: 'Settings', icon: Gear, roles: adminRoles },
    ],
  },
] satisfies PortalNavigationGroup[];

function hasPortalRole(role: string, allowed: PortalRole[]) {
  return allowed.includes(role as PortalRole);
}

function cloneComplaintFormData(): ComplaintFormData {
  return JSON.parse(JSON.stringify(defaultComplaintFormData)) as ComplaintFormData;
}

function csvEscape(value: unknown) {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(filename: string, rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.map(csvEscape).join(','), ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function openPrintDocument(title: string, body: string) {
  const win = window.open('', '_blank', 'noopener,noreferrer,width=960,height=720');
  if (!win) return;
  win.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(title)}</title>
        <style>
          body { font-family: Urbanist, Arial, sans-serif; color: #0f172a; margin: 40px; line-height: 1.45; }
          h1 { font-size: 28px; margin: 0 0 8px; }
          h2 { border-top: 1px solid #dbe3ea; font-size: 18px; margin: 28px 0 12px; padding-top: 18px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #dbe3ea; padding: 10px; text-align: left; vertical-align: top; }
          th { background: #f1f5f9; font-size: 12px; text-transform: uppercase; }
          .muted { color: #64748b; }
          .block { border: 1px solid #dbe3ea; padding: 14px; margin: 12px 0; }
          @media print { body { margin: 24px; } }
        </style>
      </head>
      <body>${body}</body>
    </html>
  `);
  win.document.close();
  win.focus();
  win.print();
}

function selectClassName() {
  return 'min-h-10 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200';
}

function portalStatusBadgeClass(status?: string | null) {
  if (['resolved', 'closed', 'dismissed'].includes(status || '')) return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'not_within_jurisdiction') return 'border-slate-200 bg-slate-100 text-slate-600';
  if (status === 'referred') return 'border-indigo-200 bg-indigo-50 text-indigo-700';
  if (status === 'disciplinary_and_penal_cases_review') return 'border-purple-200 bg-purple-50 text-purple-700';
  if (status === 'under_investigation') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (status === 'awaiting_documents' || status === 'pending_response') return 'border-orange-200 bg-orange-50 text-orange-700';
  return 'border-blue-200 bg-blue-50 text-council-primary';
}

function priorityBadgeClass(priority?: string | null) {
  if (priority && priority !== 'standard') return 'border-rose-200 bg-rose-50 text-rose-700';
  return 'border-slate-200 bg-slate-100 text-slate-600';
}

function PortalBadge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-sm border px-3 py-1 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}

function PortalStatCard({
  label,
  value,
  caption,
  icon: Icon,
  tone = 'blue',
}: {
  label: string;
  value: string | number;
  caption?: string;
  icon: typeof ClipboardText;
  tone?: 'blue' | 'amber' | 'emerald' | 'rose' | 'slate';
}) {
  const toneClasses = {
    blue: 'bg-blue-50 text-council-primary',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
    slate: 'bg-slate-100 text-slate-500',
  };

  return (
    <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          <p className="mt-7 text-4xl font-bold leading-none text-slate-950">{value}</p>
          {caption && <p className="mt-2 text-sm text-slate-500">{caption}</p>}
        </div>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm ${toneClasses[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

function PortalPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
      <div>
        <h1 className="font-heading text-3xl font-bold leading-tight text-slate-950">{title}</h1>
        <p className="mt-1 text-base text-slate-600">{description}</p>
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="rounded-sm border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">{message}</p>;
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'NC';
}

function useStaffSession() {
  const [staff, setStaff] = useState<StaffSession | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      if (!hasSupabaseConfig()) {
        setError('Supabase is not configured for this environment.');
        setIsLoading(false);
        return;
      }

      const supabase = getSupabaseClient();
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        setIsLoading(false);
        return;
      }

      const { data: roleData, error: roleError } = await supabase.rpc('current_complaint_role');
      if (roleError || !roleData) {
        setError('Your account is not authorized for the complaints portal.');
        setIsLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', session.user.id)
        .maybeSingle();

      setStaff({
        profileId: session.user.id,
        email: session.user.email || profile?.email || '',
        role: roleData as string,
        fullName: profile?.full_name || session.user.email || 'Staff user',
      });
      setIsLoading(false);
    }

    loadSession();
  }, []);

  return { staff, error, isLoading };
}

function StaffFrame({ staff, children }: { staff: StaffSession; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const visibleNavigationGroups = portalNavigationGroups
    .map((group) => ({
      ...group,
      links: group.links.filter((link) => !link.roles || hasPortalRole(staff.role, link.roles)),
    }))
    .filter((group) => group.links.length > 0);

  const logout = async () => {
    await getSupabaseClient().auth.signOut();
    router.push('/portal/login');
  };

  return (
    <div className="min-h-screen bg-[#eef2f5] text-slate-900 lg:pl-64">
      <aside className="bg-council-primary text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-64">
        <div className="flex h-full flex-col px-3 py-5">
          <Link href="/" className="mb-8 flex items-center gap-3 rounded-sm px-2 py-1.5 hover:bg-white/10" aria-label="Return to Nursing Council website">
            <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-white p-1.5">
              <Image src="/nursing-council-logo.png" alt="Nursing Council logo" width={44} height={44} className="h-full w-full object-contain" />
            </span>
            <span>
              <span className="block text-base font-bold leading-tight">NCB Admin</span>
              <span className="block text-sm text-blue-100">Staff Portal</span>
            </span>
          </Link>

          <nav className="space-y-7" aria-label="Staff portal">
            {visibleNavigationGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{group.label}</p>
                <div className="space-y-1">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    const isActive = link.href === '/portal' ? pathname === '/portal' : pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm font-semibold transition-colors ${
                          isActive ? 'bg-white/[.18] text-white shadow-sm' : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{link.label}</span>
                        {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-sm bg-blue-100" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 border-t border-white/15 pt-4 lg:mt-auto">
            <div className="rounded-sm bg-white/10 p-3">
              <p className="text-sm font-semibold">{staff.fullName}</p>
              <p className="mt-0.5 text-xs capitalize text-blue-100">{staff.role.replace(/_/g, ' ')}</p>
            </div>
            <Button type="button" variant="ghost" onClick={logout} className="mt-3 min-h-11 w-full justify-start rounded-sm px-3 text-white hover:bg-white/10 hover:text-white">
              <SignOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>
      <main className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}

function StaffGuard({ children }: { children: (staff: StaffSession) => ReactNode }) {
  const { staff, error, isLoading } = useStaffSession();

  if (isLoading) return <div className="min-h-screen bg-gray-50 p-8 text-gray-600">Loading staff portal...</div>;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-xl bg-white p-8 shadow-sm">
          <WarningCircle className="mb-5 h-10 w-10 text-council-alert" />
          <h1 className="font-heading text-3xl font-bold text-council-dark">Portal unavailable</h1>
          <p className="mt-4 text-gray-600">{error}</p>
          <Link href="/portal/login" className="mt-6 inline-flex font-semibold text-council-primary hover:underline">Return to login</Link>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-xl bg-white p-8 shadow-sm">
          <LockKey className="mb-5 h-10 w-10 text-council-primary" />
          <h1 className="font-heading text-3xl font-bold text-council-dark">Staff login required</h1>
          <p className="mt-4 text-gray-600">Sign in with an authorized Nursing Council staff account to access complaint records.</p>
          <Link href="/portal/login" className="mt-6 inline-flex min-h-11 items-center bg-council-primary px-5 font-semibold text-white hover:bg-council-secondary">Go to login</Link>
        </div>
      </div>
    );
  }

  return <StaffFrame staff={staff}>{children(staff)}</StaffFrame>;
}

function StaffRoleGate({
  staff,
  allowed,
  title = 'Access restricted',
  children,
}: {
  staff: StaffSession;
  allowed: PortalRole[];
  title?: string;
  children: ReactNode;
}) {
  if (!hasPortalRole(staff.role, allowed)) {
    return (
      <section>
        <PortalPageHeader title={title} description="Your portal role does not allow access to this area." />
        <div className="rounded-sm bg-white p-7 shadow-sm ring-1 ring-slate-200/70">
          <ShieldCheck className="mb-5 h-10 w-10 text-council-primary" />
          <p className="max-w-2xl text-slate-600">
            Ask an administrator to update your complaint portal access if you need to use this section.
          </p>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}

async function fetchComplaints() {
  const { data, error } = await getSupabaseClient()
    .from('complaints')
    .select('*')
    .order('submitted_at', { ascending: false })
    .limit(200);

  if (error) throw error;
  return (data || []) as ComplaintRecord[];
}

export function StaffLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!hasSupabaseConfig()) {
      setError('Supabase is not configured for this environment.');
      return;
    }

    setIsLoading(true);
    const { error: loginError } = await getSupabaseClient().auth.signInWithPassword({ email, password });
    setIsLoading(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.push('/portal');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-council-primary px-4 py-12 text-white">
      <section className="w-full max-w-md">
        <div className="mb-7 text-center">
          <Link
            href="/"
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-sm bg-white p-3 shadow-xl"
            aria-label="Return to Nursing Council website"
          >
            <Image
              src="/nursing-council-logo.png"
              alt="Nursing Council of The Bahamas logo"
              width={88}
              height={88}
              className="h-full w-full object-contain"
              priority
            />
          </Link>
        </div>
        <form onSubmit={login} className="bg-white p-7 text-council-dark shadow-xl md:p-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Secure staff access</p>
            <h1 className="font-heading mt-3 text-4xl font-bold leading-tight">Complaints portal</h1>
            <p className="mt-3 text-sm text-gray-600">Use your Supabase staff account. Unauthorized users cannot view complaints.</p>
          </div>
          {error && <p className="mt-5 border-l-4 border-council-alert bg-red-50 p-3 text-sm text-red-900">{error}</p>}
          <label className="mt-6 block text-sm font-medium text-gray-700">
            Email address
            <Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 rounded-sm" />
          </label>
          <label className="mt-5 block text-sm font-medium text-gray-700">
            Password
            <Input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-12 rounded-sm" />
          </label>
          <Button type="submit" disabled={isLoading} className="mt-6 min-h-12 w-full rounded-sm bg-council-primary hover:bg-council-secondary">
            {isLoading ? 'Signing in...' : 'Sign in'}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link href="/portal/reset-password" className="mt-5 block text-center text-sm font-semibold text-council-primary hover:text-council-secondary">
            Reset password
          </Link>
        </form>
      </section>
    </main>
  );
}

export function StaffResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!hasSupabaseConfig()) {
      setError('Supabase is not configured for this environment.');
      return;
    }

    setIsLoading(true);
    const redirectTo = typeof window === 'undefined' ? undefined : `${window.location.origin}/portal/login`;
    const { error: resetError } = await getSupabaseClient().auth.resetPasswordForEmail(email, { redirectTo });
    setIsLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMessage('If this email belongs to an authorized portal user, a reset link has been prepared.');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-council-primary px-4 py-12 text-white">
      <section className="w-full max-w-md">
        <div className="mb-7 text-center">
          <Link href="/" className="mx-auto flex h-24 w-24 items-center justify-center rounded-sm bg-white p-3 shadow-xl" aria-label="Return to Nursing Council website">
            <Image src="/nursing-council-logo.png" alt="Nursing Council of The Bahamas logo" width={88} height={88} className="h-full w-full object-contain" priority />
          </Link>
        </div>
        <form onSubmit={submitReset} className="bg-white p-7 text-council-dark shadow-xl md:p-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Secure staff access</p>
            <h1 className="font-heading mt-3 text-4xl font-bold leading-tight">Reset password</h1>
            <p className="mt-3 text-sm text-gray-600">Enter the email address connected to your Nursing Council portal account.</p>
          </div>
          {error && <p className="mt-5 border-l-4 border-council-alert bg-red-50 p-3 text-sm text-red-900">{error}</p>}
          {message && <p className="mt-5 border-l-4 border-council-primary bg-blue-50 p-3 text-sm text-council-primary">{message}</p>}
          <label className="mt-6 block text-sm font-medium text-gray-700">
            Email address
            <Input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 rounded-sm" />
          </label>
          <Button type="submit" disabled={isLoading} className="mt-6 min-h-12 w-full rounded-sm bg-council-primary hover:bg-council-secondary">
            {isLoading ? 'Preparing reset...' : 'Send reset link'}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link href="/portal/login" className="mt-5 block text-center text-sm font-semibold text-council-primary hover:text-council-secondary">
            Return to login
          </Link>
        </form>
      </section>
    </main>
  );
}

export function StaffDashboard() {
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [profiles, setProfiles] = useState<ProfileOption[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const complaintData = await fetchComplaints();
        setComplaints(complaintData);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Dashboard complaints could not be loaded.');
      }

      const { data } = await getSupabaseClient()
        .from('profiles')
        .select('id, full_name, email, role')
        .order('full_name')
        .limit(8);
      setProfiles((data || []) as ProfileOption[]);
    }

    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const closedStatuses = new Set(['closed', 'resolved', 'dismissed', 'referred', 'not_within_jurisdiction']);
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const isOverdue = (complaint: ComplaintRecord) => {
      if (closedStatuses.has(complaint.status)) return false;
      const dueDate = complaint.next_update_due_at || complaint.review_due_at || complaint.triage_due_at;
      return dueDate ? new Date(dueDate) < now : false;
    };

    return [
      { label: 'Total Complaints', value: complaints.length, caption: 'All time', icon: ClipboardText, tone: 'blue' as const },
      {
        label: 'Submissions This Month',
        value: complaints.filter((item) => {
          const date = new Date(item.submitted_at);
          return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
        }).length,
        caption: 'Current month',
        icon: ChartBar,
        tone: 'blue' as const,
      },
      { label: 'New Cases', value: complaints.filter((item) => item.status === 'new').length, caption: 'Awaiting assessment', icon: Clock, tone: 'amber' as const },
      { label: 'Under Investigation', value: complaints.filter((item) => item.status === 'under_investigation').length, caption: 'Active cases', icon: WarningCircle, tone: 'blue' as const },
      { label: 'SLA Overdue', value: complaints.filter(isOverdue).length, caption: 'Past target date', icon: WarningCircle, tone: 'slate' as const },
      { label: 'Committee Review', value: complaints.filter((item) => item.status === 'disciplinary_and_penal_cases_review').length, caption: 'Disciplinary and Penal Cases', icon: ShieldCheck, tone: 'emerald' as const },
    ];
  }, [complaints]);

  const recentComplaints = complaints.filter((complaint) => {
    const haystack = `${complaint.reference_number} ${complaint.complainant_name} ${complaint.respondent_name} ${complaint.category} ${complaint.status}`.toLowerCase();
    return haystack.includes(search.toLowerCase()) && (status === 'all' || complaint.status === status);
  });

  return (
    <StaffGuard>
      {() => (
        <div>
          <PortalPageHeader
            title="Dashboard"
            description="Nursing Council complaints overview."
            actions={(
              <Button type="button" variant="outline" className="min-h-11 rounded-sm border-slate-200 bg-white px-5 text-slate-700 shadow-sm hover:bg-slate-50">
                <EnvelopeSimple className="h-4 w-4" />
                Run SLA / Overdue Check
              </Button>
            )}
          />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}

          <section className="grid gap-6 xl:grid-cols-[1fr_0.32fr]">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map((stat) => <PortalStatCard key={stat.label} {...stat} />)}
            </div>

            <aside className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="font-heading text-lg font-bold text-slate-900">Active Staff</h2>
                <Link href="/portal/users" className="inline-flex items-center gap-1 text-sm font-semibold text-council-primary hover:text-council-secondary">
                  Manage Users <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {profiles.length === 0 && <EmptyState message="No staff profiles are available yet." />}
                {profiles.slice(0, 6).map((profile) => (
                  <div key={profile.id} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-100 text-sm font-bold text-council-primary">{getInitials(profile.full_name || profile.email)}</span>
                    <span>
                      <span className="block text-sm font-semibold leading-tight text-slate-900">{profile.full_name || profile.email}</span>
                      <span className="block text-sm capitalize text-slate-500">{profile.role?.replace(/_/g, ' ') || 'User'}</span>
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="mt-8 overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-heading text-xl font-bold text-slate-950">Recent Complaint Cases</h2>
                <p className="mt-1 text-sm text-slate-500">Latest submitted and updated complaint cases.</p>
              </div>
              <Link href="/portal/complaints" className="inline-flex items-center gap-1 text-sm font-semibold text-council-primary hover:text-council-secondary">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-3 border-b border-slate-200 bg-white p-5 lg:grid-cols-[0.34fr_0.2fr_0.2fr_0.2fr]">
              <label className="relative">
                <MagnifyingGlass className="pointer-events-none absolute left-4 top-3 h-4 w-4 text-slate-400" />
                <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search cases..." className="min-h-10 rounded-sm border-slate-200 pl-11 shadow-sm" />
              </label>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClassName()}>
                <option value="all">All Statuses</option>
                {complaintStatuses.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <select className={selectClassName()} defaultValue="all">
                <option value="all">All Priorities</option>
                {complaintPriorities.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <select className={selectClassName()} defaultValue="all">
                <option value="all">All Users</option>
                {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.full_name || profile.email}</option>)}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[940px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Case ID</th>
                    <th className="px-5 py-4">Complainant</th>
                    <th className="px-5 py-4">Respondent</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentComplaints.slice(0, 8).map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <Link href={`/portal/complaints/${complaint.id}`} className="font-bold text-council-primary hover:text-council-secondary">{complaint.reference_number}</Link>
                        <span className="block text-xs text-slate-500">{formatComplaintDate(complaint.submitted_at)}</span>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-900">{complaint.complainant_name}</td>
                      <td className="px-5 py-4 text-slate-600">{complaint.respondent_name}</td>
                      <td className="px-5 py-4 text-slate-600">{humanizeComplaintValue(complaint.category)}</td>
                      <td className="px-5 py-4"><PortalBadge className={portalStatusBadgeClass(complaint.status)}>{humanizeComplaintValue(complaint.status)}</PortalBadge></td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/portal/complaints/${complaint.id}`} className="inline-flex min-h-9 items-center gap-1 rounded-sm bg-council-primary px-4 text-xs font-semibold text-white hover:bg-council-secondary">
                          Open <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recentComplaints.length === 0 && <div className="p-5"><EmptyState message="No complaint cases match the current filters." /></div>}
            </div>
          </section>
        </div>
      )}
    </StaffGuard>
  );
}

export function StaffComplaintList() {
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [profiles, setProfiles] = useState<ProfileOption[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [category, setCategory] = useState('all');
  const [respondentType, setRespondentType] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState('under_review');
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const pageSize = 10;

  useEffect(() => {
    async function loadComplaints() {
      try {
        const complaintData = await fetchComplaints();
        setComplaints(complaintData);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Complaint cases could not be loaded.');
      }

      const { data } = await getSupabaseClient()
        .from('profiles')
        .select('id, full_name, email, role')
        .order('full_name');
      setProfiles((data || []) as ProfileOption[]);
    }

    loadComplaints();
  }, []);

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [search, status, priority, category, respondentType, userFilter]);

  const filtered = complaints.filter((complaint) => {
    const haystack = `${complaint.reference_number} ${complaint.complainant_name} ${complaint.respondent_name} ${complaint.complainant_email} ${complaint.complainant_phone} ${complaint.category} ${complaint.respondent_type}`.toLowerCase();
    return haystack.includes(search.toLowerCase())
      && (status === 'all' || complaint.status === status)
      && (priority === 'all' || complaint.priority === priority)
      && (category === 'all' || complaint.category === category)
      && (respondentType === 'all' || complaint.respondent_type === respondentType)
      && (userFilter === 'all' || complaint.assigned_to === userFilter);
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedComplaints = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const allPagedSelected = pagedComplaints.length > 0 && pagedComplaints.every((complaint) => selectedIds.includes(complaint.id));

  const toggleSelection = (complaintId: string) => {
    setSelectedIds((current) => current.includes(complaintId) ? current.filter((id) => id !== complaintId) : [...current, complaintId]);
  };

  const togglePageSelection = () => {
    const pageIds = pagedComplaints.map((complaint) => complaint.id);
    setSelectedIds((current) => {
      if (pageIds.every((id) => current.includes(id))) return current.filter((id) => !pageIds.includes(id));
      return Array.from(new Set([...current, ...pageIds]));
    });
  };

  const bulkUpdateStatus = async () => {
    if (selectedIds.length === 0) return;
    setError('');
    setMessage('');

    try {
      const supabase = getSupabaseClient();
      await Promise.all(selectedIds.map((complaintId) => supabase.rpc('staff_update_complaint', {
        p_complaint_id: complaintId,
        p_status: bulkStatus,
        p_priority: null,
        p_assigned_to: null,
        p_public_status_note: `Status updated to ${humanizeComplaintValue(bulkStatus)} by Nursing Council staff.`,
        p_internal_note: `Bulk status update applied to ${selectedIds.length} complaint(s).`,
        p_closure_summary: null,
      }).then(({ error: updateError }) => {
        if (updateError) throw new Error(updateError.message);
      })));

      setComplaints(await fetchComplaints());
      setSelectedIds([]);
      setMessage(`${selectedIds.length} complaint(s) updated to ${humanizeComplaintValue(bulkStatus)}.`);
    } catch (bulkError) {
      setError(bulkError instanceof Error ? bulkError.message : 'Bulk update could not be completed.');
    }
  };

  return (
    <StaffGuard>
      {(staff) => (
        <section>
          <PortalPageHeader
            title="Complaints"
            description="Manage and review all Nursing Council complaint cases."
            actions={(
              <Link href="/portal/walk-in" className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-council-primary px-5 text-sm font-semibold text-white shadow-sm hover:bg-council-secondary">
                <NotePencil className="h-4 w-4" />
                File for Walk-In
              </Link>
            )}
          />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}
          {message && <p className="mb-6 rounded-sm border border-blue-200 bg-blue-50 p-4 text-sm text-council-secondary">{message}</p>}

          <div className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <label className="relative block">
              <MagnifyingGlass className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by complaint ID, name, respondent, email, or phone..."
                className="min-h-12 rounded-sm border-slate-200 pl-12 text-base shadow-sm"
              />
            </label>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                <FunnelSimple className="h-4 w-4" />
                Filter by
              </span>
              <select value={respondentType} onChange={(event) => setRespondentType(event.target.value)} className="min-h-10 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm">
                <option value="all">All Respondents</option>
                {respondentTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="min-h-10 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm">
                <option value="all">All Statuses</option>
                {complaintStatuses.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-10 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm">
                <option value="all">All Types</option>
                {complaintCategories.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <select value={userFilter} onChange={(event) => setUserFilter(event.target.value)} className="min-h-10 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm">
                <option value="all">All Users</option>
                {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.full_name || profile.email}</option>)}
              </select>
              <select value={priority} onChange={(event) => setPriority(event.target.value)} className="min-h-10 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm">
                <option value="all">All Priorities</option>
                {complaintPriorities.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-3 rounded-sm bg-white p-4 shadow-sm ring-1 ring-slate-200/70 lg:flex-row lg:items-center">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-950">{selectedIds.length}</strong> selected / Showing <strong className="text-slate-950">{filtered.length}</strong> complaints
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value)} className={selectClassName()}>
                {complaintStatuses.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <Button type="button" disabled={selectedIds.length === 0 || staff.role === 'viewer'} onClick={bulkUpdateStatus} className="min-h-10 rounded-sm bg-council-primary px-5 text-white hover:bg-council-secondary">
                Update Selected
              </Button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                  <tr>
                    <th className="w-12 px-5 py-4"><input type="checkbox" checked={allPagedSelected} onChange={togglePageSelection} aria-label="Select all visible complaints" className="h-4 w-4 rounded-sm border-slate-300" /></th>
                    <th className="px-5 py-4">Case ID</th>
                    <th className="px-5 py-4">Complainant</th>
                    <th className="px-5 py-4">Respondent</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Assigned User</th>
                    <th className="px-5 py-4">Priority</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pagedComplaints.map((complaint) => {
                    const assignedUser = profiles.find((profile) => profile.id === complaint.assigned_to);
                    return (
                      <tr key={complaint.id} className="hover:bg-slate-50/70">
                        <td className="px-5 py-4"><input type="checkbox" checked={selectedIds.includes(complaint.id)} onChange={() => toggleSelection(complaint.id)} aria-label={`Select complaint ${complaint.reference_number}`} className="h-4 w-4 rounded-sm border-slate-300" /></td>
                        <td className="px-5 py-4">
                          <Link href={`/portal/complaints/${complaint.id}`} className="font-bold text-council-primary hover:text-council-secondary">{complaint.reference_number}</Link>
                          <span className="block text-xs text-slate-500">{formatComplaintDate(complaint.submitted_at)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="block font-medium text-slate-900">{complaint.complainant_name}</span>
                          <span className="block max-w-[180px] truncate text-xs text-slate-500">{complaint.complainant_email}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="block font-medium text-slate-700">{complaint.respondent_name}</span>
                          <span className="block text-xs capitalize text-slate-500">{humanizeComplaintValue(complaint.respondent_type)}</span>
                        </td>
                        <td className="max-w-[220px] px-5 py-4 text-slate-600">{humanizeComplaintValue(complaint.category)}</td>
                        <td className="px-5 py-4 text-slate-600">{assignedUser?.full_name || 'Unassigned'}</td>
                        <td className="px-5 py-4"><PortalBadge className={priorityBadgeClass(complaint.priority)}>{humanizeComplaintValue(complaint.priority)}</PortalBadge></td>
                        <td className="px-5 py-4"><PortalBadge className={portalStatusBadgeClass(complaint.status)}>{humanizeComplaintValue(complaint.status)}</PortalBadge></td>
                        <td className="px-5 py-4 text-right">
                          <Link href={`/portal/complaints/${complaint.id}`} className="inline-flex min-h-9 items-center gap-1 rounded-sm bg-council-primary px-4 text-xs font-semibold text-white hover:bg-council-secondary">
                            <FileText className="h-3.5 w-3.5" />
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="p-6"><EmptyState message="No complaint cases match the current filters." /></div>}
            </div>
            {filtered.length > 0 && (
              <div className="flex flex-col justify-between gap-3 border-t border-slate-200 p-4 text-sm text-slate-600 sm:flex-row sm:items-center">
                <p>Page {currentPage} of {pageCount}</p>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" disabled={currentPage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="min-h-9 rounded-sm border-slate-200 bg-white px-4 text-slate-700">Previous</Button>
                  <Button type="button" variant="outline" disabled={currentPage === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} className="min-h-9 rounded-sm border-slate-200 bg-white px-4 text-slate-700">Next</Button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </StaffGuard>
  );
}

export function StaffComplaintDetail({ complaintId }: { complaintId: string }) {
  const [complaint, setComplaint] = useState<ComplaintRecord | null>(null);
  const [documents, setDocuments] = useState<ComplaintDocument[]>([]);
  const [notes, setNotes] = useState<ComplaintNote[]>([]);
  const [communications, setCommunications] = useState<ComplaintCommunication[]>([]);
  const [tasks, setTasks] = useState<ComplaintTask[]>([]);
  const [history, setHistory] = useState<ComplaintHistory[]>([]);
  const [profiles, setProfiles] = useState<ProfileOption[]>([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [publicNote, setPublicNote] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [closureSummary, setClosureSummary] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newNoteVisibility, setNewNoteVisibility] = useState('internal');
  const [commTemplate, setCommTemplate] = useState('complaint_status_update');
  const [commSummary, setCommSummary] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadComplaint = useCallback(async () => {
    const supabase = getSupabaseClient();
    const [complaintResult, documentsResult, notesResult, commResult, tasksResult, historyResult, profileResult] = await Promise.all([
      supabase.from('complaints').select('*').eq('id', complaintId).maybeSingle(),
      supabase.from('complaint_documents').select('*').eq('complaint_id', complaintId).order('created_at', { ascending: false }),
      supabase.from('complaint_notes').select('*').eq('complaint_id', complaintId).order('created_at', { ascending: false }),
      supabase.from('complaint_communications').select('*').eq('complaint_id', complaintId).order('occurred_at', { ascending: false }),
      supabase.from('complaint_tasks').select('*').eq('complaint_id', complaintId).order('created_at', { ascending: false }),
      supabase.from('complaint_status_history').select('*').eq('complaint_id', complaintId).order('created_at', { ascending: true }),
      supabase.from('profiles').select('id, full_name, email, role').eq('status', 'active').order('full_name'),
    ]);

    if (complaintResult.error) throw complaintResult.error;
    setComplaint((complaintResult.data || null) as ComplaintRecord | null);
    setDocuments((documentsResult.data || []) as ComplaintDocument[]);
    setNotes((notesResult.data || []) as ComplaintNote[]);
    setCommunications((commResult.data || []) as ComplaintCommunication[]);
    setTasks((tasksResult.data || []) as ComplaintTask[]);
    setHistory((historyResult.data || []) as ComplaintHistory[]);
    setProfiles((profileResult.data || []) as ProfileOption[]);

    if (complaintResult.data) {
      setStatus(complaintResult.data.status);
      setPriority(complaintResult.data.priority);
      setAssignedTo(complaintResult.data.assigned_to || '');
      setPublicNote(complaintResult.data.public_status_note || '');
      setClosureSummary(complaintResult.data.closure_summary || '');
    }
  }, [complaintId]);

  useEffect(() => {
    loadComplaint().catch((loadError) => setError(loadError.message));
  }, [loadComplaint]);

  const updateComplaint = async () => {
    setMessage('');
    setError('');
    const { error: updateError } = await getSupabaseClient().rpc('staff_update_complaint', {
      p_complaint_id: complaintId,
      p_status: status,
      p_priority: priority,
      p_assigned_to: assignedTo || null,
      p_public_status_note: publicNote || null,
      p_internal_note: internalNote || null,
      p_closure_summary: closureSummary || null,
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMessage('Complaint updated.');
    setInternalNote('');
    await loadComplaint();
  };

  const addNote = async () => {
    setMessage('');
    setError('');
    const { error: noteError } = await getSupabaseClient().rpc('staff_add_complaint_note', {
      p_complaint_id: complaintId,
      p_note: newNote,
      p_visibility: newNoteVisibility,
    });

    if (noteError) {
      setError(noteError.message);
      return;
    }

    setNewNote('');
    setMessage('Note added.');
    await loadComplaint();
  };

  const logCommunication = async () => {
    setMessage('');
    setError('');
    const { error: commError } = await getSupabaseClient().rpc('staff_log_complaint_communication', {
      p_complaint_id: complaintId,
      p_channel: 'email',
      p_template_code: commTemplate,
      p_contact_with: complaint?.complainant_email || '',
      p_summary: commSummary,
      p_outcome: 'Drafted from approved template. Email delivery is not enabled yet.',
    });

    if (commError) {
      setError(commError.message);
      return;
    }

    setCommSummary('');
    setMessage('Template communication logged as drafted.');
    await loadComplaint();
  };

  const createTask = async () => {
    setMessage('');
    setError('');
    const { error: taskError } = await getSupabaseClient().from('complaint_tasks').insert({
      complaint_id: complaintId,
      title: taskTitle,
      task_type: 'follow_up',
      priority,
      assigned_to: assignedTo || null,
    });

    if (taskError) {
      setError(taskError.message);
      return;
    }

    setTaskTitle('');
    setMessage('Task created.');
    await loadComplaint();
  };

  const openDocument = async (document: ComplaintDocument) => {
    const { data, error: signedUrlError } = await getSupabaseClient()
      .storage
      .from(complaintStorageBucket)
      .createSignedUrl(document.storage_path, 120);

    if (signedUrlError || !data?.signedUrl) {
      setError(signedUrlError?.message || 'Document could not be opened.');
      return;
    }

    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  };

  const exportComplaintPdf = () => {
    if (!complaint) return;

    const rows = [
      ['Reference number', complaint.reference_number],
      ['Submitted', formatComplaintDate(complaint.submitted_at)],
      ['Status', humanizeComplaintValue(complaint.status)],
      ['Priority', humanizeComplaintValue(complaint.priority)],
      ['Complainant', `${complaint.complainant_name} / ${complaint.complainant_email} / ${complaint.complainant_phone}`],
      ['Respondent', `${complaint.respondent_name} / ${humanizeComplaintValue(complaint.respondent_type)} / ${complaint.respondent_registration_number || 'No number'}`],
      ['Category', humanizeComplaintValue(complaint.category)],
      ['Public note', complaint.public_status_note || 'Not set'],
    ];

    const body = `
      <h1>${escapeHtml(complaint.reference_number)}</h1>
      <p class="muted">${escapeHtml(complaint.summary)}</p>
      <h2>Case Overview</h2>
      <table><tbody>${rows.map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('')}</tbody></table>
      <h2>Complaint Details</h2>
      <div class="block">${escapeHtml(complaint.detailed_description).replace(/\n/g, '<br>')}</div>
      <h2>Documents</h2>
      ${documents.length ? `<ul>${documents.map((document) => `<li>${escapeHtml(document.file_name)} (${Math.round(document.file_size / 1024)} KB)</li>`).join('')}</ul>` : '<p class="muted">No documents uploaded.</p>'}
      <h2>Notes</h2>
      ${notes.length ? notes.map((note) => `<div class="block"><strong>${escapeHtml(humanizeComplaintValue(note.visibility))}</strong><br>${escapeHtml(note.note).replace(/\n/g, '<br>')}<br><span class="muted">${escapeHtml(formatComplaintDate(note.created_at))}</span></div>`).join('') : '<p class="muted">No notes recorded.</p>'}
      <h2>Status History</h2>
      ${history.length ? `<table><thead><tr><th>Status</th><th>Date</th><th>Public Note</th><th>Internal Note</th></tr></thead><tbody>${history.map((item) => `<tr><td>${escapeHtml(humanizeComplaintValue(item.status))}</td><td>${escapeHtml(formatComplaintDate(item.created_at))}</td><td>${escapeHtml(item.public_note || '')}</td><td>${escapeHtml(item.internal_note || '')}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">No status history recorded.</p>'}
      <h2>Tasks</h2>
      ${tasks.length ? `<table><thead><tr><th>Task</th><th>Status</th><th>Priority</th><th>Due Date</th></tr></thead><tbody>${tasks.map((task) => `<tr><td>${escapeHtml(task.title)}</td><td>${escapeHtml(humanizeComplaintValue(task.status))}</td><td>${escapeHtml(humanizeComplaintValue(task.priority))}</td><td>${escapeHtml(task.due_date || 'Not set')}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">No tasks recorded.</p>'}
    `;

    openPrintDocument(`Complaint ${complaint.reference_number}`, body);
  };

  return (
    <StaffGuard>
      {() => (
        <section>
          <PortalPageHeader
            title={complaint?.reference_number || 'Complaint Case'}
            description={complaint?.summary || 'Loading complaint case details.'}
            actions={complaint && (
              <>
                <Button type="button" variant="outline" onClick={exportComplaintPdf} className="min-h-9 rounded-sm border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm hover:bg-slate-50">
                  <FileText className="h-4 w-4" />
                  Export PDF
                </Button>
                <PortalBadge className={portalStatusBadgeClass(complaint.status)}>{humanizeComplaintValue(complaint.status)}</PortalBadge>
                <PortalBadge className={priorityBadgeClass(complaint.priority)}>{humanizeComplaintValue(complaint.priority)}</PortalBadge>
              </>
            )}
          />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}
          {message && <p className="mb-6 rounded-sm border border-blue-200 bg-blue-50 p-4 text-sm text-council-secondary">{message}</p>}
          {!complaint ? (
            <div className="rounded-sm bg-white p-8 shadow-sm ring-1 ring-slate-200/70">Loading complaint...</div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
              <div className="space-y-8">
                <article className="rounded-sm bg-white p-7 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-2xl font-bold text-slate-950">Case Overview</h2>
                  <dl className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><dt className="text-sm text-slate-500">Complainant</dt><dd className="font-semibold text-slate-900">{complaint.complainant_name}</dd><dd className="text-sm text-slate-600">{complaint.complainant_email} / {complaint.complainant_phone}</dd></div>
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><dt className="text-sm text-slate-500">Respondent</dt><dd className="font-semibold text-slate-900">{complaint.respondent_name}</dd><dd className="text-sm text-slate-600">{humanizeComplaintValue(complaint.respondent_type)} / {complaint.respondent_registration_number || 'No number'}</dd></div>
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><dt className="text-sm text-slate-500">Category</dt><dd className="font-semibold text-slate-900">{humanizeComplaintValue(complaint.category)}</dd></div>
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><dt className="text-sm text-slate-500">Submitted</dt><dd className="font-semibold text-slate-900">{formatComplaintDate(complaint.submitted_at)}</dd></div>
                  </dl>
                  <h2 className="font-heading mt-8 text-xl font-bold text-slate-950">Details</h2>
                  <p className="mt-3 whitespace-pre-wrap leading-relaxed text-slate-700">{complaint.detailed_description}</p>
                </article>

                <article className="rounded-sm bg-white p-7 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-2xl font-bold text-slate-950">Documents</h2>
                  <div className="mt-5 divide-y divide-slate-200">
                    {documents.length === 0 && <p className="text-slate-600">No documents uploaded.</p>}
                    {documents.map((document) => (
                      <button key={document.id} type="button" onClick={() => openDocument(document)} className="flex w-full items-center justify-between gap-4 rounded-sm px-3 py-4 text-left hover:bg-slate-50">
                        <span><strong className="text-slate-900">{document.file_name}</strong><br /><small className="text-slate-500">{Math.round(document.file_size / 1024)} KB / {formatComplaintDate(document.created_at)}</small></span>
                        <ArrowRight className="h-4 w-4 text-council-primary" />
                      </button>
                    ))}
                  </div>
                </article>

                <article className="rounded-sm bg-white p-7 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-2xl font-bold text-slate-950">Notes</h2>
                  <div className="mt-5 grid gap-3 md:grid-cols-[0.25fr_1fr_auto]">
                    <select value={newNoteVisibility} onChange={(event) => setNewNoteVisibility(event.target.value)} className={selectClassName()}>
                      <option value="internal">Internal</option>
                      <option value="public">Public</option>
                    </select>
                    <Textarea value={newNote} onChange={(event) => setNewNote(event.target.value)} placeholder="Add note" className="min-h-11 rounded-sm border-slate-200" />
                    <Button type="button" disabled={!newNote} onClick={addNote} className="min-h-11 rounded-sm bg-council-primary hover:bg-council-secondary"><NotePencil className="h-4 w-4" />Add</Button>
                  </div>
                  <div className="mt-6 space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="rounded-sm border-l-4 border-council-primary bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-council-primary">{note.visibility}</p>
                        <p className="mt-2 whitespace-pre-wrap text-slate-700">{note.note}</p>
                        <p className="mt-2 text-xs text-slate-500">{formatComplaintDate(note.created_at)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <aside className="space-y-8">
                <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-2xl font-bold text-slate-950">Case controls</h2>
                  <label className="mt-5 block text-sm font-medium text-gray-700">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClassName()}>{complaintStatuses.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select></label>
                  <label className="mt-4 block text-sm font-medium text-gray-700">Priority<select value={priority} onChange={(event) => setPriority(event.target.value)} className={selectClassName()}>{complaintPriorities.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select></label>
                  <label className="mt-4 block text-sm font-medium text-gray-700">Assigned user<select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)} className={selectClassName()}><option value="">Unassigned</option>{profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.full_name} / {profile.role}</option>)}</select></label>
                  <label className="mt-4 block text-sm font-medium text-gray-700">Public status note<Textarea value={publicNote} onChange={(event) => setPublicNote(event.target.value)} className="mt-2 rounded-sm border-slate-200" /></label>
                  <label className="mt-4 block text-sm font-medium text-gray-700">Internal status note<Textarea value={internalNote} onChange={(event) => setInternalNote(event.target.value)} className="mt-2 rounded-sm border-slate-200" /></label>
                  <label className="mt-4 block text-sm font-medium text-gray-700">Closure summary<Textarea value={closureSummary} onChange={(event) => setClosureSummary(event.target.value)} className="mt-2 rounded-sm border-slate-200" /></label>
                  <Button type="button" onClick={updateComplaint} className="mt-5 min-h-11 w-full rounded-sm bg-council-primary hover:bg-council-secondary">Update complaint</Button>
                </article>

                <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-2xl font-bold text-slate-950">Template email log</h2>
                  <select value={commTemplate} onChange={(event) => setCommTemplate(event.target.value)} className={`mt-5 ${selectClassName()}`}>{complaintEmailTemplates.map((template) => <option key={template.code} value={template.code}>{template.label}</option>)}</select>
                  <Textarea value={commSummary} onChange={(event) => setCommSummary(event.target.value)} placeholder="Summary of template communication" className="mt-4 rounded-sm border-slate-200" />
                  <Button type="button" disabled={!commSummary} onClick={logCommunication} className="mt-4 min-h-11 w-full rounded-sm bg-council-primary hover:bg-council-secondary">Log drafted email</Button>
                  <div className="mt-5 space-y-3">
                    {communications.slice(0, 4).map((item) => (
                      <div key={item.id} className="rounded-sm border border-slate-200 p-3 text-sm">
                        <p className="font-semibold text-slate-900">{humanizeComplaintValue(item.template_code || item.channel)}</p>
                        <p className="text-slate-600">{item.summary}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-2xl font-bold text-slate-950">Tasks</h2>
                  <div className="mt-5 flex gap-2">
                    <Input value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="New task" className="min-h-11 rounded-sm border-slate-200" />
                    <Button type="button" disabled={!taskTitle} onClick={createTask} className="min-h-11 rounded-sm bg-council-primary hover:bg-council-secondary">Add</Button>
                  </div>
                  <div className="mt-5 space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="rounded-sm border border-slate-200 p-3 text-sm">
                        <p className="font-semibold text-slate-900">{task.title}</p>
                        <p className="text-slate-600">{humanizeComplaintValue(task.priority)} / {task.status}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-2xl font-bold text-slate-950">Status history</h2>
                  <div className="mt-5 space-y-3">
                    {history.map((item) => (
                      <div key={item.id} className="rounded-sm border-l-4 border-amber-400 bg-slate-50 p-3 text-sm">
                        <p className="font-semibold text-slate-900">{humanizeComplaintValue(item.status)}</p>
                        <p className="text-slate-500">{formatComplaintDate(item.created_at)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </aside>
            </div>
          )}
        </section>
      )}
    </StaffGuard>
  );
}

export function StaffWalkInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ComplaintFormData>(() => cloneComplaintFormData());
  const [files, setFiles] = useState<File[]>([]);
  const [internalNote, setInternalNote] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allAcknowledged = Object.values(formData.acknowledgement).every(Boolean);

  const setSectionValue = <T extends ComplaintFormSection, K extends keyof ComplaintFormData[T]>(
    section: T,
    field: K,
    value: ComplaintFormData[T][K],
  ) => {
    setFormData((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  };

  const handleFiles = (fileList: FileList | null) => {
    setError('');
    if (!fileList) return;

    const nextFiles = Array.from(fileList);
    if (files.length + nextFiles.length > maxComplaintUploadFiles) {
      setError(`Upload up to ${maxComplaintUploadFiles} supporting files.`);
      return;
    }

    const invalidFile = nextFiles.find((file) => !allowedComplaintFileTypes.includes(file.type) || file.size > maxComplaintUploadMb * 1024 * 1024);
    if (invalidFile) {
      setError(`Only PDF, JPG, PNG, DOC, or DOCX files up to ${maxComplaintUploadMb}MB are allowed.`);
      return;
    }

    setFiles((current) => [...current, ...nextFiles]);
  };

  const uploadDocuments = async (referenceNumber: string) => {
    if (files.length === 0) return;

    const supabase = getSupabaseClient();
    const uploadedDocuments = [];

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const storagePath = `incoming/${referenceNumber}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from(complaintStorageBucket).upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

      if (uploadError) throw uploadError;

      uploadedDocuments.push({
        storagePath,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      });
    }

    const { error: registerError } = await supabase.rpc('register_complaint_documents', {
      p_reference_number: referenceNumber,
      p_contact_email: formData.complainant.email,
      p_documents: uploadedDocuments,
    });

    if (registerError) throw registerError;
  };

  const submitWalkIn = async (staff: StaffSession) => {
    setError('');
    setMessage('');

    if (!formData.complainant.name || !formData.complainant.email || !formData.complainant.phone) {
      setError('Complainant name, email, and phone are required.');
      return;
    }

    if (!formData.respondent.type || !formData.respondent.name) {
      setError('Respondent type and name are required.');
      return;
    }

    if (!formData.category || !formData.incident.summary || !formData.incident.description) {
      setError('Complaint category, summary, and detailed description are required.');
      return;
    }

    if (!allAcknowledged) {
      setError('Confirm the acknowledgement statements with the complainant before filing.');
      return;
    }

    setIsSubmitting(true);
    const supabase = getSupabaseClient();
    const payload = {
      ...formData,
      source: 'staff_walk_in',
      staffAssistedBy: staff.profileId,
    };

    const { data, error: submitError } = await supabase.rpc('submit_complaint', {
      p_payload: payload,
      p_draft_token: null,
    });

    if (submitError) {
      setIsSubmitting(false);
      setError(submitError.message);
      return;
    }

    const submitted = data?.[0] as SubmitResponse | undefined;
    if (!submitted) {
      setIsSubmitting(false);
      setError('Complaint could not be filed.');
      return;
    }

    try {
      await uploadDocuments(submitted.reference_number);
      if (internalNote.trim()) {
        const { error: noteError } = await supabase.rpc('staff_add_complaint_note', {
          p_complaint_id: submitted.complaint_id,
          p_note: `Staff-assisted intake note: ${internalNote.trim()}`,
          p_visibility: 'internal',
        });
        if (noteError) throw noteError;
      }
    } catch (postSubmitError) {
      setIsSubmitting(false);
      setMessage(`Complaint ${submitted.reference_number} was filed, but a document or internal note could not be attached.`);
      setError(postSubmitError instanceof Error ? postSubmitError.message : 'Post-submission attachment failed.');
      return;
    }

    router.push(`/portal/complaints/${submitted.complaint_id}`);
  };

  return (
    <StaffGuard>
      {(staff) => (
        <section>
          <PortalPageHeader
            title="File for Walk-In"
            description="Create a staff-assisted complaint for a person visiting or calling the Council."
          />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}
          {message && <p className="mb-6 rounded-sm border border-blue-200 bg-blue-50 p-4 text-sm text-council-secondary">{message}</p>}

          <form className="grid gap-6 xl:grid-cols-[0.66fr_0.34fr]" onSubmit={(event) => { event.preventDefault(); submitWalkIn(staff); }}>
            <div className="space-y-6">
              <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="font-heading text-xl font-bold text-slate-950">Complainant Contact</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">Full name *<Input value={formData.complainant.name} onChange={(event) => setSectionValue('complainant', 'name', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Email address *<Input type="email" value={formData.complainant.email} onChange={(event) => setSectionValue('complainant', 'email', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Phone number *<Input type="tel" value={formData.complainant.phone} onChange={(event) => setSectionValue('complainant', 'phone', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Preferred contact<select value={formData.complainant.preferredContact} onChange={(event) => setSectionValue('complainant', 'preferredContact', event.target.value.toLowerCase())} className={selectClassName()}>{contactMethodOptions.map((option) => <option key={option} value={option.toLowerCase()}>{option}</option>)}</select></label>
                  <label className="text-sm font-medium text-slate-700 md:col-span-2">Address or location<Input value={formData.complainant.address} onChange={(event) => setSectionValue('complainant', 'address', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700 md:col-span-2">Relationship to the matter<select value={formData.complainant.relationship} onChange={(event) => setSectionValue('complainant', 'relationship', event.target.value)} className={selectClassName()}><option value="">Select relationship</option>{relationshipOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                </div>
              </article>

              <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="font-heading text-xl font-bold text-slate-950">Respondent</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">Complaint is about *<select value={formData.respondent.type} onChange={(event) => setSectionValue('respondent', 'type', event.target.value)} className={selectClassName()}><option value="">Select respondent type</option>{respondentTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label>
                  <label className="text-sm font-medium text-slate-700">Name *<Input value={formData.respondent.name} onChange={(event) => setSectionValue('respondent', 'name', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Registration or licence number<Input value={formData.respondent.registrationNumber} onChange={(event) => setSectionValue('respondent', 'registrationNumber', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Employer or facility context<Input value={formData.respondent.employer} onChange={(event) => setSectionValue('respondent', 'employer', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Department or unit<Input value={formData.respondent.department} onChange={(event) => setSectionValue('respondent', 'department', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Location<Input value={formData.respondent.location} onChange={(event) => setSectionValue('respondent', 'location', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                </div>
              </article>

              <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="font-heading text-xl font-bold text-slate-950">Complaint Details</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700 md:col-span-2">Complaint type *<select value={formData.category} onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))} className={selectClassName()}><option value="">Select complaint type</option>{complaintCategories.map((category) => <option key={category.code} value={category.code}>{category.label}</option>)}</select></label>
                  <label className="text-sm font-medium text-slate-700">Incident date<Input type="date" value={formData.incident.date} onChange={(event) => setSectionValue('incident', 'date', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700">Incident location<Input value={formData.incident.location} onChange={(event) => setSectionValue('incident', 'location', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700 md:col-span-2">Short summary *<Input value={formData.incident.summary} onChange={(event) => setSectionValue('incident', 'summary', event.target.value)} className="mt-2 min-h-11 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700 md:col-span-2">Detailed description *<Textarea rows={8} value={formData.incident.description} onChange={(event) => setSectionValue('incident', 'description', event.target.value)} className="mt-2 rounded-sm border-slate-200" /></label>
                  <label className="text-sm font-medium text-slate-700 md:col-span-2">Outcome requested<Textarea rows={4} value={formData.incident.outcome} onChange={(event) => setSectionValue('incident', 'outcome', event.target.value)} className="mt-2 rounded-sm border-slate-200" /></label>
                  <label className="flex gap-3 text-sm font-medium text-slate-700"><input type="checkbox" checked={formData.incident.ongoing} onChange={(event) => setSectionValue('incident', 'ongoing', event.target.checked)} className="mt-1 h-4 w-4 rounded-sm border-slate-300 text-council-primary" />This matter is ongoing.</label>
                  <label className="flex gap-3 text-sm font-medium text-slate-700"><input type="checkbox" checked={formData.incident.immediateRisk} onChange={(event) => setSectionValue('incident', 'immediateRisk', event.target.checked)} className="mt-1 h-4 w-4 rounded-sm border-slate-300 text-council-primary" />There may be immediate risk or public safety concern.</label>
                </div>
              </article>
            </div>

            <aside className="space-y-6">
              <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="font-heading text-xl font-bold text-slate-950">Supporting Documents</h2>
                <label className="mt-5 flex min-h-36 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-600 hover:border-council-primary">
                  <DownloadSimple className="mb-3 h-8 w-8 rotate-180 text-council-primary" />
                  PDF, JPG, PNG, DOC, or DOCX. Up to {maxComplaintUploadFiles} files, {maxComplaintUploadMb}MB each.
                  <input type="file" multiple className="sr-only" accept={allowedComplaintFileTypes.join(',')} onChange={(event) => handleFiles(event.target.files)} />
                </label>
                <div className="mt-4 space-y-2">
                  {files.map((file) => (
                    <div key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-sm border border-slate-200 px-3 py-2 text-sm">
                      <span className="truncate">{file.name}</span>
                      <button type="button" className="font-semibold text-council-alert" onClick={() => setFiles((current) => current.filter((item) => item !== file))}>Remove</button>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="font-heading text-xl font-bold text-slate-950">Staff Notes</h2>
                <Textarea value={internalNote} onChange={(event) => setInternalNote(event.target.value)} placeholder="Internal intake notes, accessibility accommodations, or walk-in context." className="mt-5 rounded-sm border-slate-200" />
              </article>

              <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="font-heading text-xl font-bold text-slate-950">Acknowledgement</h2>
                <div className="mt-5 space-y-4">
                  {[
                    ['accurate', 'The complainant confirmed the information is true and accurate to the best of their knowledge.'],
                    ['contact', 'The complainant understands the Council may contact them for additional information.'],
                    ['review', 'The complainant understands the complaint may be reviewed by authorized Council users.'],
                    ['truthful', 'The complainant understands false or misleading information may affect handling.'],
                    ['consent', 'The complainant consents to use of the information for assessment, investigation, referral, or closure.'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.acknowledgement[key as keyof ComplaintFormData['acknowledgement']]}
                        onChange={(event) => setSectionValue('acknowledgement', key as keyof ComplaintFormData['acknowledgement'], event.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0 rounded-sm border-slate-300 text-council-primary"
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <Button type="submit" disabled={isSubmitting || !allAcknowledged} className="mt-6 min-h-12 w-full rounded-sm bg-council-primary hover:bg-council-secondary">
                  {isSubmitting ? 'Filing complaint...' : 'File complaint'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </article>
            </aside>
          </form>
        </section>
      )}
    </StaffGuard>
  );
}

export function StaffTasksPage() {
  const [tasks, setTasks] = useState<ComplaintTask[]>([]);
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTasks() {
      try {
        const { data, error: taskError } = await getSupabaseClient().from('complaint_tasks').select('*').order('created_at', { ascending: false });
        if (taskError) throw taskError;
        setTasks((data || []) as ComplaintTask[]);
      } catch (taskError) {
        setError(taskError instanceof Error ? taskError.message : 'Tasks could not be loaded.');
      }
    }

    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    return (status === 'all' || task.status === status) && (priority === 'all' || task.priority === priority);
  });

  return (
    <StaffGuard>
      {() => (
        <section>
          <PortalPageHeader title="Tasks & Follow-Ups" description="Track complaint follow-ups, case work, and due dates." />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}

          <div className="grid gap-5 md:grid-cols-3">
            <PortalStatCard label="Open Tasks" value={tasks.filter((task) => task.status !== 'completed').length} caption="Not completed" icon={CheckSquare} tone="blue" />
            <PortalStatCard label="Overdue" value={tasks.filter((task) => task.status === 'overdue').length} caption="Past due date" icon={WarningCircle} tone="rose" />
            <PortalStatCard label="Completed" value={tasks.filter((task) => task.status === 'completed').length} caption="Closed follow-ups" icon={ShieldCheck} tone="emerald" />
          </div>

          <div className="mt-6 rounded-sm bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500"><FunnelSimple className="h-4 w-4" />Filter by</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClassName()}>
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in_progress">In progress</option>
                <option value="awaiting_response">Awaiting response</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>
              <select value={priority} onChange={(event) => setPriority(event.target.value)} className={selectClassName()}>
                <option value="all">All Priorities</option>
                {complaintPriorities.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[840px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Task</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Priority</th>
                    <th className="px-5 py-4">Due Date</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">{task.title}</p>
                        {task.notes && <p className="mt-1 max-w-xl text-xs text-slate-500">{task.notes}</p>}
                      </td>
                      <td className="px-5 py-4 text-slate-600">{humanizeComplaintValue(task.task_type)}</td>
                      <td className="px-5 py-4"><PortalBadge className={priorityBadgeClass(task.priority)}>{humanizeComplaintValue(task.priority)}</PortalBadge></td>
                      <td className="px-5 py-4 text-slate-600">{task.due_date || 'Not set'}</td>
                      <td className="px-5 py-4"><PortalBadge className={task.status === 'completed' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-blue-200 bg-blue-50 text-council-primary'}>{humanizeComplaintValue(task.status)}</PortalBadge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTasks.length === 0 && <div className="p-6"><EmptyState message="No tasks match the current filters." /></div>}
            </div>
          </div>
        </section>
      )}
    </StaffGuard>
  );
}

export function StaffReportsPage() {
  const [complaints, setComplaints] = useState<ComplaintRecord[]>([]);
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');

  useEffect(() => {
    fetchComplaints().then(setComplaints).catch(() => setComplaints([]));
  }, []);

  const filteredComplaints = complaints.filter((complaint) => {
    return (status === 'all' || complaint.status === status) && (priority === 'all' || complaint.priority === priority);
  });

  const byStatus = complaintStatuses.map((item) => ({
    ...item,
    count: filteredComplaints.filter((complaint) => complaint.status === item.code).length,
  }));

  const monthlyBuckets = useMemo(() => {
    const now = new Date();
    const buckets = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (11 - index), 1);
      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(date),
        count: 0,
      };
    });

    filteredComplaints.forEach((complaint) => {
      const date = new Date(complaint.submitted_at);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const bucket = buckets.find((item) => item.key === key);
      if (bucket) bucket.count += 1;
    });

    return buckets;
  }, [filteredComplaints]);

  const maxMonthlyCount = Math.max(1, ...monthlyBuckets.map((item) => item.count));
  const chartPoints = monthlyBuckets
    .map((item, index) => {
      const x = (index / Math.max(1, monthlyBuckets.length - 1)) * 100;
      const y = 92 - (item.count / maxMonthlyCount) * 78;
      return `${x},${y}`;
    })
    .join(' ');

  const reportRows = filteredComplaints.map((complaint) => ({
    reference_number: complaint.reference_number,
    submitted_at: formatComplaintDate(complaint.submitted_at),
    complainant: complaint.complainant_name,
    respondent: complaint.respondent_name,
    respondent_type: humanizeComplaintValue(complaint.respondent_type),
    category: humanizeComplaintValue(complaint.category),
    status: humanizeComplaintValue(complaint.status),
    priority: humanizeComplaintValue(complaint.priority),
    assigned_to: complaint.assigned_to || 'Unassigned',
  }));

  const exportReportCsv = () => {
    downloadCsv('nursing-council-complaints-report.csv', reportRows.length ? reportRows : [{
      reference_number: '',
      submitted_at: '',
      complainant: '',
      respondent: '',
      respondent_type: '',
      category: '',
      status: '',
      priority: '',
      assigned_to: '',
    }]);
  };

  const exportReportPdf = () => {
    const body = `
      <h1>Nursing Council Complaints Report</h1>
      <p class="muted">Generated ${escapeHtml(formatComplaintDate(new Date().toISOString()))}</p>
      <h2>Summary</h2>
      <table><tbody>
        <tr><th>Total complaints</th><td>${filteredComplaints.length}</td></tr>
        <tr><th>Status filter</th><td>${escapeHtml(status === 'all' ? 'All statuses' : humanizeComplaintValue(status))}</td></tr>
        <tr><th>Priority filter</th><td>${escapeHtml(priority === 'all' ? 'All priorities' : humanizeComplaintValue(priority))}</td></tr>
      </tbody></table>
      <h2>Status Distribution</h2>
      <table><thead><tr><th>Status</th><th>Count</th></tr></thead><tbody>${byStatus.map((item) => `<tr><td>${escapeHtml(item.label)}</td><td>${item.count}</td></tr>`).join('')}</tbody></table>
      <h2>Monthly Volume</h2>
      <table><thead><tr><th>Month</th><th>Complaints</th></tr></thead><tbody>${monthlyBuckets.map((item) => `<tr><td>${escapeHtml(item.label)}</td><td>${item.count}</td></tr>`).join('')}</tbody></table>
      <h2>Complaint Records</h2>
      ${reportRows.length ? `<table><thead><tr><th>Reference</th><th>Submitted</th><th>Complainant</th><th>Respondent</th><th>Status</th><th>Priority</th></tr></thead><tbody>${reportRows.map((row) => `<tr><td>${escapeHtml(row.reference_number)}</td><td>${escapeHtml(row.submitted_at)}</td><td>${escapeHtml(row.complainant)}</td><td>${escapeHtml(row.respondent)}</td><td>${escapeHtml(row.status)}</td><td>${escapeHtml(row.priority)}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">No complaints match the selected filters.</p>'}
    `;
    openPrintDocument('Nursing Council Complaints Report', body);
  };

  return (
    <StaffGuard>
      {(staff) => (
        <StaffRoleGate staff={staff} allowed={supervisorRoles}>
          <section>
          <PortalPageHeader
            title="Reports"
            description="Analyze complaint activity, resolution performance, and Council workload."
            actions={(
              <>
                <Button type="button" variant="outline" onClick={exportReportPdf} className="min-h-11 rounded-sm border-slate-200 bg-white px-5 text-slate-700 shadow-sm hover:bg-slate-50">
                  <FileText className="h-4 w-4" />
                  Export PDF
                </Button>
                <Button type="button" onClick={exportReportCsv} className="min-h-11 rounded-sm bg-council-primary px-5 text-white shadow-sm hover:bg-council-secondary">
                  <DownloadSimple className="h-4 w-4" />
                  Export CSV
                </Button>
              </>
            )}
          />

          <div className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FunnelSimple className="h-4 w-4" />
              Filters
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <select className={selectClassName()} defaultValue="all">
                <option value="all">All Time</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
              <select className={selectClassName()} defaultValue="all">
                <option value="all">All Respondents</option>
                {respondentTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClassName()}>
                <option value="all">All Statuses</option>
                {complaintStatuses.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <select value={priority} onChange={(event) => setPriority(event.target.value)} className={selectClassName()}>
                <option value="all">All Priorities</option>
                {complaintPriorities.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
              <Input placeholder="Filter by user..." className="min-h-10 rounded-sm border-slate-200 shadow-sm" />
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <Button type="button" className="min-h-10 rounded-sm bg-council-primary px-5 text-white hover:bg-council-secondary">Apply Filters</Button>
              <p className="text-sm text-slate-500">Showing <strong className="text-slate-800">{filteredComplaints.length}</strong> complaints</p>
            </div>
          </div>

          <div className="mt-8 border-l-4 border-council-primary pl-4">
            <h2 className="font-heading text-lg font-bold text-slate-900">Complaint Activity</h2>
            <p className="text-sm text-slate-500">Overview of complaint submissions and status distribution.</p>
          </div>

          <section className="mt-6 rounded-sm bg-white p-7 shadow-sm ring-1 ring-slate-200/70">
            <h3 className="font-heading text-lg font-bold text-slate-950">Complaint Volume Over Time</h3>
            <p className="mt-1 text-sm text-slate-500">Number of complaints submitted each month in the selected period.</p>
            <div className="mt-6 h-64 rounded-sm bg-gradient-to-b from-white to-blue-50/70 p-4">
              <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" role="img" aria-label="Complaint volume over time chart">
                {[18, 38, 58, 78, 92].map((line) => (
                  <line key={line} x1="0" y1={line} x2="100" y2={line} stroke="#dbeafe" strokeDasharray="2 2" strokeWidth="0.4" />
                ))}
                <polyline points={chartPoints} fill="none" stroke="#0284c7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                {monthlyBuckets.map((item, index) => {
                  const x = (index / Math.max(1, monthlyBuckets.length - 1)) * 100;
                  const y = 92 - (item.count / maxMonthlyCount) * 78;
                  return <circle key={item.key} cx={x} cy={y} r="1.2" fill="#0284c7" />;
                })}
              </svg>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-2 text-xs text-slate-500 md:grid-cols-12">
              {monthlyBuckets.map((item) => <span key={item.key} className="truncate">{item.label}</span>)}
            </div>
          </section>

          <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {byStatus.map((item) => (
              <article key={item.code} className="rounded-sm bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="font-heading mt-2 text-3xl font-bold text-slate-950">{item.count}</p>
              </article>
            ))}
          </section>
          </section>
        </StaffRoleGate>
      )}
    </StaffGuard>
  );
}

export function StaffUsersPage() {
  const [profiles, setProfiles] = useState<ProfileOption[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfiles() {
      try {
        const { data, error: profileError } = await getSupabaseClient().from('profiles').select('id, full_name, email, role').order('full_name');
        if (profileError) throw profileError;
        setProfiles((data || []) as ProfileOption[]);
      } catch (profileError) {
        setError(profileError instanceof Error ? profileError.message : 'Users could not be loaded.');
      }
    }

    loadProfiles();
  }, []);

  return (
    <StaffGuard>
      {(staff) => (
        <StaffRoleGate staff={staff} allowed={adminRoles}>
          <section>
          <PortalPageHeader title="Users" description="Manage staff accounts, complaint roles, and portal access." />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}
          <div className="grid gap-5 md:grid-cols-3">
            <PortalStatCard label="Active Users" value={profiles.length} caption="Portal profiles" icon={Users} tone="blue" />
            <PortalStatCard label="Supervisors" value={profiles.filter((profile) => profile.role === 'supervisor' || profile.role === 'admin').length} caption="Can close cases" icon={ShieldCheck} tone="emerald" />
            <PortalStatCard label="View Only" value={profiles.filter((profile) => profile.role === 'viewer').length} caption="Read access" icon={FileText} tone="slate" />
          </div>

          <div className="mt-6 overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                  <tr>
                    <th className="px-5 py-4">User</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Portal Access</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {profiles.map((profile) => (
                    <tr key={profile.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-blue-100 text-sm font-bold text-council-primary">{getInitials(profile.full_name || profile.email)}</span>
                          <span className="font-semibold text-slate-900">{profile.full_name || 'Staff user'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{profile.email}</td>
                      <td className="px-5 py-4"><PortalBadge className="border-blue-200 bg-blue-50 text-council-primary">{humanizeComplaintValue(profile.role)}</PortalBadge></td>
                      <td className="px-5 py-4"><PortalBadge className="border-emerald-200 bg-emerald-50 text-emerald-700">Active</PortalBadge></td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/portal/users/${profile.id}`} className="inline-flex min-h-9 items-center gap-1 rounded-sm bg-council-primary px-4 text-xs font-semibold text-white hover:bg-council-secondary">
                          Details <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {profiles.length === 0 && <div className="p-6"><EmptyState message="No user profiles are available yet." /></div>}
            </div>
          </div>
          </section>
        </StaffRoleGate>
      )}
    </StaffGuard>
  );
}

export function StaffUserProfilePage({ profileId }: { profileId: string }) {
  const [profile, setProfile] = useState<ProfileOption | null>(null);
  const [portalRole, setPortalRole] = useState('');
  const [assignedComplaints, setAssignedComplaints] = useState<ComplaintRecord[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<ComplaintTask[]>([]);
  const [events, setEvents] = useState<Array<{ id: string; entity_type: string; action: string; created_at: string }>>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const supabase = getSupabaseClient();
        const [profileResult, roleResult, complaintResult, taskResult, eventResult] = await Promise.all([
          supabase.from('profiles').select('id, full_name, email, role').eq('id', profileId).maybeSingle(),
          supabase.from('complaint_staff_roles').select('role, active').eq('profile_id', profileId).maybeSingle(),
          supabase.from('complaints').select('*').eq('assigned_to', profileId).order('submitted_at', { ascending: false }).limit(50),
          supabase.from('complaint_tasks').select('*').eq('assigned_to', profileId).order('created_at', { ascending: false }).limit(50),
          supabase.from('audit_events').select('id, entity_type, action, created_at').eq('actor_profile_id', profileId).order('created_at', { ascending: false }).limit(20),
        ]);

        if (profileResult.error) throw profileResult.error;
        if (!profileResult.data) throw new Error('User profile was not found.');

        setProfile(profileResult.data as ProfileOption);
        setPortalRole((roleResult.data as { role?: string; active?: boolean } | null)?.role || profileResult.data.role || '');
        setAssignedComplaints((complaintResult.data || []) as ComplaintRecord[]);
        setAssignedTasks((taskResult.data || []) as ComplaintTask[]);
        setEvents(eventResult.data || []);
      } catch (profileError) {
        setError(profileError instanceof Error ? profileError.message : 'User profile could not be loaded.');
      }
    }

    loadUserProfile();
  }, [profileId]);

  return (
    <StaffGuard>
      {(staff) => (
        <StaffRoleGate staff={staff} allowed={adminRoles}>
          <section>
            <PortalPageHeader
              title={profile?.full_name || 'User Profile'}
              description={profile?.email || 'Review portal access and assigned complaint work.'}
              actions={profile && (
                <Link href="/portal/users" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Users
                </Link>
              )}
            />
            {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}
            {!profile ? (
              <div className="rounded-sm bg-white p-8 shadow-sm ring-1 ring-slate-200/70">Loading user profile...</div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
                <aside className="space-y-5">
                  <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                    <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-blue-100 text-lg font-bold text-council-primary">{getInitials(profile.full_name || profile.email)}</span>
                    <h2 className="font-heading mt-5 text-2xl font-bold text-slate-950">{profile.full_name || 'Staff user'}</h2>
                    <p className="mt-1 text-slate-600">{profile.email}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <PortalBadge className="border-blue-200 bg-blue-50 text-council-primary">{humanizeComplaintValue(portalRole || profile.role)}</PortalBadge>
                      <PortalBadge className="border-emerald-200 bg-emerald-50 text-emerald-700">Active</PortalBadge>
                    </div>
                  </article>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
                    <PortalStatCard label="Assigned Complaints" value={assignedComplaints.length} caption="Current assignment count" icon={FileText} tone="blue" />
                    <PortalStatCard label="Assigned Tasks" value={assignedTasks.length} caption="Follow-ups and case work" icon={CheckSquare} tone="emerald" />
                  </div>
                </aside>

                <div className="space-y-6">
                  <article className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
                    <div className="border-b border-slate-200 p-5">
                      <h2 className="font-heading text-xl font-bold text-slate-950">Assigned Complaints</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                          <tr>
                            <th className="px-5 py-4">Case ID</th>
                            <th className="px-5 py-4">Complainant</th>
                            <th className="px-5 py-4">Respondent</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {assignedComplaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-slate-50/70">
                              <td className="px-5 py-4"><span className="font-bold text-council-primary">{complaint.reference_number}</span></td>
                              <td className="px-5 py-4 text-slate-700">{complaint.complainant_name}</td>
                              <td className="px-5 py-4 text-slate-600">{complaint.respondent_name}</td>
                              <td className="px-5 py-4"><PortalBadge className={portalStatusBadgeClass(complaint.status)}>{humanizeComplaintValue(complaint.status)}</PortalBadge></td>
                              <td className="px-5 py-4 text-right"><Link href={`/portal/complaints/${complaint.id}`} className="font-semibold text-council-primary hover:text-council-secondary">Open</Link></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {assignedComplaints.length === 0 && <div className="p-6"><EmptyState message="No complaints are assigned to this user." /></div>}
                    </div>
                  </article>

                  <article className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
                    <div className="border-b border-slate-200 p-5">
                      <h2 className="font-heading text-xl font-bold text-slate-950">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {events.map((event) => (
                        <div key={event.id} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-semibold text-slate-900">{humanizeComplaintValue(event.action)}</p>
                          <p className="text-sm text-slate-500">{formatComplaintDate(event.created_at)}</p>
                        </div>
                      ))}
                      {events.length === 0 && <div className="p-6"><EmptyState message="No recent audit activity is available for this user." /></div>}
                    </div>
                  </article>
                </div>
              </div>
            )}
          </section>
        </StaffRoleGate>
      )}
    </StaffGuard>
  );
}

export function StaffAuditLogPage() {
  const [events, setEvents] = useState<Array<{ id: string; entity_type: string; action: string; created_at: string }>>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAuditEvents() {
      try {
        const { data, error: eventError } = await getSupabaseClient().from('audit_events').select('id, entity_type, action, created_at').eq('entity_type', 'complaint').order('created_at', { ascending: false }).limit(100);
        if (eventError) throw eventError;
        setEvents(data || []);
      } catch (eventError) {
        setError(eventError instanceof Error ? eventError.message : 'Audit log could not be loaded.');
      }
    }

    loadAuditEvents();
  }, []);

  const filteredEvents = events.filter((event) => `${event.entity_type} ${event.action}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <StaffGuard>
      {(staff) => (
        <StaffRoleGate staff={staff} allowed={supervisorRoles}>
          <section>
          <PortalPageHeader title="Audit Log" description="Review important complaint actions recorded by the portal." />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}
          <div className="rounded-sm bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <label className="relative block max-w-xl">
              <MagnifyingGlass className="pointer-events-none absolute left-4 top-3 h-4 w-4 text-slate-400" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search audit action..." className="min-h-10 rounded-sm border-slate-200 pl-11 shadow-sm" />
            </label>
          </div>

          <div className="mt-6 overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Date & Time</th>
                    <th className="px-5 py-4">Entity</th>
                    <th className="px-5 py-4">Action</th>
                    <th className="px-5 py-4">Record</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4 text-slate-600">{formatComplaintDate(event.created_at)}</td>
                      <td className="px-5 py-4"><PortalBadge className="border-slate-200 bg-slate-100 text-slate-600">{humanizeComplaintValue(event.entity_type)}</PortalBadge></td>
                      <td className="px-5 py-4 font-semibold text-slate-900">{humanizeComplaintValue(event.action)}</td>
                      <td className="px-5 py-4 text-xs text-slate-500">{event.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredEvents.length === 0 && <div className="p-6"><EmptyState message="No audit events match the current filters." /></div>}
            </div>
          </div>
          </section>
        </StaffRoleGate>
      )}
    </StaffGuard>
  );
}

export function StaffNotificationsPage() {
  const [notifications, setNotifications] = useState<Array<{ id: string; template_code: string; recipient_email: string; subject: string; status: string; created_at: string }>>([]);
  const [activeTab, setActiveTab] = useState('history');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadNotifications() {
      try {
        const { data, error: notificationError } = await getSupabaseClient().from('complaint_notification_log').select('id, template_code, recipient_email, subject, status, created_at').order('created_at', { ascending: false }).limit(100);
        if (notificationError) throw notificationError;
        setNotifications(data || []);
      } catch (notificationError) {
        setError(notificationError instanceof Error ? notificationError.message : 'Notifications could not be loaded.');
      }
    }

    loadNotifications();
  }, []);

  const today = new Date().toDateString();
  const filteredNotifications = notifications.filter((notification) => {
    const haystack = `${notification.recipient_email} ${notification.subject} ${notification.template_code} ${notification.status}`.toLowerCase();
    return haystack.includes(search.toLowerCase()) && (status === 'all' || notification.status === status);
  });

  const tabItems = [
    { code: 'history', label: 'Notification History', count: notifications.length },
    { code: 'templates', label: 'Templates', count: complaintEmailTemplates.length },
    { code: 'alerts', label: 'Staff Alerts', count: notifications.filter((item) => item.template_code === 'complaint_sla_overdue').length },
    { code: 'failed', label: 'Failed Notifications', count: notifications.filter((item) => item.status === 'failed').length },
  ];

  return (
    <StaffGuard>
      {() => (
        <section>
          <PortalPageHeader title="Notifications" description="Manage complaint alerts, public tracking updates, and communication templates." />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            <PortalStatCard label="Emails Sent Today" value={notifications.filter((item) => item.status === 'sent' && new Date(item.created_at).toDateString() === today).length} icon={EnvelopeSimple} tone="blue" />
            <PortalStatCard label="Failed Notifications" value={notifications.filter((item) => item.status === 'failed').length} icon={WarningCircle} tone="rose" />
            <PortalStatCard label="Pending Staff Alerts" value={notifications.filter((item) => item.status === 'queued').length} icon={Clock} tone="amber" />
            <PortalStatCard label="Public Updates Today" value={notifications.filter((item) => item.template_code === 'complaint_status_update' && new Date(item.created_at).toDateString() === today).length} icon={Users} tone="emerald" />
            <PortalStatCard label="Drafted Messages" value={notifications.filter((item) => item.status === 'drafted').length} icon={FileText} tone="amber" />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {tabItems.map((tab) => (
              <button
                key={tab.code}
                type="button"
                onClick={() => setActiveTab(tab.code)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-sm px-5 text-sm font-semibold ${
                  activeTab === tab.code ? 'bg-council-primary text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-white'
                }`}
              >
                {tab.label}
                <span className={`rounded-sm px-2 py-1 text-xs ${activeTab === tab.code ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-200/70">
            {activeTab === 'templates' ? (
              <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
                {complaintEmailTemplates.map((template) => (
                  <article key={template.code} className="rounded-sm border border-slate-200 bg-slate-50 p-5">
                    <p className="font-semibold text-slate-900">{template.label}</p>
                    <p className="mt-2 text-sm text-slate-500">{template.code}</p>
                    <PortalBadge className="mt-4 border-emerald-200 bg-emerald-50 text-emerald-700">Active</PortalBadge>
                  </article>
                ))}
              </div>
            ) : (
              <>
                <div className="grid gap-3 border-b border-slate-200 p-5 lg:grid-cols-[0.35fr_0.18fr_0.18fr_1fr_auto]">
                  <label className="relative">
                    <MagnifyingGlass className="pointer-events-none absolute left-4 top-3 h-4 w-4 text-slate-400" />
                    <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search recipient, complaint..." className="min-h-10 rounded-sm border-slate-200 pl-11 shadow-sm" />
                  </label>
                  <select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClassName()}>
                    <option value="all">All Statuses</option>
                    <option value="drafted">Drafted</option>
                    <option value="queued">Queued</option>
                    <option value="sent">Sent</option>
                    <option value="failed">Failed</option>
                  </select>
                  <select className={selectClassName()} defaultValue="all">
                    <option value="all">All Types</option>
                    {complaintEmailTemplates.map((template) => <option key={template.code} value={template.code}>{template.label}</option>)}
                  </select>
                  <span />
                  <Button type="button" variant="outline" className="min-h-10 rounded-sm border-slate-200 bg-white px-5 text-slate-700 shadow-sm hover:bg-slate-50">Refresh</Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1080px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                      <tr>
                        <th className="px-5 py-4">Date & Time</th>
                        <th className="px-5 py-4">Recipient</th>
                        <th className="px-5 py-4">Notification Type</th>
                        <th className="px-5 py-4">Channel</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Subject</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredNotifications
                        .filter((notification) => activeTab !== 'failed' || notification.status === 'failed')
                        .filter((notification) => activeTab !== 'alerts' || notification.template_code === 'complaint_sla_overdue')
                        .map((notification) => (
                          <tr key={notification.id} className="hover:bg-slate-50/70">
                            <td className="px-5 py-4 text-slate-600">{formatComplaintDate(notification.created_at)}</td>
                            <td className="px-5 py-4 font-medium text-slate-900">{notification.recipient_email}</td>
                            <td className="px-5 py-4 text-slate-600">{humanizeComplaintValue(notification.template_code)}</td>
                            <td className="px-5 py-4"><PortalBadge className="border-blue-200 bg-blue-50 text-council-primary">Email</PortalBadge></td>
                            <td className="px-5 py-4"><PortalBadge className={notification.status === 'failed' ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}>{humanizeComplaintValue(notification.status)}</PortalBadge></td>
                            <td className="max-w-[280px] truncate px-5 py-4 text-slate-500">{notification.subject}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {filteredNotifications.length === 0 && <div className="p-6"><EmptyState message="No notifications match the current filters." /></div>}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </StaffGuard>
  );
}

export function StaffSettingsPage() {
  const [activeSection, setActiveSection] = useState<'statuses' | 'categories' | 'priorities'>('statuses');
  const [statuses, setStatuses] = useState<ComplaintStatusSetting[]>([]);
  const [categories, setCategories] = useState<ComplaintCategorySetting[]>([]);
  const [priorities, setPriorities] = useState<ComplaintPrioritySetting[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadSettings = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const [statusResult, categoryResult, priorityResult] = await Promise.all([
        supabase.from('complaint_statuses').select('*').order('sort_order'),
        supabase.from('complaint_categories').select('*').order('sort_order'),
        supabase.from('complaint_priorities').select('*').order('sort_order'),
      ]);

      if (statusResult.error) throw statusResult.error;
      if (categoryResult.error) throw categoryResult.error;
      if (priorityResult.error) throw priorityResult.error;

      setStatuses((statusResult.data || []) as ComplaintStatusSetting[]);
      setCategories((categoryResult.data || []) as ComplaintCategorySetting[]);
      setPriorities((priorityResult.data || []) as ComplaintPrioritySetting[]);
    } catch (settingsError) {
      setError(settingsError instanceof Error ? settingsError.message : 'Settings could not be loaded.');
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateSetting = async (kind: string, code: string, payload: Record<string, unknown>) => {
    setError('');
    setMessage('');
    const { error: updateError } = await getSupabaseClient().rpc('admin_update_complaint_setting', {
      p_kind: kind,
      p_code: code,
      p_payload: payload,
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMessage('Setting saved.');
    await loadSettings();
  };

  return (
    <StaffGuard>
      {(staff) => (
        <StaffRoleGate staff={staff} allowed={adminRoles}>
          <section>
          <PortalPageHeader title="Settings" description="Edit complaint portal defaults and operating rules." />
          {error && <p className="mb-6 rounded-sm border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{error}</p>}
          {message && <p className="mb-6 rounded-sm border border-blue-200 bg-blue-50 p-4 text-sm text-council-secondary">{message}</p>}
          <div className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
            <aside className="rounded-sm bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <nav className="space-y-2" aria-label="Settings sections">
                {[
                  ['statuses', 'Statuses'],
                  ['categories', 'Complaint Types'],
                  ['priorities', 'Priorities & SLA'],
                ].map(([code, item]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setActiveSection(code as 'statuses' | 'categories' | 'priorities')}
                    className={`flex min-h-11 w-full items-center justify-between rounded-sm px-4 text-left text-sm font-semibold ${activeSection === code ? 'bg-blue-50 text-council-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {item}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </nav>
            </aside>

            <div className="space-y-6">
              {activeSection === 'statuses' && (
                <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-xl font-bold text-slate-950">Complaint Statuses</h2>
                  <div className="mt-5 space-y-4">
                    {statuses.map((statusItem, index) => (
                      <div key={statusItem.code} className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{statusItem.code}</p>
                        <div className="grid gap-3 md:grid-cols-2">
                          <label className="text-sm font-medium text-slate-700">Internal label<Input value={statusItem.internal_label} onChange={(event) => setStatuses((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, internal_label: event.target.value } : item))} className="mt-2 min-h-10 rounded-sm border-slate-200" /></label>
                          <label className="text-sm font-medium text-slate-700">Public label<Input value={statusItem.public_label} onChange={(event) => setStatuses((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, public_label: event.target.value } : item))} className="mt-2 min-h-10 rounded-sm border-slate-200" /></label>
                          <label className="text-sm font-medium text-slate-700 md:col-span-2">Public description<Textarea value={statusItem.public_description} onChange={(event) => setStatuses((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, public_description: event.target.value } : item))} className="mt-2 rounded-sm border-slate-200" /></label>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <label className="flex gap-2 text-sm text-slate-700"><input type="checkbox" checked={statusItem.visible_to_public} onChange={(event) => setStatuses((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, visible_to_public: event.target.checked } : item))} className="h-4 w-4 rounded-sm border-slate-300 text-council-primary" />Visible publicly</label>
                          <label className="flex gap-2 text-sm text-slate-700"><input type="checkbox" checked={statusItem.closes_case} onChange={(event) => setStatuses((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, closes_case: event.target.checked } : item))} className="h-4 w-4 rounded-sm border-slate-300 text-council-primary" />Closes case</label>
                          <Button type="button" onClick={() => updateSetting('status', statusItem.code, statusItem)} className="min-h-10 rounded-sm bg-council-primary px-5 text-white hover:bg-council-secondary">Save</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {activeSection === 'categories' && (
                <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-xl font-bold text-slate-950">Complaint Types</h2>
                  <div className="mt-5 space-y-4">
                    {categories.map((categoryItem, index) => (
                      <div key={categoryItem.code} className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{categoryItem.code}</p>
                        <label className="text-sm font-medium text-slate-700">Label<Input value={categoryItem.label} onChange={(event) => setCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} className="mt-2 min-h-10 rounded-sm border-slate-200" /></label>
                        <label className="mt-3 block text-sm font-medium text-slate-700">Description<Textarea value={categoryItem.description} onChange={(event) => setCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="mt-2 rounded-sm border-slate-200" /></label>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <label className="flex gap-2 text-sm text-slate-700"><input type="checkbox" checked={categoryItem.active} onChange={(event) => setCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, active: event.target.checked } : item))} className="h-4 w-4 rounded-sm border-slate-300 text-council-primary" />Active</label>
                          <Button type="button" onClick={() => updateSetting('category', categoryItem.code, categoryItem)} className="min-h-10 rounded-sm bg-council-primary px-5 text-white hover:bg-council-secondary">Save</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {activeSection === 'priorities' && (
                <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                  <h2 className="font-heading text-xl font-bold text-slate-950">Priorities & SLA</h2>
                  <div className="mt-5 space-y-4">
                    {priorities.map((priorityItem, index) => (
                      <div key={priorityItem.code} className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{priorityItem.code}</p>
                        <div className="grid gap-3 md:grid-cols-[1fr_0.3fr]">
                          <label className="text-sm font-medium text-slate-700">Label<Input value={priorityItem.label} onChange={(event) => setPriorities((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} className="mt-2 min-h-10 rounded-sm border-slate-200" /></label>
                          <label className="text-sm font-medium text-slate-700">SLA days<Input type="number" min={1} value={priorityItem.sla_days} onChange={(event) => setPriorities((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, sla_days: Number(event.target.value) } : item))} className="mt-2 min-h-10 rounded-sm border-slate-200" /></label>
                          <label className="text-sm font-medium text-slate-700 md:col-span-2">Description<Textarea value={priorityItem.description} onChange={(event) => setPriorities((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} className="mt-2 rounded-sm border-slate-200" /></label>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <label className="flex gap-2 text-sm text-slate-700"><input type="checkbox" checked={priorityItem.alert_supervisor} onChange={(event) => setPriorities((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, alert_supervisor: event.target.checked } : item))} className="h-4 w-4 rounded-sm border-slate-300 text-council-primary" />Alert supervisor</label>
                          <Button type="button" onClick={() => updateSetting('priority', priorityItem.code, priorityItem)} className="min-h-10 rounded-sm bg-council-primary px-5 text-white hover:bg-council-secondary">Save</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              <article className="rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
                <h2 className="font-heading text-xl font-bold text-slate-950">Fixed V1 Rules</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Draft expiry</p><p className="mt-2 font-semibold text-slate-900">30 days + cleanup grace</p></div>
                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Uploads</p><p className="mt-2 font-semibold text-slate-900">PDF, JPG, PNG, DOC, DOCX / 10MB</p></div>
                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Accepted respondents</p><p className="mt-2 font-semibold text-slate-900">Nurse, midwife, applicant, licensee</p></div>
                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Email delivery</p><p className="mt-2 font-semibold text-slate-900">Templates drafted until delivery is enabled</p></div>
                </div>
              </article>
            </div>
          </div>
          </section>
        </StaffRoleGate>
      )}
    </StaffGuard>
  );
}

function SimplePanel({ title, description, error, children }: { title: string; description: string; error?: string; children: ReactNode }) {
  return (
    <section className="bg-white p-7 shadow-sm">
      <div className="mb-6 flex items-start gap-4">
        <ChartBar className="mt-1 h-8 w-8 text-council-primary" />
        <div>
          <h1 className="font-heading text-3xl font-bold text-council-dark">{title}</h1>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
      </div>
      {error && <p className="mb-6 border-l-4 border-council-alert bg-red-50 p-4 text-red-900">{error}</p>}
      {children}
    </section>
  );
}
