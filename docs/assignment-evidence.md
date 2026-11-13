# MamaCare — assignment evidence workbook

> **Status: incomplete.** No genuine participant interviews or independent user tests have been completed. This file records limited developer checks only and includes blank templates for future genuine evidence. Use fictional data in product tests, anonymize participants, omit names, phone numbers, identity numbers, and private medical information, and mark unperformed scenarios **Not run**. Do not infer a pass from source inspection.

## Interview records (minimum three genuine interviews)

For each interview, use a separate copy of this form and record only anonymized notes. Do not add identifying details or private medical information.

### Interview [1 / 2 / 3 / additional]
- **Participant code:** [TO COMPLETE — e.g., P1; no identity details]
- **Participant group relevant to the brief:** [TO COMPLETE — expecting mother / mother with young child / supporter / other]
- **Date and format:** [TO COMPLETE]
- **Consent to participate and use anonymized notes:** [TO COMPLETE — consent and process used]
- **Questions asked:** [TO COMPLETE]
- **Anonymized notes / participant statements:** [TO COMPLETE — distinguish quotation from paraphrase]
- **Needs, barriers, or workarounds mentioned:** [TO COMPLETE — do not generalize beyond evidence]
- **Researcher observations:** [TO COMPLETE]
- **Follow-up / limitations:** [TO COMPLETE]

### Interview findings summary
- **Interviews completed:** 0; none yet.
- **Who was represented (anonymized groups only):** [TO COMPLETE after interviews]
- **Common problem and recurring difficulties, with supporting interview codes:** [TO COMPLETE from genuine evidence]
- **Existing solutions and outliers:** [TO COMPLETE from genuine evidence]
- **Features participants requested / changes made after interviews:** [TO COMPLETE, linked to interview codes]
- **Limitations / groups not represented:** [TO COMPLETE]

## Product test record

Run with fictional data only. Record the actual observed behavior, date/build, tester count, evidence, issues, and improvements. The expected results below are assignment scenarios, not claims that an authenticated flow has passed.

| Scenario | Expected result | Actual result (record observation) | Status (Pass / Fail / Blocked / Not run) | Date, build, evidence reference / issue |
|---|---|---|---|---|
| Registration | A new test user completes the implemented account-creation flow and receives a clear outcome. | Manus OAuth sign-in is the implemented path; no authenticated account was created during this review. | Not run | 2026-11-13; pre-publication Preview; no shared test account. |
| Login / logout | A test user can sign in to and out of the implemented flow; constraints are recorded. | OAuth sign-in/logout were not exercised end to end. | Not run | 2026-11-13; pre-publication Preview; evaluator needs a Manus account for persistent access. |
| Onboarding | Fictional onboarding inputs save a profile and present a clear next step. | Onboarding was not completed in an authenticated account. | Not run | 2026-11-13; account flow not exercised. |
| Pregnancy details | Optional fictional pregnancy details are entered and reviewed without real health data. | No authenticated profile was available to test the save/review path. | Not run | 2026-11-13; account flow not exercised. |
| Appointments | A fictional appointment is saved and can be reviewed. | The appointment page and form rendered in the public demo, but a valid date/time was not submitted; authenticated saving remains unverified. | Not run | 2026-11-13; pre-publication Preview; manual date/time entry still needs a real-user check. |
| Healthcare facility | Facility discovery/details are understandable, and external service information is identified as needing confirmation. | The Finder/Support views and source links were present; external pages were checked during source research, not through participant testing. | Not run | 2026-11-13; independent directory links; availability may change. |
| Transport / birth preparedness | Fictional preferred-facility, contact, and transport inputs behave as intended. | Authenticated save/review was not exercised. | Not run | 2026-11-13; pre-publication Preview. |
| Essentials / budgeting | Fictional list and budget entries behave as expected. | In the public demo, a fictional item was added, appeared in the list, then was removed; the list returned to its original three demo items. This was a developer smoke check, not independent user testing or a database-persistence test. | Pass — limited demo interaction only | 2026-11-13; pre-publication Preview; fictional item only; demo page showed “Added to this demo session.” |
| Permissions / data isolation | One signed-in account cannot access another account’s restricted records. | No authenticated multi-account runtime test was performed. Server ownership scoping was reviewed in source only; this is not a runtime pass. | Not run | 2026-11-13; code review only; multi-account verification remains outstanding. |
| Mobile layout | Main implemented functions are usable at a named mobile viewport/device. | A 375 px-wide landing-page Preview capture was inspected; the signed-in/demo app shell and main workflows were not tested on a mobile device. | Not run | 2026-11-13; `docs/evidence/landing-mobile.png` is a developer landing-page screenshot only. |
| Child profile / development milestone / resource | Child information and milestone notes can be saved and a general child-development resource is available. | The page now exposes a child-profile form, milestone/moment capture, and the UNICEF South Africa child-development link; no authenticated save flow was exercised. | Not run | 2026-11-13; code/UI review only; account flow not exercised. |
| Postpartum preparation | Checklist progress can be updated; authenticated progress belongs to the signed-in account, while demo progress remains fictional and session-only. | In the no-login demo, the page displayed eight items; checking the first changed the counter from 0/8 to 1/8. No authenticated save/reload was exercised. | Pass — limited demo interaction only | 2026-11-13; public site; fictional demo only; not independent user testing. |

### Developer checks (not user research or independent testing)

- `pnpm check`: passed on 2026-11-13.
- `pnpm test`: 6 automated starter platform/authentication tests passed on 2026-11-13; these do not cover all MamaCare workflows.
- `pnpm build`: production client/server build succeeded on 2026-11-13.
- `GET /api/health`: Preview and public production returned HTTP `200` with `{"status":"ok"}` on 2026-11-13.
- `GET /manus-routes.json`: Preview and anonymous public production returned HTTP `200` with valid JSON listing all 10 registered page routes, including `/postpartum`.
- Browser smoke check: anonymous public landing and demo opened without sign-in; Support Centre rendered source and safety disclosures; one fictional Essentials item was added and removed; the Postpartum Preparation counter changed from 0/8 to 1/8 after one fictional checklist toggle. No account or application database record was used in these demo interactions.
- Visual captures: `docs/evidence/landing-desktop.png` (1280 × 900) and `docs/evidence/landing-mobile.png` (375 px wide, full-page capture). These are developer Preview captures, not participant evidence.
- Managed database migration: five MamaCare application tables were present after the additive migration; verification inspected schema metadata only, not user rows.
- Postpartum addition: TypeScript check, six existing automated tests, and production build passed; an additive `postpartumChecklist DEFAULT 0 NOT NULL` column was verified in `care_profiles` metadata. The public demo toggle was smoke-tested as described above; authenticated save/reload and multi-account isolation were not tested, and no user rows were read or written.

### Test summary and follow-up
- **Independent user testers:** 0. Developer/assistant smoke checks: 2 limited fictional-demo sessions; not a substitute for user testing.
- **Date, version, environment/device:** 2026-11-13; public release at https://mamacare-sjx5ckfz.manus.space, source checkpoint `d5748ec`; anonymous sandbox-browser demo and HTTP checks. A 375 px-wide landing-page capture exists; the app shell and features were not exercised at mobile width.
- **Fictional-data confirmation:** Yes for the limited demo smoke check; no real personal or medical information was entered.
- **Scenarios run / pass / fail / blocked / not run:** Anonymous public landing/demo access, public health and manifest responses, limited Essentials add/remove, and a demo postpartum 0/8→1/8 toggle were observed. Registration, authenticated workflows, appointment save, birth-plan save, postpartum authenticated persistence, multi-account access, external-user testing, and mobile product flows remain not run.
- **Observed issues and severity:** No demonstrated production defect in the limited checks. Appointment date/time saving was not verified; a manual test is still required.
- **Improvements made or planned:** Added a week-aware non-clinical pregnancy planning timeline and the postpartum organizer. Complete and retest mobile and authenticated flows after genuine testing.
- **Known limitations / unresolved issues:** No shared username/password test account; persistent account flows require an individual Manus account. No healthcare-worker or administrator role. No independent user feedback or interview evidence. Appointment save, permissions isolation, and mobile shell usability remain unverified.
- **Evidence location:** Developer captures under `docs/evidence/`; editable applicant walkthrough at `docs/walkthrough.md` and verified two-page PDF at `docs/walkthrough.pdf`. Interview, tester-feedback, and unrun-scenario records remain blank/explicitly pending.

### Tester feedback

No independent testers have provided feedback. For each genuine test session, record:
- **Tester code and date:** [TO COMPLETE]
- **Task attempted:** [TO COMPLETE]
- **What worked / what was confusing (actual feedback):** [TO COMPLETE]
- **Suggested change:** [TO COMPLETE]
- **Disposition and reason:** [TO COMPLETE]

## Test access and setup

The public demo is available without login and contains only fictional sample records. **Select “Explore the demo”** on the landing page; its edits are confined to the browser session and reset when the session ends. This is not a shared authenticated account.

Persistent data is available to a signed-in MamaCare member through Manus OAuth. Profile choices are **expecting mother**, **mother**, and **caregiver**; they all use one member permission class. There is no healthcare-worker or administrator product role and no shared username/password test account. A reviewer needs an individual Manus account to exercise persisted authenticated flows; no authenticated account, logout, or multi-account isolation test was performed. Arrange any private evaluator access outside this public repository and never commit credentials.

| Implemented access type | Access instructions (fictional data only) | Available features / limitations | Verification date |
|---|---|---|---|
| Public demo visitor (no account) | Public landing page → **Explore the demo**; no password. | All workspace screens use fictional demo records; edits are session-only and never persist to the app database. Limited landing, Support, Essentials, and Postpartum demo interactions were smoke-tested. | 2026-11-13; limited smoke test only |
| Signed-in MamaCare member (profile choices: expecting mother / mother / caregiver) | Individual Manus OAuth account required; no shared test credentials. | Persistent user-owned profile and planning features are implemented; authenticated end-to-end flows and runtime cross-account isolation remain unverified. | Not run |

- **Public HTTPS application URL:** https://mamacare-sjx5ckfz.manus.space — anonymous homepage, health endpoint, route manifest, and demo flow checked 2026-11-13.
- **Hosting provider / deployment date / exact published version:** Manus WebDev / 2026-11-13 / source checkpoint `d5748ec`.
- **Private GitHub repository URL / GitHub username:** https://github.com/Lizeka25/mamacare-assignment / `Lizeka25` — private visibility and updated `main` push verified 2026-11-13; mirror merge `92ae7af`.
- **Genuine commit milestones:** See the dated commit table in `docs/walkthrough.md` (`53e9766` through published source checkpoint `d5748ec`; GitHub mirror merge `92ae7af`).
- **Setup instructions:** See `README.md`; it lists required environment variable names only, commands, and safe-data guidance. Do not add credential values here.
