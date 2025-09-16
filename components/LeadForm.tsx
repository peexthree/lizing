'use client'

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

type Status = 'idle' | 'ok' | 'err'

type FormState = {
  name: string
  phone: string
  email: string
  company: string
  equipment: string
  comment: string
  calc: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  referrer: string
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  equipment: '',
  comment: '',
  calc: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  referrer: ''
}

const calculatorFields = [
  'cost',
  'advance',
  'term',
  'rate',
  'residual',
  'monthly',
  'overpayment',
  'total'
] as const

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<Status>('idle')
  const [sending, setSending] = useState(false)
  const [agree, setAgree] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    setForm((prev) => ({
      ...prev,
      utm_source: params.get('utm_source') ?? prev.utm_source,
      utm_medium: params.get('utm_medium') ?? prev.utm_medium,
      utm_campaign: params.get('utm_campaign') ?? prev.utm_campaign,
      utm_content: params.get('utm_content') ?? prev.utm_content,
      referrer: document.referrer || prev.referrer
    }))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateSummary = (event?: Event) => {
      let summary = ''
      if (event && 'detail' in event) {
        const detail = (event as CustomEvent<string>).detail
        if (typeof detail === 'string') summary = detail
      }
      if (!summary) summary = window.localStorage.getItem('calc') ?? ''

      setForm((prev) => (prev.calc === summary ? prev : { ...prev, calc: summary }))
    }

    updateSummary()
    document.addEventListener('calc-summary', updateSummary as EventListener)
    window.addEventListener('focus', updateSummary)

    return () => {
      document.removeEventListener('calc-summary', updateSummary as EventListener)
      window.removeEventListener('focus', updateSummary)
    }
  }, [])

  const handleChange = (field: keyof FormState) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setStatus('idle')
  }

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '')
    setForm((prev) => ({ ...prev, phone: formatPhone(digits) }))
    setStatus('idle')
  }

  const normalizePhone = (value: string) => {
    let digits = value.replace(/\D/g, '')
    if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
    if (digits.length === 10) digits = `7${digits}`
    if (!digits.startsWith('7') && digits.length > 0) {
      digits = `7${digits.slice(-10)}`
    }
    return digits.slice(0, 11)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return

    const formData = new FormData(event.currentTarget)
    const values: Record<string, string> = {}
    formData.forEach((value, key) => {
      if (typeof value === 'string') values[key] = value
    })

    const name = (values.name ?? form.name).trim()
    const phoneDigits = normalizePhone(values.phone ?? form.phone)

    if (!agree || name.length < 2 || phoneDigits.length < 10) {
      setStatus('err')
      return
    }

    const payload: Record<string, string> = {
      source: 'lead-form',
      name,
      phone: `+${phoneDigits}`,
      phone_display: form.phone,
      calc: form.calc,
      utm_source: form.utm_source,
      utm_medium: form.utm_medium,
      utm_campaign: form.utm_campaign,
      utm_content: form.utm_content,
      referrer: form.referrer
    }

    const optionalFields: Array<[keyof FormState, string]> = [
      ['email', values.email ?? form.email],
      ['company', values.company ?? form.company],
      ['equipment', values.equipment ?? form.equipment],
      ['comment', values.comment ?? form.comment]
    ]

    for (const [field, value] of optionalFields) {
      const trimmed = value.trim()
      if (trimmed) payload[field] = trimmed
    }

    for (const key of calculatorFields) {
      const value = values[key]
      if (value) payload[key] = value
    }

    setSending(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('bad status')

      setStatus('ok')
      setAgree(false)
      setForm((prev) => ({
        ...initialState,
        calc: prev.calc,
        utm_source: prev.utm_source,
        utm_medium: prev.utm_medium,
        utm_campaign: prev.utm_campaign,
        utm_content: prev.utm_content,
        referrer: prev.referrer
      }))
    } catch {
      setStatus('err')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="lead-form" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="floating-orb left-[18%] top-[10rem] hidden h-[280px] w-[280px] bg-white/35 md:block" />
        <div className="floating-orb right-[15%] bottom-[-4rem] hidden h-[320px] w-[320px] bg-accent/20 lg:block" />
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Заявка</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Получите персональный расчёт под ваш проект</h2>
          <p className="mt-4 text-lg text-dark/70">
            Мы перезвоним в течение 15 минут в рабочее время, уточним детали и предложим лучшие варианты от партнёров.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Персональный менеджер
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Проверка договоров
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Сопровождение до выдачи
            </span>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-[2.5rem] border border-white/60 bg-white/85 p-8 shadow-hero backdrop-blur-2xl animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <input type="hidden" name="source" value="lead-form" />
          <input type="hidden" name="utm_source" value={form.utm_source} />
          <input type="hidden" name="utm_medium" value={form.utm_medium} />
          <input type="hidden" name="utm_campaign" value={form.utm_campaign} />
          <input type="hidden" name="utm_content" value={form.utm_content} />
          <input type="hidden" name="referrer" value={form.referrer} />
          <input type="hidden" name="calc_summary" value={form.calc} />
          {calculatorFields.map((field) => (
            <input key={field} type="hidden" name={field} />
          ))}

          {form.calc && (
            <div className="mb-8 rounded-3xl border border-accent/20 bg-accent/10 p-5 text-left text-sm text-dark/70 shadow-inner">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">Расчёт из калькулятора</div>
              <p className="mt-2 leading-relaxed">{form.calc}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="lead-name" className="text-sm font-semibold text-dark">
                Имя
              </label>
              <input
                id="lead-name"
                name="name"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Как к вам обращаться"
                value={form.name}
                onChange={handleChange('name')}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lead-phone" className="text-sm font-semibold text-dark">
                Телефон
              </label>
              <input
                id="lead-phone"
                name="phone"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={handlePhone}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lead-email" className="text-sm font-semibold text-dark">
                Email
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Для отправки расчёта"
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lead-company" className="text-sm font-semibold text-dark">
                Компания
              </label>
              <input
                id="lead-company"
                name="company"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Юрлицо или ИП"
                value={form.company}
                onChange={handleChange('company')}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="lead-equipment" className="text-sm font-semibold text-dark">
                Что нужно профинансировать
              </label>
              <input
                id="lead-equipment"
                name="equipment"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Например, тягач, экскаватор, автобус"
                value={form.equipment}
                onChange={handleChange('equipment')}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="lead-comment" className="text-sm font-semibold text-dark">
                Комментарий
              </label>
              <textarea
                id="lead-comment"
                name="comment"
                rows={4}
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Дополнительные детали, удобное время звонка"
                value={form.comment}
                onChange={handleChange('comment')}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="flex items-start gap-3 text-sm text-dark/70">
              <input
                type="checkbox"
                className="mt-1 accent-accent"
                checked={agree}
                onChange={(event) => setAgree(event.currentTarget.checked)}
              />
              <span>
                Согласен с{' '}
                <a
                  href="/privacy"
                  className="font-semibold text-accent underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  политикой обработки персональных данных
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={sending || !agree}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-[1]">{sending ? 'Отправляем…' : 'Оставить заявку'}</span>
              <span className="absolute inset-0 translate-x-[-70%] bg-gradient-to-r from-white/30 via-white/60 to-transparent opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Одобрение 24 часа</span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Подбор техники
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Отчёт для бухгалтерии
            </span>
          </div>

          <div className="mt-4 space-y-2 text-sm" aria-live="polite">
            {status === 'ok' && (
              <p className="rounded-2xl bg-green-100/70 px-4 py-3 text-green-700">
                Спасибо! Менеджер свяжется в течение 15 минут в рабочее время.
              </p>
            )}
            {status === 'err' && (
              <p className="rounded-2xl bg-red-100/70 px-4 py-3 text-red-600">
                Проверьте поля и попробуйте ещё раз.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

function formatPhone(digits: string) {
  if (!digits) return ''

  let normalized = digits
  if (normalized.startsWith('8')) normalized = `7${normalized.slice(1)}`
  if (normalized.length > 11) normalized = normalized.slice(0, 11)
  if (!normalized.startsWith('7')) normalized = `7${normalized.slice(0, 10)}`

  const part1 = normalized.slice(1, 4)
  const part2 = normalized.slice(4, 7)
  const part3 = normalized.slice(7, 9)
  const part4 = normalized.slice(9, 11)

  let result = '+7'
  if (part1) {
    result += ` (${part1}`
    if (part1.length === 3) result += ')'
  }
  if (part2) result += ` ${part2}`
  if (part3) result += `-${part3}`
  if (part4) result += `-${part4}`

  return result
}