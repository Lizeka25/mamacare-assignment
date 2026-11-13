import { useEffect, useMemo, useState, type FormEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Baby,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  ExternalLink,
  Heart,
  MapPin,
  Plus,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stethoscope,
  Trash2,
  Truck,
} from "lucide-react";
import type {
  AppointmentData,
  CareRole,
  ChildData,
  EssentialData,
  MilestoneData,
  ProfileData,
} from "@/lib/demoData";

export type ProfileInput = Omit<ProfileData, "birthChecklist">;
export type AppointmentInput = { title: string; appointmentDate: string; facility?: string };
export type EssentialInput = { label: string; category: string; estimatedCost: number };
export type ChildInput = { name: string; birthDate?: string };
export type MilestoneInput = { childId: number; title: string; milestoneDate?: string };

const provinces = [
  { name: "Eastern Cape", slug: "eastern-cape", note: "Eastern Cape" },
  { name: "Free State", slug: "free-state", note: "Free State" },
  { name: "Gauteng", slug: "gauteng", note: "Gauteng" },
  { name: "KwaZulu-Natal", slug: "kwazulu-natal", note: "KwaZulu-Natal" },
  { name: "Limpopo", slug: "limpopo", note: "Limpopo" },
  { name: "Mpumalanga", slug: "mpumalanga", note: "Mpumalanga" },
  { name: "North West", slug: "north-west", note: "North West" },
  { name: "Northern Cape", slug: "northern-cape", note: "Northern Cape" },
  { name: "Western Cape", slug: "western-cape", note: "Western Cape" },
];

const planningSteps = [
  "Choose a nearby place to ask about maternity services",
  "Save an emergency contact you trust",
  "Think through how you could get to your chosen facility",
  "Keep important documents together",
  "Build an essentials list that fits your budget",
  "Share the plan with someone who may support you",
];

function money(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function displayDate(value: string, withTime = false) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(date);
}

function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-title-row">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action && <div className="page-title-action">{action}</div>}
    </div>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function SectionTitle({ title, extra }: { title: string; extra?: ReactNode }) {
  return (
    <div className="section-title-row">
      <h2>{title}</h2>
      {extra}
    </div>
  );
}

function TextField({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <input className="field-input" {...props} />
    </label>
  );
}

function TextAreaField({
  label,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <textarea className="field-input field-textarea" {...props} />
    </label>
  );
}

function EmptyNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="empty-note">
      <div className="empty-note-icon"><Sparkles size={18} /></div>
      <div><strong>{title}</strong><p>{children}</p></div>
    </div>
  );
}

export function LandingView({ onLogin, onDemo }: { onLogin: () => void; onDemo: () => void }) {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <a className="landing-brand" href="/" aria-label="MamaCare home">
          <span className="brand-symbol"><Heart size={19} fill="currentColor" /></span>
          <span className="brand-name">mama<span>care</span></span>
        </a>
        <div className="landing-nav-actions">
          <button className="button button-quiet" onClick={onLogin}>Sign in</button>
          <button className="button button-primary" onClick={onLogin}>Create your space <ArrowRight size={16} /></button>
        </div>
      </nav>
      <main className="landing-content">
        <section className="landing-hero">
          <div className="landing-copy">
            <div className="eyebrow"><span className="tiny-flower">✳</span> YOUR JOURNEY, HELD TOGETHER</div>
            <h1>A little more clarity for the road ahead.</h1>
            <p>MamaCare brings everyday planning for pregnancy and early childhood into one calm, practical place.</p>
            <div className="landing-actions">
              <button className="button button-primary button-large" onClick={onLogin}>Create your space <ArrowRight size={17} /></button>
              <button className="button button-outline button-large" onClick={onDemo}><Sparkles size={16} /> Explore the demo</button>
            </div>
            <div className="landing-trust"><ShieldCheck size={16} /><span>Your account plans are private. Demo information is fictional and doesn't save.</span></div>
          </div>
          <div className="landing-illustration">
            <img className="landing-hero-art" src="/manus-storage/async-images/i9efphfY8UG4jUpyHQoVTW/image-1.webp" alt="A journal, terracotta heart, and botanical sprig in soft window light" />
          </div>
        </section>
        <section className="landing-feature-strip" aria-label="MamaCare tools">
          <article><span className="feature-icon feature-sage"><Sprout size={20} /></span><div><strong>My Journey</strong><p>Milestones, appointments, and your checklist.</p></div></article>
          <article><span className="feature-icon feature-clay"><MapPin size={20} /></span><div><strong>Find care</strong><p>Reach a public directory by province.</p></div></article>
          <article><span className="feature-icon feature-gold"><ListIcon /></span><div><strong>Plan what you need</strong><p>Prepare a list and keep an eye on costs.</p></div></article>
        </section>
        <div className="landing-disclaimer">MamaCare is an organization and information tool. It does not replace healthcare professionals or emergency services.</div>
      </main>
    </div>
  );
}

function ListIcon() {
  return <CheckCircle2 size={20} />;
}

export function OnboardingView({
  displayName,
  onSave,
  saving,
}: {
  displayName: string;
  onSave: (input: ProfileInput) => void;
  saving: boolean;
}) {
  const [role, setRole] = useState<CareRole>("expecting");
  const [region, setRegion] = useState("");
  const [pregnancyWeek, setPregnancyWeek] = useState("");
  const [dueDate, setDueDate] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSave({
      role,
      region: region.trim(),
      pregnancyWeek: role === "expecting" && pregnancyWeek ? Number(pregnancyWeek) : null,
      dueDate: role === "expecting" && dueDate ? dueDate : null,
      preferredFacility: null,
      emergencyContactName: null,
      emergencyContactPhone: null,
      transportPlan: null,
    });
  };

  return (
    <div className="onboarding-wrap">
      <div className="onboarding-mark"><Heart size={23} /></div>
      <div className="eyebrow">A FEW DETAILS TO START</div>
      <h1>Let’s make this space yours{displayName ? `, ${displayName.split(" ")[0]}` : ""}.</h1>
      <p className="page-description">Share only what helps you plan. You can change these details anytime.</p>
      <form className="panel onboarding-form" onSubmit={submit}>
        <fieldset className="role-fieldset">
          <legend>Which best describes your journey?</legend>
          <div className="role-options">
            {([
              ["expecting", "Expecting a baby", "Planning for pregnancy and birth"],
              ["mother", "I’m a mother", "Organizing care for my family"],
              ["caregiver", "I support someone", "Helping a mother or young child"],
            ] as const).map(([value, label, hint]) => (
              <button type="button" key={value} className={`role-option ${role === value ? "selected" : ""}`} onClick={() => setRole(value)}>
                <span className="role-radio">{role === value && <span />}</span>
                <span><strong>{label}</strong><small>{hint}</small></span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="form-grid">
          <label className="field-label">
            <span>Province or area</span>
            <select className="field-input" required value={region} onChange={event => setRegion(event.target.value)}>
              <option value="">Choose a province</option>
              {provinces.map(item => <option key={item.slug} value={item.name}>{item.name}</option>)}
            </select>
          </label>
          {role === "expecting" && (
            <>
              <TextField label="Pregnancy week (optional)" type="number" min={1} max={42} placeholder="e.g. 24" value={pregnancyWeek} onChange={event => setPregnancyWeek(event.target.value)} />
              <TextField label="Estimated due date (optional)" type="date" value={dueDate} onChange={event => setDueDate(event.target.value)} />
            </>
          )}
        </div>
        <div className="onboarding-privacy"><ShieldCheck size={17} /><span>Your profile is private to your account. Leave optional details blank if you prefer.</span></div>
        <button className="button button-primary button-large button-full" type="submit" disabled={saving || !region.trim()}>
          {saving ? "Saving your space…" : "Continue to MamaCare"} <ArrowRight size={16} />
        </button>
      </form>
      <p className="tiny-muted centered">Your information is for organization only, not medical advice.</p>
    </div>
  );
}

export function DashboardView({
  displayName,
  profile,
  appointments,
  essentials,
  children,
  isDemo,
  onNavigate,
  onToggleAppointment,
}: {
  displayName: string;
  profile: ProfileData;
  appointments: AppointmentData[];
  essentials: EssentialData[];
  children: ChildData[];
  isDemo: boolean;
  onNavigate: (href: string) => void;
  onToggleAppointment: (id: number, completed: boolean) => void;
}) {
  const nextAppointment = appointments.find(item => !item.completed && new Date(item.appointmentDate).getTime() >= Date.now());
  const packedCount = essentials.filter(item => item.packed).length;
  const firstName = displayName.trim().split(" ")[0] || "friend";
  const greeting = profile.role === "caregiver" ? "Your support matters." : profile.role === "mother" ? "One step at a time." : "A little space for your journey.";

  return (
    <>
      <div className="dashboard-intro">
        <div><div className="eyebrow">{greeting}</div><h1>Good to see you, {firstName}.</h1><p>Keep the practical details close. Take things at your own pace.</p></div>
        {profile.role === "expecting" && profile.pregnancyWeek && <div className="week-badge"><span className="week-number">{profile.pregnancyWeek}</span><span><strong>week</strong><small>of your journey</small></span></div>}
      </div>
      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="welcome-kicker"><Sparkles size={14} /> A GENTLER WAY TO KEEP TRACK</span>
          <h2>Make room for what matters today.</h2>
          <p>Your plans don't need to be perfect. Start with one small thing you’d like to remember.</p>
          <button className="button button-light" onClick={() => onNavigate("/journey")}>Go to My Journey <ArrowRight size={15} /></button>
        </div>
        <div className="welcome-flower" aria-hidden="true"><span className="flower-circle" /><span className="flower-stem" /><span className="flower-leaf flower-leaf-a" /><span className="flower-leaf flower-leaf-b" /></div>
      </section>
      <div className="overview-grid">
        <Panel className="next-panel">
          <SectionTitle title="Coming up" extra={<button className="text-link" onClick={() => onNavigate("/appointments")}>All appointments <ArrowRight size={14} /></button>} />
          {nextAppointment ? (
            <div className="appointment-feature">
              <div className="appointment-date"><span>{new Date(nextAppointment.appointmentDate).toLocaleDateString("en-ZA", { day: "2-digit" })}</span><small>{new Date(nextAppointment.appointmentDate).toLocaleDateString("en-ZA", { month: "short" })}</small></div>
              <div className="appointment-detail"><strong>{nextAppointment.title}</strong><span>{displayDate(nextAppointment.appointmentDate, true)}</span>{nextAppointment.facility && <small><MapPin size={12} /> {nextAppointment.facility}</small>}</div>
              <button className="check-button" aria-label="Mark appointment complete" title="Mark complete" onClick={() => onToggleAppointment(nextAppointment.id, true)}><Check size={16} /></button>
            </div>
          ) : <EmptyNote title="Nothing on the calendar just yet" >Add an appointment or a reminder when you're ready.</EmptyNote>}
          <button className="button button-outline button-small" onClick={() => onNavigate("/appointments")}><Plus size={15} /> Add an appointment</button>
        </Panel>
        <Panel className="journey-panel">
          <SectionTitle title="Your plan, at a glance" />
          <div className="progress-topline"><span>Birth-preparedness checklist</span><strong>{planningSteps.filter((_, index) => Boolean(profile.birthChecklist & (1 << index))).length} of {planningSteps.length}</strong></div>
          <div className="progress-track"><span style={{ width: `${Math.round((planningSteps.filter((_, index) => Boolean(profile.birthChecklist & (1 << index))).length / planningSteps.length) * 100)}%` }} /></div>
          <p className="muted-copy">A few useful details can make planning feel more manageable.</p>
          <button className="text-link" onClick={() => onNavigate("/journey")}>Continue your checklist <ArrowRight size={14} /></button>
        </Panel>
        <Panel className="essentials-panel">
          <SectionTitle title="Little things, gathered" extra={<button className="text-link" onClick={() => onNavigate("/essentials")}>View list <ArrowRight size={14} /></button>} />
          {essentials.length > 0 ? (
            <>
              <div className="essentials-summary"><span className="essentials-count">{packedCount}<small> / {essentials.length}</small></span><span>items checked off</span></div>
              <div className="progress-track clay-track"><span style={{ width: `${Math.round((packedCount / essentials.length) * 100)}%` }} /></div>
              <div className="mini-items">{essentials.slice(0, 3).map(item => <div key={item.id} className={item.packed ? "mini-item done" : "mini-item"}><span className="mini-check">{item.packed && <Check size={12} />}</span>{item.label}</div>)}</div>
            </>
          ) : <EmptyNote title="Start your essentials list" >Keep ideas and costs together in one place.</EmptyNote>}
        </Panel>
        <Panel className="care-links-panel">
          <SectionTitle title="Helpful places to begin" />
          <button className="resource-row" onClick={() => onNavigate("/facilities")}><span className="resource-icon"><MapPin size={18} /></span><span><strong>Find a nearby clinic</strong><small>Browse a public directory by province</small></span><ArrowRight size={16} /></button>
          <button className="resource-row" onClick={() => onNavigate("/birth-plan")}><span className="resource-icon resource-icon-clay"><Truck size={18} /></span><span><strong>Think through transport</strong><small>Save a plan and a trusted contact</small></span><ArrowRight size={16} /></button>
          <button className="resource-row" onClick={() => onNavigate("/children")}><span className="resource-icon resource-icon-gold"><Baby size={18} /></span><span><strong>Keep family moments</strong><small>Add a child profile and memories</small></span><ArrowRight size={16} /></button>
        </Panel>
      </div>
      <div className="dashboard-footnote"><ShieldCheck size={15} /><span>{isDemo ? "Fictional demo data only — your changes are not saved." : "Your details are private to your account. Only save what is useful to you."}</span></div>
    </>
  );
}

export function JourneyView({
  profile,
  onToggleChecklist,
  onNavigate,
}: {
  profile: ProfileData;
  onToggleChecklist: (step: number, completed: boolean) => void;
  onNavigate: (href: string) => void;
}) {
  const doneCount = planningSteps.filter((_, index) => Boolean(profile.birthChecklist & (1 << index))).length;
  const planningMoments = [
    { tag: "Start here", title: "Make a space for your information", copy: "Choose a way to keep appointment details and questions together." },
    { tag: "Find your people", title: "Decide who can support you", copy: "A trusted person can be part of your plans in whatever way works for you." },
    { tag: "Plan the practical details", title: "Think about getting to care", copy: "Save a route or transport idea you may want to discuss with someone you trust." },
    { tag: "As things change", title: "Keep your list flexible", copy: "Your plans can change. Update them when something no longer fits." },
  ];
  const pregnancyTimeline = [
    { tag: "Weeks 1–12", startWeek: 1, endWeek: 12, title: "Start with questions and care contacts", copy: "Keep questions you want to raise with a healthcare professional and contact details you have verified." },
    { tag: "Weeks 13–27", startWeek: 13, endWeek: 27, title: "Keep appointments and support close", copy: "Gather visit dates and the people you may want involved, in a way that works for you." },
    { tag: "Weeks 28–42", startWeek: 28, endWeek: 42, title: "Gather practical birth-preparation details", copy: "Note a preferred facility and a transport idea; confirm plans and contacts directly with your care team." },
    { tag: "Any time", startWeek: 0, endWeek: 42, title: "Review whenever things change", copy: "These are flexible organization prompts. Update or skip them whenever you need." },
  ];
  const currentWeek = profile.role === "expecting" ? profile.pregnancyWeek : null;
  const currentStageIndex = currentWeek === null ? -1 : pregnancyTimeline.findIndex(stage => currentWeek >= stage.startWeek && currentWeek <= stage.endWeek);
  const timelineMoments = profile.role === "expecting" ? pregnancyTimeline : planningMoments;
  return (
    <>
      <PageTitle eyebrow="MY JOURNEY" title="Your journey, your pace." description="A place to keep practical planning moments together. The list is yours to adapt." />
      {profile.role === "expecting" && profile.pregnancyWeek && (
        <div className="journey-progress-panel">
          <div className="journey-progress-copy"><span className="eyebrow">A PERSONAL NOTE</span><strong>Week {profile.pregnancyWeek}</strong><p>This is the week you entered. MamaCare doesn’t assess pregnancy or recommend a care schedule.</p></div>
          <div className="week-ring"><span>{profile.pregnancyWeek}<small>weeks</small></span></div>
        </div>
      )}
      <div className="journey-columns">
        <Panel className="checklist-panel">
          <SectionTitle title="Birth-preparedness checklist" extra={<span className="count-chip">{doneCount}/{planningSteps.length} done</span>} />
          <p className="panel-intro">Simple organizational steps. Your care team can answer healthcare questions.</p>
          <div className="checklist-items">
            {planningSteps.map((text, index) => {
              const checked = Boolean(profile.birthChecklist & (1 << index));
              return <label className={`checklist-item ${checked ? "checked" : ""}`} key={text}>
                <input type="checkbox" checked={checked} onChange={event => onToggleChecklist(index, event.target.checked)} />
                <span className="check-custom">{checked && <Check size={13} />}</span>
                <span>{text}</span>
              </label>;
            })}
          </div>
          <button className="button button-outline button-small" onClick={() => onNavigate("/birth-plan")}>Open your birth plan <ArrowRight size={15} /></button>
        </Panel>
        <Panel className="timeline-panel">
          <SectionTitle title={profile.role === "expecting" ? "Pregnancy planning timeline" : "Planning moments"} />
          <div className="planning-timeline">
            {timelineMoments.map((item, index) => {
              const isCurrent = profile.role === "expecting" && index === currentStageIndex;
              return <article className={`timeline-moment ${isCurrent ? "timeline-moment-current" : ""}`} key={item.title} aria-current={isCurrent ? "step" : undefined}>
                <div className="timeline-marker">{isCurrent ? <Circle size={10} fill="currentColor" /> : <span />}</div>
                <div><span className="moment-tag">{item.tag}{isCurrent ? " · your entered week" : ""}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>;
            })}
          </div>
          {profile.role === "expecting" && <p className="timeline-note">Timing and care needs vary. These are general organization prompts, not clinical milestones or a care schedule. Ask a healthcare professional about personal care questions.</p>}
        </Panel>
      </div>
    </>
  );
}

export function AppointmentsView({
  appointments,
  onAdd,
  onToggle,
  onDelete,
}: {
  appointments: AppointmentData[];
  onAdd: (input: AppointmentInput) => void;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [facility, setFacility] = useState("");
  const sorted = [...appointments].sort((a, b) => a.appointmentDate.localeCompare(b.appointmentDate));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !appointmentDate) return;
    onAdd({ title: title.trim(), appointmentDate, facility: facility.trim() || undefined });
    setTitle(""); setAppointmentDate(""); setFacility(""); setShowForm(false);
  };
  return (
    <>
      <PageTitle eyebrow="APPOINTMENTS" title="Keep your dates close." description="Save the appointments and reminders you want to be able to find again." action={<button className="button button-primary" onClick={() => setShowForm(value => !value)}><Plus size={16} /> Add appointment</button>} />
      {showForm && <Panel className="form-panel"><SectionTitle title="Add an appointment" /><form className="form-grid" onSubmit={submit}>
        <TextField label="What would you like to remember?" required maxLength={140} value={title} onChange={event => setTitle(event.target.value)} placeholder="e.g. Clinic visit" />
        <TextField label="Date and time" type="datetime-local" required value={appointmentDate} onChange={event => setAppointmentDate(event.target.value)} />
        <TextField label="Facility or place (optional)" maxLength={180} value={facility} onChange={event => setFacility(event.target.value)} placeholder="Add a place if helpful" />
        <div className="form-actions"><button className="button button-primary" type="submit">Save appointment</button><button className="button button-quiet" type="button" onClick={() => setShowForm(false)}>Cancel</button></div>
      </form></Panel>}
      <Panel className="appointments-list-panel"><SectionTitle title="Your appointments" extra={<span className="count-chip">{appointments.length} saved</span>} />
        {sorted.length ? <div className="appointment-list">{sorted.map(item => <article className={`appointment-row ${item.completed ? "completed" : ""}`} key={item.id}>
          <button className={`appointment-check ${item.completed ? "is-done" : ""}`} aria-label={item.completed ? "Mark incomplete" : "Mark complete"} onClick={() => onToggle(item.id, !item.completed)}>{item.completed && <Check size={14} />}</button>
          <div className="appointment-row-date"><strong>{displayDate(item.appointmentDate)}</strong><span>{new Date(item.appointmentDate).toLocaleTimeString("en-ZA", { hour: "numeric", minute: "2-digit" })}</span></div>
          <div className="appointment-row-info"><strong>{item.title}</strong><small>{item.facility || "Place not added"}</small></div>
          <button className="icon-button delete-button" aria-label={`Delete ${item.title}`} onClick={() => onDelete(item.id)}><Trash2 size={16} /></button>
        </article>)}</div> : <EmptyNote title="Your calendar is clear" >When you have an appointment to remember, add it here.</EmptyNote>}
      </Panel>
      <p className="tiny-muted safety-caption"><ShieldCheck size={14} /> Appointment notes are private to your account and are not sent to a healthcare facility.</p>
    </>
  );
}

export function FacilitiesView() {
  const [query, setQuery] = useState("");
  const filtered = provinces.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <>
      <PageTitle eyebrow="HEALTHCARE FINDER" title="Find a place to ask." description="Browse an independent public-facility directory by province. Contact a facility to confirm current services before you travel." />
      <Panel className="finder-intro"><div className="finder-icon"><MapPin size={24} /></div><div><h2>Start with your province</h2><p>MamaCare links to Clinic Finder SA, an independent directory of public clinics and hospitals. Its listings may change; check details directly with the facility.</p></div><a className="button button-primary" href="https://clinicfinder.co.za/search" target="_blank" rel="noreferrer">Open full directory <ExternalLink size={15} /></a></Panel>
      <Panel className="province-panel"><SectionTitle title="Browse by province" extra={<span className="directory-tag"><span /> Independent directory</span>} />
        <label className="search-field"><MapPin size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter provinces" aria-label="Filter provinces" /></label>
        <div className="province-grid">{filtered.map(item => <a className="province-card" href={`https://clinicfinder.co.za/clinics/${item.slug}`} target="_blank" rel="noreferrer" key={item.slug}>
          <div className="province-mark"><MapPin size={17} /></div><span><strong>{item.name}</strong><small>Browse public facilities</small></span><ArrowRight size={16} />
        </a>)}</div>
        {filtered.length === 0 && <EmptyNote title="No province found" >Try a different spelling or clear the search.</EmptyNote>}
        <p className="directory-note">Clinic Finder SA says its listings are sourced from OpenStreetMap and HOTOSM and were last updated in April 2026. It is not an official government website. Service availability, stock, and hours can vary.</p>
      </Panel>
      <div className="facility-reminder"><Stethoscope size={18} /><p>For personal healthcare guidance, speak with a healthcare professional. MamaCare does not rank facilities or confirm clinical services.</p></div>
    </>
  );
}

export function BirthPlanView({ profile, onSave }: { profile: ProfileData; onSave: (input: ProfileInput) => void }) {
  const [form, setForm] = useState<ProfileInput>({
    role: profile.role,
    region: profile.region,
    pregnancyWeek: profile.pregnancyWeek,
    dueDate: profile.dueDate,
    preferredFacility: profile.preferredFacility,
    emergencyContactName: profile.emergencyContactName,
    emergencyContactPhone: profile.emergencyContactPhone,
    transportPlan: profile.transportPlan,
  });
  useEffect(() => setForm({
    role: profile.role,
    region: profile.region,
    pregnancyWeek: profile.pregnancyWeek,
    dueDate: profile.dueDate,
    preferredFacility: profile.preferredFacility,
    emergencyContactName: profile.emergencyContactName,
    emergencyContactPhone: profile.emergencyContactPhone,
    transportPlan: profile.transportPlan,
  }), [profile]);
  const update = <K extends keyof ProfileInput>(key: K, value: ProfileInput[K]) => setForm(current => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); onSave(form); };
  return (
    <>
      <PageTitle eyebrow="BIRTH PREPAREDNESS" title="A plan you can adjust." description="Keep a few practical details together. This is your plan to shape with people you trust." />
      <div className="birth-plan-layout">
        <Panel className="birth-form-panel"><SectionTitle title="Your plan" /><form className="stacked-form" onSubmit={submit}>
          <TextField label="Preferred facility (optional)" maxLength={180} value={form.preferredFacility ?? ""} onChange={event => update("preferredFacility", event.target.value || null)} placeholder="Add a name or keep deciding" />
          <div className="form-grid two-col">
            <TextField label="Emergency contact name" maxLength={120} value={form.emergencyContactName ?? ""} onChange={event => update("emergencyContactName", event.target.value || null)} placeholder="Someone you trust" />
            <TextField label="Contact number (optional)" type="tel" maxLength={40} value={form.emergencyContactPhone ?? ""} onChange={event => update("emergencyContactPhone", event.target.value || null)} placeholder="Add a number only if useful" />
          </div>
          <TextAreaField label="Transport idea" maxLength={1000} rows={4} value={form.transportPlan ?? ""} onChange={event => update("transportPlan", event.target.value || null)} placeholder="For example, who you might call or which route you want to discuss." />
          <button className="button button-primary" type="submit">Save my plan <Check size={16} /></button>
        </form></Panel>
        <div className="birth-aside">
          <Panel className="emergency-panel"><div className="emergency-mark"><Heart size={20} /></div><div className="eyebrow">SOUTH AFRICA · EMERGENCY INFORMATION</div><h2>Know who to call.</h2><p>Western Cape Government lists these numbers for emergencies. Check local arrangements where you live.</p><a href="tel:10177" className="emergency-number"><span>Ambulance</span><strong>10177</strong><ArrowRight size={15} /></a><a href="tel:112" className="emergency-number"><span>Cellphone emergency</span><strong>112</strong><ArrowRight size={15} /></a><a className="source-link" href="https://www.westerncape.gov.za/know-who-you-can-call-emergency" target="_blank" rel="noreferrer">See government source <ExternalLink size={13} /></a></Panel>
          <div className="private-note"><ShieldCheck size={17} /><span>Your contact and transport details are saved privately to your account.</span></div>
        </div>
      </div>
    </>
  );
}

export function EssentialsView({
  essentials,
  onAdd,
  onToggle,
  onDelete,
}: {
  essentials: EssentialData[];
  onAdd: (input: EssentialInput) => void;
  onToggle: (id: number, packed: boolean) => void;
  onDelete: (id: number) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("Baby");
  const [estimatedCost, setEstimatedCost] = useState("");
  const total = essentials.reduce((sum, item) => sum + item.estimatedCost, 0);
  const packed = essentials.filter(item => item.packed).length;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!label.trim()) return;
    onAdd({ label: label.trim(), category, estimatedCost: Number(estimatedCost || 0) });
    setLabel(""); setEstimatedCost(""); setShowForm(false);
  };
  const groups = useMemo(() => Array.from(new Set(essentials.map(item => item.category))), [essentials]);
  return (
    <>
      <PageTitle eyebrow="ESSENTIALS PLANNER" title="Small things, made easier." description="Gather ideas, rough costs, and the details you want to keep track of. Your list can change as you need." action={<button className="button button-primary" onClick={() => setShowForm(value => !value)}><Plus size={16} /> Add an item</button>} />
      <div className="essentials-summary-grid"><Panel className="budget-card"><span className="eyebrow">ESTIMATED TOTAL</span><strong>{money(total)}</strong><p>Your own planning estimate, not a price quote.</p></Panel><Panel className="budget-card budget-card-soft"><span className="eyebrow">ITEMS CHECKED OFF</span><strong>{packed}<small> / {essentials.length}</small></strong><div className="progress-track clay-track"><span style={{ width: essentials.length ? `${Math.round((packed / essentials.length) * 100)}%` : "0%" }} /></div></Panel></div>
      {showForm && <Panel className="form-panel"><SectionTitle title="Add to your list" /><form className="form-grid" onSubmit={submit}>
        <TextField label="Item or reminder" required maxLength={140} value={label} onChange={event => setLabel(event.target.value)} placeholder="e.g. Pack a small blanket" />
        <label className="field-label"><span>Category</span><select className="field-input" value={category} onChange={event => setCategory(event.target.value)}><option>Baby</option><option>Parent</option><option>Planning</option><option>Home</option></select></label>
        <TextField label="Estimated cost in rand (optional)" type="number" min={0} max={1000000} step={1} value={estimatedCost} onChange={event => setEstimatedCost(event.target.value)} placeholder="0" />
        <div className="form-actions"><button className="button button-primary" type="submit">Add to list</button><button className="button button-quiet" type="button" onClick={() => setShowForm(false)}>Cancel</button></div>
      </form></Panel>}
      <Panel className="essentials-list-panel"><SectionTitle title="Your list" extra={<span className="count-chip">{essentials.length} items</span>} />
        {essentials.length ? groups.map(group => <div className="essential-group" key={group}><h3>{group}</h3>{essentials.filter(item => item.category === group).map(item => <div className={`essential-row ${item.packed ? "packed" : ""}`} key={item.id}>
          <label className="essential-main"><input type="checkbox" checked={item.packed} onChange={event => onToggle(item.id, event.target.checked)} /><span className="check-custom">{item.packed && <Check size={13} />}</span><span className="essential-name">{item.label}</span></label><span className="essential-cost">{money(item.estimatedCost)}</span><button className="icon-button delete-button" aria-label={`Remove ${item.label}`} onClick={() => onDelete(item.id)}><Trash2 size={15} /></button>
        </div>)}</div>) : <EmptyNote title="Your list starts here" >Add an item and, if you want, a rough cost in rand.</EmptyNote>}
      </Panel>
      <p className="tiny-muted safety-caption"><ShieldCheck size={14} /> Estimates are for your own planning; prices may change. No purchase is needed to use MamaCare.</p>
    </>
  );
}

export function ChildrenView({
  children,
  milestones,
  onNavigate,
  onAddChild,
  onDeleteChild,
  onAddMilestone,
  onDeleteMilestone,
}: {
  children: ChildData[];
  milestones: MilestoneData[];
  onAddChild: (input: ChildInput) => void;
  onDeleteChild: (id: number) => void;
  onAddMilestone: (input: MilestoneInput) => void;
  onDeleteMilestone: (id: number) => void;
  onNavigate: (href: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [activeChild, setActiveChild] = useState<number | null>(null);
  const [moment, setMoment] = useState("");
  const [momentDate, setMomentDate] = useState("");
  const submitChild = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    onAddChild({ name: name.trim(), birthDate: birthDate || undefined });
    setName(""); setBirthDate(""); setShowForm(false);
  };
  const submitMoment = (event: FormEvent, childId: number) => {
    event.preventDefault();
    if (!moment.trim()) return;
    onAddMilestone({ childId, title: moment.trim(), milestoneDate: momentDate || undefined });
    setMoment(""); setMomentDate(""); setActiveChild(null);
  };
  return (
    <>
      <PageTitle eyebrow="CHILD PROFILES" title="Keep the moments that matter." description="Create a simple profile and record general developmental milestones or family moments you want to remember. These notes are not an assessment." action={<button className="button button-primary" onClick={() => setShowForm(value => !value)}><Plus size={16} /> Add child profile</button>} />
      {showForm && <Panel className="form-panel"><SectionTitle title="A new profile" /><form className="form-grid" onSubmit={submitChild}><TextField label="Name or nickname" required maxLength={100} value={name} onChange={event => setName(event.target.value)} placeholder="Use a nickname if you prefer" /><TextField label="Date of birth (optional)" type="date" value={birthDate} onChange={event => setBirthDate(event.target.value)} /><div className="form-actions"><button className="button button-primary" type="submit">Save profile</button><button className="button button-quiet" type="button" onClick={() => setShowForm(false)}>Cancel</button></div></form></Panel>}
      {children.length ? <div className="child-grid">{children.map(child => <Panel className="child-card" key={child.id}>
        <div className="child-card-top"><div className="child-avatar"><Baby size={23} /></div><button className="icon-button delete-button" aria-label={`Delete profile ${child.name}`} onClick={() => onDeleteChild(child.id)}><Trash2 size={15} /></button></div>
        <h2>{child.name}</h2><p className="child-dob">{child.birthDate ? `Born ${displayDate(child.birthDate)}` : "Date not added"}</p>
        <div className="child-milestones-heading"><span>Developmental milestones &amp; moments</span><button className="text-link" onClick={() => setActiveChild(activeChild === child.id ? null : child.id)}><Plus size={13} /> Add milestone</button></div>
        {activeChild === child.id && <form className="milestone-form" onSubmit={event => submitMoment(event, child.id)}><TextField label="Milestone or moment" required maxLength={140} value={moment} onChange={event => setMoment(event.target.value)} placeholder="A new sound, first steps, favourite game…" /><TextField label="Date (optional)" type="date" value={momentDate} onChange={event => setMomentDate(event.target.value)} /><button className="button button-primary button-small" type="submit">Save milestone</button></form>}
        <div className="child-milestones">{milestones.filter(item => item.childId === child.id).map(item => <div className="child-milestone" key={item.id}><span className="milestone-dot" /><span><strong>{item.title}</strong><small>{item.milestoneDate ? displayDate(item.milestoneDate) : "Date not added"}</small></span><button className="icon-button delete-button" aria-label={`Remove milestone ${item.title}`} onClick={() => onDeleteMilestone(item.id)}><Trash2 size={13} /></button></div>)}</div>
        <div className="child-card-foot"><ShieldCheck size={14} /> Private to your account</div>
      </Panel>)}</div> : <Panel><EmptyNote title="No child profiles yet" >Add a name or nickname and keep family moments in one place.</EmptyNote></Panel>}
      <div className="child-resources"><Baby size={19} /><p>For general child-development information and age-based milestone articles, visit <a className="inline-link" href="https://www.unicef.org/southafrica/unicef-parenting/child-development" target="_blank" rel="noreferrer">UNICEF South Africa <ExternalLink size={12} /></a>. For personal health or development concerns, speak with a qualified healthcare professional. More public information is in the <button className="inline-link" onClick={() => onNavigate("/support")}>Support Centre</button>.</p></div>
    </>
  );
}

export function SupportView({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageTitle eyebrow="SUPPORT CENTRE" title="Trusted places to turn." description="Start with public information and directory links. For personal questions, speak with a healthcare professional." />
      <div className="support-grid">
        <Panel className="support-card support-card-featured"><div className="support-icon support-icon-green"><Heart size={20} /></div><div className="eyebrow">MATERNAL HEALTH</div><h2>Care through pregnancy and beyond</h2><p>General information from the World Health Organization’s African Region.</p><a href="https://www.afro.who.int/health-topics/maternal-health" target="_blank" rel="noreferrer" className="text-link">Read WHO Africa information <ExternalLink size={14} /></a></Panel>
        <Panel className="support-card"><div className="support-icon support-icon-clay"><Stethoscope size={20} /></div><div className="eyebrow">PUBLIC HEALTH</div><h2>South Africa Department of Health</h2><p>Visit the national department site for public-health information and service links.</p><a href="https://www.health.gov.za/" target="_blank" rel="noreferrer" className="text-link">Open health.gov.za <ExternalLink size={14} /></a></Panel>
        <Panel className="support-card"><div className="support-icon support-icon-gold"><MapPin size={20} /></div><div className="eyebrow">FIND A FACILITY</div><h2>Public clinics and hospitals</h2><p>Browse a directory by province. Listing details and service availability can change.</p><button className="text-link" onClick={() => onNavigate("/facilities")}>Open Healthcare Finder <ArrowRight size={14} /></button></Panel>
        <Panel className="support-card"><div className="support-icon support-icon-green"><Sparkles size={20} /></div><div className="eyebrow">PRACTICAL GUIDES</div><h2>Free maternity care guide</h2><p>An independent directory's plain-language guide to maternity services in the public system.</p><a href="https://clinicfinder.co.za/guides/free-maternity-care" target="_blank" rel="noreferrer" className="text-link">Read the guide <ExternalLink size={14} /></a></Panel>
        <Panel className="support-card"><div className="support-icon support-icon-gold"><Baby size={20} /></div><div className="eyebrow">CHILD DEVELOPMENT</div><h2>Growing through early childhood</h2><p>Age-based milestone topics and general parent guidance from UNICEF South Africa.</p><a href="https://www.unicef.org/southafrica/unicef-parenting/child-development" target="_blank" rel="noreferrer" className="text-link">Browse child-development resources <ExternalLink size={14} /></a></Panel>
      </div>
      <Panel className="support-emergency"><div className="support-emergency-icon"><Heart size={19} /></div><div><span className="eyebrow">IF YOU NEED EMERGENCY HELP</span><h2>Contact emergency services directly.</h2><p>Western Cape Government lists 10177 for ambulance and 112 for cellphone emergencies. Check local arrangements and use the appropriate local service.</p><div className="emergency-inline"><a href="tel:10177"><span>Ambulance</span><strong>10177</strong></a><a href="tel:112"><span>Cellphone</span><strong>112</strong></a></div><a className="source-link" href="https://www.westerncape.gov.za/know-who-you-can-call-emergency" target="_blank" rel="noreferrer">Government source and call guidance <ExternalLink size={13} /></a></div></Panel>
      <div className="support-bottom-note"><ShieldCheck size={15} /><span>External organizations maintain these resources. MamaCare is not affiliated with them and cannot verify changing availability or provide emergency response.</span></div>
    </>
  );
}
