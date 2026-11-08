# The Nursing Council of the Commonwealth of The Bahamas

Official public website and digital services platform for The Nursing Council of the Commonwealth of The Bahamas.

Live site: [https://nursingcouncilbahamas.netlify.app](https://nursingcouncilbahamas.netlify.app)

## Current Scope

The project provides:

- Public information about the Council, its history, mandate, governance, and committees
- Registration, licence renewal, indexing, and verification entry points
- Education, training, nursing agency, UAP, legal, and forms pages
- A searchable public nurse registry sourced from the Council's Airtable records
- Public complaint submission and complaint-status tracking
- A role-aware staff complaints portal backed by Supabase
- Responsive navigation, accessible page structures, and search-engine metadata

The News page is available in public navigation and the sitemap. It links to selected external reporting and source material; it does not republish full third-party articles.

## Technology

- Next.js 15.5
- React 18
- TypeScript
- Tailwind CSS
- Supabase
- Netlify with `@netlify/plugin-nextjs`
- npm

## Local Setup

Use Node.js 20 or newer.

```bash
git clone https://github.com/noviogroup/nursing-council-bahamas.git
cd nursing-council-bahamas
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Current-site Nurse 360 review

The `design/current-site-nurse360` branch updates the existing full-site homepage while retaining the Council's public information pages. Its three compact blue service cards lead to student indexing, existing-nurse setup, and international applications. Public copy uses “I’m already a nurse” and “Get started with Nurse 360.”

Run this review alongside the separate redesign on port 3010:

```bash
PUBLIC_SITE_LIVE=true NEXT_PUBLIC_PORTAL_URL=http://localhost:3002 npm run dev -- --port 3012 --hostname 127.0.0.1
```

Port 3002 must run the local Nurse 360 portal. Without an override, portal links use `https://portal.nursingcouncilbahamas.com`.

The homepage uses the supplied 27-second Nurse 360 introduction, the existing official WhatsApp channel QR code, and the original Novio Group logo. Video playback requires a user action; the dialog includes written introductory guidance, an independent video link, keyboard dismissal, and focus restoration. The WhatsApp destination is an announcements channel, not a support chat. Footer attribution reads “Digital transformation delivered in partnership with” beside the Novio Group logo.

This branch is for local review; publishing requires a separate go-live decision.

News cards share `src/components/NewsCard.tsx` across the homepage and `/news`. The homepage gives the latest listed story more space beside three compact stories; narrow screens stack their images and text. Preserve complete headlines, publisher attribution, original dates and source links. Each card has one keyboard-accessible link, a visible focus outline around the card, and an announced external-tab destination.

The header groups navigation into Services, Education, Nurse registry, About, News, and Help. The Nurse 360 logo links to the portal and remains visible on narrow screens. Disclosures open on activation and close on Escape, focus leaving the group, outside clicks, and route changes; the active page has a pink indicator.

The homepage video gallery contains the six supplied original videos. It uses one player with desktop thumbnails and a mobile selector, preserves portrait framing, and does not autoplay when a video is selected. Media uses `preload="none"`; written guide links and a separate video link remain available if playback fails. Original recorded wording is retained in the media.

The homepage welcome shows the Council crest and “Nursing is going digital.” before a brief fade and scale into the page. It runs once per tab session, provides Skip and Escape, bypasses deep links and reduced-motion preferences, and leaves the page available without JavaScript. Add `?welcome=1` to replay it for review; reduced-motion preferences still take precedence. This is a welcome animation, not a simulated loading-progress indicator.

## Environment Variables

The public informational pages can render without database credentials. The nurse registry, complaint submission, tracking, and staff portal features require the values documented in `.env.example`.

Important variables include:

- `PUBLIC_SITE_LIVE=true` to expose the complete public website; when omitted, visitors see the temporary landing page while staff portal and API routes remain available

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PORTAL_URL`
- `NEXT_PUBLIC_COMPLAINTS_STORAGE_BUCKET`
- `AIRTABLE_TOKEN` and the Airtable base, table, and view IDs
- `REGISTRY_SYNC_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; the registry sync endpoints accept only the service role)

The complaints portal includes a reviewable catalogue of draft email templates. Email delivery remains disabled until the Council approves the copy and an email provider is configured.

The public registry searches a protected Supabase index. Netlify refreshes that index daily from Airtable; an authorized manual refresh can be run with `npm run sync:registry`.

Never commit `.env.local` or private credentials.

## Validation

```bash
npx tsc --noEmit
npm run build
```

## Public Pages

- `/` - Homepage and key service entry points
- `/about` - History, mandate, ethics, founding members, and statutory governance
- `/education-training` - Education and registration guidance
- `/education-registration` - Approved-provider and clinical-site lists
- `/nursing-agencies` - Agency licensing and compliance
- `/legal-ethics` - Nurses and Midwives Act, 2023
- `/indexing` - Indexing guidance and portal entry
- `/verification` - Registration verification and good-standing guidance
- `/registry` - Searchable public nurse registry
- `/forms` - Public forms library
- `/committees` - Council committees and responsibilities
- `/complaints` - Complaint information, submission, and tracking
- `/uaps` - Unregulated assistive personnel information
- `/contact` - Council contact details and enquiry form

Several public lists and form downloads remain marked as placeholders until the Council supplies approved source documents and data. See [CHANGELOG.md](CHANGELOG.md) for the current release and outstanding content dependencies.

## Assets and Documents

- Approved public imagery: `public/assets/approved/`
- Historical imagery: `public/assets/history/`
- Published Council documents: `public/documents/`
- Digital operations SOP: `docs/Nursing_Council_Digital_Operations_SOP.pdf`

The SOP remains a draft for Council review and is not a substitute for legal or Council approval.

## Deployment

The repository is linked to the Netlify project `nursingcouncilbahamas`.

```bash
npx netlify status
npx netlify deploy
npx netlify deploy --prod
```

Netlify uses `npm run build` and publishes the generated Next.js application from `.next`.

## Brand System

- Primary blue: `#000080`
- Secondary blue: `#003A70`
- Accent gold: `#FFC72C`
- Typeface: Manrope
- Standard interface radius: 4px where framing is useful

Public-page copy direction (8 November 2026): lead with clear headings and avoid
decorative eyebrows that repeat the heading or section context. State institution
approval once in the section heading rather than on every card. Retain meaningful
status, audience, programme, office-hour, form-progress, and table labels; fold any
essential context from a removed eyebrow into the heading or supporting copy.

## Contact

The Nursing Council of the Commonwealth of The Bahamas<br />
#23 Capitol House, Virginia and Augusta Streets, Nassau, The Bahamas<br />
(242) 604-6015 / 6017<br />
info@nursingcouncilbahamas.com

Copyright 2026 The Nursing Council of the Commonwealth of The Bahamas.
