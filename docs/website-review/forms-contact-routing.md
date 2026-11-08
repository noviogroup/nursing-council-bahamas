# Forms, applications and general-enquiry routing

Local review implementation, 8 November 2026. Website branch: `design/current-site-nurse360`; companion portal baseline: `ecb563e` on `design/website-complaints-review`. No production migration, submission or new notification routing was activated as part of this work.

## Service catalogue

`src/lib/councilServices.ts` is the website’s shared inventory. It retains all 16 existing service titles. Five have implemented portal destinations; ten use Council assistance; CPD requirements is guidance rather than an application. Each item includes audience/purpose, preparation, next action and follow-up. No new fees or processing times are asserted.

Portal links use `NEXT_PUBLIC_PORTAL_URL` through `portalPath()`, falling back to the configured public portal address. In local review, confirm that value points to the intended local portal before following application links.

| Public service | Current action | Queue type for a related enquiry |
| --- | --- | --- |
| Graduate Nurse Letter | `/contact?service=graduate-nurse-letter#enquiry-form` — assistance only | `documents` |
| Registration - Local | Portal `/start/registration` | `registration` |
| Registration - International | Portal `/start/international` — incoming applicants | `registration` |
| Provisional (Temporary) Licence | `/contact?service=provisional-temporary-licence#enquiry-form` | `licensing` |
| Licence Renewal | `/contact?service=licence-renewal#enquiry-form` | `renewal` |
| Letter of Good Standing | Portal `/nursing/certificates` — choose Certificate of good standing | `verification` |
| Nursing Student Indexing | Portal `/start/indexing` | `indexing` |
| Examination | Portal `/start/exam` | `exam` |
| Training Institution Approval | `/contact?service=institution-approval#enquiry-form` | `education_registration` |
| CPD Provider | `/contact?service=cpd-provider#enquiry-form` | `education_registration` |
| CPD Event | `/contact?service=cpd-event#enquiry-form` | `education_registration` |
| Approved CPD Requirements | `/contact?service=cpd-requirements#enquiry-form` — guidance | `education_registration` |
| Nursing Agency Application | `/contact?service=agency-application#enquiry-form` | `agency` |
| Nursing Agency Renewal | `/contact?service=agency-renewal#enquiry-form` | `agency` |
| UAP Application to be Recorded | `/contact?service=uap-recording#enquiry-form` | `licensing` |
| UAP Renewal | `/contact?service=uap-renewal#enquiry-form` | `licensing` |

The UAP information page also supplies `uap-training` and `uap-cpd` enquiry contexts, both mapped to `education_registration`. They are assistance topics, not additional implemented online applications or verified approval lists.

Renewal and special registration are closed by default in portal `src/lib/launch/launch-scope.ts`; no enabling values were present in the reviewed local environment files. Do not publish direct renewal or special-registration actions until the portal UI and submission gates are confirmed open. Provisional, temporary and special registration must not be treated as equivalent. The Council must settle the public terminology and route rules.

Good Standing is called **Letter of Good Standing** in the inherited website inventory and **Certificate of good standing** in Nurse 360. The website explicitly names the portal option so visitors can find it. Council agreement on the final public name remains a content decision.

The Graduate Nurse Letter remains separate and assisted. See [its proposed process specification](graduate-nurse-letter-process.md).

## Where the Contact form goes

The browser posts to website `POST /api/contact`. The server validates the body and calls the existing database RPC:

```text
submit_public_inquiry(
  p_name, p_email, p_phone, p_inquiry_type, p_subject, p_message
) → uuid
```

The RPC inserts into `public.public_inquiries` with source `public_rpc`. It assigns `new` unless the existing spam heuristic flags the message. It returns the actual inserted record UUID. The website does not require or use a service-role key for this submission.

The accepted website body is `{ name, email, phone, topic, subject, message, website }`. `topic` is an allowed general-enquiry code or `service:<known-id>`. The hidden `website` field must be empty. Service context is prefixed to the stored message even if the person changes the subject. Unsupported categories, including `complaint` and `registry_missing`, are not accepted by this endpoint.

| Response | Meaning |
| --- | --- |
| `201 { ok: true, reference: <uuid> }` | RPC completed and returned a valid record identifier. Only this produces the on-page recorded confirmation. |
| `400` | Invalid input; field-specific feedback where available. Nothing is submitted to the RPC. |
| `413` | Request is too large; nothing is submitted to the RPC. |
| `429` | Existing RPC duplicate or rate limit. Do not fabricate a new reference. |
| `502` | RPC failure or missing/invalid reference. The latter gives an uncertain-result message and asks the person to check before resubmitting. |
| `503` | Connection/configuration exception. Recording may be uncertain; retain the text and direct the person to follow up. |

The existing RPC limits enquiries from the same email within ten minutes, rejects duplicate subject/message within 24 hours, and applies further hourly/daily limits. The website does not override those checks. Its message limit is 3,800 characters, leaving room for the service context within the RPC’s 4,000-character limit.

The form disables another submit while waiting, focuses recoverable errors and the success result, keeps input on failure, and provides a complaint-service link. A browser timeout does not claim that the database failed to save. No attachment or payment is collected by this general enquiry form.

## Staff handling and operational ownership

Records appear in Nurse 360 **Admin → Inquiries** (`/admin/inquiries`), separate from the formal complaints register. Existing staff access and review controls remain in place. Existing enquiry statuses are `new`, `in_review`, `responded`, `closed`, and `spam`.

The receipt uses the record UUID. Authorised staff can open a particular enquiry with `/admin/inquiries?inquiry=<uuid>`. The current free-text search does not include the UUID; this direct route is the available reference lookup. Do not expose this authenticated staff route as a public tracker. An enquiry reference is not an access credential.

The owner has confirmed **Internal Operations** as the operational team responsible for routing, enquiry handling and complaint triage. This is the handling owner; it does not create a new portal role or expand access. Internal Operations must designate the receiving officer, deputy, coverage and escalation route and confirm the monitoring/reply process, sender/recipients and receipt wording before live notification activation. No response time is promised. Existing departmental contact addresses on the Contact page were not selected as automated recipients by this change and still need Council confirmation.

The reviewed notification trigger in `20261103170453_registry_not_listed_requests.sql` only fires for `registry_missing`. Normal general-enquiry categories do not receive an automatic receipt or new staff alert from that trigger. This implementation adds no templates, triggers, recipient rows or dispatch calls. Its success message confirms recording, not email delivery.

Do not mark an enquiry responded or closed merely because it was recorded. Staff must follow the agreed handling process. An application question is not silently converted into a complaint; formal concerns use the dedicated complaints service.

## Validation and release notes

Automated checks run locally without any database insert or email:

- `node --import tsx --test src/lib/contactInquiry.test.ts` — eight tests cover the complete catalogue, service mapping, field validation, actual UUID receipt, malformed/oversized/honeypot input, missing receipts, duplicates and network failure.
- `npx tsc --noEmit` — passed at the time of the Phase 2 changes.
- Targeted Next lint for the owned pages, endpoint and helper/test files — passed.

Browser interaction and visual checks, production service configuration, named queue ownership, approved notifications, and controlled end-to-end recording/reply remain separate acceptance steps. Do not send a real local-preview enquiry to a connected production database during mock testing. For browser success/error tests, intercept `/api/contact` with explicit test responses.

Deployment needs no new enquiry RPC migration if the deployed database already matches the reviewed return type/category contract. Verify that contract and staff access in the target environment before release. If reverting the website, remember that enquiries already recorded remain in the queue and still need handling; do not delete records to roll back the UI.
