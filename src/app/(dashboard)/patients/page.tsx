"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import PatientTable from "./components/PatientTable";
import PatientDetail from "./components/PatientDetail";
import PatientModal from "./components/PatientModal";
import { Button } from "@/components/ui/button";
import { Patient, PatientFormData } from "@/types/patient";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPatients = async () => {
    const res = await axiosClient.get<Patient[]>("/api/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id: string | number) => {
    await axiosClient.delete(`/api/patients/${id}`);
    setSelectedPatient(null);
    fetchPatients();
  };

  const handleUpdate = async (id: string | number, updatedData: PatientFormData) => {
    await axiosClient.put(`/api/patients/${id}`, updatedData);
    fetchPatients();
  };

  const handleAdd = async (newPatientData: PatientFormData) => {
    await axiosClient.post("/api/patients", newPatientData);
    fetchPatients();
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Patients</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            Add Patient
          </Button>
        </div>
        <PatientTable
          patients={patients}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      </div>

      {selectedPatient && (
        <PatientDetail
          key={selectedPatient.id}
          patient={selectedPatient}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {isModalOpen && (
        <PatientModal
          onSubmit={handleAdd}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
