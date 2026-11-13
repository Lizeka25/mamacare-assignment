# MamaCare — assignment walkthrough

> **Applicant draft — incomplete.** Complete the applicant and evidence fields only with verified information. The problem statement below comes from the assignment brief, not from completed interviews.

**Applicant:** [TO COMPLETE — name]<br>
**Current research status:** No participant interviews or independent user tests have been completed.<br>
**Public app URL / deployment date:** [TO COMPLETE after successful publication]

## Who experiences the problem, and why it matters

The assignment identifies expecting mothers, mothers with young children, and their supporters in South Africa as the intended users. Pregnancy and early-parenting information, appointment details, facility discovery, and birth-preparation planning can be spread across different sources. This is the problem MamaCare is designed to address; the extent and details of this need still require confirmation through genuine interviews.

## Chosen solution

MamaCare provides one mobile-first place to organize practical tasks from pregnancy into early childhood. The current app includes account onboarding and a public fictional demo; My Journey with an optional entered pregnancy week, a highlighted, week-aware **planning** timeline, and a birth-preparedness checklist; appointment reminders; province links to an independently maintained facility directory; a birth plan for preferred facility, emergency contact, and transport; an essentials list with estimated costs in rand; child profiles with dated developmental/family milestone notes and a UNICEF South Africa child-development resource; and a Support Centre linking to public sources.

The timeline ranges are prompts for organization, not medical or developmental advice, clinical milestones, or a care schedule. The user’s own week entry only selects a planning window. Facility information is provided by external sources and should be confirmed with the relevant service.

Persistent records use Manus OAuth sign-in and are scoped to the signed-in account. The public **Explore the demo** path requires no login, uses clearly fictional samples, and does not save demo edits to the application database. The implemented profile choices are expecting mother, mother, and caregiver; they do not create different permission roles. No shared password test account or healthcare-worker/administrator role is available.

This approach was selected to combine the initial assignment priorities—pregnancy planning, appointments, healthcare information, and birth preparation—with useful list and child-profile tools. That choice is provisional: no interview evidence exists yet to validate or rank these needs.

## Evidence and what should be built next

Developer checks completed for this version include TypeScript checking, six automated tests, a production build, HTTP health and route-manifest checks, and a limited fictional-demo smoke check that added and then removed a demo essentials item. Desktop and narrow landing-page Preview captures are in `docs/evidence/`. These checks are not independent user testing. Authenticated sign-in, end-to-end account isolation, the appointment-save flow, and the application’s main flows on a mobile device remain unverified.

Route B evidence is not complete: **0 genuine interviews and 0 independent testers**. The assignment evidence workbook in `docs/assignment-evidence.md` contains blank interview forms and a scenario log. Complete at least three genuine, anonymized interviews, record real tester feedback from fictional-data sessions, summarize what was learned, and revise priorities from that evidence. Do not replace these steps with the developer checks above or invent findings.

With more time, I would expand the healthcare directory, improve pregnancy and postnatal resources, add additional South African languages, and improve accessibility. I would continue testing with mothers and caregivers and use their actual feedback to choose changes. Applicant next steps: [TO COMPLETE after interviews and user testing].

## Access, release, and sources

- **Public HTTPS application:** [TO COMPLETE after publication; open in a fresh browser to verify]
- **Hosting provider:** Manus WebDev
- **Test access:** Use **Explore the demo** for public fictional-data access. Persistent records require an individual Manus account; no shared test password is provided. See the evidence workbook for the precise access limitation.
- **Private GitHub repository:** https://github.com/Lizeka25/mamacare-assignment (`Lizeka25`); verify the repository is private after the source push.
- **Deployment date and version/commit:** [TO COMPLETE with the published URL and actual version returned by the platform]
- **Applicant setup instructions:** See `README.md`.

The Support Centre links to WHO Africa maternal-health information, UNICEF South Africa child-development resources, South Africa's Department of Health, Clinic Finder SA, and Western Cape Government emergency-number guidance. These organizations maintain their own information. MamaCare is not affiliated with them and does not provide clinical care or emergency response.

**Samsung access commitment:** If shortlisted, the applicant will be ready to grant Samsung full read access within 48 hours. [Confirm this statement before submission.]
