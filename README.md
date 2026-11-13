# MamaCare

MamaCare is a mobile-first planning workspace for expecting mothers, mothers with young children, and caregivers in South Africa. It brings practical pregnancy planning, appointments, facility discovery, birth preparedness, essentials budgeting, child profiles, and trusted support links together.

## Features

- Manus OAuth sign-in for persistent, account-owned planning data; profile choices are expecting mother, mother, or caregiver, not separate permission roles.
- Onboarding and a private profile with optional entered pregnancy week and due date.
- My Journey with a week-aware pregnancy **planning** timeline, a saved six-step birth-preparedness checklist, and appointment reminders. Timeline prompts are organizational, not clinical milestones or a care schedule.
- Appointment scheduling and completion tracking.
- Province links to the independent Clinic Finder SA directory; listings and service availability may change.
- Birth-plan fields for a preferred facility, emergency contact, and transport idea.
- Essentials list with estimated costs in rand (not a price quote).
- Child profiles and dated notes for general developmental milestones or family moments, with an external UNICEF South Africa child-development resource.
- Support links to WHO Africa, UNICEF South Africa, South Africa's Department of Health, Clinic Finder SA, and a government emergency-number reference.
- A public demo that can be opened without signing in. All demo records are fictional; demo edits are held only in the browser session and never saved to the application database.

MamaCare provides organizational and informational support. It is not medical advice and does not replace healthcare professionals or emergency services. Confirm facility details directly with the relevant service.

## Local development

The project uses React, Vite, Express, tRPC, Drizzle, and MySQL. The repository pins `pnpm@10.18.0` in `package.json`; use Node.js with Corepack/pnpm. The hosted project supplies the managed database and Manus OAuth integration. For isolated local development, configure the required environment variable **names** below with your own project credentials and a non-production MySQL database; never commit the values:

- `DATABASE_URL`
- `MANUS_PROJECT_ID`
- `MANUS_JWT_SECRET`
- `MANUS_OAUTH_API_URL`
- `MANUS_OAUTH_PORTAL_URL`
- `MANUS_API_URL`
- `MANUS_API_KEY`
- `MANUS_API_BROWSER_KEY`

Install, apply the committed additive schema migration, and start the app:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm db:migrate
pnpm dev
```

Useful checks:

```sh
pnpm check
pnpm test
pnpm build
```

`pnpm db:migrate` applies migrations to the configured database. Keep local work on a development database; the hosted development and production application share the managed database. The Dockerfile builds and runs the web app and its unauthenticated `/api/health` readiness endpoint. The included tests cover starter platform/authentication behavior and are not a substitute for the assignment's real user testing.

## Test access

Select **Explore the demo** on the landing page to inspect every workspace area with fictional sample records; no account or shared password is needed. Changes are session-only and are reset when the demo session ends. Persistent records require an individual Manus account and OAuth sign-in. No shared username/password, healthcare-worker role, or administrator product role is implemented. An evaluator needs a Manus account to test persistent authenticated flows; arrange any private test access outside this repository.

## Assignment evidence

- `docs/walkthrough.md` is a concise applicant-completion draft; research and independent user-test findings are not fabricated.
- `docs/assignment-evidence.md` records developer smoke/build evidence and keeps genuine interviews, external-user feedback, authenticated access tests, and unrun scenarios explicit.
- `docs/evidence/landing-desktop.png` and `docs/evidence/landing-mobile.png` are developer Preview captures of the landing page, not participant/user-testing evidence.
- `docs/sources.md` records public sources linked from the facility finder and Support Centre.

Complete at least three genuine, anonymized interviews and actual user testing before representing the assignment as finished. Use fictional product-test data only; do not enter or commit real personal or medical information.

## Delivery details

- Public application URL: to be added after successful publication and verification.
- Hosting provider: Manus WebDev.
- Private source repository: https://github.com/Lizeka25/mamacare-assignment
- Applicant name, deployment date, exact version, interview findings, and external user-testing results: applicant to complete with verified information.
