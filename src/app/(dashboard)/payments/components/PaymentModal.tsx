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
import { toast } from "sonner";

import { 
  PaymentFormData,
  PaymentMethod,
  PaymentTransactionType,
  PaymentMethodLabels,
  PaymentTransactionTypeLabels
} from "@/types/payment";

interface PaymentModalProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onClose: () => void;
}

export default function PaymentModal({ onSubmit, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    doctor: "",
    patient: "",
    amount: 0,
    appointment: "",
    line_item: "",
    payment_method: "CASH",
    payment_transaction_type: "CREDIT",
  });

  const validateAmount = (value: string): boolean => {
    const numberValue = parseFloat(value);
    return !isNaN(numberValue) && numberValue >= 0 && /^\d+(\.\d{0,2})?$/.test(value);
  };

  const handleSubmit = async () => {
    if (
      !formData.doctor ||
      !formData.patient ||
      !formData.amount ||
      !formData.appointment ||
      !formData.line_item ||
      !formData.payment_method
    ) {
      toast.error("Please fill all mandatory fields");
      return;
    }

    if (!validateAmount(formData.amount.toString())) {
      toast.error("Please enter a valid amount (up to 2 decimal places)");
      return;
    }

    try {
      await onSubmit(formData);
      toast.success("Payment created successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create payment");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
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

          {/* Amount */}
          <div className="flex flex-col">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
            />
          </div>

          {/* Appointment ID */}
          <div className="flex flex-col">
            <Label htmlFor="appointment">Appointment ID</Label>
            <Input
              id="appointment"
              placeholder="Appointment ID"
              value={formData.appointment}
              onChange={(e) => setFormData({ ...formData, appointment: e.target.value })}
            />
          </div>

          {/* Line Item */}
          <div className="flex flex-col">
            <Label htmlFor="line_item">Line Item</Label>
            <Input
              id="line_item"
              placeholder="Line Item"
              value={formData.line_item}
              onChange={(e) => setFormData({ ...formData, line_item: e.target.value })}
            />
          </div>

          {/* Payment Method */}
          <div className="flex flex-col">
            <Label>Payment Method</Label>
            <Select
              value={formData.payment_method}
              onValueChange={(value: PaymentMethod) =>
                setFormData({ ...formData, payment_method: value })
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
          <div className="flex flex-col">
            <Label>Transaction Type</Label>
            <Select
              value={formData.payment_transaction_type}
              onValueChange={(value: PaymentTransactionType) =>
                setFormData({ ...formData, payment_transaction_type: value })
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

        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}