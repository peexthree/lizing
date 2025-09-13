'use client'

import { useState } from 'react'
import Slider from './ui/Slider'
import { z } from 'zod'

function formatRub(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽'
}

export default function Calculator() {
  const [cost, setCost] = useState(5000000)
  const [advanceMode, setAdvanceMode] = useState<'percent' | 'currency'>('percent')
  const [advance, setAdvance] = useState(20) // percent or rub
  const [term, setTerm] = useState(36)
  const [rate, setRate] = useState(15)
  const [showRate, setShowRate] = useState(false)
  const [residual, setResidual] = useState(10)
  const [error, setError] = useState('')

  const schema = z.object({
    cost: z.number().min(100000),
    advance: z.number().min(0),
    term: z.number().min(1),
    rate: z.number().min(0),
    residual: z.number().min(0),
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
    <section id="calculator" className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold">Калькулятор</h2>
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium">Стоимость техники</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="number"
                className="w-40 rounded border p-2"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
              />
              <span className="text-sm text-gray-500">{formatRub(cost)}</span>
            </div>
            <div className="mt-2">
              <Slider
                min={100000}
                max={20000000}
                step={100000}
                value={cost}
                onChange={(e) => setCost(Number((e.target as HTMLInputElement).value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Аванс</label>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleAdvanceMode}
                className="rounded border px-2 py-1 text-xs"
              >
                {advanceMode === 'percent' ? '%' : '₽'}
              </button>
              <input
                type="number"
                className="w-32 rounded border p-2"
                value={advance}
                onChange={(e) => setAdvance(Number(e.target.value))}
              />
              <span className="text-sm text-gray-500">
                {advanceMode === 'percent'
                  ? formatRub(advanceRub)
                  : `${Math.round(advancePercent)} %`}
              </span>
            </div>
            <div className="mt-2">
              <Slider
                min={0}
                max={advanceMode === 'percent' ? 90 : cost}
                step={advanceMode === 'percent' ? 1 : 1000}
                value={advance}
                onChange={(e) => setAdvance(Number((e.target as HTMLInputElement).value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Срок (мес)</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="number"
                className="w-32 rounded border p-2"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
              />
            </div>
            <div className="mt-2">
              <Slider
                min={1}
                max={60}
                step={1}
                value={term}
                onChange={(e) => setTerm(Number((e.target as HTMLInputElement).value))}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowRate((s) => !s)}
              className="text-sm text-gray-600 underline"
            >
              {showRate ? 'Скрыть ставку' : 'Изменить ставку'}
            </button>
            {showRate && (
              <div className="mt-2">
                <label className="block text-sm font-medium">Ставка (%)</label>
                <input
                  type="number"
                  className="mt-1 w-32 rounded border p-2"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Остаточный платёж (%)</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="number"
                className="w-32 rounded border p-2"
                value={residual}
                onChange={(e) => setResidual(Number(e.target.value))}
              />
              <span className="text-sm text-gray-500">{formatRub(residualRub)}</span>
            </div>
            <div className="mt-2">
              <Slider
                min={0}
                max={50}
                step={1}
                value={residual}
                onChange={(e) => setResidual(Number((e.target as HTMLInputElement).value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
            <div>
              <div className="text-sm text-gray-500">Ежемесячный платеж</div>
              <div className="text-lg font-semibold">{formatRub(monthlyPayment)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Переплата</div>
              <div className="text-lg font-semibold">{formatRub(overpayment)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Итого к выкупу</div>
              <div className="text-lg font-semibold">{formatRub(total)}</div>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={handleClick}
              className="rounded-2xl bg-accent px-6 py-3 text-white shadow"
            >
              Получить одобрение
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}