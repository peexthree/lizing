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
@@ -194,50 +195,48 @@ export default function LeadForm() {
            <label htmlFor="lead-comment" className="text-sm font-medium">
              Комментарий
            </label>
            <textarea
              id="lead-comment"
              className="mt-1 w-full rounded-lg border border-gray-200 p-3"
              placeholder="Комментарий"
              value={form.comment}
              onChange={handleChange('comment')}
            />
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
          <label className="inline-flex items-center gap-2 text-xs text-gray-500"><input type="checkbox" checked={agree} onChange={e=>setAgree((e.target as HTMLInputElement).checked)} /> <span>Согласен с <a href="/privacy" className="underline" target="_blank" rel="noopener noreferrer">политикой обработки персональных данных</a></span></label>
          <button
            type="submit"
            disabled={sending || !agree}
            className="w-full rounded-2xl bg-accent py-3 font-semibold text-white shadow transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-50"
          >
            Оставить заявку
          </button>
          {status === 'ok' && (
            <p className="text-sm text-green-700" role="status" aria-live="polite">
              Спасибо! Менеджер свяжется в течение 15 минут в рабочее время.
            </p>
          )}
          {status === 'err' && (
            <p className="text-sm text-red-600" role="status" aria-live="polite">
              Проверьте поля и попробуйте ещё раз.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}