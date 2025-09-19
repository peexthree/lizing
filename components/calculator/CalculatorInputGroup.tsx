// src/components/calculator/CalculatorInputGroup.tsx

import { memo } from 'react';
import Slider from './ui/Slider'; // Assuming Slider component path

type CalculatorInputGroupProps = {
  id: string;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  topRightLabel?: React.ReactNode;
  bottomLeftLabel?: React.ReactNode;
  bottomRightLabel?: React.ReactNode;
  prefix?: React.ReactNode;
};

const CalculatorInputGroup = memo(
  ({
    id,
    label,
    value,
    onValueChange,
    min,
    max,
    step,
    topRightLabel,
    bottomLeftLabel,
    bottomRightLabel,
    prefix,
  }: CalculatorInputGroupProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(Number(e.target.value));
    };

    const handleSliderChange = (values: number[]) => {
      onValueChange(values[0]);
    };

    return (
      <div>
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wide text-dark/70">
            {label}
          </label>
          {topRightLabel && <span className="text-sm font-medium text-dark/60">{topRightLabel}</span>}
        </div>
        <div className="mt-3 flex items-center gap-3">
          {prefix}
          <input
            id={id}
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
            min={min}
            max={max}
            step={step}
          />
        </div>
        <div className="mt-3">
          <Slider
            min={min}
            max={max}
            step={step}
            value={[Math.min(Math.max(value, min), max)]}
            onValueChange={handleSliderChange}
          />
          <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-dark/40">
            <span>{bottomLeftLabel}</span>
            <span>{bottomRightLabel}</span>
          </div>
        </div>
      </div>
    );
  }
);

CalculatorInputGroup.displayName = 'CalculatorInputGroup';
export default CalculatorInputGroup;