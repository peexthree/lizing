// src/components/calculator/Calculator.tsx

'use client';

import { useLeasingCalculator, formatRub } from '@/hooks/useLeasingCalculator';
import { SLIDER_CONFIG } from '@/config/calculator.config';
import CalculatorInputGroup from './CalculatorInputGroup';
import SummaryCard from './SummaryCard';
// ...другие импорты, если нужны

type CalculatorProps = {
  variant?: 'page' | 'modal';
  id?: string;
};

export default function Calculator({ variant = 'page', id = 'calculator' }: CalculatorProps) {
  const { 
    state, 
    calculations, 
    handleFieldChange, 
    handleCostChange, 
    toggleAdvanceMode,
    primaryMetrics,
    secondaryMetrics,
    actions,
    showRate,
    handleToggleRate,
  } = useLeasingCalculator();

  const { cost, advance, advanceMode, term, residual, rate } = state;
  const { advanceRub, advancePercent, residualRub } = calculations;

  const isModal = variant === 'modal';
  // Все ваши переменные для классов (sectionClasses, wrapperClasses и т.д.) остаются здесь

  // Секции JSX (costAdvanceSection, termResidualSection и т.д.)
  const costAdvanceSection = (
    <div className="grid gap-5 lg:grid-cols-2">
      <CalculatorInputGroup
        id="cost"
        label="Стоимость техники"
        value={cost}
        onValueChange={handleCostChange}
        min={SLIDER_CONFIG.cost.min}
        max={SLIDER_CONFIG.cost.max}
        step={SLIDER_CONFIG.cost.step}
        topRightLabel={formatRub(cost)}
        bottomLeftLabel={formatRub(SLIDER_CONFIG.cost.min)}
        bottomRightLabel={formatRub(SLIDER_CONFIG.cost.max)}
      />
      <CalculatorInputGroup
        id="advance"
        label="Аванс"
        value={advance}
        onValueChange={(value) => handleFieldChange('advance', value)}
        min={advanceMode === 'percent' ? SLIDER_CONFIG.advancePercent.min : SLIDER_CONFIG.advanceCurrency.min}
        max={advanceMode === 'percent' ? SLIDER_CONFIG.advancePercent.max : cost}
        step={advanceMode === 'percent' ? SLIDER_CONFIG.advancePercent.step : SLIDER_CONFIG.advanceCurrency.step}
        prefix={
          <button
            type="button"
            onClick={toggleAdvanceMode}
            className="rounded-full border border-accent/40 bg-white/80 px-3 py-2 text-xs font-semibold text-accent shadow-sm transition hover:border-accent hover:bg-white"
          >
            {advanceMode === 'percent' ? '%' : '₽'}
          </button>
        }
        topRightLabel={advanceMode === 'percent' ? formatRub(advanceRub) : `${Math.round(advancePercent)} %`}
        bottomLeftLabel="0%"
        bottomRightLabel={advanceMode === 'percent' ? `${SLIDER_CONFIG.advancePercent.max}%` : formatRub(cost)}
      />
    </div>
  );

  // ... Аналогично создайте другие секции (termResidualSection, rateSection, etc.)
  // используя <CalculatorInputGroup /> и данные из хука
  
  // Здесь должна быть ваша полная верстка, как в оригинальном файле,
  // но теперь она использует готовые переменные и обработчики из хука.
  // Например:

  const primaryMetricsSection = (
    <div className={`grid gap-4 ${isModal ? 'sm:grid-cols-2' : 'md:grid-cols-3'}`}>
      {primaryMetrics.map(metric => (
        <SummaryCard key={metric.title} {...metric} />
      ))}
    </div>
  );

  return (
    <section id={id} className={/* sectionClasses */ 'h-full'}>
      <div className={/* wrapperClasses */ 'h-full flex flex-col'}>
         {/* ... ваша верстка хедера ... */}
         {isModal ? (
           <div className="mt-4 flex flex-1 flex-col gap-4 lg:flex-row lg:gap-6 min-h-0">
             <div className="flex flex-1 flex-col rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-hero sm:p-6 overflow-y-auto">
               <div className="space-y-6">
                 {costAdvanceSection}
                 <div className="h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent" />
                 {/* ... termResidualSection ... */}
                 <div className="h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent" />
                 {/* ... rateSection ... */}
               </div>
             </div>
             <div className="flex flex-1 flex-col rounded-[2rem] border ... p-5 ...">
                <div className="flex h-full flex-col gap-5">
                    {primaryMetricsSection}
                    {/* ... secondaryMetricsSection ... */}
                    {/* ... actionsSection ... */}
                </div>
             </div>
           </div>
         ) : (
            {/* Верстка для 'page' варианта */}
         )}
      </div>
    </section>
  );
}