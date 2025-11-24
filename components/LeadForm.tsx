'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import { CloseIcon, HandshakeIcon, TimerIcon, CheckIcon } from '@/components/icons'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { DEFAULT_ERROR_MESSAGE, DEFAULT_WARNING_MESSAGE, parseLeadResponse } from '@/lib/leadResponse'
import type { LeadFormPrefill } from '@/lib/openLeadForm'

type Status = 'idle' | 'ok' | 'warn' | 'err'

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
  logoSrc: string
  logoAlt: string
}
const messengerLinks: MessengerLink[] = [
  {
    href: 'https://wa.me/79677728299',
    label: 'Написать в WhatsApp',
    shortLabel: 'WhatsApp',
    color: '#25D366',
    background: 'rgba(37, 211, 102, 0.12)',
    border: 'rgba(37, 211, 102, 0.32)',
    logoSrc: '/whatsapp-logo.svg',
    logoAlt: 'Логотип WhatsApp'
  },
  {
    href: 'https://t.me/dpvlen',
    label: 'Написать в Telegram',
    shortLabel: 'Telegram',
    color: '#229ED9',
    background: 'rgba(34, 158, 217, 0.12)',
    border: 'rgba(34, 158, 217, 0.32)',
    logoSrc: '/telegram-logo.svg',
    logoAlt: 'Логотип Telegram'
  }
]

type LeadFormProps = {
  variant?: 'default' | 'compact'
  className?: string
}

export default function LeadForm({ variant = 'default', className }: LeadFormProps) {
  const [form, setForm] = useState<FormState>(initialState)
  const [extraFields, setExtraFields] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [agree, setAgree] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const compactHighlights = [
    {
      title: 'Ответ за 15 минут',
      description: 'Менеджер свяжется в рабочее время сразу после заявки.',
      Icon: TimerIcon
    },
    {
      title: 'Партнёры по всей стране',
      description: 'Подберём предложения от проверенных банков и лизинговых компаний.',
      Icon: HandshakeIcon
    }
  ]

  const openModal = useCallback((detail?: LeadFormPrefill) => {
    setForm(prev => {
      if (detail?.calcSummary && detail.calcSummary !== prev.calc) {
        return { ...prev, calc: detail.calcSummary }
      }
      return prev
    })
    setExtraFields(detail?.fields ?? {})
    setStatus('idle')
    setFeedbackMessage(null)
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

    return () => {
      document.removeEventListener('calc-summary', updateSummary as EventListener)
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
    setFeedbackMessage(null)
  }

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replace(/\D/g, '');
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.slice(1);
    }
    let formatted = '+7';
    if (input.length > 0) {
      formatted += ` (${input.slice(0, 3)}`
    }
    if (input.length >= 4) {
      formatted += `) ${input.slice(3, 6)}`
    }
    if (input.length >= 7) {
      formatted += `-${input.slice(6, 8)}`
    }
    if (input.length >= 9) {
      formatted += `-${input.slice(8, 10)}`
    }
    setForm(prev => ({ ...prev, phone: formatted }))
    setStatus('idle');
    setFeedbackMessage(null);
  };

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

    if (!agree || name.length < 2 || phoneDigits.length < 11) { // Changed to 11 to ensure full number
      setStatus('err')
      setFeedbackMessage('Проверьте поля и подтвердите согласие, затем попробуйте ещё раз.')
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
    setFeedbackMessage(null)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      let responseData: unknown = null
      try {
        responseData = await res.json()
      } catch {
        responseData = null
      }

      const parsed = parseLeadResponse(responseData)

      if (!res.ok) {
        setStatus('err')
        setFeedbackMessage(parsed.errorMessage)
        return
      }

      if (!parsed.delivered) {
        setStatus('warn')
        setFeedbackMessage(parsed.warningMessage)
      } else {
        setStatus('ok')
        setFeedbackMessage(null)
      }
    } catch {
      setStatus('err')
      setFeedbackMessage(DEFAULT_ERROR_MESSAGE)
    } finally {
      setSending(false)
    }
  }

  const handleOpenClick = () => {
    openModal()
  }

  const defaultVariant = (
    <section id="lead-form" className={clsx('relative overflow-hidden py-20', className)}>
      <div className="mx-auto max-w-4xl px-4 text-white">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70 text-glow">Заявка</span>
          <h2 className="glass-title mt-4 text-3xl font-bold text-white md:text-4xl">Получите персональный расчёт под ваш проект</h2>
          <p className="mt-4 text-lg text-white/80 text-glow-subtle">
            Мы перезвоним в течение 15 минут в рабочее время, уточним детали и предложим лучшие варианты от партнёров.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 mx-auto max-w-xl rounded-[2.5rem] glass-pane text-center text-white/80">
          <p className="text-base text-glow-subtle">
            Заявка откроется во всплывающем окне: оставьте имя и телефон, и менеджер свяжется с вами удобным способом.
          </p>
          <button
            type="button"
            onClick={handleOpenClick}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-3 text-base font-semibold text-black shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
          >
            Оставить заявку
          </button>
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 text-glow">
            Или напишите напрямую
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {messengerLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
                style={{
                  color: link.color,
                  backgroundColor: link.background,
                  borderColor: link.border
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center">
                  <Image
                    src={link.logoSrc}
                    alt={link.logoAlt}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </span>
                {link.shortLabel}
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )

  const compactVariant = (
    <section
      id="lead-form"
      className={clsx(
        'relative overflow-hidden rounded-[2.5rem] glass-pane',
        className
      )}
    >
      <div className="relative flex flex-col gap-6">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60 text-glow">Персональный расчёт</span>
          <h2 className="glass-title text-2xl font-semibold text-white sm:text-3xl">Получите предложение под вашу технику</h2>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base text-glow-subtle">
            Оставьте контакты — подготовим несколько сценариев финансирования и отправим расчёт удобным способом.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenClick}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-3 text-sm font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
        >
          Оставить заявку
        </button>

        <div className="grid gap-3 sm:grid-cols-2">
          {compactHighlights.map(item => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-left text-sm text-white/70"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-emerald-400">
                <item.Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <div className="font-semibold text-white text-glow">{item.title}</div>
                <p className="mt-1 leading-relaxed text-glow-subtle">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          <span className="text-glow">Или напишите напрямую</span>
          <div className="flex flex-wrap gap-2">
            {messengerLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-7 w-7 items-center justify-center">
                  <Image
                    src={link.logoSrc}
                    alt={link.logoAlt}
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                </span>
                {link.shortLabel}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
  
  const ModalContent = () => {
    if (status === 'ok') {
      return (
        <div className="flex flex-col items-center justify-center px-6 pb-8 pt-14 text-center sm:px-8 sm:pt-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckIcon className="h-8 w-8 text-green-400" />
          </div>
          <h2 className="glass-title mt-6 text-2xl font-semibold text-white">Заявка отправлена!</h2>
          <p className="mt-2 text-sm text-white/80 text-glow-subtle">
            Наш менеджер свяжется с вами в течение 15 минут в рабочее время.
          </p>
          <button
            type="button"
            onClick={closeModal}
            className="mt-8 inline-flex w-full max-w-xs items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-3 text-base font-semibold text-black shadow-lg transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
          >
            Отлично!
          </button>
        </div>
      )
    }

    return (
      <form onSubmit={onSubmit} className="space-y-6 px-6 pb-8 pt-14 sm:px-8 sm:pt-16">
        <h2 className="glass-title text-2xl font-semibold text-white">Оставьте заявку</h2>
        <p className="text-sm text-white/80 text-glow-subtle">
          Мы позвоним или напишем в мессенджер в течение 15 минут в рабочее время.
        </p>

        {form.calc && (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-left text-sm text-white/80 shadow-inner">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/80 text-glow">Расчёт из калькулятора</div>
            <p className="mt-2 leading-relaxed text-glow-subtle">{form.calc}</p>
          </div>
        )}

        <div className="grid gap-4">
          <div className="space-y-2">
            <label htmlFor="modal-name" className="text-sm font-semibold text-white text-glow">
              Имя
            </label>
            <input
              id="modal-name"
              name="name"
              className="w-full rounded-2xl border border-white/10 bg-gray-800/50 p-3 text-sm text-white shadow-inner transition focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              placeholder="Как к вам обращаться"
              value={form.name}
              onChange={handleChange('name')}
              required
              minLength={2}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="modal-phone" className="text-sm font-semibold text-white text-glow">
              Телефон
            </label>
            <input
              id="modal-phone"
              name="phone"
              type="tel" // Use type="tel" for phone numbers
              className="w-full rounded-2xl border border-white/10 bg-gray-800/50 p-3 text-sm text-white shadow-inner transition focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
              placeholder="+7 (___) ___-__-__"
              value={form.phone}
              onChange={handlePhone}
              required
              maxLength={18} // +7 (XXX) XXX-XX-XX is 18 chars
            />
          </div>
        </div>

        <div className="space-y-4 text-sm text-white/80">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-emerald-400"
              checked={agree}
              onChange={event => setAgree(event.currentTarget.checked)}
            />
            <span className="text-glow-subtle">
              Согласен с{' '}
              <a
                href="/privacy"
                className="font-semibold text-emerald-400 underline"
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
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-3 text-base font-semibold text-black shadow-lg transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? 'Отправляем…' : 'Отправить заявку'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 text-glow">Или напишите напрямую</div>
          <div className="flex flex-wrap gap-3">
            {messengerLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
                style={{
                  color: link.color,
                  backgroundColor: link.background,
                  borderColor: link.border
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex h-8 w-8 items-center justify-center">
                  <Image
                    src={link.logoSrc}
                    alt={link.logoAlt}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {(status === 'warn' || status === 'err') && (
          <div className="space-y-2 text-sm" aria-live="polite">
            {status === 'warn' && (
              <p className="rounded-2xl bg-amber-500/10 px-4 py-3 text-amber-200">
                {feedbackMessage ?? DEFAULT_WARNING_MESSAGE}
              </p>
            )}
            {status === 'err' && (
              <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-red-300">
                {feedbackMessage ?? DEFAULT_ERROR_MESSAGE}
              </p>
            )}
          </div>
        )}
      </form>
    )
  }

  return (
    <>
      {variant === 'compact' ? compactVariant : defaultVariant}

      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-4 py-6 sm:px-6 sm:py-10 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        role={isOpen ? 'dialog' : undefined}
        aria-modal={isOpen ? true : undefined}
        aria-label="Оставить заявку"
        aria-hidden={isOpen ? undefined : "true"}
        onClick={handleOverlayClick}
      >
        <div
          className={`relative w-full max-w-xl overflow-hidden rounded-[2.5rem] glass-pane transition-all duration-200 ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
            }`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white shadow transition hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            aria-label="Закрыть форму"
          >
            <CloseIcon className="h-5 w-5" aria-hidden />
          </button>
          
          <ModalContent />

        </div>
      </div>
    </>
  )
}
