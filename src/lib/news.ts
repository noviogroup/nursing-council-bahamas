export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryName: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  body: string[];
};

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: 'continuing-education-2025',
    title: 'New Continuing Education Requirements for 2025',
    excerpt: 'The Nursing Council announces updated continuing education requirements effective January 2025, including new mandatory modules on patient safety and infection control.',
    category: 'standards',
    categoryName: 'Standards',
    author: 'Dr. Patricia Williams',
    date: '2025-01-15',
    readTime: '5 min read',
    featured: true,
    image: '/assets/nursing-ceremony-1.jpg',
    body: [
      'The Nursing Council has updated continuing education requirements for the 2025 renewal cycle. The updated requirements support current practice standards and strengthen patient safety across care settings.',
      'Registrants should review the updated modules before submitting renewal materials. Council staff will continue to publish reminders through the website and portal as renewal deadlines approach.',
      'Nurses who have questions about approved courses or documentation should contact the Education and Continuing Education team before submitting their renewal application.',
    ],
  },
  {
    id: 2,
    slug: 'whatsapp-channel-coming-soon',
    title: 'Nursing Council WhatsApp Channel Link Coming Soon',
    excerpt: 'The Council will publish the official WhatsApp channel link once it has been confirmed for public use.',
    category: 'announcements',
    categoryName: 'Announcements',
    author: 'Council Office',
    date: '2025-01-10',
    readTime: '2 min read',
    featured: true,
    image: '/assets/nurse-pinning-ceremony.webp',
    body: [
      'The Nursing Council will publish its official WhatsApp channel link once the channel URL is confirmed for public use.',
      'Members of the public and registrants should continue to rely on the website for official notices, forms, and Council contact details.',
      'The Council will update this notice when the channel is ready.',
    ],
  },
  {
    id: 3,
    slug: 'code-of-ethics-for-nurses-2025',
    title: 'Code of Ethics for Nurses 2025 Available',
    excerpt: 'The Council Code of Ethics for Nurses 2025 is available through the Legal and Ethics page.',
    category: 'legal',
    categoryName: 'Legal & Ethics',
    author: 'Council Office',
    date: '2025-02-01',
    readTime: '4 min read',
    featured: false,
    image: '/assets/history/nursing-council-seal.png',
    body: [
      'The Nursing Council Code of Ethics for Nurses 2025 provides guidance for ethical decision-making, accountability, professionalism, and safe care.',
      'The Code applies across care, education, administration, research, and professional practice.',
      'The full PDF is linked from the Legal and Ethics page.',
    ],
  },
  {
    id: 4,
    slug: 'online-registration-portal-improvements',
    title: 'Online Registration Portal Improvements',
    excerpt: 'We have enhanced our online registration system with new features including document upload, status tracking, and automated notifications.',
    category: 'registration',
    categoryName: 'Registration',
    author: 'IT Department',
    date: '2024-12-15',
    readTime: '4 min read',
    featured: false,
    image: '/assets/register-card.png',
    body: [
      'The Council continues to improve its online registration portal to make application and renewal workflows clearer for nurses, applicants, and staff.',
      'New portal capabilities include document upload support, application status tracking, and improved notifications for key review steps.',
      'Applicants should continue to keep their contact information current so Council staff can communicate status updates quickly.',
    ],
  },
  {
    id: 5,
    slug: 'nursing-scholarship-program-2025',
    title: 'Nursing Scholarship Program 2025 Applications',
    excerpt: 'The Council is pleased to announce the opening of applications for our annual nursing education scholarship program for Bahamian students.',
    category: 'education',
    categoryName: 'Education',
    author: 'Education Committee',
    date: '2024-12-10',
    readTime: '6 min read',
    featured: false,
    image: '/assets/education-training-card.png',
    body: [
      'Applications are open for the 2025 nursing education scholarship program. The programme supports Bahamian students pursuing nursing education and professional development.',
      'Applicants should prepare academic records, references, and any required supporting documentation before submitting.',
      'The Education Committee will publish additional eligibility and deadline information through Council channels.',
    ],
  },
  {
    id: 6,
    slug: 'professional-development-workshop-series',
    title: 'Professional Development Workshop Series',
    excerpt: 'Join our monthly professional development workshops covering leadership, communication, and advanced clinical skills for nursing professionals.',
    category: 'education',
    categoryName: 'Education',
    author: 'Prof. Michael Thompson',
    date: '2024-12-05',
    readTime: '3 min read',
    featured: false,
    image: '/assets/nursing-ceremony-3.jpg',
    body: [
      'The Council will host a professional development workshop series for nurses seeking current training in leadership, communication, and clinical practice.',
      'Workshop topics are selected to support professional competence and continued excellence in nursing practice.',
      'Registration details and approved continuing education information will be shared as sessions are scheduled.',
    ],
  },
  {
    id: 7,
    slug: 'new-council-member-appointments',
    title: 'New Council Member Appointments',
    excerpt: 'We welcome three new members to the Nursing Council, bringing expertise in community health, pediatric nursing, and healthcare administration.',
    category: 'announcements',
    categoryName: 'Announcements',
    author: 'Council Secretary',
    date: '2024-11-28',
    readTime: '4 min read',
    featured: false,
    image: '/assets/hero-2.jpg',
    body: [
      'The Nursing Council welcomes newly appointed members who bring experience across community health, pediatric nursing, and healthcare administration.',
      'Council members support the governance, regulatory oversight, and professional standards that guide nursing practice in The Bahamas.',
      'The Council thanks outgoing members for their service and continued support of the nursing profession.',
    ],
  },
  {
    id: 8,
    slug: 'infection-control-best-practices-update',
    title: 'Infection Control Best Practices Update',
    excerpt: 'Updated guidelines for infection prevention and control in healthcare settings, incorporating lessons learned from recent global health challenges.',
    category: 'standards',
    categoryName: 'Standards',
    author: 'Dr. Robert Clarke',
    date: '2024-11-22',
    readTime: '8 min read',
    featured: false,
    image: '/assets/hero-3.jpg',
    body: [
      'Updated infection prevention and control guidance is available for nursing professionals working across healthcare settings.',
      'The guidance reinforces practical measures that reduce risk for patients, staff, and the wider community.',
      'Nurses should review the guidance alongside employer protocols and any current Ministry of Health requirements.',
    ],
  },
];

export const categoryDefinitions = [
  { id: 'all', name: 'All updates' },
  { id: 'standards', name: 'Standards' },
  { id: 'legal', name: 'Legal & Ethics' },
  { id: 'registration', name: 'Registration' },
  { id: 'education', name: 'Education' },
  { id: 'announcements', name: 'Announcements' },
  { id: 'events', name: 'Events' },
];

export function getNewsItem(slugOrId: string) {
  return newsItems.find((item) => item.slug === slugOrId || String(item.id) === slugOrId);
}
