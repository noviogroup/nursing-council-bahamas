import { StaffUserProfilePage } from '@/components/complaints/StaffPortalClient';

export default async function PortalUserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StaffUserProfilePage profileId={id} />;
}
