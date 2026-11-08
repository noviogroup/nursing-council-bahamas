# Graduate Nurse Letter — process specification for Council decision

Prepared 8 November 2026 for the approved local website review. **This is a proposed process, not an approved operating policy or an available online letter workflow.**

## Current position

The public Forms & Applications inventory contains **Graduate Nurse Letter**. It now leads to a service-specific Council enquiry at `/contact?service=graduate-nurse-letter#enquiry-form`. The enquiry records the request for guidance in `public_inquiries` and shows its actual database reference only after recording succeeds. It does not create a licence application, collect documents or payment, approve eligibility, or issue a letter.

The portal application types currently include indexing, examination, registration, renewal, incoming foreign-trained registration, good standing, international verification, advanced practice and time-limited registration. They do **not** contain a Graduate Nurse Letter type. The blueprint mentions a graduate/nurse-intern audience, but that is not evidence that this service has an approved workflow.

No approved Graduate Nurse Letter paper form, completed field checklist, or sample letter was identified in the reviewed files. The July 17 Council forms/process review guide asks a reviewer to compare the portal with current physical forms; it is a review method, not Council sign-off. This specification therefore leaves eligibility, evidence, wording and authority explicitly open for Council confirmation. Do not infer them from Good Standing or registration forms.

## Who the service is for and what success means

Proposed audience: a graduate asking the Council for a letter connected with their training or next professional step. The Council must confirm the eligible audience and purpose before that description becomes application guidance.

Successful completion would mean that the Council has reviewed a complete request, made an authorised decision, and, if approved, released the approved letter to the approved recipient. A submission confirmation alone would not permit practice or establish registration, licensing, eligibility or good standing.

This service remains separate from **Letter of Good Standing**, which already leads to the portal’s **Certificate of good standing** request under Certificates & Letters.

## Proposed journey

| Stage | Proposed handling | Completion evidence |
| --- | --- | --- |
| Request | Applicant explains the purpose and intended recipient. Existing verified profile information is reused and remains reviewable. Required fields come from the approved paper form. | One request identifier and a receipt accurately describing what was recorded. |
| Completeness check | Designated receiving officer checks only the Council-approved evidence and returns a specific request for missing items when needed. | Recorded check result, missing items and the responsible officer. |
| Authorised review | Assigned reviewer assesses the request against the approved eligibility policy. Staff-only review material remains separate from public updates. | Reviewer, policy version, findings, and review date. |
| Decision | Named authorised role approves, declines with an appropriate reason, or requests additional information. Delegation and conflict-handling rules require Council approval. | Decision actor, date, reason and authority; no automatic approval. |
| Issue | Only an approved request can produce the controlled letter using the Council-approved template and signatory. | Letter version, issue identifier/date and the approving decision. |
| Delivery and follow-up | Release through the approved channel to the approved recipient. A failed delivery can be retried for the same issued letter. | Delivery state and events; applicant-visible status that distinguishes approval, issue, and delivery. |

Proposed internal states for review are `draft`, `submitted`, `completeness_check`, `information_required`, `under_review`, `approved`, `declined`, `issued`, `delivered`, and `withdrawn`. Final names, transitions and public wording are decisions for the Council. These states have not been added to the portal database.

Applicants should be able to review and correct their answers before submitting, return to an incomplete request, and provide further information without creating a second request. A failed upload or delivery must preserve the original request and issued-letter identifiers.

## Decisions required before building the letter workflow

| Decision | Council confirmation needed |
| --- | --- |
| Authoritative source | Current paper form title, version, approval date and an approved sample letter. Identify which fields and statements remain applicable. |
| Eligibility and purpose | Who may apply, permitted uses, prerequisite outcomes, exclusions, and whether requests for a third party are permitted. |
| Identity and evidence | Exact required and conditional fields/documents; who supplies each item; originals/certification requirements; acceptable alternatives and retention. No document list is prescribed here. |
| Fee | Whether a fee applies, approved amount and currency, collection method, payment stage, reconciliation, and any refund rules. No fee is assumed. |
| Receiving officer | Internal Operations is the confirmed operational team. It must designate the receiving officer, deputy and queue coverage. |
| Reviewer and approver | Who checks completeness, who reviews eligibility, who may decide and sign, and any delegation or conflict rules. A portal role alone does not establish this authority. |
| Letter output | Approved title, exact statements, template version, signature/seal, expiry or validity if any, recipient restrictions and verification method. |
| Delivery | Applicant download versus direct delivery to a recipient; approved channels; recipient confirmation and correction rules. |
| Tracking and replies | What the applicant may see, how additional information is requested securely, and who answers follow-up. |
| Timing and escalation | Any approved service targets, pauses, escalation owner and coverage. No turnaround is promised. |
| Withdrawal, correction and reissue | Whether and how a request can be withdrawn or an issued letter corrected/replaced; preserve the history. |

## Proposed record and audit controls

- Keep one immutable request identifier across submission retries, evidence and status changes.
- Store the approved intake answers, evidence references, applicable policy/template versions and recipient details with access restricted to authorised users.
- Record completeness checks, requests for information, responses, assignments, decisions, issue/reissue events and delivery attempts with actor and time.
- Distinguish internal notes from applicant-visible explanations. Staff must see what will be shared before publication.
- Do not issue a letter merely because payment or an upload is present. Require the approved decision and release steps.
- Do not use the public enquiry UUID as authority to access documents or issue a letter.

## Interim public service

Until the decisions above are approved, keep the Council-assisted enquiry route. Ask for the letter’s purpose and intended recipient as context, and let the Council confirm the process. Do not label the enquiry as a completed Graduate Nurse Letter application. Do not request identity documents through the general enquiry message.

The owner has assigned the operational responsibility to Internal Operations. Named receiving/reviewing officers, authorised approver, policy decisions, receipt emails and staff notification recipients still require internal confirmation. The current change records enquiries; it does not activate new delivery recipients or grant letter-approval authority.

## Acceptance before launch

1. Council reviewer signs off the paper-to-digital field mapping and the decisions above.
2. One controlled request completes intake, completeness check, review, decision, issue, delivery and follow-up using agreed test identities.
3. Incomplete, ineligible, withdrawn, failed-upload, failed-delivery, unauthorised-access and correction/reissue paths behave as approved.
4. The applicant sees accurate status and can recover without duplicate requests; only authorised staff can approve and release.
5. The Council accepts the generated letter against the approved sample and confirms its recipient and delivery method.

The current local implementation does not satisfy this future workflow’s UAT. It intentionally provides the assisted enquiry route while policy is decided.

## Source trail

- Website: `src/lib/councilServices.ts`, `src/lib/contactInquiry.ts`, `src/lib/contactInquiryServer.ts`.
- Portal review baseline `ecb563e`: `src/lib/supabase/types.ts` (`ApplicationType`); `src/pages/nurse/CertificatesPage.tsx` (Good Standing); `docs/system-blueprint/Nursing_Council_Digital_Licensing_Platform_Complete_Blueprint_2026-08-02.md` (graduate/nurse-intern audience).
- Portal `docs/council-forms-process-review-guide.md`, prepared July 17, 2026: method for comparing current paper forms with the portal, not an approved Graduate Nurse Letter specification.
