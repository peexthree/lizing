'use client'

import { useState, useEffect } from 'react'
import Slider from './ui/Slider'
import { z } from 'zod'

function formatRub(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽'
}

export default function Calculator() {
  const [cost, setCost] = useState(5000000)
  const [advanceMode, setAdvanceMode] = useState<'percent' | 'currency'>('percent')
  const [advance, setAdvance] = useState(20)
  const [term, setTerm] = useState(36)
  const [rate, setRate] = useState(15)
  const [showRate, setShowRate] = useState(false)
  const [residual, setResidual] = useState(10)
  const [error, setError] = useState('')

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ cost?: number; term?: number; advance?: number }>).detail
      if (detail.cost !== undefined) setCost(detail.cost)
      if (detail.term !== undefined) setTerm(detail.term)
      if (detail.advance !== undefined) {
        setAdvanceMode('percent')
        setAdvance(detail.advance)
      }
    }
    window.addEventListener('prefill-calculator', handler)
    return () => window.removeEventListener('prefill-calculator', handler)
  }, [])

  const schema = z.object({
    cost: z.number().min(100000),
    advance: z.number().min(0),
    term: z.number().min(1),
    rate: z.number().min(0),
    residual: z.number().min(0)
  })

  const advanceRub = advanceMode === 'percent' ? (cost * advance) / 100 : advance
  const advancePercent = advanceMode === 'percent' ? advance : cost ? (advance / cost) * 100 : 0
  const residualRub = (cost * residual) / 100
  const financed = cost - advanceRub - residualRub
  const monthlyRate = rate / 12 / 100
  const monthlyPayment = financed > 0 && monthlyRate > 0
    ? financed * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    : financed / term
  const total = advanceRub + residualRub + monthlyPayment * term
  const overpayment = total - cost

  function toggleAdvanceMode() {
    if (advanceMode === 'percent') {
      setAdvanceMode('currency')
      setAdvance(Math.round((cost * advance) / 100))
    } else {
      setAdvanceMode('percent')
      setAdvance(cost ? Math.round((advance / cost) * 100) : 0)
    }
  }

  function handleClick() {
    const parsed = schema.safeParse({ cost, advance: advanceRub, term, rate, residual: residualRub })
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
      </div>
      <div className="mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Калькулятор</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Рассчитайте комфортный платёж за минуту</h2>
          <p className="mt-4 text-lg text-dark/65">
            Подберите стоимость, аванс и срок — результаты сразу можно отправить в заявку на одобрение.
          </p>
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