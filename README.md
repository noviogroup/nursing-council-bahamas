# The Nursing Council of the Commonwealth of The Bahamas

Official public website and digital services platform for The Nursing Council of the Commonwealth of The Bahamas.

Live site: [https://nursingcouncilbahamas.netlify.app](https://nursingcouncilbahamas.netlify.app)

## Current Scope

The project provides:

- Public information about the Council, its history, mandate, governance, and committees
- Registration, licence renewal, indexing, and verification entry points
- Education, training, nursing agency, UAP, legal, and forms pages
- Public complaint submission and complaint-status tracking
- A role-aware staff complaints portal backed by Supabase
- Responsive navigation, accessible page structures, and search-engine metadata

The News page is intentionally excluded from public navigation and the sitemap until approved news content is available.

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

## Environment Variables

The public informational pages can render without database credentials. Complaint submission, tracking, and staff portal features require the Supabase values documented in `.env.example`.

Important variables include:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PORTAL_URL`
- `NEXT_PUBLIC_COMPLAINTS_STORAGE_BUCKET`

Email delivery remains disabled until an email provider and approved templates are configured.

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
- Typeface: Urbanist
- Standard interface radius: 4px where framing is useful

## Contact

The Nursing Council of the Commonwealth of The Bahamas<br />
#23 Capitol House, Virginia & Augusta Street, Nassau, The Bahamas<br />
(242) 604-6015 / 6017<br />
info@nursingcouncilbahamas.com

Copyright 2026 The Nursing Council of the Commonwealth of The Bahamas.
