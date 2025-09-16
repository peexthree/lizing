'use client'

import { ChangeEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { z } from 'zod'
import { openLeadForm } from '@/lib/openLeadForm'
import Slider from './ui/Slider'

const rubFormatter = new Intl.NumberFormat('ru-RU')

function formatRub(n: number) {
  return `${rubFormatter.format(Math.round(n))} ₽`
}

type CalculatorProps = {
  variant?: 'page' | 'modal'
  id?: string
}

const calculationSchema = z.object({
  cost: z.number().min(100_000),
  advance: z.number().min(0),
  term: z.number().min(1),
  rate: z.number().min(0),
  residual: z.number().min(0)
})

type PrefillDetail = { cost?: number; term?: number; advance?: number }

type SummaryCardProps = {
  title: string
  value: string
  valueClassName?: string
  description?: string
}

const SummaryCard = memo(function SummaryCard({ title, value, description, valueClassName }: SummaryCardProps) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur">
      <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">{title}</div>
      <div className={`mt-2 font-semibold text-dark ${valueClassName ?? 'text-2xl'}`}>{value}</div>
      {description ? <p className="mt-1 text-xs text-dark/60">{description}</p> : null}
    </div>
  )
})

SummaryCard.displayName = 'SummaryCard'

export default function Calculator({ variant = 'page', id = 'calculator' }: CalculatorProps) {
  const isModal = variant === 'modal'  
  const [cost, setCost] = useState(5_000_000)
  const [advanceMode, setAdvanceMode] = useState<'percent' | 'currency'>('percent')
  const [advance, setAdvance] = useState(20)
  const [term, setTerm] = useState(36)
  const [rate, setRate] = useState(15)
  const [showRate, setShowRate] = useState(false)
  const [residual, setResidual] = useState(10)
  const [error, setError] = useState('')
const [shareOpen, setShareOpen] = useState(false)
  const shareRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<PrefillDetail>).detail
      if (typeof detail.cost === 'number' && Number.isFinite(detail.cost)) {
        setCost(detail.cost)
      }
      if (typeof detail.term === 'number' && Number.isFinite(detail.term)) {
        setTerm(detail.term)
      }
      if (typeof detail.advance === 'number' && Number.isFinite(detail.advance)) {
        setAdvanceMode('percent')
        setAdvance(detail.advance)
      }
    }

    window.addEventListener('prefill-calculator', handler)
    return () => window.removeEventListener('prefill-calculator', handler)
  }, [])

  const calculations = useMemo(() => {
    const safeCost = Number.isFinite(cost) ? Math.max(cost, 0) : 0
    const safeAdvance = Number.isFinite(advance) ? Math.max(advance, 0) : 0
    const safeTerm = Number.isFinite(term) && term > 0 ? term : 1
    const safeRate = Number.isFinite(rate) ? Math.max(rate, 0) : 0
    const safeResidual = Number.isFinite(residual) ? Math.max(residual, 0) : 0

    const advanceRub = advanceMode === 'percent' ? (safeCost * safeAdvance) / 100 : safeAdvance
    const advancePercent = safeCost > 0 ? (advanceRub / safeCost) * 100 : 0
    const residualRub = (safeCost * safeResidual) / 100
    const financed = safeCost - advanceRub - residualRub
    const monthlyRate = safeRate / 12 / 100

    let monthlyPayment = 0
    if (financed > 0) {
      if (monthlyRate > 0) {
        const factor = Math.pow(1 + monthlyRate, safeTerm)
        const denominator = factor - 1
        monthlyPayment = denominator !== 0 ? financed * ((monthlyRate * factor) / denominator) : financed / safeTerm
      } else {
        monthlyPayment = financed / safeTerm
      }
    }

    const total = advanceRub + residualRub + monthlyPayment * safeTerm
    const overpayment = total - safeCost
    const effectiveRate = safeCost > 0 ? (total / safeCost - 1) * 100 : 0
    const financedShare = safeCost > 0 ? (financed / safeCost) * 100 : 0

    const summary = [
      `Стоимость: ${formatRub(safeCost)}`,
      `Аванс: ${formatRub(advanceRub)} (${Math.round(advancePercent)}%)`,
      `Срок: ${Math.max(1, Math.round(safeTerm))} мес.`,
      `Платёж: ${formatRub(monthlyPayment || 0)}`,
      `Переплата: ${formatRub(overpayment || 0)}`,
      `Итого: ${formatRub(total || 0)}`
    ].join(' · ')

    return {
      advanceRub,
      advancePercent,
      residualRub,
      financed,
      monthlyPayment,
      total,
      overpayment,
      effectiveRate,
      financedShare,
      summary
    }
  }, [advance, advanceMode, cost, residual, rate, term])

  const {
    advanceRub,
    advancePercent,
    residualRub,
    financed,
    monthlyPayment,
    total,
    overpayment,
    effectiveRate,
    financedShare,
    summary
  } = calculations

  const summaryCache = useRef<string | null>(null)
  const summaryTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!summary || summary === summaryCache.current) return

    summaryCache.current = summary

    if (summaryTimeout.current !== null) {
      window.clearTimeout(summaryTimeout.current)
    }

    summaryTimeout.current = window.setTimeout(() => {
      summaryTimeout.current = null
      try {
        window.localStorage.setItem('calc', summary)
      } catch (storageError) {
        console.warn('Не удалось сохранить расчёт в localStorage', storageError)
      }
      document.dispatchEvent(new CustomEvent('calc-summary', { detail: summary }))
    }, 160)

    return () => {
      if (summaryTimeout.current !== null) {
        window.clearTimeout(summaryTimeout.current)
        summaryTimeout.current = null
      }
    }
  }, [summary])

  const handleCostChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCost(Number(event.target.value))
  }, [])
const handleCostSliderChange = useCallback((value: number[]) => {
    if (typeof value[0] === 'number' && Number.isFinite(value[0])) {
      setCost(Math.round(value[0]))
    }
  }, [])

  const handleAdvanceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setAdvance(Number(event.target.value))
  }, [])

const handleAdvanceSliderChange = useCallback((value: number[]) => {
    if (typeof value[0] === 'number' && Number.isFinite(value[0])) {
      setAdvance(Math.round(value[0]))
    }
  }, [])


  const handleTermChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTerm(Number(event.target.value))
  }, [])
const handleTermSliderChange = useCallback((value: number[]) => {
    if (typeof value[0] === 'number' && Number.isFinite(value[0])) {
      setTerm(Math.round(value[0]))
    }
  }, [])

  const handleResidualChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setResidual(Number(event.target.value))
  }, [])
const handleResidualSliderChange = useCallback((value: number[]) => {
    if (typeof value[0] === 'number' && Number.isFinite(value[0])) {
      setResidual(Math.round(value[0]))
    }
  }, [])

  const handleRateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRate(Number(event.target.value))
  }, [])

  const handleToggleRate = useCallback(() => {
    setShowRate(previous => !previous)
  }, [])

  const toggleAdvanceMode = useCallback(() => {
    setAdvanceMode(previous => {
      if (previous === 'percent') {
        setAdvance(Math.round(advanceRub))
        return 'currency'
      }
      setAdvance(Math.round(advancePercent))
      return 'percent'
    })
  }, [advancePercent, advanceRub])
 useEffect(() => {
    if (!shareOpen) return

    const handleClick = (event: MouseEvent) => {
      if (!shareRef.current) return
      if (!shareRef.current.contains(event.target as Node)) {
        setShareOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShareOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [shareOpen])

  const handleShare = useCallback(
    (channel: 'whatsapp' | 'email') => {
      if (!summary) return

      const encodedSummary = encodeURIComponent(summary)

      if (channel === 'whatsapp') {
        const link = `https://wa.me/?text=${encodedSummary}`
        window.open(link, '_blank', 'noopener,noreferrer')
      } else {
        const subject = encodeURIComponent('Расчёт по лизингу')
        const body = encodeURIComponent(`${summary}\n\nОтправлено с калькулятора на lizing-i-tochka.ru`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`
      }

      setShareOpen(false)
    },
    [summary]
  )

  const handleApplyToForm = useCallback(() => {
    const parsed = calculationSchema.safeParse({
      cost,
      advance: advanceRub,
      term,
      rate,
      residual: residualRub
    })

    if (!parsed.success) {
      setError('Проверьте значения')
      return
    }

    setError('')
 openLeadForm({
      calcSummary: summary,
      fields: {
        cost: String(Math.round(cost)),
        advance: String(Math.round(advanceRub)),
        term: String(Math.round(term)),
        rate: String(Math.round(rate)),
        residual: String(Math.round(residualRub)),
        monthly: String(Math.round(monthlyPayment)),
        overpayment: String(Math.round(overpayment)),
        total: String(Math.round(total))

      }

     })
  }, [advanceRub, cost, monthlyPayment, overpayment, residualRub, summary, term, rate, total])

  const primaryMetrics = useMemo(
    () => [
      { title: 'Месячный платёж', value: formatRub(monthlyPayment > 0 ? monthlyPayment : 0) },
      { title: 'Переплата', value: formatRub(overpayment > 0 ? overpayment : 0) },
      { title: 'Итого к выкупу', value: formatRub(total > 0 ? total : 0) }
    ],
    [monthlyPayment, overpayment, total]
  )

  const secondaryMetrics = useMemo(
    () => [
      {
        title: 'Финансирование',
        value: formatRub(financed > 0 ? financed : 0),
        description: `${financedShare.toFixed(0)}% от стоимости техники`
      },
      {
        title: 'Эффективная ставка',
        value: `${effectiveRate.toFixed(1)}%`,
        description: 'С учётом аванса и остаточного платежа'
      },
      {
        title: 'Храним расчёт',
        value: 'В форме заявки',
        description: 'Передадим менеджеру вместе с контактами',
        valueClassName: 'text-lg'
      }
    ],
    [effectiveRate, financed, financedShare]
  )


const wrapperClasses = isModal ? 'mx-auto max-w-4xl px-3 sm:px-4' : 'mx-auto max-w-4xl px-4'
  const cardWrapperMargin = isModal ? 'mt-8' : 'mt-12'

  return (
    <section id={id} className={isModal ? 'py-6 sm:py-8' : 'py-24'}>
      <div className={wrapperClasses}>
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Калькулятор</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Рассчитайте комфортный платёж за минуту</h2>
          <p className="mt-4 text-lg text-dark/65">
            Подберите стоимость, аванс и срок — результаты сразу можно отправить в заявку на одобрение.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">Живое обновление</span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">Сохраняем расчёт</span>
          </div>
        </div>

        <div className={`${cardWrapperMargin} rounded-[2.5rem] border border-white/60 bg-white/85 p-8 shadow-hero backdrop-blur-2xl animate-fade-up`}>
          <div className="space-y-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-dark">Стоимость техники</label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="number"
                    value={cost}
                    onChange={handleCostChange}
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-48"
                  />
                  <span className="text-sm text-dark/60">{formatRub(cost)}</span>
                </div>
                <div className="mt-3">
                     <Slider
                    min={100_000}
                    max={20_000_000}
                    step={100_000}
                    value={[Math.min(Math.max(cost, 100_000), 20_000_000)]}
                    onValueChange={handleCostSliderChange}
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-dark/40">
                    <span>100 тыс.</span>
                    <span>20 млн</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark">Аванс</label>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleAdvanceMode}
                    className="rounded-full border border-accent/40 bg-white/80 px-3 py-2 text-xs font-semibold text-accent shadow-sm transition hover:border-accent hover:bg-white"
                  >
                    {advanceMode === 'percent' ? '%' : '₽'}
                  </button>
                  <input
                    type="number"
                    value={advance}
                    onChange={handleAdvanceChange}
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-40"
                  />
                  <span className="text-sm text-dark/60">
                    {advanceMode === 'percent' ? formatRub(advanceRub) : `${Math.round(advancePercent)} %`}
                  </span>
                </div>
                <div className="mt-3">
                  <Slider
                    min={0}
                     max={advanceMode === 'percent' ? 90 : Math.max(cost, 0)}
                    step={advanceMode === 'percent' ? 1 : 1_000}
                                 value={[Math.min(Math.max(advance, 0), advanceMode === 'percent' ? 90 : Math.max(cost, 0))]}
                    onValueChange={handleAdvanceSliderChange}
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-dark/40">
                    <span>0%</span>
                    <span>{advanceMode === 'percent' ? '90%' : formatRub(cost)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-dark">Срок (мес)</label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="number"
                    value={term}
                    onChange={handleTermChange}
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-40"
                  />
                </div>
                <div className="mt-3">
                  <Slider
                    min={1}
                    max={60}
                    step={1}
                    value={[Math.min(Math.max(term, 1), 60)]}
                    onValueChange={handleTermSliderChange}
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-dark/40">
                    <span>1 мес.</span>
                    <span>60 мес.</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark">Остаточный платёж (%)</label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="number"
                    value={residual}
                    onChange={handleResidualChange}
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-40"
                  />
                  <span className="text-sm text-dark/60">{formatRub(residualRub)}</span>
                </div>
                <div className="mt-3">
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    value={[Math.min(Math.max(residual, 0), 50)]}
                    onValueChange={handleResidualSliderChange}
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-dark/40">
                    <span>0%</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={handleToggleRate}
                className="text-sm font-semibold text-accent underline decoration-dotted underline-offset-4 transition hover:text-accent/80"
              >
                {showRate ? 'Скрыть ставку' : 'Изменить ставку'}
              </button>
              {showRate ? (
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold text-dark">Ставка (%)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={handleRateChange}
                    className="w-full max-w-[120px] rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {primaryMetrics.map(metric => (
                <SummaryCard key={metric.title} title={metric.title} value={metric.value} />
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {secondaryMetrics.map(metric => (
                <SummaryCard
                  key={metric.title}
                  title={metric.title}
                  value={metric.value}
                  description={metric.description}
                  valueClassName={metric.valueClassName}
                />
              ))}
            </div>
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}
                <div ref={shareRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setShareOpen(previous => !previous)}
                    className="inline-flex w-full items-center justify-between gap-3 rounded-full border border-accent/30 bg-white/90 px-6 py-3 text-sm font-semibold text-accent shadow-sm transition hover:border-accent hover:shadow-glow md:w-auto"
                    aria-expanded={shareOpen}
                    aria-haspopup="menu"
                  >
                    <span>Отправить расчёт себе на WhatsApp/Email</span>
                    <span className={`text-xs transition ${shareOpen ? 'rotate-180' : ''}`} aria-hidden>
                      ▾
                    </span>
                  </button>
                  {shareOpen ? (
                    <div
                      role="menu"
                      className="absolute left-0 top-[calc(100%+0.5rem)] z-10 w-72 rounded-3xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/40">Поделиться расчётом</p>
                      <div className="mt-3 space-y-2">
                        <button
                          type="button"
                          onClick={() => handleShare('whatsapp')}
                          className="w-full rounded-2xl bg-[#25D366]/10 px-4 py-3 text-left text-sm font-semibold text-[#1A8E4B] transition hover:bg-[#25D366]/20"
                        >
                          Отправить в WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShare('email')}
                          className="w-full rounded-2xl bg-accent/10 px-4 py-3 text-left text-sm font-semibold text-accent transition hover:bg-accent/15"
                        >
                          Отправить на Email
                        </button>
                      </div>
                      <p className="mt-3 text-[11px] text-dark/60">Мы подготовим текст с ключевыми параметрами и откроем выбранный канал.</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={handleApplyToForm}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                <span className="relative z-[1]">Использовать в заявке</span>
                <span className="absolute inset-0 translate-x-[-70%] bg-gradient-to-r from-white/30 via-white/60 to-transparent opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}