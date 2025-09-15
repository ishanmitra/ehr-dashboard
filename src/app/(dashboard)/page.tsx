"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Card from "@/components/Card"; // assuming your Card component is here

export default function Page() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    payments: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [patientsRes, appointmentsRes, paymentsRes] = await Promise.all([
        axiosClient.get("/api/patients"),
        axiosClient.get("/api/appointments"),
        axiosClient.get("/api/patient_payments"),
      ]);

      setStats({
        patients: patientsRes.data.length,
        appointments: appointmentsRes.data.length,
        payments: paymentsRes.data.length,
      });
    }
    fetchStats();
  }, []);

  return (
    <>
      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Stats cards row */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Link href="/patients">
            <Card title="Patients" value={stats.patients} />
          </Link>
          <Link href="/appointments">
            <Card title="Appointments" value={stats.appointments} />
          </Link>
          <Link href="/payments">
            <Card title="Payments" value={stats.payments} />
          </Link>
        </div>

        {/* Placeholder content / additional sections */}
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
  );
}
