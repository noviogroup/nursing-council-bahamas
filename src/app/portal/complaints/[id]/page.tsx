import { StaffComplaintDetail } from '@/components/complaints/StaffPortalClient';

type PortalComplaintDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PortalComplaintDetailPage({ params }: PortalComplaintDetailPageProps) {
  const { id } = await params;
  return <StaffComplaintDetail complaintId={id} />;
}
