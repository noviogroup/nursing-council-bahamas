import { redirectToLicensingPortal } from '../../redirect';
export default async function PortalComplaintDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; redirectToLicensingPortal(`/admin/complaints/${encodeURIComponent(id)}`); }
