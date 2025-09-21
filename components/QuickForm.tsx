'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'

import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_WARNING_MESSAGE,
  parseLeadResponse,
} from '@/lib/leadResponse'

type Status = 'idle' | 'ok' | 'warn' | 'err'
type Messenger = 'whatsapp' | 'telegram'

const SUCCESS_MESSAGE = 'Готово! Менеджер свяжется в выбранном мессенджере.'
const VALIDATION_ERROR_MESSAGE =
  'Проверьте поля и подтвердите согласие, затем попробуйте ещё раз.'

export default function QuickForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [ownEquipment, setOwnEquipment] = useState(false)
  const [messenger, setMessenger] = useState<Messenger>('whatsapp')
  const [wantExamples, setWantExamples] = useState(true)
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const resetFeedback = () => {
    if (status !== 'idle' || feedbackMessage) {
      setStatus('idle')
      setFeedbackMessage(null)
    }
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
    resetFeedback()
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.currentTarget.value.replace(/\D/g, '')
    setPhone(formatPhone(digits))
    resetFeedback()
  }

  const handleOwnEquipmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOwnEquipment(event.currentTarget.checked)
    resetFeedback()
  }

  const handleMessengerChange = (value: Messenger) => {
    setMessenger(value)
    resetFeedback()
  }

  const handleWantExamplesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWantExamples(event.currentTarget.checked)
    resetFeedback()
  }

  const handleAgreeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAgree(event.currentTarget.checked)
    resetFeedback()
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return

    const trimmedName = name.trim()
    const phoneDigits = normalizePhone(phone)

    if (!agree || trimmedName.length < 2 || phoneDigits.length < 10) {
      setStatus('err')
      setFeedbackMessage(VALIDATION_ERROR_MESSAGE)
      return
    }

    const payload = {
      source: 'quick-form',
      name: trimmedName,
      phone: `+${phoneDigits}`,
      phone_display: phone,
      ownEquipment,
      messenger,
      wantExamples,
    }

    setSending(true)
    setStatus('idle')
    setFeedbackMessage(null)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let responseData: unknown = null
      try {
        responseData = await response.json()
      } catch {
        responseData = null
      }

      const parsed = parseLeadResponse(responseData)

      if (!response.ok) {
        setStatus('err')
        setFeedbackMessage(parsed.errorMessage)
        return
      }

      if (!parsed.delivered) {
        setStatus('warn')
        setFeedbackMessage(parsed.warningMessage ?? DEFAULT_WARNING_MESSAGE)
      } else {
        setStatus('ok')
        setFeedbackMessage(null)
      }

      setName('')
      setPhone('')
      setOwnEquipment(false)
      setMessenger('whatsapp')
      setWantExamples(true)
      setAgree(false)
    } catch {
      setStatus('err')
      setFeedbackMessage(DEFAULT_ERROR_MESSAGE)
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow">
      <div>
        <label htmlFor="q-name" className="text-sm font-medium">
          Имя
        </label>
        <input
          id="q-name"
          name="name"
          className="mt-1 w-full rounded-lg border border-gray-200 p-3"
          value={name}
          onChange={handleNameChange}
          placeholder="Как к вам обращаться"
          required
        />
      </div>

      <div>
        <label htmlFor="q-phone" className="text-sm font-medium">
          Телефон
        </label>
        <input
          id="q-phone"
          name="phone"
          className="mt-1 w-full rounded-lg border border-gray-200 p-3"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="+7 (___) ___-__-__"
          required
        />
      </div>

      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={ownEquipment} onChange={handleOwnEquipmentChange} />
        Техника своя
      </label>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-gray-600">Мессенджер:</span>
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="messenger"
            value="whatsapp"
            checked={messenger === 'whatsapp'}
            onChange={() => handleMessengerChange('whatsapp')}
          />
          WhatsApp
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="messenger"
            value="telegram"
            checked={messenger === 'telegram'}
            onChange={() => handleMessengerChange('telegram')}
          />
          Telegram
        </label>
      </div>

      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={wantExamples} onChange={handleWantExamplesChange} />
        Прислать 2–3 примера сделок
      </label>

      <label className="inline-flex items-center gap-2 text-xs text-gray-500">
        <input type="checkbox" checked={agree} onChange={handleAgreeChange} />
        <span>
          Согласен с{' '}
          <a href="/privacy" className="underline" target="_blank" rel="noopener noreferrer">
            политикой обработки персональных данных
          </a>
        </span>
      </label>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent py-3 font-semibold text-white hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!agree || sending}
      >
        {sending ? 'Отправляем…' : 'Получить расчёт'}
      </button>

      <div className="space-y-2 text-sm" aria-live="polite">
        {status === 'ok' && (
          <p className="rounded-2xl bg-green-100/70 px-4 py-3 text-green-700">{SUCCESS_MESSAGE}</p>
        )}
        {status === 'warn' && (
          <p className="rounded-2xl bg-amber-100 px-4 py-3 text-amber-700">
            {feedbackMessage ?? DEFAULT_WARNING_MESSAGE}
          </p>
        )}
        {status === 'err' && (
          <p className="rounded-2xl bg-red-100/70 px-4 py-3 text-red-600">
            {feedbackMessage ?? DEFAULT_ERROR_MESSAGE}
          </p>
        )}
      </div>
    </form>
  )
}

function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits.length === 10) digits = `7${digits}`
  if (!digits.startsWith('7') && digits.length > 0) {
    digits = `7${digits.slice(-10)}`
  }
  return digits.slice(0, 11)
}

function formatPhone(digits: string) {
  if (!digits) return ''

  let normalized = digits
  if (normalized.startsWith('8')) normalized = `7${normalized.slice(1)}`
  if (normalized.length > 11) normalized = normalized.slice(0, 11))
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
