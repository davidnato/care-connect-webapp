
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  FileText,
  Pill,
  ClipboardList,
  Settings,
  BellRing,
  User,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const links = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
      show: true,
    },
    {
      title: "Patients",
      icon: <Users className="h-5 w-5" />,
      href: "/patients",
      show: user?.role === "admin" || user?.role === "doctor",
    },
    {
      title: "Appointments",
      icon: <CalendarClock className="h-5 w-5" />,
      href: "/appointments",
      show: true,
    },
    {
      title: "Medical Records",
      icon: <FileText className="h-5 w-5" />,
      href: "/records",
      show: true,
    },
    {
      title: "Medications",
      icon: <Pill className="h-5 w-5" />,
      href: "/medications",
      show: true,
    },
    {
      title: "Lab Results",
      icon: <ClipboardList className="h-5 w-5" />,
      href: "/lab-results",
      show: true,
    },
    {
      title: "Profile",
      icon: <User className="h-5 w-5" />,
      href: "/profile",
      show: true,
    },
    {
      title: "Notifications",
      icon: <BellRing className="h-5 w-5" />,
      href: "/notifications",
      show: true,
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
      show: true,
    },
  ];

  return (
    <div className={cn("pb-12 h-full flex flex-col", className)} {...props}>
      <div className="py-4 space-y-4 flex-1">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold tracking-tight mb-2">MediRecord</h2>
          <p className="text-sm text-muted-foreground">Health Records Management</p>
        </div>
        <div className="px-3">
          {links
            .filter((link) => link.show)
            .map((link) => (
              <Button
                key={link.href}
                variant={isActive(link.href) ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start mb-1",
                  isActive(link.href) && "bg-secondary text-secondary-foreground font-medium"
                )}
                onClick={() => navigate(link.href)}
              >
                {link.icon}
                <span className="ml-2">{link.title}</span>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
