import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { DEFAULT_DESCRIPTION, DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Official Website`,
    template: `%s | ${SITE_NAME}`
  },
  description: DEFAULT_DESCRIPTION,
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
    icon: [{ url: "/nursing-council-logo.png", type: "image/png" }],
    apple: "/nursing-council-logo.png",
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Official Website`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1024,
        height: 683,
        alt: "Nurses in The Bahamas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Official Website`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-BS" className={manrope.variable}>
      <head>
        <link rel="icon" href="/nursing-council-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/nursing-council-logo.png" />
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
