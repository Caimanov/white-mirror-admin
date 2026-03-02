import {
  Users,
  CalendarDays,
  FileText,
  Stethoscope,
  LayoutDashboard,
  Percent,
  Clock,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Панель Управління", url: "/", icon: LayoutDashboard },
  { title: "Пацієнти", url: "/patients", icon: Users },
  { title: "Записи", url: "/records", icon: CalendarDays },
  { title: "Звіти", url: "/reports", icon: FileText },
  { title: "Лікарі", url: "/doctors", icon: Stethoscope },
  { title: "Знижки", url: "/discounts", icon: Percent },
  { title: "Розклад", url: "/schedule", icon: Clock },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="flex items-center gap-3 p-4 pb-6">
        <img src={logo} alt="White Mirror" className="h-9 w-9 rounded-lg" />
        {!collapsed && (
          <div>
            <h2 className="text-sm font-bold text-sidebar-primary">White Mirror</h2>
            <p className="text-xs text-sidebar-foreground/60">Адмін-панель</p>
          </div>
        )}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <NavLink
                        to={item.url}
                        end
                        className="transition-colors"
                        activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
