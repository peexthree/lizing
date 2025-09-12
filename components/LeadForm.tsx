'use client'
import { useState } from 'react'

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [type, setType] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')
    const sName = name.trim()
    const sPhone = phone.trim()
    const sType = type.trim()
    if (sName.length < 2 || sPhone.length < 6 || sType.length < 2) {
      setStatus('err')
      return
    }
    const payload = { source: 'landing', name: sName, phone: sPhone, equipment: sType }
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('ok')
      setName('')
      setPhone('')
      setType('')
    } catch {
      setStatus('err')
    }
  }

  return (
    <section id="lead-form" className="py-16 bg-white">
      <div className="mx-auto max-w-md px-4">
        <h2 className="text-center text-2xl font-bold">Оставить заявку</h2>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
          />
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
          />
          <input
            className="w-full rounded-lg border border-gray-200 p-3"
            placeholder="Тип техники"
            value={type}
            onChange={(e) => setType((e.target as HTMLInputElement).value)}
          />
          <button className="w-full rounded-lg bg-accent py-3 font-semibold text-white transition-colors hover:bg-accent/80">
            Отправить
          </button>
          {status === 'ok' && <p className="text-sm text-green-700">Готово! Мы свяжемся с вами.</p>}
          {status === 'err' && <p className="text-sm text-red-600">Проверьте поля и попробуйте ещё раз.</p>}
          <p className="text-xs text-gray-500">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
        </form>
      </div>
    </section>
  )
}