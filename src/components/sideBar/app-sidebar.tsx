"use client"

import * as React from "react"
import {
  LayoutDashboard,
  BookCheck,
  ShoppingBasket,
  BookOpenText,
  PhoneCall,
  HomeIcon,
  ImageIcon,
  BookHeart,
  LayoutDashboardIcon,
} from "lucide-react"

import { NavMain } from "./nav-main"
// import { WebName } from '@/components/web-name';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { WebName } from "./web-name"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  user: {
    name: "Thu Hien",
    email: "thuhien@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: {
    name: "E-learning",
    logo: BookCheck,
    description: "Chạm đến thành công",
  },

  navMain: [
    {
      title: "Thông tin cửa hàng",
      url: "/cau-hinh/thong-tin-cua-hang",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Sản phẩm",
      url: "/cau-hinh/san-pham",
      icon: ShoppingBasket,
    },
    {
      title: "Banner",
      url: "/cau-hinh/banner",
      icon: ImageIcon,
    },
    {
      title: "Thông tin phụ",
      url: "/cau-hinh/thong-tin-phu",
      icon: LayoutDashboard,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-White h-[64px] w-full">
        <WebName teams={data.teams} />
      </SidebarHeader>{" "}
      <SidebarContent className="bg-White">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-White">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
