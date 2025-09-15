"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import AppointmentTable from "./components/AppointmentTable";
import AppointmentDetail from "./components/AppointmentDetail";
import AppointmentModal from "./components/AppointmentModal";
import { Button } from "@/components/ui/button";
import { Appointment, AppointmentFormData } from "@/types/appointment";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAppointments = async () => {
    const res = await axiosClient.get<Appointment[]>("/api/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id: string | number) => {
    await axiosClient.delete(`/api/appointments/${id}`);
    setSelectedAppointment(null);
    fetchAppointments();
  };

  const handleUpdate = async (id: string | number, updatedData: AppointmentFormData) => {
    await axiosClient.put(`/api/appointments/${id}`, updatedData);
    fetchAppointments();
  };

  const handleAdd = async (newAppointmentData: AppointmentFormData) => {
    await axiosClient.post("/api/appointments", newAppointmentData);
    fetchAppointments();
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            Add Appointment
          </Button>
        </div>
        <AppointmentTable
          appointments={appointments}
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
        />
      </div>

      {selectedAppointment && (
        <AppointmentDetail
          key={selectedAppointment.id}
          appointment={selectedAppointment}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onClose={() => setSelectedAppointment(null)}
        />
      )}

      {isModalOpen && (
        <AppointmentModal
          onSubmit={handleAdd}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}