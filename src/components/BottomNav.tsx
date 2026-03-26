import { Home, Compass, Briefcase, User, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { path: "/", icon: Home, label: "Feed" },
  { path: "/map", icon: Compass, label: "Explore" },
  { path: "/trips", icon: Briefcase, label: "Trips" },
  { path: "/profile/t1", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const active =
            tab.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center gap-0.5 px-5 py-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {active && (
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary" />
              )}
              <tab.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
