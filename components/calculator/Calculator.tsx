// src/components/calculator/Calculator.tsx

'use client';

import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { useLeasingCalculator, formatRub } from '@/hooks/useLeasingCalculator';
import { SLIDER_CONFIG } from '@/config/calculator.config';
import CalculatorInputGroup from './CalculatorInputGroup';
import SummaryCard from './SummaryCard';

const WRAPPER_BASE = 'rounded-[2rem] border border-white/60 bg-white/90 shadow-hero backdrop-blur';

type CalculatorProps = {
  variant?: 'page' | 'modal';
  id?: string;
};

export default function Calculator({ variant = 'page', id = 'calculator' }: CalculatorProps) {
  const {
    state: { cost, advance, advanceMode, term, residual, rate },
    calculations,
    handleFieldChange,
    handleCostChange,
    toggleAdvanceMode,
    handleApplyToForm,
    handleShare,
  } = useLeasingCalculator();

  const { advanceRub, advancePercent, residualRub, financed, monthlyPayment, total, overpayment, effectiveRate, summary } =
    calculations;

  const isModal = variant === 'modal';

  const sectionClasses = isModal ? 'flex h-full flex-col' : 'py-20 sm:py-24';
  const containerClasses = isModal
    ? 'flex h-full flex-col gap-6'
    : 'mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8';
  const layoutClasses = isModal
    ? `${WRAPPER_BASE} flex h-full min-h-0 flex-col overflow-hidden`
    : `${WRAPPER_BASE} flex flex-col gap-10 p-6 sm:p-8 lg:p-10`;

  const metrics = [
    { title: 'Ежемесячный платёж', value: formatRub(monthlyPayment), valueClassName: 'text-3xl lg:text-4xl' },
    { title: 'Сумма договора', value: formatRub(total), valueClassName: 'text-3xl lg:text-4xl' },
    {
      title: 'Переплата',
      value: formatRub(overpayment),
      valueClassName: 'text-3xl lg:text-4xl text-accent',
      description: `Эффективная ставка ${effectiveRate.toFixed(1)}% в год`,
    },
  ];

  const secondaryMetrics: { label: string; value: string }[] = [
    { label: 'Финансирование', value: formatRub(financed) },
    {
      label: 'Аванс',
      value: advanceMode === 'percent' ? `${Math.round(advancePercent)} %` : formatRub(advanceRub),
    },
    { label: 'Остаточный платёж', value: formatRub(residualRub) },
    { label: 'Ставка', value: `${Number(rate.toFixed(2))} %` },
    { label: 'Срок договора', value: `${Math.round(term)} мес.` },
  ];

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
        bottomLeftLabel={advanceMode === 'percent' ? '0 %' : '0 ₽'}
        bottomRightLabel={advanceMode === 'percent' ? `${SLIDER_CONFIG.advancePercent.max}%` : formatRub(cost)}
      />
    </div>
  );

  const termResidualSection = (
    <div className="grid gap-5 lg:grid-cols-2">
      <CalculatorInputGroup
        id="term"
        label="Срок договора, мес."
        value={term}
        onValueChange={(value) => handleFieldChange('term', value)}
        min={SLIDER_CONFIG.term.min}
        max={SLIDER_CONFIG.term.max}
        step={SLIDER_CONFIG.term.step}
        topRightLabel={`${Math.round(term)} мес.`}
        bottomLeftLabel={`${SLIDER_CONFIG.term.min} мес.`}
        bottomRightLabel={`${SLIDER_CONFIG.term.max} мес.`}
      />
      <CalculatorInputGroup
        id="residual"
        label="Остаточный платёж, %"
        value={residual}
        onValueChange={(value) => handleFieldChange('residual', value)}
        min={SLIDER_CONFIG.residual.min}
        max={SLIDER_CONFIG.residual.max}
        step={SLIDER_CONFIG.residual.step}
        topRightLabel={formatRub(residualRub)}
        bottomLeftLabel={`${SLIDER_CONFIG.residual.min}%`}
        bottomRightLabel={`${SLIDER_CONFIG.residual.max}%`}
      />
    </div>
  );

  const rateSection = (
    <CalculatorInputGroup
      id="rate"
      label="Ставка, % годовых"
      value={rate}
      onValueChange={(value) => handleFieldChange('rate', value)}
      min={SLIDER_CONFIG.rate.min}
      max={SLIDER_CONFIG.rate.max}
      step={SLIDER_CONFIG.rate.step}
      topRightLabel={`${Number(rate.toFixed(2))} %`}
      bottomLeftLabel={`${SLIDER_CONFIG.rate.min}%`}
      bottomRightLabel={`${SLIDER_CONFIG.rate.max}%`}
    />
  );

  return (
    <section id={id} className={sectionClasses}>
      <div className={containerClasses}>
        {!isModal && (
          <header className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">Калькулятор</p>
            <h2 className="mt-3 text-3xl font-semibold text-dark sm:text-4xl">Рассчитайте лизинговый платёж за пару минут</h2>
            <p className="mt-4 text-base text-dark/70">
              Изменяйте ключевые параметры и сразу видите, как меняется ежемесячный платёж и общие условия договора. Все расчёты
              выполняются автоматически.
            </p>
          </header>
        )}

        <div className={layoutClasses}>
          <div className={`flex flex-1 flex-col gap-6 ${isModal ? 'p-5 sm:p-6 lg:p-8' : ''}`}>
            <div className="space-y-6">
              {costAdvanceSection}
              <div className="h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent" />
              {termResidualSection}
              <div className="h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent" />
              {rateSection}
            </div>
          </div>

          <div className={`flex flex-col gap-6 ${isModal ? 'border-t border-white/60 bg-white/80 p-5 sm:p-6 lg:p-8 lg:border-l lg:border-t-0' : 'lg:px-4'}`}>
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-dark">Итоги расчёта</h3>
              <div className={`grid gap-4 ${isModal ? 'sm:grid-cols-2' : 'md:grid-cols-3'}`}>
                {metrics.map((metric) => (
                  <SummaryCard key={metric.title} {...metric} />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-dark/5 bg-white/80 p-5 text-sm text-dark/70">
              {summary}
            </div>

            <dl className="grid gap-3 text-sm text-dark/70 sm:grid-cols-2">
              {secondaryMetrics.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between rounded-2xl border border-white/70 bg-white/70 px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/50">{item.label}</dt>
                  <dd className="text-sm font-medium text-dark">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleApplyToForm}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-accent/90"
              >
                Оставить заявку
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="text-xs uppercase tracking-[0.3em] text-dark/40">Поделиться расчётом:</div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleShare('whatsapp')}
                    className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/70 px-4 py-2 text-sm font-medium text-dark/80 transition hover:border-accent hover:text-accent"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare('email')}
                    className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/70 px-4 py-2 text-sm font-medium text-dark/80 transition hover:border-accent hover:text-accent"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}