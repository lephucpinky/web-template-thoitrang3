"use client";

import { LogOut } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function NavUser({}: {}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("refresh_token_expires_in");
    router.push("/");
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="text-PersianRed data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          onClick={() => handleLogout()}
        >
          <LogOut className="rotate-180" />
          Đăng xuất
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
