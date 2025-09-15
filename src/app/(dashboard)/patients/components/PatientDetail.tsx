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
import { format } from "date-fns";

interface PatientDetailProps {
  patient: {
    id: string | number;
    doctor: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
  };
  onDelete: (id: string | number) => void;
  onUpdate: (id: string | number, updatedPatient: any) => void;
  onClose: () => void;
}

export default function PatientDetail({
  patient,
  onDelete,
  onUpdate,
  onClose,
}: PatientDetailProps) {
  const [editablePatient, setEditablePatient] = useState({
    ...patient,
    date_of_birth: patient.date_of_birth
      ? new Date(patient.date_of_birth)
      : null,
  });

  const handleUpdate = () => {
    onUpdate(patient.id, {
      ...editablePatient,
      date_of_birth: editablePatient.date_of_birth
        ? format(editablePatient.date_of_birth, "yyyy-MM-dd")
        : null,
    });
  };

  return (
    <div className="w-full max-w-md h-full border-l bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Patient Details</h2>
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
            value={editablePatient.doctor}
            onValueChange={(value) =>
              setEditablePatient({ ...editablePatient, doctor: value })
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

        {/* First Name */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            value={editablePatient.first_name}
            onChange={(e) =>
              setEditablePatient({
                ...editablePatient,
                first_name: e.target.value,
              })
            }
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            value={editablePatient.last_name}
            onChange={(e) =>
              setEditablePatient({
                ...editablePatient,
                last_name: e.target.value,
              })
            }
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {editablePatient.date_of_birth
                  ? format(editablePatient.date_of_birth, "yyyy-MM-dd")
                  : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={editablePatient.date_of_birth || undefined}
                onSelect={(date) =>
                  setEditablePatient({
                    ...editablePatient,
                    date_of_birth: date || null,
                  })
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <Label>Gender</Label>
          <Select
            value={editablePatient.gender}
            onValueChange={(value) =>
              setEditablePatient({ ...editablePatient, gender: value })
            }
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t p-4">
        <Button
          variant="destructive"
          onClick={() => onDelete(patient.id)}
        >
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
