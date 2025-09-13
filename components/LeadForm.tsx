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

type FormState = z.infer<typeof schema>

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
      setForm({ ...initialState, utm_source: form.utm_source, utm_medium: form.utm_medium, utm_campaign: form.utm_campaign, utm_content: form.utm_content, referrer: form.referrer, calc: form.calc })
    } catch {
      setStatus('err')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="lead-form" className="bg-white py-16">
      <div className="mx-auto max-w-md px-4">
        <h2 className="text-center text-2xl font-bold">Оставить заявку</h2>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Имя"
            value={form.name}
            onChange={handleChange('name')}
          />
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Телефон"
            value={form.phone}
            onChange={handlePhone}
          />
          <select
            className="w-full rounded-lg border border-gray-200 p-3"
            value={form.clientType}
            onChange={handleChange('clientType')}
          >
            <option value="">Тип клиента</option>
            <option>ООО</option>
            <option>ИП</option>
            <option>Самозанятый</option>
            <option>Физлицо</option>
          </select>
          <select
            className="w-full rounded-lg border border-gray-200 p-3"
            value={form.tech}
            onChange={handleChange('tech')}
          >
            <option value="">Вид техники</option>
            <option>легковой</option>
            <option>грузовой</option>
            <option>спец</option>
          </select>
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Бюджет/стоимость"
            value={form.budget}
            onChange={handleChange('budget')}
          />
          <textarea
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Комментарий"
            value={form.comment}
            onChange={handleChange('comment')}
          />
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
          <button
            disabled={sending}
            className="w-full rounded-2xl bg-accent py-3 font-semibold text-white shadow transition-colors hover:bg-accent/80 disabled:opacity-50"
          >
            Отправить
          </button>
          {status === 'ok' && (
            <p className="text-sm text-green-700">
              Спасибо! Менеджер свяжется в течение 15 минут в рабочее время.
            </p>
          )}
          {status === 'err' && (
            <p className="text-sm text-red-600">
              Проверьте поля и попробуйте ещё раз.
            </p>
          )}
          <p className="text-xs text-gray-500">
            Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
          </p>
        </form>
      </div>
    </section>
  )
}