"use client";
import React from "react";
import { 
  Payment, 
  PaymentTransactionType,
  PaymentMethodLabels,
  PaymentTransactionTypeLabels
} from "@/types/payment";

interface PaymentTableProps {
  payments: Payment[];
  selectedPayment: Payment | null;
  setSelectedPayment: (payment: Payment | null) => void;
}

export default function PaymentTable({ 
  payments, 
  selectedPayment, 
  setSelectedPayment 
}: PaymentTableProps) {
  const formatAmount = (amount: number) => {
    return amount.toFixed(2);
  };

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Doctor</th>
          <th className="border p-2">Patient ID</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Appointment</th>
          <th className="border p-2">Line Item</th>
          <th className="border p-2">Payment Method</th>
          <th className="border p-2">Transaction Type</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr
            key={payment.id}
            onClick={() => setSelectedPayment(payment)}
            className={`cursor-pointer hover:bg-gray-100 ${
              selectedPayment?.id === payment.id ? "bg-gray-200" : ""
            }`}
          >
            <td className="border p-2">{payment.id}</td>
            <td className="border p-2">{payment.doctor}</td>
            <td className="border p-2">{payment.patient}</td>
            <td className="border p-2">${formatAmount(payment.amount)}</td>
            <td className="border p-2">{payment.appointment}</td>
            <td className="border p-2">{payment.line_item}</td>
            <td className="border p-2">{PaymentMethodLabels[payment.payment_method]}</td>
            <td className="border p-2">{PaymentTransactionTypeLabels[payment.payment_transaction_type as PaymentTransactionType]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}