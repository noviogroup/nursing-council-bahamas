import type { Metadata } from 'next';

export const SITE_NAME = 'The Nursing Council of the Commonwealth of The Bahamas';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nursingcouncilbahamas.com').replace(/\/$/, '');
export const DEFAULT_DESCRIPTION =
  'Official website of The Nursing Council of the Commonwealth of The Bahamas, the statutory body regulating nursing and midwifery education and practice.';
export const DEFAULT_SOCIAL_IMAGE = '/assets/approved/hero-image-nursing.jpg';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_BS',
      siteName: SITE_NAME,
      url: canonicalPath,
      title,
      description,
      images: [
        {
          url: image,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOrganization',
  name: SITE_NAME,
  alternateName: 'Nursing Council of The Bahamas',
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/nursing-council-logo.png`,
  foundingDate: '1972',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '#23 Capitol House, Virginia & Augusta Street',
    addressLocality: 'Nassau',
    addressCountry: 'BS',
    postalCode: 'N-3509',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-242-604-6015',
    email: 'info@nursingcouncilbahamas.com',
    contactType: 'customer service',
    areaServed: 'BS',
    availableLanguage: 'English',
  },
  areaServed: {
    '@type': 'Country',
    name: 'The Bahamas',
  },
};
