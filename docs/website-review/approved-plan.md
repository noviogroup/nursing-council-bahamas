# Website and complaint-service improvement plan

**Status:** Approved by owner for local implementation · 8 November 2026

Owner subsequently confirmed that routing, triage and letter approval are Internal Operations responsibilities. Individual officers, access, delivery configuration and service policy remain internal setup decisions.

**Approval requested:** Implement the six phases below on review branches, with local previews for review. Council policy decisions listed below remain explicit dependencies. Publishing, production database changes, and activation of new live notifications require the final go-live decision.

The intended result is a clear public website that directs people to a working service, and a complaint process that records each case once, assigns responsibility, and supports secure follow-up.

## Phase 1 — Contact bar and public committee information

**Build**

- Restore #23 Capitol House, Virginia and Augusta Streets, Nassau; both (242) 604-6015 and (242) 604-6017; and info@nursingcouncilbahamas.com.
- Balance address left, phones centre and email right within the header container. Give each telephone number its own call link. Wrap all three contact groups into readable rows on mobile. Keep office hours on the Contact page.
- Replace the duplicated committee presentation with six concise entries and relevant service links.
- Remove unconfirmed public-meeting schedules, notice periods and minutes-publication promises from the proposed public version.
- Link footer committee names to their respective sections.
- Retain detailed working material in internal documentation; do not create public links to financial working papers, exam material, individual cases or internal deliberations.

**Proposed public copy to approve with this plan**

| Committee | Public summary |
|---|---|
| Education | Supports Council oversight of nursing education and training standards. |
| Examination | Supports fair and secure examinations for entry to nursing practice. |
| Finance | Supports the Council’s financial oversight and responsible use of resources. |
| Registration | Supports the Council’s review of registration and enrolment matters. |
| Standards and Practice | Supports nursing and midwifery practice standards and professional guidance. |
| Disciplinary and Penal Cases | Supports the Council’s review of complaints and professional conduct matters through its established process. |

**Acceptance:** All contact details remain available at narrow widths; call/email links are correct; keyboard focus is visible; each committee is described once; public copy contains no unapproved operating commitments.

## Phase 2 — Forms, applications and general enquiries

**Build**

- Change the directory into **Forms & Applications**, retaining the service inventory while giving every item an accurate next action.
- Each entry explains who it is for, the outcome, confirmed requirements, any approved fee/processing guidance, the next step, and how progress is followed.
- Connect existing Nurse 360 workflows for student indexing, examinations, local registration, incoming international applications and Good Standing. Verify current launch settings before offering renewal or special-registration actions.
- Clearly distinguish temporary, provisional and special registration; agree the public name for Good Standing.
- Replace pending-PDF dead ends with either an approved downloadable form, a verified online route, or a Council-assisted enquiry route. Separate CPD requirements guidance from provider/event applications.
- Replace the Contact form’s email-app handoff with recorded submission to the separate general-enquiry queue, with validation, pending/error/retry states and an on-page reference/confirmation. Configure receipt/staff notification only for the confirmed recipients and approved delivery process.
- Keep ordinary application enquiries separate from formal complaints.

**Graduate Nurse Letter**

Prepare a process specification using the existing paper form or an approved sample letter: eligibility, required evidence, fee if any, receiving officer, approver, output and delivery/tracking. Proposed process: request → completeness check → authorised review → decision → issued letter and status update. This is a separate service from Good Standing.

If those decisions remain outstanding, the public entry will offer Council assistance; it will not claim that an online application or automatic letter issue is available. Implementation of the specific letter workflow follows approval of its process specification.

**Acceptance:** Every visible service action leads to a working destination; availability matches the portal; unsupported requirements, fees and timelines are absent; an enquiry is only shown as received after successful recording; failure preserves the person’s message.

## Phase 3 — Complaint reliability before presentation changes

**Build**

- Prevent duplicate case creation on double-submit, retry or an attachment failure.
- Preserve the existing case reference after successful case creation. Offer attachment retry or continuation to confirmation for that same case.
- Correct overdue selection to use the earliest relevant outstanding deadline; apply Council-approved timing rules.
- Distinguish failed staff-data loads from genuinely empty files, notes or history.
- Make receipt wording distinguish recorded submission, queued email and delivery status.
- Maintain existing cases, reference numbers, draft/resume links, attachments, history, access boundaries and public tracking compatibility. Use additive, reviewed database changes where needed.

**Acceptance:** Simulated upload/network failures never create a second case; recovery retains the original reference; failed attachment queries do not say “no files”; overdue examples follow the approved rules; existing cases remain accessible to the appropriate users.

## Phase 4 — Simpler public complaint intake

**Build**

- Add concise guidance about what the Council handles and emergency limitations before collecting a detailed account.
- Reduce the journey to five stages: **Concern and who it concerns → What happened → Your details → Evidence → Review and submit.**
- Put earlier actions under a conditional question in What happened; keep evidence optional.
- Use plain-language concern choices with examples and an **Other / Not sure** option. Proposed public groups: care/patient safety; conduct/communication; registration or practice concern; education/training concern; other/not sure. Confirm the Council’s remit before finalising the groups.
- Maintain a mapping from simple public choices to more detailed staff classifications. Preserve existing category identifiers/history where possible; avoid independently maintained public and staff lists drifting apart.
- Add “I don’t know” paths and contact requirements only where Council policy permits them.
- Show the full complaint narrative, earlier actions and documents on the final review, with Edit links.
- Use accessible selection controls, visible focus, useful field errors, clear Back controls and accurate progress. Preserve approved acknowledgement wording unless revised wording is approved.
- Preserve draft data and securely support resume. Make attachment-save behaviour explicit; do not silently lose selected evidence. Email a resume link only through the agreed delivery flow and verified test process.

**Acceptance:** A user can understand, complete, save, resume, review and correct the complaint on desktop and mobile. Missing/invalid information produces a specific recoverable error. Optional steps are clear. No ordinary service enquiry is silently converted into a formal complaint.

## Phase 5 — Staff ownership and secure follow-up

**Build**

- Route new cases into the agreed staff triage queue, with a named operational owner and deputy.
- Add verified new-case/assignment notifications and approved unassigned/overdue escalation rules. Record who is assigned and what action is due.
- Keep sensitive casework visible only to authorised staff. Committee access does not automatically grant decision-making authority.
- Extend the public tracker to show an explicit action when the complainant must respond, the requested information, and any approved deadline.
- Provide a secure, case-bound reply/upload flow using identity verification or a time-limited secure link. Reference number plus email alone will not authorise new sensitive actions.
- Attach responses to the existing reference, confirm receipt, and notify the responsible officer.
- Keep internal investigation notes and documents separate from public updates. Show staff exactly what will be shared before publication.

**Acceptance:** A controlled test case has an accountable owner; the intended staff recipient receives the expected alert; the complainant can respond to their own case; an expired/incorrect link fails safely; responses cannot attach to another case; private notes remain private; closure and public status are consistent.

## Phase 6 — Review and go-live acceptance

- Review each completed phase locally. Website changes remain on the current website review branch; portal changes use a companion review branch.
- Run appropriate build/type/lint checks and meaningful behaviour tests, including slow requests, invalid input, empty results, access errors, failed uploads and retry.
- Check desktop, 320px and 390px layouts, larger text, touch targets, keyboard operation, labels and focus.
- Run a controlled end-to-end case with agreed test identities and mailboxes: submit → receipt → triage/assign → request information → secure reply/upload → staff decision → public tracking/closure.
- Have the Council reviewer accept the public wording and operational handling. Record unresolved items rather than describing screenshots or code checks as completed UAT.
- Present the final changes, validation evidence, migration/release steps and rollback approach for a separate go-live approval.

**Acceptance:** The agreed journeys pass; public copy and service availability are approved; test emails reach the intended test destination; no unresolved submission, privacy or recovery failure remains in the approved release scope.

## Decisions needed to complete the dependent work

| Decision | Proposed starting point | What remains to confirm |
|---|---|---|
| Committee publication | Six short summaries above; omit unconfirmed meeting promises. | Approve/redline summaries and identify any additional governance documents authorised for publication. |
| Graduate Nurse Letter | Separate Council-reviewed request with an issued letter. | Eligibility, evidence, fee, receiving officer, approver, template and delivery. |
| General enquiries | Separate recorded enquiry queue, not the formal complaints register. | Responsible team, notification recipients and approved reply/receipt process. |
| Complaint ownership | Designated triage owner and deputy, with explicit assignment. | Named people/team, permitted access, coverage and escalation route. |
| Complaint policy | Simple public choices; optional evidence; clear staff classification. | Scope/categories, contact requirements, unknown-person handling, acknowledgement wording and response targets. |
| Acceptance testing | Controlled test identities, case and mailbox. | Council reviewer and approved test destinations. |

Pending decisions do not block independent approved work. For example, the contact bar, committee layout, service-route cleanup and duplicate-submission recovery can progress while Graduate Nurse Letter policy is being agreed. New fees, statutory powers, response-time promises, recipient lists and access rights will not be invented.

## Approval response

Choose **Approve the full plan for local implementation**, or **Approve phases [numbers]** and note any edits. Full-plan approval authorises the local implementation sequence above, with the listed policy-dependent work completed after its decisions are confirmed. It does not approve public deployment or production activation.

Supporting evidence: [website, services and complaints review](/Users/ShowmanIT/.codex/visualizations/2026/11/08/01a1bbcf-349c-74a0-b51e-62d5ce03dd8e/website-services-complaints-review-2026-11-08.md).
