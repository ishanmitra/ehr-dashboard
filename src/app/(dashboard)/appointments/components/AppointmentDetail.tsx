"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { toast } from "sonner";

import { Appointment, AppointmentFormData } from "@/types/appointment";

interface AppointmentDetailProps {
  appointment: Appointment;
  onDelete: (id: string | number) => Promise<void>;
  onUpdate: (id: string | number, updatedAppointment: AppointmentFormData) => Promise<void>;
  onClose: () => void;
}

export default function AppointmentDetail({
  appointment,
  onDelete,
  onUpdate,
  onClose,
}: AppointmentDetailProps) {
  // Parse the date and time from scheduled_time
  const dateTime = new Date(appointment.scheduled_time);
  const timeString = format(dateTime, "HH:mm");

  const [editableAppointment, setEditableAppointment] = useState({
    ...appointment,
    date: dateTime,
    time: timeString,
  });

  const handleUpdate = async () => {
    try {
      const scheduledDateTime = format(
        parse(
          `${format(editableAppointment.date, "yyyy-MM-dd")} ${editableAppointment.time}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        ),
        "yyyy-MM-dd HH:mm"
      );

      await onUpdate(appointment.id, {
        ...editableAppointment,
        scheduled_time: scheduledDateTime,
      });
      toast.success("Appointment updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update appointment");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(appointment.id);
      toast.success("Appointment deleted successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete appointment");
    }
  };

  return (
    <div className="w-full max-w-md h-full border-l bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Appointment Details</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Doctor */}
        <div className="flex flex-col gap-1">
          <Label>Doctor</Label>
          <Select
            value={editableAppointment.doctor}
            onValueChange={(value) =>
              setEditableAppointment({ ...editableAppointment, doctor: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Patient ID */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="patient">Patient ID</Label>
          <Input
            id="patient"
            value={editableAppointment.patient}
            onChange={(e) =>
              setEditableAppointment({
                ...editableAppointment,
                patient: e.target.value,
              })
            }
          />
        </div>

        {/* Office */}
        <div className="flex flex-col gap-1">
          <Label>Office</Label>
          <Select
            value={editableAppointment.office}
            onValueChange={(value) =>
              setEditableAppointment({ ...editableAppointment, office: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Office" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(5)].map((_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exam Room */}
        <div className="flex flex-col gap-1">
          <Label>Exam Room</Label>
          <Select
            value={editableAppointment.exam_room}
            onValueChange={(value) =>
              setEditableAppointment({ ...editableAppointment, exam_room: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Exam Room" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(5)].map((_, i) => (
                <SelectItem key={i + 101} value={`${i + 101}`}>
                  {i + 101}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scheduled Date */}
        <div className="flex flex-col gap-1">
          <Label>Scheduled Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {format(editableAppointment.date, "yyyy-MM-dd")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={editableAppointment.date}
                onSelect={(date) =>
                  setEditableAppointment({
                    ...editableAppointment,
                    date: date || editableAppointment.date,
                  })
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Scheduled Time */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="time">Scheduled Time (24-hour format)</Label>
          <Input
            id="time"
            type="time"
            value={editableAppointment.time}
            onChange={(e) =>
              setEditableAppointment({
                ...editableAppointment,
                time: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t p-4">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </div>
  );
}