"use client";

import * as React from "react";
import {
  ChartBarStacked,
  Flower2,
  Settings,
  LayoutDashboard,
  User,
  Banknote,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/layout/sidebar";
import { AppIcon } from "@/assets/icons";
import { SidebarItemType } from "menu-types";
import { useTranslations } from "next-intl";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  const { state } = useSidebar();

  const items: SidebarItemType = {
    navMain: [
      {
        title: t("common.dashboard"),
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: t("common.accounts"),
        url: "/accounts",
        icon: User,
      },
      {
        title: t("common.payments"),
        url: "/payments",
        icon: Banknote,
      },
      {
        title: t("common.products"),
        url: "/products",
        icon: Flower2,
      },
      {
        title: t("common.categories"),
        url: "/categories",
        icon: ChartBarStacked,
      },
      {
        title: t("common.settings"),
        url: "/settings",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppIcon className="mt-2" state={state} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items.navMain} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="flex items-center ">
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
