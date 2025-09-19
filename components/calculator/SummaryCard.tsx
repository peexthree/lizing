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
    <div className="flex h-full flex-col justify-center rounded-3xl border border-white/60 bg-white/80 p-4 text-center shadow-sm backdrop-blur">
      <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark/40">{title}</div>
      <div className={`mt-2 font-semibold text-dark ${valueClassName ?? 'text-xl'}`}>{value}</div>
      {description && <p className="mt-1 text-xs text-dark/55">{description}</p>}
    </div>
  );
});

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;