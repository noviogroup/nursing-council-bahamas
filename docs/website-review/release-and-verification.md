# Website and complaint-service review — 8 November 2026

The owner approved the six-phase plan for local implementation. The website review branch is `design/current-site-nurse360` at port 3012; the companion portal branch is `design/website-complaints-review` at port 3003 (portal commit `3277a14`). Nothing has been published or applied to hosted Supabase. Existing portal port 3002 and the separate design preview port 3010 remain available.

## Delivered locally

- Restored a balanced address / two independently linked telephone numbers / email contact bar, including mobile. Six committees have one approved public summary each, relevant next actions and matching footer anchors. Historical working copy stays in version control, with no new public internal-document links.
- Forms & Applications retains all 16 services: five real online workflows, ten Council-assisted services and one guidance route. Missing PDFs no longer leave dead ends. Good Standing goes to Certificates & Letters. Graduate Nurse Letter stays a separate assisted service with a proposed internal process specification, pending its service policy/template/approval configuration.
- Contact records into the existing separate `public_inquiries` queue using a server-validated API. A successful recorded UUID is the only on-page reference. Rejected input preserves the message; ambiguous network outcomes ask the person to confirm receipt before sending again. Internal Operations owns the queue. Staff can search the full UUID on the companion portal branch. Ordinary enquiries do not automatically send new notifications.
- Complaint intake has five stages, conditional earlier actions, optional evidence, required-field/email/date validation, native accessible choices, error/focus recovery and a full review with edit links. All nine existing category identifiers and existing acknowledgements remain intact. Public grouping does not expand Council jurisdiction; final policy wording remains Council acceptance work.
- Drafts preserve existing saved data, tolerate malformed older fields and show the actual returned expiry. Evidence is explicitly not saved in drafts. Private draft/reply routes and tracking/receipt paths are excluded from visit tracking before storage/network activity. Secure reply pages use no-referrer/noindex.
- A confirmed complaint is a separate terminal state. Attachment recovery retains the original reference; uploading is never allowed to restart case creation. The v2 request key and payload are stable across retries. Legacy unknown submission outcomes block automatic retry. An uncertain legacy evidence-registration outcome also requires Council confirmation, because the deployed legacy RPC is not yet idempotent. Upload-only failures can retry safely with stable paths.
- The tracker handles loading, no match, network errors and partial history honestly; awaiting-documents and pending-response statuses are actionable. The gated v2 tracker shows explicit requests and dates without exposing reply tokens. Secure response UI keeps identical response/upload identities on retry and confirms only a recorded receipt.
- Companion portal provides reviewed additive SQL/edge services, earliest-deadline selection, truthful partial-load states, staff ownership/configuration, request preview/revocation and response handling. Secure delivery URLs are private and only resolved under a valid service dispatch claim; broad staff notification reads do not expose them. Astra re-reviewed that correction.

The owner subsequently requested the homepage video gallery move below the Council introduction; that order is now portal ribbon → Council introduction → Nurse 360 videos → news. The three online-service cards remain unchanged. The removed “Online services” eyebrow was explained as part of the earlier approved duplicate-label cleanup.

## Verification performed

Website automated checks: production build passed (41 static pages plus dynamic routes), TypeScript/ESLint; 25 isolated tests covering preserved service inventory, contact validation and HTTP receipts/errors, complaint category mapping, legacy draft normalization, complete validation, duplicate/concurrent attempt protection, immutable v2 retry payload, upload recovery, secure response contracts and file validation. Tests use synthetic data and mocked I/O, never real complaint/enquiry submissions.

Browser checks against local pages and temporary isolated fixtures:

- Blank required inputs produce focused linked errors; invalid email remains recoverable.
- Saved narrative/earlier actions are restored; hiding earlier actions retains editable answers; actual draft expiry is shown.
- Full review includes narrative, earlier actions and named evidence; Edit returns to the correct stage and retains changes.
- Synthetic complaint upload failure: one case creation, failed first upload, successful retry, one document registration, same reference throughout. The original case submission button never reappears.
- Synthetic contact failure preserves entered message; a confirmed retry produces the actual mock UUID and focuses confirmation.
- Synthetic secure reply failure freezes the response; retry returns a receipt for the same complaint with truthful no-email-queued wording.
- Complaint/header layout checked at 320px and 390px; 20px root text checked on concern choices and fields. Contact groups wrap and remain available. Step navigation is compact on mobile. Keyboard/focus behavior checked through validation and stage/review navigation.

Screenshots retained outside the web root in the session artifact directory: `complaint-retry-qa.png`, `secure-reply-qa.png`, `complaint-mobile-390-large-text.png`. Temporary QA routes and fixtures were removed before the release build.

Portal checks: full lint/build, 44 isolated SQL checks plus a two-session concurrency test, 20 behavior assertions, 935 security contracts, 297 notification contracts and existing form/asset/tour validators. The isolated PostgreSQL foundation is synthetic. These checks do not establish full deployed Supabase/Storage/edge/mail integration or completed Council UAT.

## Activation gates and operational ownership

Internal Operations is the confirmed operational owner. Designated eligible officers/deputy, notification recipients, leave coverage, escalation rules and the Graduate Nurse Letter eligibility/evidence/fee/template/authorised approver remain internal configuration and policy work. Existing date rules are retained; no new processing promises or automatic overdue escalation schedule was invented.

Keep `NEXT_PUBLIC_COMPLAINTS_V2_ENABLED=false`, `NEXT_PUBLIC_COMPLAINT_FOLLOWUP_ENABLED=false` and portal `VITE_COMPLAINT_WORKFLOW_V2_ENABLED=false` until the reviewed backend is deployed to an approved test target and verified. No fallback from an uncertain v2 request to legacy case creation is permitted.

The companion release document specifies migration/edge/dispatcher rollout, settings, private delivery requirements, controlled test cases/mailboxes and rollback. The updated dispatcher must ship with secure email links. All new notification/routing flags default off.

Before go-live: test the full submit → receipt → triage/assign → request → email → secure reply/upload → staff decision → tracking/closure journey with approved test identities and destinations; verify permission boundaries and real mail receipt. Retire public legacy reference+email evidence-write grants after checking callers and moving them to v2/staff-authorised routes. Confirm orphan-upload retention and existing public departmental contact details. Council acceptance and final publishing/production approval are separate from this local implementation.

## Rollback

Website rollback is a review-branch revert and frontend capability disable. Preserve confirmed references and in-flight opaque request keys. Do not switch an uncertain v2 attempt to legacy submission. Backend rollback disables new routing/notifications/follow-up while retaining all case, reply, evidence and idempotency records. Never delete case data or re-open retired legacy evidence grants as a routine rollback.

## Header continuity follow-up — 9 November 2026

The companion portal review now uses the website's Council header on its public entry, guidance, authentication and recovery pages. The same-tab round trip between website Education and Nurse 360 was verified. For this paired review, the website runs with `NEXT_PUBLIC_PORTAL_URL=http://localhost:3003` and the portal returns to `http://localhost:3012`; the original portal on 3002 remains a separate checkout. Production URLs and deployment remain separate release configuration.

Submenus use the subsequently approved neutral white treatment without coloured top borders. The Committees section and its six links were removed from the footer at the owner's request; the earlier delivery description above records the original review state. Full portal scope, routing and verification are recorded in the companion repository's `docs/implementation/website-header-continuity-2026-11-09.md`.
