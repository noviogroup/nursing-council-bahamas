---
target: public website design review
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
timestamp: 2026-09-03T14-35-32Z
slug: src-app-page-tsx
---
# Nursing Council Public Website Design Review

## Design Health Score

| # | Heuristic | Score | Key issue |
| --- | --- | ---: | --- |
| 1 | Visibility of system status | 2/4 | Registry failure is shown at the same time as valid empty-result messaging, and navigation lacks a current-page state. |
| 2 | Match between system and real world | 3/4 | Most language is clear, but Registry and Verification outcomes overlap and Nursing Student Indexing is unexplained. |
| 3 | User control and freedom | 3/4 | Users can clear Registry filters, but the outage state provides no retry or useful fallback. |
| 4 | Consistency and standards | 3/4 | Brand, type, spacing, and geometry are cohesive; icon families, focus treatment, and route-state treatment diverge. |
| 5 | Error prevention | 3/4 | Search constraints help, but the Verification service taxonomy can still send users to the wrong path. |
| 6 | Recognition rather than recall | 2/4 | Users must remember subtle service distinctions, and About provides no contents navigation. |
| 7 | Flexibility and efficiency | 2/4 | Registry filters are useful but not URL-addressable; About has no quick-jump path. |
| 8 | Aesthetic and minimalist design | 3/4 | The site is calm and legible, but repeated card grids and kicker labels add length and visual sameness. |
| 9 | Error recognition and recovery | 2/4 | Validation is specific, but the Registry service failure gives no direct recovery action. |
| 10 | Help and documentation | 3/4 | Council resources and contact details are visible, but help is weakest at high-risk Registry and Verification moments. |
| **Total** |  | **26/40** | **Acceptable. Strong foundation, significant service-path and information-architecture work remains.** |

## Design Specificity Verdict

The website is moderately specific, but not fully authored. The Council seal, Bahamian nursing photography, 1972 history, statutory content, and navy/gold palette create genuine institutional identity. The layout language is more interchangeable: repeated tracked-uppercase kickers, gold rules, equal card grids, bordered matrices, and boxed records could serve many regulatory bodies after a content swap.

The best path is not a visually louder redesign. It is a more distinctive service architecture, stronger hierarchy between public tasks, and a disciplined editorial treatment of statutory material.

The independent visual review and deterministic browser evidence agree on the repeated kicker rhythm and About-page density. The static detector returned no source findings, while the browser detector recorded 50 element groups and 74 rule occurrences across Home, About, Registry, and Verification. Most repeated browser counts came from shared elements rendered on multiple routes.

Strong browser signals:

- Four hero eyebrow detections and 14 kicker-above-heading detections confirm overuse of the same section-opening device.
- Two About-page line-length findings support the readability concern.
- Seven homepage image-hover transforms support the motion-polish concern.

Detector findings treated as advisory or false positive:

- Footer gray-on-navy warnings are not contrast failures. Calculated ratios were 10.87:1 and 6.31:1.
- The About table wrapper's cramped-padding alert is likely intentional table construction.
- Several nested-card warnings describe bordered tables or segmented groups, although their accumulated visual weight remains worth reducing.
- The Registry radial gold accent is subtle and brand-specific, not a meaningful defect.

No reliable user-visible overlay remains open. Injection succeeded and the detector ran, but the sub-agent browser could not expose its tab to the main app. A captured overlay screenshot was used as supporting evidence.

## Overall Impression

The site feels credible, local, and substantially more polished than a typical small public-authority website. The strongest opportunity is to make important public tasks easier to distinguish and recover, especially Registry and Verification, while turning About from a continuous archive into a navigable institutional overview.

## What Is Working

1. **Authentic institutional identity.** The real Council seal, local ceremony photography, statutory facts, and disciplined navy/gold palette establish trust quickly.
2. **Strong responsive fundamentals.** Type, body widths, mobile stacking, page-hero compression, form labeling, and desktop-table/mobile-card Registry behavior are generally clear.
3. **Solid baseline Registry semantics.** Inputs have visible labels, examples are useful, loading is announced, validation is specific, and the desktop table uses appropriate scopes.

## Cognitive Load

Overall load is low to moderate on Home and Verification, but high on About and the Registry filter surface.

| Check | Result | Evidence |
| --- | --- | --- |
| Single focus | Fail on About | Orientation, statutory functions, history, current leadership, archival leadership, governance, ethics, and administration share one continuous page. |
| Chunking | Fail | About contains several long peer groups; Registry exposes five registration types and six periods. |
| Grouping | Pass | Related fields, records, and sections are visually grouped. |
| Visual hierarchy | Pass | Headings, navy/gold emphasis, and whitespace make major sections recognizable. |
| One thing at a time | Fail | Registry exposes query, type, and period controls before the user establishes whether filtering is needed. |
| Minimal choices | Fail | Global navigation, mobile navigation, Registry filters, About groups, and footer link groups exceed four visible options. |
| Working memory | Fail | Users must retain the difference between public lookup, formal verification, and good-standing documentation. |
| Progressive disclosure | Partial fail | Statutory disclosures help, but historical and governance archives remain expanded. |

## Emotional Journey

- **Entry:** Strong. The homepage hero is official, human, and recognizably Bahamian.
- **Orientation:** Mixed. Two equal hero actions do not clarify which task matters most.
- **Decision:** Verification creates hesitation because two services appear to confirm the same status.
- **High-stakes valley:** Registry failure undermines public trust by combining outage and no-record messages.
- **Long-form valley:** About reaches roughly 11,013px on desktop and 21,464px on mobile with no local navigation.
- **Ending:** Home closes well with direct human contact. Registry closes without a useful recovery route.

## Priority Issues

### [P0] Registry failure can be mistaken for an absent record

**Why it matters:** An employer or member of the public may interpret a data outage as evidence that a nurse is not registered.

**Fix:** Treat loading, error, empty, and success as mutually exclusive states. During an outage, replace results with a service-status panel that preserves filters and offers Retry, Council contact details, and formal verification.

**Suggested command:** `$impeccable harden`

### [P1] Verification paths describe overlapping outcomes

**Why it matters:** Browse Nurse Registry and Verify Licence or Registration appear to solve the same problem, while good-standing guidance is split between Contact and Forms.

**Fix:** Organize by intent: Look up a public record, Get formal verification, Request a good-standing letter. Explain the output and destination of each path, use distinct icons, label external portal navigation, and consolidate the good-standing route.

**Suggested command:** `$impeccable clarify`

### [P1] About combines orientation and archive into one long page

**Why it matters:** Visitors looking for current leadership, mandate, or one historical fact must traverse unrelated content, with the heaviest impact on mobile.

**Fix:** Make About a current overview. Add a compact contents menu and move or anchor History, Statutory Functions, and Governance Records. Keep current information ahead of archival material and offer downloadable statutory detail.

**Suggested command:** `$impeccable distill`

### [P1] Navigation and action accessibility is uneven

**Why it matters:** Mobile Email Council, phone, menu, social, and footer link targets fall below a 44px ergonomic target. Site navigation uses menu roles without menu keyboard behavior, focus rings are inconsistent, and no reviewed route exposes `aria-current`.

**Fix:** Increase mobile hit areas without enlarging icon artwork, standardize `focus-visible` treatment, remove menu roles unless full arrow-key behavior exists, and add visible current-page state with `aria-current="page"`.

**Suggested command:** `$impeccable audit`

### [P2] Repeated regulator-site grammar dilutes the Council's character

**Why it matters:** Equal cards, kicker labels, gold rules, and bordered matrices recur so often that the interface feels more templated than the content deserves.

**Fix:** Preserve the palette, typography, 8px geometry, and photography. Reserve the kicker treatment for page openers or major transitions. Use clearer primary and secondary service rows, editorial bands, timelines, and definition lists where cards add no hierarchy.

**Suggested command:** `$impeccable layout`

## Emil Design Engineering Review

| Before | After | Why |
| --- | --- | --- |
| `transition-all duration-300` on homepage service cards | Transition only transform, border-color, and box-shadow at 160-200ms | Exact properties prevent accidental animation and better match a restrained public-service interface. |
| `duration-500 group-hover:scale-105` on service and news images | Remove the zoom or use a subtle 160-200ms transform | A half-second flourish feels slow on frequently used public-service links. |
| Hover movement applies without pointer gating | Gate movement with `@media (hover: hover) and (pointer: fine)` | Touch devices can retain misleading hover states after taps. |
| Most CTA links only change color on hover | Add a subtle `active:scale-[0.98]` with a 120-160ms transform transition | Immediate press feedback confirms the interface received the action. |
| Registry loader spins unconditionally | Add `motion-reduce:animate-none` while retaining persistent loading text | Loading remains understandable without mandatory continuous motion. |
| Verification CTA links lack explicit focus-visible styling | Apply the same focus-ring token used by homepage actions | Keyboard feedback should be consistent across all public services. |

## Persona Red Flags

### Jordan, first-time visitor

- Nursing Student Indexing assumes domain knowledge.
- Registry and Verification labels imply overlapping outcomes.
- No active navigation or About contents control confirms location.
- Registry failure provides no useful next action.

Likely outcome: Jordan chooses the wrong verification route or abandons during the outage.

### Sam, accessibility-dependent visitor

- Mobile site navigation uses menu semantics without matching keyboard behavior.
- Current location is not exposed with `aria-current`.
- Focus treatment is inconsistent.
- Several mobile hit areas are below 44px.

Positive evidence: form labels, table scopes, live status, and mobile result semantics are thoughtful.

### Casey, distracted mobile visitor

- About requires a very long scroll without quick-jump controls.
- Registry exposes 13 visible controls before results.
- Header contact and footer targets are small.
- Registry outage offers no one-tap retry or direct fallback.

Likely outcome: Casey abandons while filtering, reading the archive, or recovering from the outage.

## Minor Observations

- The two homepage hero CTAs have equal visual priority.
- Registry uses Lucide icons while the rest of the public site uses Phosphor.
- The mobile menu presents seven uninterrupted choices.
- Every footer Committee label links to the same Committees page, implying more destination specificity than exists.
- Terms of Use may fit a public authority better than Terms of Service.
- Mobile page-hero compression works well and preserves first-viewport usefulness.

## Questions to Consider

1. Should Verification begin with What proof do you need rather than asking users to decode Council service names?
2. Is About primarily an introduction or an institutional archive?
3. During a Registry outage, what must an employer do immediately to make a safe hiring decision?
4. Which homepage action is primary: student indexing, public verification, registration, or licence renewal?
5. What structural element, beyond the seal and colors, could belong only to this Council?
