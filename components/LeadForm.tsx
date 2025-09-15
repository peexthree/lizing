'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/),
  clientType: z.enum(['ООО', 'ИП', 'Самозанятый', 'Физлицо']),
  tech: z.enum(['легковой', 'грузовой', 'спец']),
  budget: z.string().optional(),
  comment: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  referrer: z.string().optional(),
  calc: z.string().optional(),
  honeypot: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>
type FormState = Omit<SchemaType, 'clientType' | 'tech'> & {
  clientType: '' | SchemaType['clientType']
  tech: '' | SchemaType['tech']
}

const initialState: FormState = {
  name: '',
  phone: '',
  clientType: '',
  tech: '',
  budget: '',
  comment: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  referrer: '',
  calc: '',
  honeypot: '',
}

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [sending, setSending] = useState(false)
  const [agree, setAgree] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setForm((f) => ({
      ...f,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      referrer: document.referrer || '',
      calc: localStorage.getItem('calc') || '',
    }))
  }, [])

  function handleChange<K extends keyof FormState>(key: K) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      setForm({ ...form, [key]: (e.target as HTMLInputElement).value })
    }
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    let formatted = '+7'
    if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`
    if (digits.length >= 3) formatted += ')'
    if (digits.length >= 4) formatted += ` ${digits.slice(3, 6)}`
    if (digits.length >= 6) formatted += `-${digits.slice(6, 8)}`
    if (digits.length >= 8) formatted += `-${digits.slice(8, 10)}`
    setForm({ ...form, phone: formatted })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')
    if (form.honeypot) return
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      setStatus('err')
      return
    }
    setSending(true)
   try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('ok')
      setForm({
        ...initialState,
        utm_source: form.utm_source,
        utm_medium: form.utm_medium,
        utm_campaign: form.utm_campaign,
        utm_content: form.utm_content,
        referrer: form.referrer,
        calc: form.calc,
      })
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
      </div>
      <div className="mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Заявка</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Получите персональный расчёт под ваш проект</h2>
          <p className="mt-4 text-lg text-dark/70">
            Мы перезвоним в течение 15 минут в рабочее время, уточним детали и предложим лучшие варианты от партнёров.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="mt-12 rounded-[2.5rem] border border-white/60 bg-white/85 p-8 shadow-hero backdrop-blur-2xl animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="lead-name" className="text-sm font-semibold text-dark">
                Имя
              </label>
              <input
                id="lead-name"
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
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={handlePhone}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lead-client" className="text-sm font-semibold text-dark">
                Тип клиента
              </label>
              <select
                id="lead-client"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                value={form.clientType}
                onChange={handleChange('clientType')}
                required
              >
                <option value="">Выберите тип</option>
                <option>ООО</option>
                <option>ИП</option>
                <option>Самозанятый</option>
                <option>Физлицо</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="lead-tech" className="text-sm font-semibold text-dark">
                Вид техники
              </label>
              <select
                id="lead-tech"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                value={form.tech}
                onChange={handleChange('tech')}
                required
              >
                <option value="">Что планируете приобрести</option>
                <option>легковой</option>
                <option>грузовой</option>
                <option>спец</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="lead-budget" className="text-sm font-semibold text-dark">
                Бюджет / стоимость
              </label>
              <input
                id="lead-budget"
                className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Например, 5 000 000 ₽"
                value={form.budget}
                onChange={handleChange('budget')}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="lead-comment" className="text-sm font-semibold text-dark">
                Комментарий
              </label>
              <textarea
                id="lead-comment"
                className="h-28 w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Опишите задачу, сроки, предпочтения"
                value={form.comment}
                onChange={handleChange('comment')}
              />
            </div>
          </div>
          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={form.honeypot}
            onChange={handleChange('honeypot')}
          />
          <input type="hidden" value={form.utm_source} name="utm_source" />
          <input type="hidden" value={form.utm_medium} name="utm_medium" />
          <input type="hidden" value={form.utm_campaign} name="utm_campaign" />
          <input type="hidden" value={form.utm_content} name="utm_content" />
          <input type="hidden" value={form.referrer} name="referrer" />
          <input type="hidden" value={form.calc} name="calc" />
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="flex items-start gap-3 text-xs text-dark/70">
              <input
                type="checkbox"
                className="mt-1 accent-accent"
                checked={agree}
                onChange={e => setAgree((e.target as HTMLInputElement).checked)}
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
              <span className="relative z-[1]">Оставить заявку</span>
              <span className="absolute inset-0 translate-x-[-70%] bg-gradient-to-r from-white/30 via-white/60 to-transparent opacity-0 transition duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            {status === 'ok' && (
              <p className="rounded-2xl bg-green-100/70 px-4 py-3 text-green-700" role="status" aria-live="polite">
                Спасибо! Менеджер свяжется в течение 15 минут в рабочее время.
              </p>
            )}
            {status === 'err' && (
              <p className="rounded-2xl bg-red-100/70 px-4 py-3 text-red-600" role="status" aria-live="polite">
                Проверьте поля и попробуйте ещё раз.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}