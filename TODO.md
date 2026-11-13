# MamaCare delivery outcomes

## 1. Mobile-first platform and secure access
- [x] Build a mobile-first web application for expecting mothers, mothers with young children, and the people who support them in South Africa, supporting families from pregnancy through early childhood.
- [ ] Support account registration/login, onboarding, and profile saving for authenticated users; persist each user's own planning data and prevent one account from reading another account's restricted records. Manus OAuth and owner-scoped storage are implemented; authenticated account save/login and cross-account runtime behavior remain unverified.
- [x] Provide the implemented profile types (expecting mother, mother, caregiver) without implying they are separate permission roles. No healthcare-worker or administrator role is claimed.
- [x] Provide a public demo with fictional data only; clearly distinguish it from private account data and do not write demo changes to the application database. Demo editing is session-only and Essentials add/remove was smoke-checked.
- [x] Use fictional test data only and expose no real personal or medical information.
- [x] State that MamaCare provides organizational and informational support and does not replace healthcare professionals or emergency services.

## 2. Pregnancy journey, appointments, and birth preparedness
- [x] My Journey includes pregnancy timelines, milestones, appointments, and birth checklists. Its week-aware milestones are planning prompts, not clinical milestones or a care schedule; the week-24 demo displayed the matching planning window.
- [ ] Users can complete onboarding, optionally add pregnancy details, view those details, and add/review appointments that save to their account. Implemented in code; authenticated saving has not been tested.
- [ ] Birth Preparedness records a preferred delivery facility, emergency contacts, and transport planning. Fields and owner-scoped procedures are implemented; persistent save/review remains unverified.
- [x] Authenticated records are scoped to their owning account in the reviewed server procedures and database helpers; public demo changes remain fictional and session-only. Runtime cross-account isolation remains untested.
- [x] Keep the initial release focused on pregnancy planning, appointments, healthcare information, and birth preparedness.
- [x] Add a Postpartum Preparation area to organize support, meals/household help, rest, supplies, follow-up transport, and important care contacts. Keep it practical and non-clinical: no diagnoses, treatment, medication, feeding instructions, or individualized medical recommendations.
- [x] Save each postpartum checklist step only to the signed-in account's profile; keep demo changes fictional and session-only, and expose no real personal or medical information. The protected owner-scoped mutation and additive profile column are implemented; signed-in persistence and demo toggle interactions remain untested end to end.

## 3. Healthcare finder and support centre
- [x] Healthcare Finder helps users find clinics and hospitals and reach relevant facility information; disclose when facility details come from an independent directory and may need confirmation. The app links to verified Clinic Finder SA province and maternity pages and clearly identifies the directory as independent.
- [x] Support Centre links to maternal-health information, public services, and trusted support organisations, including WHO Africa, South Africa's Department of Health, and UNICEF South Africa.
- [x] Label emergency/resource information clearly, link the sources, and do not present the app as a source of individualized medical advice or emergency service.

## 4. Essentials planner and child profiles
- [x] Essentials Planner supports baby essentials, shopping lists, and household budgeting with optional estimated costs in rand. The public fictional demo add/remove interaction passed; authenticated persistence was not exercised.
- [x] Child Profiles support child information, general developmental/family milestone notes, and general resources. A verified UNICEF South Africa child-development link is available from Child Profiles and the Support Centre; the note-entry flow was not authenticated end to end.
- [x] Keep private account records ownership-scoped; do not use real personal or medical information in test or demo data.

## 5. Written walkthrough, genuine interviews, and user-testing evidence
- [ ] Provide a written walkthrough of no more than two pages, covering: who experiences the problem; what the problem is and why it matters; the solution and why it was chosen; evidence; and what would be built next. The applicant draft and verified two-page PDF export are included; genuine interview evidence, applicant identity, and some independent-test evidence remain to be supplied.
- [ ] Complete at least three genuine interviews with people who experience or understand the problem. Explore how participants organise motherhood information, appointments, facility discovery, and delivery preparations. None has been completed.
- [ ] Include anonymized interview records without participant names, phone numbers, identity numbers, or private medical information. Record date, method, participant category, consent, actual responses, problems, suggested improvements, and what MamaCare learned. Do not invent quotes, responses, themes, or findings. Blank interview templates are provided; no participant records or findings exist.
- [ ] Summarize the actual number interviewed, common problem, recurring difficulties, existing solutions, requested features, and changes made after interviews. Keep every finding tied to genuine evidence. This summary is pending actual interviews.
- [ ] Record genuine user-feedback and product-testing results; the evidence record must identify test date, application version, number of testers, fictional-data confirmation, actual outcomes, pass/fail, summary, improvements, outstanding issues, tester feedback, and available screenshots/recordings. Developer checks are documented; no independent testers or feedback are available yet.
- [x] When actual product tests are run, record expected and actual results for: register account (account created); log in (user accesses account); complete onboarding (profile saved); add pregnancy details (details displayed); add appointment (appointment saved); find facility (facility information displayed); create transport plan (plan saved); create essentials list (items saved); check permissions (restricted records protected); and test mobile layout (main functions usable). Unperformed scenarios are marked “Not run”; developer smoke checks are explicitly not represented as independent user research.
- [ ] Provide working test access for every role actually implemented, test each account before submission, and use fictional information only. Explain any sign-in constraints; do not list roles that are not implemented. The public fictional demo is available; persistent account use requires an individual Manus account, and no shared test credentials or separate healthcare-worker/administrator roles are provided.

## 6. Public release and private source repository
- [ ] Publish the application at a working HTTPS URL. Verify it in a private/incognito browser; verify test accounts can log in, main implemented features work, mobile layout is usable, and no real personal or medical information is exposed. **Completed:** public HTTPS at https://mamacare-sjx5ckfz.manus.space; anonymous homepage, health endpoint, all 10 routes, and no-login demo/Postpartum toggle were checked with fictional data. Authenticated test accounts, account isolation, and full mobile flows remain untested.
- [x] Record the verified application URL, hosting provider, deployment date, application version, test-access instructions, and known limitations. The application must remain online during the selection process; maintaining it is the applicant's ongoing responsibility. URL: https://mamacare-sjx5ckfz.manus.space; Manus WebDev; 2026-11-13; source checkpoint `d5748ec`; public demo instructions and limitations are in README/walkthrough. Applicant must keep the hosting project active.
- [x] Push the source to the existing private GitHub repository and record the GitHub username and exact repository URL. Private `Lizeka25/mamacare-assignment`, https://github.com/Lizeka25/mamacare-assignment; updated main merge commit `92ae7af` verified.
- [x] Include genuine development commits showing how the project progressed, with actual dates/commit references for initial setup, authentication and onboarding, pregnancy journey, healthcare finder, birth preparedness, testing/improvements, and deployment. The walkthrough maps dated commits `53e9766`, `c916873`, `55a6535`, `c61025c`, `611ec75`, `d5748ec`, and `92ae7af` to their actual milestones.
- [x] Include setup instructions; exclude passwords, secret keys, and private user information. README lists required environment variable names only and warns against committing values.

## 7. Final submission checklist
- [x] Public live application link: https://mamacare-sjx5ckfz.manus.space.
- [ ] Test access for every implemented role.
- [x] Private source-code repository: https://github.com/Lizeka25/mamacare-assignment.
- [x] Genuine development commit history with dated commit references in `docs/walkthrough.md`.
- [ ] Written walkthrough no more than two pages, with verified applicant and release details.
- [ ] At least three genuine Route B interviews and actual interview findings.
- [ ] Actual product-testing evidence and genuine tester feedback.
- [x] Fictional test data only.
- [ ] All links and test accounts checked; no shared authenticated test account is currently available.
- [ ] Applicant name, live URL, and private repository URL are accurate in the final submission.
- [ ] Confirm readiness to grant Samsung full read access within 48 hours if shortlisted.
