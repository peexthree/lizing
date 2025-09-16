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

  const summaryCache = useRef<string>()
  const summaryTimeout = useRef<number>()

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