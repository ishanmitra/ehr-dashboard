"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function PatientModal({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="input input-bordered w-full"
          />
          <input
            placeholder="Gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>
        <DialogFooter>
          <button
            className="btn btn-primary"
            onClick={() => {
              onSubmit(formData);
              onClose();
            }}
          >
            Add
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
