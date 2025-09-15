// src/components/Card.tsx
'use client';

interface CardProps {
  title: string;
  value: number | string;
}

export default function Card({ title, value }: CardProps) {
  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
