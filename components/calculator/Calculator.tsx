// src/components/calculator/Calculator.tsx

'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Mail, MessageCircle, Save, Sparkles } from 'lucide-react';
import { useLeasingCalculator, formatRub } from '@/hooks/useLeasingCalculator';
import { SLIDER_CONFIG } from '@/config/calculator.config';
import CalculatorInputGroup from './CalculatorInputGroup';
import SummaryCard from './SummaryCard';

const WRAPPER_BASE = 'rounded-[28px] border border-white/60 bg-white/95 shadow-[0_40px_90px_-55px_rgba(15,23,42,0.95)] backdrop-blur';

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
    handleSaveCalculation,
  } = useLeasingCalculator();
  const {
    advanceRub,
    advancePercent,
    residualRub,
    financed,
    monthlyPayment,
    total,
    overpayment,
    effectiveRate,
    summaryLines,
  } = calculations;

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (saveStatus === 'idle') return;

    const timer = window.setTimeout(() => setSaveStatus('idle'), 4000);
    return () => window.clearTimeout(timer);
  }, [saveStatus]);

  const handleSaveClick = () => {
    const success = handleSaveCalculation();
    setSaveStatus(success ? 'saved' : 'error');
  };

  const isModal = variant === 'modal';

  const sectionClasses = isModal
    ? 'flex h-full flex-col'
    : 'relative overflow-hidden py-16 sm:py-20';
  const containerClasses = isModal
    ? 'flex h-full flex-col gap-6'
    : 'relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6';
  const layoutClasses = isModal
    ? `${WRAPPER_BASE} flex h-full min-h-0 flex-col overflow-hidden`
    : `${WRAPPER_BASE} grid gap-8 p-6 sm:p-8 lg:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.85fr)]`;

  const primaryMetric = {
    title: 'Ежемесячный платёж',
    value: formatRub(monthlyPayment),
  };

  const metrics = [
    { title: 'Сумма договора', value: formatRub(total), valueClassName: 'text-2xl' },
    {
      title: 'Переплата',
      value: formatRub(overpayment),
      valueClassName: 'text-2xl text-accent',
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
    <div className="grid gap-3 sm:grid-cols-2">
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
            className="rounded-full border border-accent/40 bg-white/90 px-2.5 py-1.5 text-[11px] font-semibold text-accent shadow-sm transition hover:border-accent hover:bg-white"
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
    <div className="grid gap-3 sm:grid-cols-2">
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
      {!isModal && (
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(94,140,255,0.28),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(29,78,216,0.32),_transparent_60%),linear-gradient(140deg,_#0f1a3b_0%,_#1e3a8a_38%,_#1e66ff_100%)]"
          aria-hidden
        />
      )}
      <div className={containerClasses}>
        {!isModal && (
          <header className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Калькулятор</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Рассчитайте лизинговый платёж за пару минут</h2>
            <p className="mt-4 text-base text-white/70">
              Изменяйте ключевые параметры и сразу видите, как меняется ежемесячный платёж и общие условия договора. Все расчёты
              выполняются автоматически.
            </p>
          </header>
        )}

        <div className={layoutClasses}>
          <div
            className={`flex flex-col gap-3 ${
              isModal ? 'max-h-full overflow-y-auto p-5 sm:p-6 lg:p-8' : 'lg:max-w-sm'
            }`}
          >
            {costAdvanceSection}
            {termResidualSection}
            {rateSection}
          </div>

          <div
            className={`flex flex-col gap-5 ${
              isModal ? 'border-t border-white/60 bg-white/80 p-5 sm:p-6 lg:p-8 lg:border-l lg:border-t-0' : 'lg:px-4'
            }`}
          >
            <div className="space-y-3">
              <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-white to-white/80 p-6 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/45">Ваш ежемесячный платёж</p>
                <p className="mt-3 text-3xl font-semibold text-accent sm:text-4xl lg:text-[2.6rem]">
                  {primaryMetric.value}
                </p>
              </div>

              <div className={`grid gap-3 ${isModal ? 'sm:grid-cols-2' : 'md:grid-cols-2'}`}>
                {metrics.map((metric) => (
                  <SummaryCard key={metric.title} {...metric} />
                ))}
              </div>
            </div>

            <dl className="grid gap-3 text-sm text-dark/70 sm:grid-cols-2">
              {secondaryMetrics.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-inner"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark/40">{item.label}</dt>
                  <dd className="text-sm font-semibold text-dark">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="rounded-3xl border border-dark/5 bg-white/85 p-5 text-sm text-dark/70 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/40">Ваш расчёт</div>
              <ul className="mt-3 space-y-2">
                {summaryLines.map((line) => (
                  <li key={line} className="flex items-start gap-2 leading-relaxed">
                    <Sparkles className="mt-0.5 h-4 w-4 text-accent" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/40">Следующий шаг</div>
                  <p className="mt-2 text-base font-semibold text-dark">
                    Сохраните расчёт и отправьте заявку — мы получим все детали автоматически.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">

                  <button
                    type="button"

                     onClick={handleApplyToForm}
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent via-accent to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_24px_45px_-24px_rgba(30,102,255,0.75)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                    aria-label="Перейти к заявке с расчётом"
                  >
                    Перейти к заявке
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-white/95 px-6 py-3 text-sm font-semibold text-accent shadow-inner transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                  >
                    <Save className="h-4 w-4" aria-hidden />
                    Сохранить расчёт
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/40">Поделиться расчётом</div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleShare('whatsapp')}
                      className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white px-4 py-2 text-sm font-medium text-dark/80 transition hover:border-accent hover:text-accent"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare('email')}
                      className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white px-4 py-2 text-sm font-medium text-dark/80 transition hover:border-accent hover:text-accent"
                    >
                      <Mail className="h-4 w-4" aria-hidden />
                      Email
                    </button>
                  </div>
                </div>
                {saveStatus === 'saved' && (
                  <p className="rounded-full bg-green-100/80 px-4 py-2 text-sm font-medium text-green-700 shadow-inner">
                    Расчёт сохранён — он уже прикреплён к заявке.
                  </p>
                )}
                {saveStatus === 'error' && (
                  <p className="rounded-full bg-red-100/80 px-4 py-2 text-sm font-medium text-red-600 shadow-inner">
                    Не удалось сохранить. Попробуйте ещё раз.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}