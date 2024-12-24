import { AppSidebar, Navbar } from "@/components/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <Navbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
