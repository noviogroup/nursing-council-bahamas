# Changelog

This file records material website and platform releases. Council-supplied legal documents, lists, photographs, and forms should be noted here when published.

## 2026-08-17 - Regional Nursing Body News

- Added an external news link covering the 53rd Regional Nursing Body meeting in Georgetown, Guyana.
- Added the supplied high-resolution regional delegation photograph as the news-card cover.
- Replaced the News page hero with an authentic photograph of the Nursing Council of The Bahamas delegation participating in the regional meeting.

## 2026-08-13 - Meeting Content Corrections and Local CSS Stability

### Public content

- Reordered About guiding statements to Vision, Mission, and Core Values, with the four approved values presented directly beneath them.
- Standardized public past-chairperson service periods to year-only display.
- Updated homepage education wording to explicitly include nursing education oversight.
- Removed union and unrelated promotional coverage from News and revised the page language around Council-relevant updates.
- Reduced the primary navigation to Home, About, Education, Agencies, and News; secondary services remain available through homepage actions and the footer.
- Replaced fake Education and Agencies placeholder rows with publication-status notices and removed unconfirmed agency requirements.
- Added the Council-confirmed clinical-site groupings to Education and separated Legal Counsel/Attorney and Education appointments in the statutory governance hierarchy.
- Replaced the Education hero photograph with the approved clinical skills instruction image.
- Replaced the Legal hero photograph with the supplied nursing professional image.
- Replaced the Agency hero photograph with a home-care nursing image and added responsive focal positioning to keep the nurse and patient visible.
- Replaced the News hero photograph with the Nursing Council Board and Minister meeting image.
- Consolidated the About-page legacy content into a two-column record with a sticky founding-history panel and naturally scrolling Founding Members and Past Chairpersons sections.
- Replaced the homepage Register and Renew Licence service-card photographs with the newly supplied nurse portraits.
- Published the three Council-supplied current nursing agencies on the Nursing Agencies page, including the corrected Happy Healing Home Care name.
- Added verified public brand artwork for all three listed nursing agencies and standardized its presentation across the agency directory cards.
- Replaced the Education page&apos;s CPD provider and requirement placeholders with a logo-led directory of the four Council-identified clinical-site groups.

### Development environment

- Separated development output into `.next-dev` so production builds no longer invalidate CSS assets served by a running local development server.

## 2026-08-04 - Public Hero and Typography Update

### Presentation

- Changed the global public-site and staff-portal typeface from Urbanist to Manrope, including headings, navigation, forms, and printable complaint output.
- Updated the Education, Nursing Agencies, and Legal page heroes to use the About-page Council-blue-to-transparent image gradient.
- Added responsive hero imagery to all three updated pages and retained the approved page-specific photographs on mobile and desktop.
- Reworked the About-page mandate section so Mission, Standards, Vision, and Code of Ethics display in a full-width four-card row on desktop.
- Redesigned the About-page governance section as a statutory hierarchy, grouping all eleven Council seats into four readable representation areas.
- Separated Council-member governance from Administration, moved Registrar information out of Council membership, and recorded the need for confirmed appointments and professional portraits.
- Removed the governance summary metrics from the statutory-body panel to keep the hierarchy focused on representation.
- Published the Council-supplied list of five approved nursing training institutions and their programmes on the Education and Registration page.
- Redesigned the approved nursing-training directory for clearer programme scanning without changing the Council-supplied institution or programme information.
- Restored public News navigation, a homepage news panel, and the News page with fifteen source-linked nursing and statutory-work articles.
- Added the associated source images to the public news library, including the matching ZNS/BIS photograph for the government&apos;s blocked pinning-ceremony page.
- Redesigned the Forms page as a searchable, category-filtered directory with clear PDF-pending states until Council-approved documents are supplied for publication.

## 2026-08-01 - Public Website Content and Design Refresh

### Homepage

- Replaced the homepage hero with approved nursing ceremony photography and adjusted the crop to preserve faces.
- Updated the Council name and guiding statement.
- Added direct Indexing and Verification hero actions and removed those items from the crowded header navigation.
- Replaced service-card imagery with approved University of The Bahamas, nursing ceremony, and TCN photographs.
- Redesigned the Get to Know Us section with authentic imagery, regulatory priorities, and updated Council facts.
- Removed the public News and Updates section while approved news content is pending.

### About

- Updated mission, vision, mandate, ethics, history, and legal timeline content.
- Added the Code of Ethics summary and linked the 2025 Code of Ethics document.
- Replaced the former Council image with approved historical Council photographs.
- Redesigned the founding-member section with a responsive image presentation and structured member table.
- Added a governance hierarchy based on the First Schedule of the Nurses and Midwives Act, 2023, including the statutory 11-seat composition and six-member quorum.
- Removed registration call-to-action sections that did not belong on the About page.

### Legal

- Replaced the previous Act reference with the supplied Nurses and Midwives Act, 2023 PDF.
- Added the 2024 Appointed Day Notice link.
- Removed the Code of Ethics from the Legal page; ethics guidance remains on the About page.
- Kept regulations clearly identified as pending approved publication content.

### Education, Agencies, and Forms

- Removed public fee presentation and application-path fee references.
- Added structured placeholders for approved institutions, programmes, clinical sites, CPD providers, and CPD requirements.
- Renamed agency references to Licensed Nursing Agencies and added licensing/compliance guidance.
- Added organized placeholder groups for Council-approved registration, education, CPD, agency, and UAP forms.

### Navigation and Presentation

- Rebalanced desktop navigation spacing and preserved mobile navigation access.
- Standardized the official Council name in the header, footer, metadata, and accessibility labels.
- Set the official Council logo as the browser favicon and Apple touch icon.
- Applied the Council navy and gold palette with restrained 4px interface radii.
- Standardized the public-site typeface to Urbanist; superseded by the Manrope update recorded above.
- Updated footer contact wording and removed the 24-hour response promise.

### Project and Deployment Documentation

- Replaced the outdated setup guide with current npm, environment, page, asset, and Netlify instructions.
- Added this permanent release changelog and documented remaining Council content dependencies.
- Pinned Node.js 20 for supported Supabase and Netlify builds and fixed Next.js project-root detection.

### Published Assets

- Added the approved homepage, UB, nursing graduate, TCN, and nursing ceremony image set.
- Added Council seal presentation and Terreve College visit photographs.
- Added the supplied Nurses and Midwives Act, 2023 PDF.

### Content Still Required From the Council

- Confirmed names, titles, appointment terms, and matching professional photographs for the current 11 appointed Council members.
- Official licensed-agency list and agency application documents.
- Approved clinical sites, CPD providers, and CPD requirements.
- Approved replacement forms for the public forms library.
- Approved Agency Regulations and proposed 2026 Regulations content.
- Additional school photographs, historical captions, and archive records.

## 2026-07-27 - Complaints Portal Foundation

- Added public complaint submission and reference-number tracking.
- Added staff-assisted complaint intake, complaint management, reporting, users, audit, notification, and settings views.
- Added Supabase-backed complaint records, documents, staff roles, access controls, and audit history.
- Added complaint PDF and report export support.
- Added staff login and password-reset routes.
- Added the draft Digital Registration, Indexing, Examination, Licensing, and Compliance Operations SOP.

## 2026-07-22 - Deployment Security Update

- Updated Next.js to a release patched for CVE-2025-55182 so Netlify could accept the Next.js server handler.
