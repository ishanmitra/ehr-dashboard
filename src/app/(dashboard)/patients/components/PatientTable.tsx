"use client";
import React from "react";

export default function PatientTable({ patients, selectedPatient, setSelectedPatient }) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Gender</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr
            key={p.id}
            onClick={() => setSelectedPatient(p)}
            className={`cursor-pointer hover:bg-gray-100 ${
              selectedPatient?.id === p.id ? "bg-gray-200" : ""
            }`}
          >
            <td className="border p-2">{p.id}</td>
            <td className="border p-2">{`${p.first_name} ${p.last_name}`}</td>
            <td className="border p-2">{p.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
