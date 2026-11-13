export type CareRole = "expecting" | "mother" | "caregiver";

export type ProfileData = {
  role: CareRole;
  region: string;
  pregnancyWeek: number | null;
  dueDate: string | null;
  preferredFacility: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  transportPlan: string | null;
  birthChecklist: number;
  postpartumChecklist: number;
};

export type AppointmentData = {
  id: number;
  title: string;
  appointmentDate: string;
  facility: string | null;
  completed: boolean;
};

export type EssentialData = {
  id: number;
  label: string;
  category: string;
  estimatedCost: number;
  packed: boolean;
};

export type ChildData = {
  id: number;
  name: string;
  birthDate: string | null;
};

export type MilestoneData = {
  id: number;
  childId: number;
  title: string;
  milestoneDate: string | null;
};

// This data is fictional and lives only in React state while demo mode is open.
export const DEMO_PROFILE: ProfileData = {
  role: "expecting",
  region: "Gauteng",
  pregnancyWeek: 24,
  dueDate: "2027-03-04",
  preferredFacility: "Still deciding",
  emergencyContactName: "Support person (demo)",
  emergencyContactPhone: null,
  transportPlan: "Discuss a route with a trusted support person.",
  birthChecklist: 1,
  postpartumChecklist: 0,
};

export const DEMO_APPOINTMENTS: AppointmentData[] = [
  {
    id: -1,
    title: "Antenatal appointment (demo)",
    appointmentDate: "2026-11-25T09:30",
    facility: "Clinic in my area (demo)",
    completed: false,
  },
  {
    id: -2,
    title: "Check transport plan (demo)",
    appointmentDate: "2026-12-02T14:00",
    facility: null,
    completed: false,
  },
];

export const DEMO_ESSENTIALS: EssentialData[] = [
  { id: -1, label: "Baby blanket (demo)", category: "Baby", estimatedCost: 220, packed: false },
  { id: -2, label: "Toiletries (demo)", category: "Parent", estimatedCost: 140, packed: true },
  { id: -3, label: "Transport savings (demo)", category: "Planning", estimatedCost: 300, packed: false },
];

export const DEMO_CHILDREN: ChildData[] = [
  { id: -1, name: "Little one (demo)", birthDate: null },
];

export const DEMO_MILESTONES: MilestoneData[] = [
  { id: -1, childId: -1, title: "A favourite song to remember (demo)", milestoneDate: null },
];
