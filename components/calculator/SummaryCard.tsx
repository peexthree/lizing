// src/components/calculator/SummaryCard.tsx

import { memo } from 'react';

type SummaryCardProps = {
  title: string;
  value: string;
  valueClassName?: string;
  description?: string;
};

const SummaryCard = memo(function SummaryCard({ title, value, description, valueClassName }: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur h-full flex flex-col justify-center">
      <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">{title}</div>
      <div className={`mt-2 font-semibold text-dark ${valueClassName ?? 'text-2xl'}`}>{value}</div>
      {description && <p className="mt-1 text-xs text-dark/60">{description}</p>}
    </div>
  );
});

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;