// src/components/calculator/Calculator.tsx

'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, Mail, MessageCircle, Save, Sparkles } from 'lucide-react';

import { SLIDER_CONFIG } from '@/config/calculator.config';
import { useLeasingCalculator, formatRub } from '@/hooks/useLeasingCalculator';

const WRAPPER_BASE = 'rounded-[28px] bg-white/95 shadow-[0_40px_90px_-55px_rgba(15,23,42,0.95)] ring-1 ring-black/5 backdrop-blur';

type CalculatorProps = {
  variant?: 'page' | 'modal';
  id?: string;
};

type FieldProps = {
  label: string;
  valueNode: ReactNode;
  hint?: string;
  children: ReactNode;
};

type SummaryItemProps = {
  label: string;
  value: string;
  description?: string;
};

type NumberInputProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

type SliderProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
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

   const sectionClasses = isModal ? 'flex flex-col' : 'relative overflow-hidden py-16 sm:py-20';
  const containerClasses = isModal
    ? 'flex flex-col gap-6'
    : 'relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6';

  const cardClasses = isModal
     ? `${WRAPPER_BASE} flex max-h-full min-h-0 flex-col`
    : `${WRAPPER_BASE} flex flex-col`;

  const headerDescription =
    'Плавные ползунки, мгновённый расчёт и компактный интерфейс — всё для быстрого подбора условий.';

  const secondaryMetrics: SummaryItemProps[] = [
    { label: 'Финансирование', value: formatRub(financed) },
    {
      label: 'Аванс',
      value: advanceMode === 'percent' ? `${Math.round(advancePercent)} %` : formatRub(advanceRub),
    },
    { label: 'Остаток', value: formatRub(residualRub) },
    { label: 'Ставка', value: `${Number(rate.toFixed(2))} %` },
    { label: 'Срок', value: `${Math.round(term)} мес.` },
    {
      label: 'Переплата',
      value: formatRub(overpayment),
      description: `Эффективная ставка ${effectiveRate.toFixed(1)}% в год`,
    },
  ];

  const sliderAccent = advanceMode === 'percent' ? `${Math.round(advancePercent)} %` : formatRub(advanceRub);

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
          <header className="max-w-3xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Калькулятор</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Рассчитайте лизинг за минуту</h2>
            <p className="mt-4 text-base text-white/80">{headerDescription}</p>
          </header>
        )}

        <div className={cardClasses}>
          <div className="flex flex-col gap-6 px-6 pt-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div>
              <h3 className="text-xl font-semibold text-dark sm:text-2xl">Калькулятор лизинга</h3>
              <p className="mt-2 max-w-md text-sm text-dark/60 sm:text-base">{headerDescription}</p>
            </div>
            <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-white to-white/70 px-5 py-4 text-right shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-dark/40">Ежемесячный платёж</p>
              <p className="mt-2 text-3xl font-semibold text-accent sm:text-4xl">{formatRub(monthlyPayment)}</p>
              <p className="mt-1 text-xs text-dark/50">Всего по договору: {formatRub(total)}</p>
            </div>
          </div>

          <div
            className={`flex flex-col gap-6 px-6 pb-6 sm:px-8 sm:pb-8 ${
                 isModal ? 'min-h-0 overflow-y-auto' : ''
            }`}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Стоимость техники" valueNode={<ValueBadge>{formatRub(cost)}</ValueBadge>}>
                <NumberInput
                  value={cost}
                  min={SLIDER_CONFIG.cost.min}
                  max={SLIDER_CONFIG.cost.max}
                  step={SLIDER_CONFIG.cost.step}
                  onChange={handleCostChange}
                />
                <Slider
                  value={cost}
                  min={SLIDER_CONFIG.cost.min}
                  max={SLIDER_CONFIG.cost.max}
                  step={SLIDER_CONFIG.cost.step}
                  onChange={handleCostChange}
                />
              </Field>

              <Field
                label="Аванс"
                valueNode={<ValueBadge>{sliderAccent}</ValueBadge>}
                hint={advanceMode === 'percent' ? formatRub(advanceRub) : `${Math.round(advancePercent)} %`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-full border border-accent/30 bg-white/90 p-1 text-xs font-semibold text-accent shadow-sm">
                    <button
                      type="button"
                      onClick={() => advanceMode === 'currency' && toggleAdvanceMode()}
                      className={`rounded-full px-3 py-1 transition ${
                        advanceMode === 'percent' ? 'bg-accent text-white shadow-sm' : 'text-accent'
                      }`}
                    >
                      %
                    </button>
                    <button
                      type="button"
                      onClick={() => advanceMode === 'percent' && toggleAdvanceMode()}
                      className={`rounded-full px-3 py-1 transition ${
                        advanceMode === 'currency' ? 'bg-accent text-white shadow-sm' : 'text-accent'
                      }`}
                    >
                      ₽
                    </button>
                  </div>
                  <span className="text-xs text-dark/50">
                    {advanceMode === 'percent' ? '0–90 %' : `${formatRub(0)} – ${formatRub(cost)}`}
                  </span>
                </div>
                <Slider
                  value={advance}
                  min={
                    advanceMode === 'percent'
                      ? SLIDER_CONFIG.advancePercent.min
                      : SLIDER_CONFIG.advanceCurrency.min
                  }
                  max={advanceMode === 'percent' ? SLIDER_CONFIG.advancePercent.max : cost}
                  step={
                    advanceMode === 'percent'
                      ? SLIDER_CONFIG.advancePercent.step
                      : SLIDER_CONFIG.advanceCurrency.step
                  }
                  onChange={(value) => handleFieldChange('advance', value)}
                />
              </Field>

              <Field
                label="Срок договора, мес."
                valueNode={<ValueBadge>{Math.round(term)} мес.</ValueBadge>}
              >
                <Slider
                  value={term}
                  min={SLIDER_CONFIG.term.min}
                  max={SLIDER_CONFIG.term.max}
                  step={SLIDER_CONFIG.term.step}
                  onChange={(value) => handleFieldChange('term', value)}
                />
                <div className="flex justify-between text-xs text-dark/40">
                  <span>{SLIDER_CONFIG.term.min} мес.</span>
                  <span>{SLIDER_CONFIG.term.max} мес.</span>
                </div>
              </Field>

              <Field
                label="Ставка, % годовых"
                valueNode={<ValueBadge>{Number(rate.toFixed(2))} %</ValueBadge>}
              >
                <Slider
                  value={rate}
                  min={SLIDER_CONFIG.rate.min}
                  max={SLIDER_CONFIG.rate.max}
                  step={SLIDER_CONFIG.rate.step}
                  onChange={(value) => handleFieldChange('rate', value)}
                />
                <div className="flex justify-between text-xs text-dark/40">
                  <span>{SLIDER_CONFIG.rate.min} %</span>
                  <span>{SLIDER_CONFIG.rate.max} %</span>
                </div>
              </Field>

              <Field
                label="Остаточный платёж, %"
                valueNode={<ValueBadge>{Math.round(residual)} %</ValueBadge>}
                hint={formatRub(residualRub)}
              >
                <Slider
                  value={residual}
                  min={SLIDER_CONFIG.residual.min}
                  max={SLIDER_CONFIG.residual.max}
                  step={SLIDER_CONFIG.residual.step}
                  onChange={(value) => handleFieldChange('residual', value)}
                />
                <div className="flex justify-between text-xs text-dark/40">
                  <span>{SLIDER_CONFIG.residual.min} %</span>
                  <span>{SLIDER_CONFIG.residual.max} %</span>
                </div>
              </Field>
            </div>

            <div className="rounded-[26px] bg-bgsoft/60 px-5 py-5 text-sm text-dark/70 shadow-inner ring-1 ring-white/80">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid flex-1 gap-3 sm:grid-cols-3">
                  {secondaryMetrics.map((item) => (
                    <SummaryItem key={item.label} {...item} />
                  ))}
                </div>
                <div className="flex items-center gap-3 rounded-[24px] border border-accent/20 bg-white/80 px-4 py-3 text-right">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-dark/40">
                      Ваш платёж
                    </div>
                    <div className="text-2xl font-semibold text-accent">{formatRub(monthlyPayment)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-dark/5 bg-white/90 px-5 py-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/40">Ваш расчёт</div>
              <ul className="mt-3 space-y-2 text-sm text-dark/75">
                {summaryLines.map((line) => (
                  <li key={line} className="flex items-start gap-2 leading-relaxed">
                    <Sparkles className="mt-0.5 h-4 w-4 text-accent" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[26px] border border-white/70 bg-white/95 px-5 py-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/40">Следующий шаг</div>
                  <p className="mt-2 text-sm text-dark/80 sm:text-base">
                    Сохраните расчёт, поделитесь им или сразу отправьте заявку — все данные подтянутся автоматически.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleApplyToForm}
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent via-accent to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_24px_45px_-24px_rgba(30,102,255,0.75)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
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

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
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

          <style jsx>{`
            input[type='range'] {
              -webkit-appearance: none;
              appearance: none;
              width: 100%;
              background: transparent;
            }
            input[type='range']:focus {
              outline: none;
            }
            input[type='range']::-webkit-slider-runnable-track {
              height: 4px;
              border-radius: 9999px;
              background: rgba(15, 23, 42, 0.1);
            }
            input[type='range']::-moz-range-track {
              height: 4px;
              border-radius: 9999px;
              background: rgba(15, 23, 42, 0.1);
            }
            input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 18px;
              height: 18px;
              border-radius: 9999px;
              background: white;
              border: 2px solid rgb(30, 102, 255);
              box-shadow: 0 4px 10px rgba(30, 102, 255, 0.25);
              margin-top: -7px;
            }
            input[type='range']::-moz-range-thumb {
              width: 18px;
              height: 18px;
              border-radius: 9999px;
              background: white;
              border: 2px solid rgb(30, 102, 255);
              box-shadow: 0 4px 10px rgba(30, 102, 255, 0.25);
            }
            input[type='range']::-moz-range-progress {
              background: rgb(30, 102, 255);
              height: 4px;
              border-radius: 9999px;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function Field({ label, valueNode, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.35em] text-dark/40">{label}</label>
          {hint ? <div className="mt-1 text-xs text-dark/45">{hint}</div> : null}
        </div>
        <div className="shrink-0">{valueNode}</div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ValueBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-white px-3 py-1 text-sm font-semibold text-dark">
      {children}
    </span>
  );
}

function SummaryItem({ label, value, description }: SummaryItemProps) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-left shadow-inner">
      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-dark/40">{label}</span>
      <span className="text-sm font-semibold text-dark">{value}</span>
      {description ? <span className="text-xs text-dark/50">{description}</span> : null}
    </div>
  );
}

function NumberInput({ value, min, max, step, onChange }: NumberInputProps) {
  return (
    <input
      type="number"
      inputMode="numeric"
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-dark shadow-sm outline-none transition focus:border-accent"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}

function Slider({ value, min, max, step, onChange }: SliderProps) {
  return (
    <input
      type="range"
      className="accent-accent"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}