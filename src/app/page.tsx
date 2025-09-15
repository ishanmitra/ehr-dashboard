'use client';

import Card from '@/components/Card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axiosClient from '@/lib/axiosClient';

export default function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, appointments: 0, payments: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [patientsRes, appointmentsRes, paymentsRes] = await Promise.all([
        axiosClient.get('/api/patients'),
        axiosClient.get('/api/appointments'),
        axiosClient.get('/api/patient_payments'),
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
    <div className="p-6 grid grid-cols-3 gap-6">
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
  );
}
