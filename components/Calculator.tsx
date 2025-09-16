'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Slider from './ui/Slider'
import { z } from 'zod'

const rubFormatter = new Intl.NumberFormat('ru-RU')

function formatRub(n: number) {
  return `${rubFormatter.format(Math.round(n))} ₽`
}

const calculationSchema = z.object({
  cost: z.number().min(100000),
  advance: z.number().min(0),
  term: z.number().min(1),
  rate: z.number().min(0),
  residual: z.number().min(0)
})

type PrefillDetail = { cost?: number; term?: number; advance?: number }

export default function Calculator() {
  const [cost, setCost] = useState(5_000_000)
  const [advanceMode, setAdvanceMode] = useState<'percent' | 'currency'>('percent')
  const [advance, setAdvance] = useState(20)
  const [term, setTerm] = useState(36)
  const [rate, setRate] = useState(15)
  const [showRate, setShowRate] = useState(false)
  const [residual, setResidual] = useState(10)
  const [error, setError] = useState('')

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
      `Срок: ${Math.max(1, Math.round(term))} мес.`,
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

    if (summaryTimeout.current) {
      window.clearTimeout(summaryTimeout.current)
    }

    summaryTimeout.current = window.setTimeout(() => {
      summaryTimeout.current = undefined
      try {
        window.localStorage.setItem('calc', summary)
      } catch (error) {
        console.warn('Не удалось сохранить расчёт в localStorage', error)
      }
      document.dispatchEvent(new CustomEvent('calc-summary', { detail: summary }))
    }, 160)

    return () => {
      if (summaryTimeout.current) {
        window.clearTimeout(summaryTimeout.current)
        summaryTimeout.current = undefined
      }
    }
  }, [summary])

  function toggleAdvanceMode() {
    if (advanceMode === 'percent') {
      setAdvanceMode('currency')
      setAdvance(Math.round(advanceRub))
    } else {
      setAdvanceMode('percent')
      setAdvance(Math.round(advancePercent))
    }
  }

  function handleClick() {
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
    const form = document.querySelector('#lead-form form') as HTMLFormElement | null
    if (form) {
      const set = (name: string, value: number) => {
        const input = form.querySelector(`input[name="${name}"]`) as HTMLInputElement | null
        if (input) input.value = String(Math.round(value))
      }
      set('cost', cost)
      set('advance', advanceRub)
      set('term', term)
      set('rate', rate)
      set('residual', residualRub)
      set('monthly', monthlyPayment)
      set('overpayment', overpayment)
      set('total', total)
    }
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="calculator" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/40 to-transparent" />
        <div className="floating-orb left-[15%] top-[12rem] hidden h-[300px] w-[300px] bg-accent/20 lg:block" />
        <div className="floating-orb right-[18%] bottom-[-4rem] hidden h-[260px] w-[260px] bg-white/35 md:block" />
      </div>
      <div className="mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Калькулятор</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Рассчитайте комфортный платёж за минуту</h2>
          <p className="mt-4 text-lg text-dark/65">
            Подберите стоимость, аванс и срок — результаты сразу можно отправить в заявку на одобрение.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Живое обновление
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Сохраняем расчёт
            </span>
          </div>
        </div>
            <div
          className="mt-12 rounded-[2.5rem] border border-white/60 bg-white/85 p-8 shadow-hero backdrop-blur-2xl animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="space-y-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-dark">Стоимость техники</label>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="number"
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-48"
                    value={cost}
                    onChange={e => setCost(Number(e.target.value))}
                  />
                  <span className="text-sm text-dark/60">{formatRub(cost)}</span>
                </div>
                <div className="mt-3">
                  <Slider
                    min={100000}
                    max={20000000}
                    step={100000}
                    value={cost}
                    onChange={e => setCost(Number((e.target as HTMLInputElement).value))}
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
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-40"
                    value={advance}
                    onChange={e => setAdvance(Number(e.target.value))}
                  />
                  <span className="text-sm text-dark/60">
                    {advanceMode === 'percent' ? formatRub(advanceRub) : `${Math.round(advancePercent)} %`}
                  </span>
                </div>
                <div className="mt-3">
                  <Slider
                    min={0}
                    max={advanceMode === 'percent' ? 90 : cost}
                    step={advanceMode === 'percent' ? 1 : 1000}
                    value={advance}
                    onChange={e => setAdvance(Number((e.target as HTMLInputElement).value))}
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-dark/40">
                    <span>0%</span>
                    <span>{advanceMode === 'percent' ? '90%' : `${formatRub(cost)}`}</span>
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
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-40"
                    value={term}
                    onChange={e => setTerm(Number(e.target.value))}
                  />
                </div>
                <div className="mt-3">
                  <Slider
                    min={1}
                    max={60}
                    step={1}
                    value={term}
                    onChange={e => setTerm(Number((e.target as HTMLInputElement).value))}
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
                    className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30 md:w-40"
                    value={residual}
                    onChange={e => setResidual(Number(e.target.value))}
                  />
                  <span className="text-sm text-dark/60">{formatRub(residualRub)}</span>
                </div>
                <div className="mt-3">
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    value={residual}
                    onChange={e => setResidual(Number((e.target as HTMLInputElement).value))}
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
                onClick={() => setShowRate(s => !s)}
                className="text-sm font-semibold text-accent underline decoration-dotted underline-offset-4 transition hover:text-accent/80"
              >
                {showRate ? 'Скрыть ставку' : 'Изменить ставку'}
              </button>
              {showRate && (
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold text-dark">Ставка (%)</label>
                  <input
                    type="number"
                    className="w-full max-w-[120px] rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    value={rate}
                    onChange={e => setRate(Number(e.target.value))}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">Месячный платёж</div>
                <div className="mt-2 text-2xl font-semibold text-dark">{formatRub(monthlyPayment || 0)}</div>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">Переплата</div>
                <div className="mt-2 text-2xl font-semibold text-dark">{formatRub(overpayment || 0)}</div>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">Итого к выкупу</div>
                <div className="mt-2 text-2xl font-semibold text-dark">{formatRub(total || 0)}</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">Финансирование</div>
                <div className="mt-2 text-lg font-semibold text-dark">{formatRub(financed > 0 ? financed : 0)}</div>
                <p className="mt-1 text-xs text-dark/60">{financedShare.toFixed(0)}% от стоимости техники</p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">Эффективная ставка</div>
                <div className="mt-2 text-lg font-semibold text-dark">{effectiveRate.toFixed(1)}%</div>
                <p className="mt-1 text-xs text-dark/60">С учётом аванса и остаточного платежа</p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-wide text-dark/50">Храним расчёт</div>
                <div className="mt-2 text-lg font-semibold text-dark">В форме заявки</div>
                <p className="mt-1 text-xs text-dark/60">Передадим менеджеру вместе с контактами</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              {error && <p className="text-sm font-medium text-red-500">{error}</p>}
              <button
                type="button"
                onClick={handleClick}
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