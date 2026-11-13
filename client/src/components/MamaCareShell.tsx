import type { ReactNode } from "react";
import { useLocation } from "wouter";
import {
  Baby,
  CalendarDays,
  Heart,
  House,
  ListChecks,
  LogOut,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import BrandMark from "./BrandMark";

const navItems = [
  { href: "/", label: "Overview", icon: House },
  { href: "/journey", label: "My journey", icon: Sprout },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/facilities", label: "Find care", icon: MapPin },
  { href: "/birth-plan", label: "Birth plan", icon: Heart },
  { href: "/essentials", label: "Essentials", icon: ListChecks },
  { href: "/children", label: "Children", icon: Baby },
  { href: "/support", label: "Support", icon: Sparkles },
];

export default function MamaCareShell({
  children,
  userName,
  isDemo,
  onLogout,
  onExitDemo,
}: {
  children: ReactNode;
  userName: string;
  isDemo: boolean;
  onLogout: () => void;
  onExitDemo: () => void;
}) {
  const [location, setLocation] = useLocation();
  const navigate = (href: string) => setLocation(href);
  const current = location === "/" ? "/" : `/${location.split("/")[1]}`;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand-lockup" onClick={() => navigate("/")} aria-label="MamaCare home">
          <BrandMark size={38} />
          <span className="brand-name">mama<span>care</span></span>
        </button>
        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon }) => (
            <button
              key={href}
              className={`nav-link ${current === href ? "active" : ""}`}
              onClick={() => navigate(href)}
              aria-current={current === href ? "page" : undefined}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <div className="sidebar-note-icon"><ShieldCheck size={17} /></div>
          <p>Your plans are yours. Keep only what feels useful.</p>
        </div>
        <div className="sidebar-account">
          <div className="avatar-mark">{userName.trim().charAt(0).toUpperCase() || "M"}</div>
          <div className="account-copy">
            <strong>{isDemo ? "Demo space" : userName}</strong>
            <span>{isDemo ? "Fictional sample data" : "Private account"}</span>
          </div>
          <button
            className="icon-button quiet-icon"
            onClick={isDemo ? onExitDemo : onLogout}
            aria-label={isDemo ? "Exit demo" : "Sign out"}
            title={isDemo ? "Exit demo" : "Sign out"}
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand">
            <BrandMark size={32} />
            <span className="brand-name">mama<span>care</span></span>
          </div>
          <div className="topbar-context">
            <span className="topbar-eyebrow">A little space for your next step</span>
          </div>
          <div className="topbar-right">
            {isDemo && <span className="demo-pill"><Sparkles size={13} /> Demo mode</span>}
            <div className="topbar-avatar">{userName.trim().charAt(0).toUpperCase() || "M"}</div>
          </div>
        </header>

        {isDemo && (
          <div className="demo-banner" role="status">
            <Sparkles size={15} />
            <span>You're exploring with fictional sample information. Changes stay in this browser session.</span>
            <button onClick={onExitDemo}>Exit demo</button>
          </div>
        )}

        <main className="workspace-main">{children}</main>

        <footer className="app-footer">
          <Heart size={14} />
          <span>MamaCare helps organize your plans. It is not medical advice or emergency care.</span>
        </footer>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => (
            <button
              key={href}
              className={`mobile-nav-item ${current === href ? "active" : ""}`}
              onClick={() => navigate(href)}
              aria-label={label}
              aria-current={current === href ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{label === "Appointments" ? "Visits" : label === "Find care" ? "Care" : label === "My journey" ? "Journey" : label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
