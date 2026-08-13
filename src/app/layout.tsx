import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nursingcouncilbahamas.com'),
  title: {
    default: "The Nursing Council of the Commonwealth of The Bahamas | Official Website",
    template: "%s | The Nursing Council of the Commonwealth of The Bahamas"
  },
  description: "Official website of The Nursing Council of the Commonwealth of The Bahamas. Guiding and promoting excellence in the practice of nursing through regulation, education, and professional standards since 1972.",
  keywords: [
    "nursing council bahamas",
    "nursing registration bahamas",
    "nursing licence renewal",
    "bahamas nursing education",
    "commonwealth bahamas nursing",
    "nursing standards bahamas",
    "professional nursing regulation",
    "nursing committee bahamas",
    "nursing practice standards",
    "bahamas healthcare regulation"
  ],
  authors: [{ name: "The Nursing Council of the Commonwealth of The Bahamas" }],
  creator: "The Nursing Council of the Commonwealth of The Bahamas",
  publisher: "The Nursing Council of the Commonwealth of The Bahamas",
  applicationName: "Nursing Council Bahamas",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "127x127" }],
    apple: "/favicon.png",
  },
  category: "Healthcare",
  classification: "Government",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_BS",
    url: "https://nursingcouncilbahamas.com",
    siteName: "The Nursing Council of the Commonwealth of The Bahamas",
    title: "The Nursing Council of the Commonwealth of The Bahamas | Official Website",
    description: "Official website of The Nursing Council of the Commonwealth of The Bahamas. Guiding and promoting excellence in the practice of nursing through regulation, education, and professional standards since 1972.",
    images: [
      {
        url: "/nursing-council-logo.png",
        width: 400,
        height: 400,
        alt: "The Nursing Council of the Commonwealth of The Bahamas Official Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nursing Council of the Commonwealth of The Bahamas | Official Website",
    description: "Official website of The Nursing Council of the Commonwealth of The Bahamas. Guiding and promoting excellence in the practice of nursing.",
    images: ["/nursing-council-logo.png"],
  },
  alternates: {
    canonical: "https://nursingcouncilbahamas.com",
  },
  other: {
    "contact:country": "Bahamas",
    "contact:state": "New Providence",
    "contact:city": "Nassau",
    "contact:postal-code": "N-3509",
    "contact:phone": "+1-242-604-6015",
    "contact:email": "info@nursingcouncilbahamas.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Schema.org structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "name": "The Nursing Council of the Commonwealth of The Bahamas",
  "alternateName": "Nursing Council of the Bahamas",
  "description": "Official regulatory body for nursing practice throughout the Commonwealth of The Bahamas. We are committed to safeguarding the public through the regulation of nursing education, registration, and professional standards.",
  "url": "https://nursingcouncilbahamas.com",
  "logo": "https://nursingcouncilbahamas.com/nursing-council-logo.png",
  "foundingDate": "1972",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "#23 Capitol House, Virginia & Augusta Street",
    "addressLocality": "Nassau",
    "addressCountry": "BS",
    "postalCode": "N-3509"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-242-604-6015",
      "contactType": "customer service",
      "areaServed": "BS",
      "availableLanguage": "English",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    },
    {
      "@type": "ContactPoint",
      "email": "info@nursingcouncilbahamas.com",
      "contactType": "customer service",
      "areaServed": "BS",
      "availableLanguage": "English"
    }
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Commonwealth of The Bahamas"
  },
  "serviceType": [
    "Nursing Registration",
    "Nursing Licence Renewal",
    "Nursing Education Standards",
    "Professional Standards Regulation",
    "Nursing Agency Licensure"
  ],
  "sameAs": [
    "https://www.facebook.com/nursingcouncilbahamas",
    "https://twitter.com/nursingcouncilbs",
    "https://www.linkedin.com/company/nursing-council-bahamas"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-BS" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="127x127" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#000080" />
        <meta name="msapplication-TileColor" content="#000080" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="min-h-screen bg-background font-body antialiased">
        {children}
      </body>
    </html>
  );
}
