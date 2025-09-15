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
import { toast } from "sonner";

import { 
  Payment, 
  PaymentFormData, 
  PaymentMethod, 
  PaymentTransactionType,
  PaymentMethodLabels,
  PaymentTransactionTypeLabels
} from "@/types/payment";

interface PaymentDetailProps {
  payment: Payment;
  onDelete: (id: string | number) => Promise<void>;
  onUpdate: (id: string | number, updatedPayment: PaymentFormData) => Promise<void>;
  onClose: () => void;
}

export default function PaymentDetail({
  payment,
  onDelete,
  onUpdate,
  onClose,
}: PaymentDetailProps) {
  const [editablePayment, setEditablePayment] = useState<Payment>(payment);

  const validateAmount = (value: string): boolean => {
    const numberValue = parseFloat(value);
    return !isNaN(numberValue) && numberValue >= 0 && /^\d+(\.\d{0,2})?$/.test(value);
  };

  const handleUpdate = async () => {
    if (
      !editablePayment.doctor ||
      !editablePayment.patient ||
      !editablePayment.amount ||
      !editablePayment.appointment ||
      !editablePayment.line_item ||
      !editablePayment.payment_method
    ) {
      toast.error("Please fill all mandatory fields");
      return;
    }

    if (!validateAmount(editablePayment.amount.toString())) {
      toast.error("Please enter a valid amount (up to 2 decimal places)");
      return;
    }

    try {
      await onUpdate(payment.id, editablePayment);
      toast.success("Payment updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update payment");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(payment.id);
      toast.success("Payment deleted successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete payment");
    }
  };

  return (
    <div className="w-full max-w-md h-full border-l bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Payment Details</h2>
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
            value={editablePayment.doctor}
            onValueChange={(value) =>
              setEditablePayment({ ...editablePayment, doctor: value })
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
            value={editablePayment.patient}
            onChange={(e) =>
              setEditablePayment({
                ...editablePayment,
                patient: e.target.value,
              })
            }
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={editablePayment.amount}
            onChange={(e) =>
              setEditablePayment({
                ...editablePayment,
                amount: parseFloat(e.target.value),
              })
            }
          />
        </div>

        {/* Appointment ID */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="appointment">Appointment ID</Label>
          <Input
            id="appointment"
            value={editablePayment.appointment}
            onChange={(e) =>
              setEditablePayment({
                ...editablePayment,
                appointment: e.target.value,
              })
            }
          />
        </div>

        {/* Line Item */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="line_item">Line Item</Label>
          <Input
            id="line_item"
            value={editablePayment.line_item}
            onChange={(e) =>
              setEditablePayment({
                ...editablePayment,
                line_item: e.target.value,
              })
            }
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-1">
          <Label>Payment Method</Label>
          <Select
            value={editablePayment.payment_method}
            onValueChange={(value: PaymentMethod) =>
              setEditablePayment({ ...editablePayment, payment_method: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(PaymentMethodLabels) as [PaymentMethod, string][]).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Payment Transaction Type */}
        <div className="flex flex-col gap-1">
          <Label>Transaction Type</Label>
          <Select
            value={editablePayment.payment_transaction_type}
            onValueChange={(value: PaymentTransactionType) =>
              setEditablePayment({
                ...editablePayment,
                payment_transaction_type: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(PaymentTransactionTypeLabels) as [PaymentTransactionType, string][]).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
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