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
import { format } from "date-fns";

import { PatientFormData } from "@/types/patient";

interface PatientModalProps {
  onSubmit: (data: PatientFormData) => void;
  onClose: () => void;
}

export default function PatientModal({ onSubmit, onClose }: PatientModalProps) {
  const [formData, setFormData] = useState<Omit<PatientFormData, 'date_of_birth'> & {
    date_of_birth: Date | null;
  }>({
    doctor: "",
    first_name: "",
    last_name: "",
    date_of_birth: null,
    gender: "Male" as const,
  });

  const handleSubmit = () => {
    if (!formData.doctor || !formData.first_name || !formData.last_name || !formData.date_of_birth || !formData.gender) {
      alert("Please fill all mandatory fields");
      return;
    }

    onSubmit({
      ...formData,
      date_of_birth: formData.date_of_birth
        ? format(formData.date_of_birth, "yyyy-MM-dd")
        : null,
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
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

          {/* First Name */}
          <div className="flex flex-col">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {formData.date_of_birth
                    ? format(formData.date_of_birth, "yyyy-MM-dd")
                    : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date_of_birth || undefined}
                  onSelect={(date) => setFormData({ ...formData, date_of_birth: date || null })}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value: PatientFormData['gender']) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Do Not Specify">Do Not Specify</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
