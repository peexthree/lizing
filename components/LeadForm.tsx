'use client'

import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import { X } from 'lucide-react'

import type { LeadFormPrefill } from '@/lib/openLeadForm'

type Status = 'idle' | 'ok' | 'err'

type FormState = {
  name: string
  phone: string
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
  calc: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  referrer: ''
}

type MessengerLink = {
  href: string
  label: string
  shortLabel: string
  color: string
  background: string
  border: string
  Icon: typeof WhatsAppIcon
}

const messengerLinks: MessengerLink[] = [
  {
    href: 'https://wa.me/79677728299',
    label: 'Написать в WhatsApp',
    shortLabel: 'WhatsApp',
    color: '#25D366',
    background: 'rgba(37, 211, 102, 0.12)',
    border: 'rgba(37, 211, 102, 0.32)',
    Icon: WhatsAppIcon
  },
  {
    href: 'https://t.me/dpvlen',
    label: 'Написать в Telegram',
    shortLabel: 'Telegram',
    color: '#229ED9',
    background: 'rgba(34, 158, 217, 0.12)',
    border: 'rgba(34, 158, 217, 0.32)',
    Icon: TelegramIcon
  }
]

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [extraFields, setExtraFields] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sending, setSending] = useState(false)
  const [agree, setAgree] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback((detail?: LeadFormPrefill) => {
    setForm(prev => {
      if (detail?.calcSummary && detail.calcSummary !== prev.calc) {
        return { ...prev, calc: detail.calcSummary }
      }
      return prev
    })
    setExtraFields(detail?.fields ?? {})
    setStatus('idle')
    setSending(false)
    setAgree(false)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    setForm(prev => ({
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
      if (!summary) {
        try {
          summary = window.localStorage.getItem('calc') ?? ''
        } catch (storageError) {
          console.warn('Не удалось получить сохранённый расчёт', storageError)
        }
      }

      setForm(prev => (prev.calc === summary ? prev : { ...prev, calc: summary }))
    }

    updateSummary()
    document.addEventListener('calc-summary', updateSummary as EventListener)
    window.addEventListener('focus', updateSummary)

    return () => {
      document.removeEventListener('calc-summary', updateSummary as EventListener)
      window.removeEventListener('focus', updateSummary)
    }
  }, [])

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<LeadFormPrefill>).detail
      openModal(detail)
    }

    window.addEventListener('open-lead-form', handleOpen)
    return () => window.removeEventListener('open-lead-form', handleOpen)
  }, [openModal])

  useEffect(() => {
    if (!isOpen) return

    const { style } = document.body
    const originalOverflow = style.overflow
    style.overflow = 'hidden'
    return () => {
      style.overflow = originalOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeModal, isOpen])

  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeModal()
      }
    },
    [closeModal]
  )

  const handleChange = (field: keyof FormState) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: event.target.value }))
    setStatus('idle')
  }

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '')
    setForm(prev => ({ ...prev, phone: formatPhone(digits) }))
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

    const name = form.name.trim()
    const phoneDigits = normalizePhone(form.phone)

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

    for (const [key, value] of Object.entries(extraFields)) {
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
      setForm(prev => ({
        ...prev,
        name: '',
        phone: '',
        calc: prev.calc,
        utm_source: prev.utm_source,
        utm_medium: prev.utm_medium,
        utm_campaign: prev.utm_campaign,
        utm_content: prev.utm_content,
        referrer: prev.referrer
      }))
      setExtraFields({})
    } catch {
      setStatus('err')
    } finally {
      setSending(false)
    }
  }

  const handleOpenClick = () => {
    openModal()
  }

  return (
    <>
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
          </div>

          <div
            className="mt-12 mx-auto max-w-xl rounded-[2.5rem] border border-white/60 bg-white/85 p-8 text-center shadow-hero backdrop-blur-2xl animate-fade-up"
            style={{ animationDelay: '0.15s' }}
          >
            <p className="text-base text-dark/70">
              Заявка откроется во всплывающем окне: оставьте имя и телефон, и менеджер свяжется с вами удобным способом.
            </p>
            <button
              type="button"
              onClick={handleOpenClick}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              Оставить заявку
            </button>
            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-dark/45">
              Или напишите напрямую
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {messengerLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                  style={{
                    color: link.color,
                    backgroundColor: link.background,
                    borderColor: link.border
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: link.color }}
                  >
                    <link.Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {link.shortLabel}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center bg-dark/60 px-4 py-6 sm:px-6 sm:py-10 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role={isOpen ? 'dialog' : undefined}
        aria-modal={isOpen ? true : undefined}
        aria-label="Оставить заявку"
        aria-hidden={isOpen ? undefined : true}
        onClick={handleOverlayClick}
      >
        <div
          className={`relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/95 shadow-hero backdrop-blur transition-all duration-200 ${
            isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 bg-white/90 text-dark shadow transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Закрыть форму"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          <form onSubmit={onSubmit} className="space-y-6 px-6 pb-8 pt-14 sm:px-8 sm:pt-16">
            <h2 className="text-2xl font-semibold text-dark">Оставьте заявку</h2>
            <p className="text-sm text-dark/70">
              Мы позвоним или напишем в мессенджер в течение 15 минут в рабочее время.
            </p>

            {form.calc && (
              <div className="rounded-2xl border border-accent/20 bg-accent/10 p-4 text-left text-sm text-dark/70 shadow-inner">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">Расчёт из калькулятора</div>
                <p className="mt-2 leading-relaxed">{form.calc}</p>
              </div>
            )}

            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="modal-name" className="text-sm font-semibold text-dark">
                  Имя
                </label>
                <input
                  id="modal-name"
                  name="name"
                  className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="Как к вам обращаться"
                  value={form.name}
                  onChange={handleChange('name')}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="modal-phone" className="text-sm font-semibold text-dark">
                  Телефон
                </label>
                <input
                  id="modal-phone"
                  name="phone"
                  className="w-full rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-dark shadow-inner transition focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={handlePhone}
                  required
                />
              </div>
            </div>

            <div className="space-y-4 text-sm text-dark/70">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 accent-accent"
                  checked={agree}
                  onChange={event => setAgree(event.currentTarget.checked)}
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
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? 'Отправляем…' : 'Отправить заявку'}
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/45">Или напишите напрямую</div>
              <div className="flex flex-wrap gap-3">
                {messengerLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                    style={{
                      color: link.color,
                      backgroundColor: link.background,
                      borderColor: link.border
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: link.color }}
                    >
                      <link.Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm" aria-live="polite">
              {status === 'ok' && (
                <p className="rounded-2xl bg-green-100/70 px-4 py-3 text-green-700">
                  Спасибо! Менеджер свяжется в течение 15 минут в рабочее время.
                </p>
              )}
              {status === 'err' && (
                <p className="rounded-2xl bg-red-100/70 px-4 py-3 text-red-600">
                  Проверьте поля и подтвердите согласие, затем попробуйте ещё раз.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
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

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        d="M16.32 13.74c-.23-.12-1.36-.67-1.57-.74-.21-.08-.36-.12-.51.12-.15.23-.59.74-.72.9-.13.15-.27.17-.5.06-1.36-.55-2.25-1.85-2.32-1.94-.07-.09-.02-.29.11-.41.12-.12.28-.32.4-.48.13-.16.17-.27.25-.45.08-.18.04-.34 0-.48-.04-.13-.51-1.23-.7-1.69-.18-.43-.36-.37-.51-.38-.13-.01-.29-.01-.45-.01-.16 0-.42.06-.64.29-.22.23-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.64 4.11 3.6.58.25 1.03.4 1.38.51.58.19 1.1.16 1.51.1.46-.07 1.36-.56 1.55-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.27Z"
        fill="white"
      />
      <path
        d="M12 18.5c-1.08 0-2.15-.27-3.11-.78l-.22-.12-1.84.5.49-1.78-.12-.2a6.48 6.48 0 1 1 11.99-3.35 6.48 6.48 0 0 1-6.48 6.73Z"
        fill="white"
        opacity={0.2}
      />
    </svg>
  )
}

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="11" fill="#229ED9" />
      <path
        d="M17.84 7.02 6.66 11.3c-.48.18-.47.84.02 1.01l2.83 1.03 1.12 3.66c.14.45.71.6 1.03.26l1.59-1.74 3.03 2.28c.33.25.81.06.89-.34l1.62-8.31c.09-.48-.37-.88-.95-.73Z"
        fill="white"
      />
      <path d="m10.06 14.18-.21 2.66 4.42-5.76-6.49 4.33 2.28-1.23Z" fill="#D0E8F8" />
    </svg>
  )
}