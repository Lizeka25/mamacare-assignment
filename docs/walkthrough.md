# MamaCare — assignment walkthrough

> **Applicant draft — evidence incomplete.** The problem statement below comes from the assignment brief, not completed interviews.

**Applicant:** [TO COMPLETE — name]<br>
**Research:** 0 genuine interviews; 0 independent user testers.<br>
**Public app / release:** https://mamacare-sjx5ckfz.manus.space — 2026-11-13; checkpoint `d5748ec`.

## Who experiences the problem, and why it matters

The assignment identifies expecting mothers, mothers with young children, and their supporters in South Africa as intended users. Pregnancy and early-parenting information, appointments, facility discovery, and birth preparation can be spread across different sources. MamaCare is designed to gather practical organization tools in one place; interviews are still needed to confirm how widespread the problem is and which needs matter most.

## Chosen solution

MamaCare is a mobile-first workspace that includes onboarding; My Journey with an optional pregnancy week, week-aware **planning** prompts, appointments, and a birth checklist; a facility finder linking to an independent directory; a birth plan for a preferred facility, emergency contact, and transport; an eight-step Postpartum Preparation organizer for support, meals, rest, supplies, follow-up transport, and useful contacts; an essentials list with estimated costs in rand; child profiles and dated family/development notes; and a Support Centre with public sources. The public **Explore the demo** path uses fictional examples; changes remain in the browser session. Persistent records require Manus OAuth and are scoped to the signed-in account. Expecting mother, mother, and caregiver are profile choices within one access class; there is no shared password, healthcare-worker, or administrator test role.

The first version prioritizes the brief's pregnancy-planning, appointment, healthcare-information, and birth-preparation goals, then adds practical postpartum, list, and child-profile tools. The ranking is provisional until participant evidence is collected. Timeline prompts are organizational only, not medical advice, clinical milestones, or a care schedule. Facility details may change and must be checked with the relevant service. MamaCare is not a healthcare provider or emergency service.

## Evidence and next steps

Developer checks on 2026-11-13 included TypeScript checking, six automated starter tests, a production build, public health/route-manifest responses, and anonymous browser access. In the fictional demo, the postpartum checklist showed 0/8, then 1/8 after one item was toggled; an Essentials item was also added and removed. These limited checks used no user account or application records and are not independent user testing. Authenticated saves, cross-account isolation, appointment saving, and full mobile workflows remain unverified.

Route B evidence is incomplete: **0 genuine interviews and 0 independent testers**. The evidence workbook contains blank interview templates and marks unrun scenarios. Complete at least three genuine, anonymized interviews; gather actual user feedback using fictional test information; summarize findings, improvements, and remaining issues. Do not invent responses or results.

Next I would expand the healthcare directory, improve pregnancy and postnatal resources, add South African languages, and improve accessibility based on real feedback. Applicant next steps: [TO COMPLETE after interviews and user testing].

## Release, access, and source history

- **Public app:** https://mamacare-sjx5ckfz.manus.space (homepage, health endpoint, 10-route manifest, and demo checked 2026-11-13).
- **Hosting and deployed source checkpoint:** Manus WebDev; `d5748ec` (2026-11-13).
- **Test access:** Select **Explore the demo**; no account or password. Persistent records need an individual Manus OAuth account; no shared credentials are provided.
- **Private GitHub source:** https://github.com/Lizeka25/mamacare-assignment (`Lizeka25`); private access/push verified, mirror merge `92ae7af`.
- **Dated milestones (all 2026-11-13):** `53e9766` scaffold; `c916873` account-owned data; `55a6535` onboarding and initial planning workspace (journey, facility finder, birth plan, essentials, children, support); `c61025c` assignment documentation; `611ec75` postpartum organizer; `d5748ec` release/evidence update and published checkpoint; `92ae7af` GitHub history merge/push.

Setup steps are in `README.md`; sources are recorded in `docs/sources.md`. The Support Centre links to public health, child-development, facility-directory, and government emergency-number information; MamaCare is not affiliated with those organizations.

**Samsung access commitment:** If shortlisted, I will be ready to grant Samsung full read access within 48 hours. [Applicant: confirm this statement before submission.]
