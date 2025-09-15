"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumb from "@/components/breadcrumb/DynamicBreadcrumb";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar /> {/* Sidebar is persistent */}

        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </header>

          {/* Main content */}
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>

      {/* Toast notifications */}
      <Toaster richColors closeButton />
    </SidebarProvider>
  );
}
