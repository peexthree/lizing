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
      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_24px_60px_rgba(3,7,18,0.35)] backdrop-blur">
        <div className="flex flex-col gap-1">
          <label
            htmlFor={id}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60"
          >
            {label}
          </label>
          {topRightLabel && (
            <span className="text-xs font-medium text-white/55">{topRightLabel}</span>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 shadow-inner">
            {prefix}
            <input
              id={id}
              type="number"
              value={value}
              onChange={handleInputChange}
              className="w-full min-w-[120px] max-w-[180px] bg-transparent text-center text-xl font-medium text-white focus:outline-none"
              min={min}
              max={max}
              step={step}
            />
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={[Math.min(Math.max(value, min), max)]}
            onValueChange={handleSliderChange}
          />
        </div>

        <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
          <span>{bottomLeftLabel}</span>
          <span>{bottomRightLabel}</span>
        </div>
      </div>
    );
  }
);

CalculatorInputGroup.displayName = 'CalculatorInputGroup';
export default CalculatorInputGroup;