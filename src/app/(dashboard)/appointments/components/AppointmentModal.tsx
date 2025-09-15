"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

import { AppointmentFormData } from "@/types/appointment";
import { toast } from "sonner";

interface AppointmentModalProps {
  onSubmit: (data: AppointmentFormData) => Promise<void>;
  onClose: () => void;
}

export default function AppointmentModal({ onSubmit, onClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    doctor: "",
    patient: "",
    office: "",
    exam_room: "",
    date: new Date(),
    time: "09:00",
  });

  const handleSubmit = async () => {
    if (
      !formData.doctor ||
      !formData.patient ||
      !formData.office ||
      !formData.exam_room ||
      !formData.time
    ) {
      toast.error("Please fill all mandatory fields");
      return;
    }

    try {
      // Combine date and time into scheduled_time
      const scheduledDateTime = format(
        parse(
          `${format(formData.date, "yyyy-MM-dd")} ${formData.time}`,
          "yyyy-MM-dd HH:mm",
          new Date()
        ),
        "yyyy-MM-dd HH:mm"
      );

      await onSubmit({
        doctor: formData.doctor,
        patient: formData.patient,
        office: formData.office,
        exam_room: formData.exam_room,
        scheduled_time: scheduledDateTime,
      });

      toast.success("Appointment created successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create appointment");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Appointment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Doctor */}
          <div className="flex flex-col">
            <Label htmlFor="doctor">Doctor</Label>
            <Select
              value={formData.doctor}
              onValueChange={(value) => setFormData({ ...formData, doctor: value })}
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
          <div className="flex flex-col">
            <Label htmlFor="patient">Patient ID</Label>
            <Input
              id="patient"
              placeholder="Patient ID"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
            />
          </div>

          {/* Office */}
          <div className="flex flex-col">
            <Label htmlFor="office">Office</Label>
            <Select
              value={formData.office}
              onValueChange={(value) => setFormData({ ...formData, office: value })}
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
          <div className="flex flex-col">
            <Label htmlFor="exam_room">Exam Room</Label>
            <Select
              value={formData.exam_room}
              onValueChange={(value) => setFormData({ ...formData, exam_room: value })}
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
          <div className="flex flex-col">
            <Label>Scheduled Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {format(formData.date, "yyyy-MM-dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) =>
                    setFormData({ ...formData, date: date || formData.date })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Scheduled Time */}
          <div className="flex flex-col">
            <Label htmlFor="time">Scheduled Time (24-hour format)</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}