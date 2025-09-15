export type PaymentMethod =
  | "DRCP"
  | "CASH"
  | "CHCK"
  | "DBIT"
  | "CRDT"
  | "AMEX"
  | "VISA"
  | "MSTR"
  | "DISC"
  | "SQR1"
  | "SQRE"
  | "PTPA"
  | "ONPT"
  | "OTHR";

export type PaymentTransactionType = "CREDIT" | "REF" | "COR" | "COPAY" | "COINSR" | "OTHR";

export const PaymentMethodLabels: Record<PaymentMethod, string> = {
  DRCP: "Direct Payment",
  CASH: "Cash",
  CHCK: "Check",
  DBIT: "Debit",
  CRDT: "Credit Card",
  AMEX: "American Express",
  VISA: "Visa",
  MSTR: "Mastercard",
  DISC: "Discover",
  SQR1: "Square (legacy)",
  SQRE: "Square",
  PTPA: "Patient Payments",
  ONPT: "OnPatient",
  OTHR: "Other"
};

export const PaymentTransactionTypeLabels: Record<PaymentTransactionType, string> = {
  CREDIT: "Credit",
  REF: "Refund",
  COR: "Correction",
  COPAY: "Copay",
  COINSR: "Coinsurance",
  OTHR: "Other"
};

export interface Payment {
  id: string | number;
  doctor: string;
  patient: string;
  amount: number;
  appointment: string | number;
  line_item: string | number;
  payment_method: PaymentMethod;
  payment_transaction_type: PaymentTransactionType;
}

export interface PaymentFormData extends Omit<Payment, 'id'> {
  id?: string | number;
}