"use client";
import React, { useState } from "react";

export default function PatientDetail({ patient, onDelete, onUpdate, onClose }) {
  const [editablePatient, setEditablePatient] = useState(patient);

  return (
    <div className="w-96 p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Patient Details</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="flex flex-col gap-2">
        <input
          value={editablePatient.name}
          onChange={(e) =>
            setEditablePatient({ ...editablePatient, name: e.target.value })
          }
          className="input input-bordered w-full"
        />
        <input
          value={editablePatient.age}
          onChange={(e) =>
            setEditablePatient({ ...editablePatient, age: e.target.value })
          }
          className="input input-bordered w-full"
        />
        <input
          value={editablePatient.gender}
          onChange={(e) =>
            setEditablePatient({ ...editablePatient, gender: e.target.value })
          }
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex gap-2 mt-2">
        <button
          className="btn btn-primary flex-1"
          onClick={() => onUpdate(patient.id, editablePatient)}
        >
          Update
        </button>
        <button
          className="btn btn-destructive flex-1"
          onClick={() => onDelete(patient.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
