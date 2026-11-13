# MamaCare

MamaCare is a mobile-first planning workspace for expecting mothers, mothers with young children, and caregivers in South Africa. It brings practical pregnancy planning, appointments, facility discovery, birth preparedness, postpartum preparation, essentials budgeting, child profiles, and trusted support links together.

## Features

- Manus OAuth sign-in for persistent, account-owned planning data; profile choices are expecting mother, mother, or caregiver, not separate permission roles.
- Onboarding and a private profile with optional entered pregnancy week and due date.
- My Journey with a week-aware pregnancy **planning** timeline, a saved six-step birth-preparedness checklist, and appointment reminders. Timeline prompts are organizational, not clinical milestones or a care schedule.
- Appointment scheduling and completion tracking.
- Province links to the independent Clinic Finder SA directory; listings and service availability may change.
- Birth-plan fields for a preferred facility, emergency contact, and transport idea.
- Postpartum Preparation adds an account-owned eight-step organizer for support, meals, rest, supplies, follow-up transport, and important contacts. It is organizational support only, not medical guidance; demo progress remains session-only.
- Essentials list with estimated costs in rand (not a price quote).
- Child profiles and dated notes for general developmental milestones or family moments, with an external UNICEF South Africa child-development resource.
- Support links to WHO Africa, UNICEF South Africa, South Africa's Department of Health, Clinic Finder SA, and a government emergency-number reference.
- An anonymous demo with fictional sample records. Demo edits stay in the browser session and are never saved to the application database.

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

Install, apply the committed additive schema migrations, and start the app:

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

Open the public app and select **Explore the demo** to inspect the workspace with fictional sample records; no account or shared password is needed. Changes are session-only and reset when the demo session ends. Persistent records require an individual Manus account and OAuth sign-in. No shared username/password, healthcare-worker role, or administrator product role is implemented. An evaluator needs a Manus account to test persistent authenticated flows; do not commit credentials or arrange private test access inside this repository.

## Assignment evidence

- `docs/walkthrough.md` is the editable applicant-completion draft; `docs/walkthrough.pdf` is its verified two-page export. The identified problem comes from the assignment brief, and research/user-test findings are not fabricated.
- `docs/assignment-evidence.md` records the limited developer checks and keeps genuine interviews, external-user feedback, authenticated access tests, and unrun scenarios explicit.
- `docs/evidence/landing-desktop.png` and `docs/evidence/landing-mobile.png` are developer Preview captures of the landing page, not participant/user-testing evidence.
- `docs/sources.md` records public sources linked from the facility finder and Support Centre.

Three genuine, anonymized interviews and actual independent user testing are still required before representing the assignment evidence as complete. Use fictional product-test data only; do not enter or commit real personal or medical information.

## Delivery details

- Public application URL: https://mamacare-sjx5ckfz.manus.space
- Hosting provider: Manus WebDev. Public access was confirmed on 2026-11-13; an anonymous browser opened the landing page and demo, `/api/health` returned HTTP 200, and `/manus-routes.json` returned all 10 page routes, including `/postpartum`.
- Published application source checkpoint: `d5748ecb31b7361a07f913a4941541af219098a9` (2026-11-13).
- Private source repository: https://github.com/Lizeka25/mamacare-assignment (GitHub username `Lizeka25`). Its `main` branch includes the MamaCare source history and the original repository README; mirror commit `92ae7afaab8c33fc3b5dcd552a998e67ec13e83d`.
- Applicant name, three interview records/findings, independent user-testing results, and confirmation of the Samsung access commitment remain for the applicant to complete with verified information.
- Keep the site available during the selection period; ongoing availability depends on maintaining the hosting project.

## Original repository description

“Assignment project for the MamaCare platform.”
