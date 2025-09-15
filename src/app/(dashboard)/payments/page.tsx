"use client";

import { useState, useEffect } from "react";
import axiosClient from "@/lib/axiosClient";
import PaymentTable from "./components/PaymentTable";
import PaymentDetail from "./components/PaymentDetail";
import PaymentModal from "./components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Payment, PaymentFormData } from "@/types/payment";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPayments = async () => {
    const res = await axiosClient.get<Payment[]>("/api/patient_payments");
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDelete = async (id: string | number) => {
    await axiosClient.delete(`/api/patient_payments/${id}`);
    setSelectedPayment(null);
    fetchPayments();
  };

  const handleUpdate = async (id: string | number, updatedData: PaymentFormData) => {
    await axiosClient.put(`/api/patient_payments/${id}`, updatedData);
    fetchPayments();
  };

  const handleAdd = async (newPaymentData: PaymentFormData) => {
    await axiosClient.post("/api/patient_payments", newPaymentData);
    fetchPayments();
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Payments</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            Add Payment
          </Button>
        </div>
        <PaymentTable
          payments={payments}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
      </div>

      {selectedPayment && (
        <PaymentDetail
          key={selectedPayment.id}
          payment={selectedPayment}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onClose={() => setSelectedPayment(null)}
        />
      )}

      {isModalOpen && (
        <PaymentModal
          onSubmit={handleAdd}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}