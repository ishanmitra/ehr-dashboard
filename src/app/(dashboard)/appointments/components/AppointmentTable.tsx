"use client";
import React from "react";
import { Appointment } from "@/types/appointment";
import { format } from "date-fns";

interface AppointmentTableProps {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  setSelectedAppointment: (appointment: Appointment | null) => void;
}

export default function AppointmentTable({ 
  appointments, 
  selectedAppointment, 
  setSelectedAppointment 
}: AppointmentTableProps) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Doctor</th>
          <th className="border p-2">Patient ID</th>
          <th className="border p-2">Office</th>
          <th className="border p-2">Room</th>
          <th className="border p-2">Scheduled Time</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr
            key={appointment.id}
            onClick={() => setSelectedAppointment(appointment)}
            className={`cursor-pointer hover:bg-gray-100 ${
              selectedAppointment?.id === appointment.id ? "bg-gray-200" : ""
            }`}
          >
            <td className="border p-2">{appointment.id}</td>
            <td className="border p-2">{appointment.doctor}</td>
            <td className="border p-2">{appointment.patient}</td>
            <td className="border p-2">{appointment.office}</td>
            <td className="border p-2">{appointment.exam_room}</td>
            <td className="border p-2">
              {format(new Date(appointment.scheduled_time), "yyyy-MM-dd HH:mm")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}