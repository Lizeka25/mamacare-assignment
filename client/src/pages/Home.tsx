import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ArrowRight, Heart, LoaderCircle } from "lucide-react";
import MamaCareShell from "@/components/MamaCareShell";
import {
  AppointmentsView,
  BirthPlanView,
  ChildrenView,
  DashboardView,
  EssentialsView,
  FacilitiesView,
  JourneyView,
  LandingView,
  OnboardingView,
  SupportView,
  type AppointmentInput,
  type ChildInput,
  type EssentialInput,
  type MilestoneInput,
  type ProfileInput,
} from "@/components/WorkspaceViews";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  DEMO_APPOINTMENTS,
  DEMO_CHILDREN,
  DEMO_ESSENTIALS,
  DEMO_MILESTONES,
  DEMO_PROFILE,
  type AppointmentData,
  type ChildData,
  type EssentialData,
  type MilestoneData,
  type ProfileData,
} from "@/lib/demoData";

const pageTitles: Record<string, string> = {
  "/": "Your space",
  "/onboarding": "Set up your space",
  "/journey": "My Journey",
  "/appointments": "Appointments",
  "/facilities": "Healthcare Finder",
  "/birth-plan": "Birth Preparedness",
  "/essentials": "Essentials Planner",
  "/children": "Child Profiles",
  "/support": "Support Centre",
};

export default function Home() {
  const [pathname, setLocation] = useLocation();
  const auth = useAuth();
  const utils = trpc.useUtils();
  const isAuthenticated = auth.isAuthenticated && Boolean(auth.user);
  const [demoMode, setDemoMode] = useState(() => {
    try { return window.sessionStorage.getItem("mamcare-demo") === "1"; } catch { return false; }
  });
  const [demoProfile, setDemoProfile] = useState<ProfileData>({ ...DEMO_PROFILE });
  const [demoAppointments, setDemoAppointments] = useState<AppointmentData[]>(DEMO_APPOINTMENTS.map(item => ({ ...item })));
  const [demoEssentials, setDemoEssentials] = useState<EssentialData[]>(DEMO_ESSENTIALS.map(item => ({ ...item })));
  const [demoChildren, setDemoChildren] = useState<ChildData[]>(DEMO_CHILDREN.map(item => ({ ...item })));
  const [demoMilestones, setDemoMilestones] = useState<MilestoneData[]>(DEMO_MILESTONES.map(item => ({ ...item })));
  const isDemo = demoMode && !isAuthenticated;

  const profileQuery = trpc.care.profile.get.useQuery(undefined, { enabled: isAuthenticated, retry: false });
  const appointmentQuery = trpc.care.appointments.list.useQuery(undefined, { enabled: isAuthenticated, retry: false });
  const essentialQuery = trpc.care.essentials.list.useQuery(undefined, { enabled: isAuthenticated, retry: false });
  const childQuery = trpc.care.children.list.useQuery(undefined, { enabled: isAuthenticated, retry: false });
  const milestoneQuery = trpc.care.children.milestones.useQuery(undefined, { enabled: isAuthenticated, retry: false });

  useEffect(() => {
    document.title = `${pageTitles[pathname] ?? "MamaCare"} · MamaCare`;
  }, [pathname]);

  useEffect(() => {
    if (!isAuthenticated || profileQuery.isLoading) return;
    if (!profileQuery.data && pathname !== "/onboarding") setLocation("/onboarding");
    if (profileQuery.data && pathname === "/onboarding") setLocation("/");
  }, [isAuthenticated, profileQuery.data, profileQuery.isLoading, pathname, setLocation]);

  const saveProfileMutation = trpc.care.profile.save.useMutation({
    onSuccess: async () => {
      await utils.care.profile.get.invalidate();
      toast.success("Your details are saved privately.");
      if (pathname === "/onboarding") setLocation("/");
    },
    onError: error => toast.error(error.message || "Could not save your details."),
  });
  const checklistMutation = trpc.care.profile.setChecklistStep.useMutation({
    onSuccess: () => utils.care.profile.get.invalidate(),
    onError: error => toast.error(error.message || "Could not update your checklist."),
  });
  const appointmentCreate = trpc.care.appointments.create.useMutation({
    onSuccess: async () => { await utils.care.appointments.list.invalidate(); toast.success("Appointment added."); },
    onError: error => toast.error(error.message || "Could not add the appointment."),
  });
  const appointmentToggle = trpc.care.appointments.setCompleted.useMutation({
    onSuccess: () => utils.care.appointments.list.invalidate(),
    onError: error => toast.error(error.message || "Could not update the appointment."),
  });
  const appointmentRemove = trpc.care.appointments.remove.useMutation({
    onSuccess: async () => { await utils.care.appointments.list.invalidate(); toast.success("Appointment removed."); },
    onError: error => toast.error(error.message || "Could not remove the appointment."),
  });
  const essentialCreate = trpc.care.essentials.create.useMutation({
    onSuccess: async () => { await utils.care.essentials.list.invalidate(); toast.success("Added to your list."); },
    onError: error => toast.error(error.message || "Could not add the item."),
  });
  const essentialToggle = trpc.care.essentials.setPacked.useMutation({
    onSuccess: () => utils.care.essentials.list.invalidate(),
    onError: error => toast.error(error.message || "Could not update the item."),
  });
  const essentialRemove = trpc.care.essentials.remove.useMutation({
    onSuccess: async () => { await utils.care.essentials.list.invalidate(); toast.success("Item removed."); },
    onError: error => toast.error(error.message || "Could not remove the item."),
  });
  const childCreate = trpc.care.children.create.useMutation({
    onSuccess: async () => { await utils.care.children.list.invalidate(); toast.success("Child profile added."); },
    onError: error => toast.error(error.message || "Could not add the profile."),
  });
  const childRemove = trpc.care.children.remove.useMutation({
    onSuccess: async () => { await Promise.all([utils.care.children.list.invalidate(), utils.care.children.milestones.invalidate()]); toast.success("Profile removed."); },
    onError: error => toast.error(error.message || "Could not remove the profile."),
  });
  const milestoneCreate = trpc.care.children.addMilestone.useMutation({
    onSuccess: async () => { await utils.care.children.milestones.invalidate(); toast.success("Moment saved."); },
    onError: error => toast.error(error.message || "Could not save the moment."),
  });
  const milestoneRemove = trpc.care.children.removeMilestone.useMutation({
    onSuccess: async () => { await utils.care.children.milestones.invalidate(); toast.success("Moment removed."); },
    onError: error => toast.error(error.message || "Could not remove the moment."),
  });

  const startDemo = () => {
    try { window.sessionStorage.setItem("mamcare-demo", "1"); } catch {}
    setDemoMode(true);
    setLocation("/");
  };
  const exitDemo = () => {
    try { window.sessionStorage.removeItem("mamcare-demo"); } catch {}
    setDemoMode(false);
    setLocation("/");
  };
  const login = () => {
    try { startLogin(); }
    catch { toast.error("Sign-in is not available right now. Please try again later."); }
  };
  const logout = async () => {
    try { await auth.logout(); setLocation("/"); }
    catch { toast.error("Could not sign out. Please try again."); }
  };

  const profile: ProfileData = isDemo
    ? demoProfile
    : (profileQuery.data as ProfileData | null | undefined) ?? { ...DEMO_PROFILE, pregnancyWeek: null, dueDate: null, birthChecklist: 0 };
  const appointments: AppointmentData[] = isDemo ? demoAppointments : (appointmentQuery.data as AppointmentData[] | undefined) ?? [];
  const essentials: EssentialData[] = isDemo ? demoEssentials : (essentialQuery.data as EssentialData[] | undefined) ?? [];
  const children: ChildData[] = isDemo ? demoChildren : (childQuery.data as ChildData[] | undefined) ?? [];
  const milestones: MilestoneData[] = isDemo ? demoMilestones : (milestoneQuery.data as MilestoneData[] | undefined) ?? [];

  const saveProfile = (input: ProfileInput) => {
    if (isDemo) {
      setDemoProfile(current => ({ ...current, ...input }));
      toast.success("Demo details updated for this session.");
      if (pathname === "/onboarding") setLocation("/");
      return;
    }
    saveProfileMutation.mutate(input);
  };
  const toggleChecklist = (step: number, completed: boolean) => {
    if (isDemo) {
      setDemoProfile(current => ({ ...current, birthChecklist: completed ? current.birthChecklist | (1 << step) : current.birthChecklist & ~(1 << step) }));
      return;
    }
    checklistMutation.mutate({ step, completed });
  };
  const addAppointment = (input: AppointmentInput) => {
    if (isDemo) {
      setDemoAppointments(current => [...current, { ...input, id: -Date.now(), facility: input.facility || null, completed: false }]);
      toast.success("Added to this demo session.");
      return;
    }
    appointmentCreate.mutate(input);
  };
  const toggleAppointment = (id: number, completed: boolean) => {
    if (isDemo) { setDemoAppointments(current => current.map(item => item.id === id ? { ...item, completed } : item)); return; }
    appointmentToggle.mutate({ id, completed });
  };
  const deleteAppointment = (id: number) => {
    if (isDemo) { setDemoAppointments(current => current.filter(item => item.id !== id)); return; }
    appointmentRemove.mutate({ id });
  };
  const addEssential = (input: EssentialInput) => {
    if (isDemo) {
      setDemoEssentials(current => [...current, { ...input, id: -Date.now(), packed: false }]);
      toast.success("Added to this demo session.");
      return;
    }
    essentialCreate.mutate(input);
  };
  const toggleEssential = (id: number, packed: boolean) => {
    if (isDemo) { setDemoEssentials(current => current.map(item => item.id === id ? { ...item, packed } : item)); return; }
    essentialToggle.mutate({ id, packed });
  };
  const deleteEssential = (id: number) => {
    if (isDemo) { setDemoEssentials(current => current.filter(item => item.id !== id)); return; }
    essentialRemove.mutate({ id });
  };
  const addChild = (input: ChildInput) => {
    if (isDemo) {
      setDemoChildren(current => [...current, { ...input, id: -Date.now(), birthDate: input.birthDate || null }]);
      toast.success("Added to this demo session.");
      return;
    }
    childCreate.mutate(input);
  };
  const deleteChild = (id: number) => {
    if (isDemo) {
      setDemoChildren(current => current.filter(item => item.id !== id));
      setDemoMilestones(current => current.filter(item => item.childId !== id));
      return;
    }
    childRemove.mutate({ id });
  };
  const addMilestone = (input: MilestoneInput) => {
    if (isDemo) {
      setDemoMilestones(current => [...current, { ...input, id: -Date.now(), milestoneDate: input.milestoneDate || null }]);
      toast.success("Moment added to this demo session.");
      return;
    }
    milestoneCreate.mutate(input);
  };
  const deleteMilestone = (id: number) => {
    if (isDemo) { setDemoMilestones(current => current.filter(item => item.id !== id)); return; }
    milestoneRemove.mutate({ id });
  };

  if (auth.loading) {
    return <div className="loading-screen"><div className="loading-brand"><Heart size={19} fill="currentColor" /></div><LoaderCircle size={24} className="loading-spin" /><span>Making a little space…</span></div>;
  }
  if (!isAuthenticated && !isDemo) return <LandingView onLogin={login} onDemo={startDemo} />;
  if (isAuthenticated && profileQuery.isLoading) {
    return <div className="loading-screen"><div className="loading-brand"><Heart size={19} fill="currentColor" /></div><LoaderCircle size={24} className="loading-spin" /><span>Loading your private space…</span></div>;
  }

  if (pathname === "/onboarding" && !isDemo && (!isAuthenticated || profileQuery.data)) return null;
  if (pathname === "/onboarding" && !profileQuery.data && !isDemo) {
    return <OnboardingView displayName={auth.user?.name ?? ""} saving={saveProfileMutation.isPending} onSave={saveProfile} />;
  }

  const navigate = (href: string) => setLocation(href);
  let content;
  switch (pathname) {
    case "/":
      content = <DashboardView displayName={isDemo ? "Demo family" : auth.user?.name ?? "Your family"} profile={profile} appointments={appointments} essentials={essentials} children={children} isDemo={isDemo} onNavigate={navigate} onToggleAppointment={toggleAppointment} />;
      break;
    case "/journey":
      content = <JourneyView profile={profile} onToggleChecklist={toggleChecklist} onNavigate={navigate} />;
      break;
    case "/appointments":
      content = <AppointmentsView appointments={appointments} onAdd={addAppointment} onToggle={toggleAppointment} onDelete={deleteAppointment} />;
      break;
    case "/facilities":
      content = <FacilitiesView />;
      break;
    case "/birth-plan":
      content = <BirthPlanView profile={profile} onSave={saveProfile} />;
      break;
    case "/essentials":
      content = <EssentialsView essentials={essentials} onAdd={addEssential} onToggle={toggleEssential} onDelete={deleteEssential} />;
      break;
    case "/children":
      content = <ChildrenView children={children} milestones={milestones} onAddChild={addChild} onDeleteChild={deleteChild} onNavigate={navigate} onAddMilestone={addMilestone} onDeleteMilestone={deleteMilestone} />;
      break;
    case "/support":
      content = <SupportView onNavigate={navigate} />;
      break;
    default:
      content = <DashboardView displayName={isDemo ? "Demo family" : auth.user?.name ?? "Your family"} profile={profile} appointments={appointments} essentials={essentials} children={children} isDemo={isDemo} onNavigate={navigate} onToggleAppointment={toggleAppointment} />;
  }

  return <MamaCareShell userName={isDemo ? "Demo family" : auth.user?.name ?? "MamaCare member"} isDemo={isDemo} onLogout={logout} onExitDemo={exitDemo}>{content}</MamaCareShell>;
}
