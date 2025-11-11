// src/components/calculator/Calculator.tsx

'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRightIcon,
  CloseIcon,
  MailIcon,
  MessageIcon,
  SaveIcon,
  SparkleIcon,
  WhatsAppLineIcon,
} from '@/components/icons';
import { SLIDER_CONFIG } from '@/config/calculator.config';
import { useLeasingCalculator, formatRub } from '@/hooks/useLeasingCalculator';
import Slider from '@/components/calculator/ui/Slider';
const WRAPPER_BASE =
  'rounded-[28px] border border-white/10 bg-[#0c1230]/90 shadow-[0_45px_120px_rgba(3,7,18,0.55)] backdrop-blur-2xl';

type CalculatorProps = {
  variant?: 'page' | 'modal';
  id?: string;
  onClose?: () => void;
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

type SliderControlProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export default function Calculator({ variant = 'page', id = 'calculator', onClose }: CalculatorProps) {
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
  const isModal = variant === 'modal';
  const [step, setStep] = useState<'inputs' | 'results'>(isModal ? 'inputs' : 'results');
  const inputsSectionRef = useRef<HTMLDivElement | null>(null);
  const resultsSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (saveStatus === 'idle') return;

    const timer = window.setTimeout(() => setSaveStatus('idle'), 4000);
    return () => window.clearTimeout(timer);
  }, [saveStatus]);
  useEffect(() => {
    if (!isModal) return;

    const target = step === 'inputs' ? inputsSectionRef.current : resultsSectionRef.current;
    target?.focus();
  }, [step, isModal]);
  const handleSaveClick = () => {
    const success = handleSaveCalculation();
    setSaveStatus(success ? 'saved' : 'error');
  };



  const sectionClasses = isModal ? 'flex flex-col' : 'relative overflow-hidden py-16 sm:py-20';
  const containerClasses = isModal
    ? 'flex flex-col gap-6'
    : 'relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6';

  const cardClasses = isModal
    ? `${WRAPPER_BASE} relative flex max-h-full min-h-0 flex-col`
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
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(212,175,55,0.22),transparent_55%),radial-gradient(circle_at_82%_18%,rgba(56,189,248,0.18),transparent_58%),linear-gradient(150deg,#030712_0%,#0f172a_45%,#1f2937_100%)]"
          aria-hidden
        />
      )}
      <div className={containerClasses}>
        {!isModal && (
          <header className="max-w-3xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Калькулятор</p>
             <h2 className="glass-title mt-3 text-3xl font-semibold text-white sm:text-4xl">Рассчитайте лизинг за минуту</h2>
            <p className="mt-4 text-base text-white/80">{headerDescription}</p>
          </header>
        )}

        <div className={cardClasses}>
          <div className="flex flex-col gap-6 px-6 pt-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">Калькулятор лизинга</h3>
                  <p className="mt-2 max-w-md text-sm text-white/60 sm:text-base">{headerDescription}</p>
                </div>
                {isModal && onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 bg-white/90 text-dark shadow transition hover:-translate-y-0.5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    aria-label="Закрыть калькулятор"
                  >
                    <CloseIcon className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 text-right shadow-inner">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">Ежемесячный платёж</p>
              <p className="mt-2 text-3xl font-mono font-semibold text-accent sm:text-4xl">{formatRub(monthlyPayment)}</p>
              <p className="mt-1 text-xs text-white/60">Всего по договору: {formatRub(total)}</p>
            </div>
          </div>

          <div
            className={`flex flex-col gap-6 px-6 pb-6 sm:px-8 sm:pb-8 ${isModal ? 'min-h-0 overflow-y-auto' : ''
              }`}
          >
            <div
              ref={inputsSectionRef}
              tabIndex={isModal ? -1 : undefined}
              className={
                isModal
                  ? 'outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1230]'
                  : ''
              }
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
                  <SliderControl
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
                  <div className="flex flex-col gap-3">
                    <div className="inline-flex rounded-full border border-white/10 bg-white/10 p-1 text-xs font-semibold text-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => advanceMode === 'currency' && toggleAdvanceMode()}
                        className={`rounded-full px-3 py-1 transition ${advanceMode === 'percent'
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-white/70 hover:text-white'
                          }`}
                      >
                        %
                      </button>
                      <button
                        type="button"
                        onClick={() => advanceMode === 'percent' && toggleAdvanceMode()}
                        className={`rounded-full px-3 py-1 transition ${advanceMode === 'currency'
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-white/70 hover:text-white'
                          }`}
                      >
                        ₽
                      </button>
                    </div>
                    <span className="text-xs text-white/50">
                      {advanceMode === 'percent' ? '0–90 %' : `${formatRub(0)} – ${formatRub(cost)}`}
                    </span>
                  </div>
                  <SliderControl
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
                  <SliderControl
                    value={term}
                    min={SLIDER_CONFIG.term.min}
                    max={SLIDER_CONFIG.term.max}
                    step={SLIDER_CONFIG.term.step}
                    onChange={(value) => handleFieldChange('term', value)}
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span>{SLIDER_CONFIG.term.min} мес.</span>
                    <span>{SLIDER_CONFIG.term.max} мес.</span>
                  </div>
                </Field>

              </div>
            </div>

            {(!isModal || step === 'results') && (
              <div
                ref={resultsSectionRef}
                tabIndex={isModal ? -1 : undefined}
                className={`flex flex-col gap-6 ${isModal
                  ? 'outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1230]'
                  : ''
                  }`}
              >
                {isModal && (
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('inputs')}
                      className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-[#0c1230]"
                    >
                      Назад
                    </button>
                  </div>
                )}

                <div className="rounded-[26px] border border-white/10 bg-white/5 px-5 py-5 text-sm text-white/70 shadow-inner">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid flex-1 gap-3 sm:grid-cols-3">
                      {secondaryMetrics.map((item) => (
                        <SummaryItem key={item.label} {...item} />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/10 px-4 py-3 text-right">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">
                          Ваш платёж
                        </div>
                        <div className="text-2xl font-mono font-semibold text-accent">{formatRub(monthlyPayment)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 px-5 py-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Ваш расчёт</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {summaryLines.map((line) => (
                      <li key={line} className="flex items-start gap-2 leading-relaxed">
                        <SparkleIcon className="mt-0.5 h-4 w-4 text-accent" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 px-5 py-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Следующий шаг</div>
                      <p className="mt-2 text-sm text-white/75 sm:text-base">
                        Сохраните расчёт, поделитесь им или сразу отправьте заявку — все данные подтянутся автоматически.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleApplyToForm}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent via-accent to-accent-alt px-6 py-3 text-sm font-semibold text-white shadow-[0_24px_45px_-24px_rgba(212,175,55,0.6)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"

                      >
                        Перейти к заявке
                        <ArrowRightIcon className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveClick}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-inner transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                      >
                        <SaveIcon className="h-4 w-4" aria-hidden />
                        Сохранить расчёт
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Поделиться расчётом</div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleShare('whatsapp')}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/35 hover:text-white"
                        >
                           <WhatsAppLineIcon className="h-4 w-4 text-[#25D366]" aria-hidden />
                          WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShare('email')}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/35 hover:text-white"
                        >
                          <MailIcon className="h-4 w-4" aria-hidden />
                          Email
                        </button>
                      </div>
                    </div>
                    {saveStatus === 'saved' && (
                      <p className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 shadow-inner">
                        Расчёт сохранён — он уже прикреплён к заявке.
                      </p>
                    )}
                    {saveStatus === 'error' && (
                      <p className="rounded-full bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-200 shadow-inner">
                        Не удалось сохранить. Попробуйте ещё раз.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {isModal && step === 'inputs' && (
            <div className="mt-4 flex justify-end sm:mt-6">
              <button
                type="button"
                onClick={() => setStep('results')}

                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(212,175,55,0.6)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                Далее
              </button>
            </div>
          )}





        </div>
      </div >
    </section >
  );
}

function Field({ label, valueNode, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_55px_rgba(3,7,18,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">{label}</label>
          {hint ? <div className="mt-1 text-xs text-white/55">{hint}</div> : null}
        </div>
        <div className="shrink-0">{valueNode}</div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ValueBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-mono font-semibold text-white">
      {children}
    </span>
  );
}

function SummaryItem({ label, value, description }: SummaryItemProps) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left shadow-inner">
      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">{label}</span>
      <span className="text-sm font-mono font-semibold text-white">{value}</span>
      {description ? <span className="text-xs text-white/60">{description}</span> : null}
    </div>
  );
}

function NumberInput({ value, min, max, step, onChange }: NumberInputProps) {
  return (
    <input
      type="number"
      inputMode="numeric"
      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white shadow-inner outline-none transition focus:border-accent"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}

function SliderControl({ value, min, max, step, onChange }: SliderControlProps) {
  const clampedValue = Math.min(Math.max(value, min), max);

  return (
    <Slider
      value={[clampedValue]}
      min={min}
      max={max}
      step={step}
      onValueChange={(values) => {
        const nextValue = values[0];
        if (typeof nextValue === 'number' && !Number.isNaN(nextValue)) {
          onChange(nextValue);
        }
      }}
    />



  );
}
