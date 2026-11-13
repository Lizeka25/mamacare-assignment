# MamaCare implementation plan

## Product and implementation

MamaCare is a mobile-first South African motherhood-planning web app for expecting mothers, mothers with young children, and caregivers. The first release focuses on pregnancy planning, appointments, healthcare information, and birth preparedness, with practical essentials and child-profile tools available in the same workspace. It is an organizational and informational tool, not clinical advice or an emergency service.

The app will use the initialized React, Express, tRPC, Drizzle, and MySQL starter. Authentication will use the provided Manus OAuth flow because no other identity provider was specified. A protected profile and planning records will be keyed to the authenticated user ID on the server; every read and write will filter by that ID. The app will not include a healthcare-worker or administrator role. A public demo path uses fictional in-memory sample data; demo users can explore edits, but those changes never write to the shared database and reset when the browser session ends. A signed-in account can save private data. The browser interface will explain that Manus sign-in is needed for durable private saving.

The database additions are additive: one profile/onboarding record with a saved six-step birth-preparedness checklist, appointments, essentials-list items, child profiles, and user-entered developmental/family milestone notes. Pregnancy week and due date are optional. My Journey presents broad, week-aware organization prompts, not clinical milestones or a recommended care schedule. Emergency contacts and transport plans are private to the owning account. Every child milestone is linked to a child that belongs to that same account. No clinical diagnoses, treatment guidance, or free-form medical notes are requested. Child Profiles and the Support Centre link to UNICEF South Africa's parent-facing child-development and milestone resources; MamaCare does not reproduce those claims or present an assessment. Facility discovery will hand off to Clinic Finder SA, an independently maintained public directory, rather than embedding unverified facilities. South African emergency contacts will be labeled as general information and linked to the Western Cape Government source. Maternal-health links will point to WHO Africa and South Africa's Department of Health.

## Project structure

- `client/src/App.tsx` registers stable page routes and the shared UI providers.
- `client/src/components/MamaCareShell.tsx` owns desktop navigation, mobile navigation, account actions, and the safety note.
- `client/src/pages/Home.tsx` handles the landing/demo/authenticated states, session-only demo, saved tRPC data, and route dispatch.
- `client/src/components/WorkspaceViews.tsx` contains the dashboard, onboarding, journey, appointments, facility finder, birth plan, essentials, child, support, and landing views.
- `client/src/lib/demoData.ts` contains clearly fictional, browser-only data for the public demo.
- `drizzle/schema.ts`, `server/db.ts`, and `server/routers.ts` define the owner-scoped profile, checklist, appointments, essentials, child profiles and milestones, plus authenticated tRPC procedures.
- `client/public/manus-routes.json` declares all page routes before Preview startup.
- `docs/` contains a concise assignment walkthrough, interview and testing evidence templates, and source references; it will not claim unperformed interviews or tests.

## Design

Three lower-probability alternatives considered were a high-contrast civic-service portal (0.04), a playful nursery pastel interface (0.03), and a quiet botanical editorial system (0.06). The chosen direction is the quiet botanical editorial system.

- **Design movement:** contemporary editorial wellness design, warm and grounded rather than clinical or infantile.
- **Core principles:** reassure without making medical promises; make the next practical action obvious; protect private information; stay legible on a phone.
- **Color philosophy:** soft oat paper creates calm; deep eucalyptus carries trust; muted terracotta adds warmth to important actions; ink and quiet sage maintain readable contrast.
- **Layout paradigm:** a narrow desktop navigation rail opens to an asymmetrical, story-like dashboard; on phones it becomes a compact top bar and thumb-reachable bottom navigation. Content follows a clear vertical sequence rather than dense grids.
- **Signature elements:** a small sprout-and-heart mark; soft-edged appointment and milestone cards; a fine timeline line that threads through the pregnancy journey.
- **Interaction philosophy:** actions use plain verbs, controls have visible focus, and saving gives clear feedback. Demo state never pretends to persist. Reduced-motion preferences are respected.
- **Animation:** brief opacity/position transitions only; no looping or celebratory motion. Disable transitions under `prefers-reduced-motion`.
- **Typography system:** system sans-serif for controls and body copy, with Georgia-style editorial headings; avoid dependence on an external font request.
- **Brand essence:** a practical, gentle place for mothers and caregivers to organize the next step; personality: reassuring, useful, respectful.
- **Brand voice:** warm, plain, and specific. Examples: “One step at a time.” and “Keep the details you may need, all in one place.”
- **Wordmark and logo:** a simple sprout-and-heart icon paired with a readable MamaCare wordmark; no generated logo lettering.
- **Signature brand color:** deep eucalyptus green.

## Delivery workflow

Use the existing managed project and its server/database configuration. Implement owner-scoped tRPC procedures, responsive routes, onboarding, and the demo. Add the public route manifest before starting Preview, then run type checks, tests, and a production build. Start the configured port-3000 server and confirm its health endpoint and route manifest. Commit source milestones to `main` and push to the managed origin so the platform records a checkpoint. Separately push the requested source to the already-created private GitHub assignment repository without changing the project's canonical Manus-managed origin. Publish the confirmed checkpoint through the WebDev publish workflow and verify the production URL before delivery.

Known limits to disclose: a signed-in user needs a Manus account; the demo is fictional and non-persistent; the linked facility directory is maintained independently and service details should be confirmed before travel; genuine interviews and participant/user testing must be completed by the applicant.
