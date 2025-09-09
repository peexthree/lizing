'use client'
import { useState } from 'react'

function toStr(v: any) { return typeof v === 'string' ? v : String(v ?? '') }

export default function QuickForm() {
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [own, setOwn] = useState(false)
  const [messenger, setMessenger] = useState<'whatsapp'|'telegram'|''>('whatsapp')
  const [ex, setEx] = useState(true)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')
    const sName = toStr(name).trim()
    const sPhone = toStr(phone).trim()
    if (sName.length < 2 || sPhone.length < 6) { setStatus('err'); return }
    const payload = {
      source: 'quick',
      name: sName,
      phone: sPhone,
      ownEquipment: !!own,
      messenger: messenger || undefined,
      wantExamples: !!ex,
    }
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('bad')
      setStatus('ok'); setName(''); setPhone(''); setOwn(false); setMessenger('whatsapp'); setEx(true)
    } catch { setStatus('err') }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white shadow p-6 space-y-4">
      <div>
        <label className="text-sm font-medium">Имя</label>
        <input className="mt-1 w-full rounded-lg border border-gray-200 p-3" value={name} onChange={e=>setName((e.target as HTMLInputElement).value)} />
      </div>
      <div>
        <label className="text-sm font-medium">Телефон</label>
        <input className="mt-1 w-full rounded-lg border border-gray-200 p-3" value={phone} onChange={e=>setPhone((e.target as HTMLInputElement).value)} />
      </div>
      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={own} onChange={e=>setOwn((e.target as HTMLInputElement).checked)} /> Техника своя</label>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-600">Мессенджер:</span>
        <label className="inline-flex items-center gap-2"><input type="radio" checked={messenger==='whatsapp'} onChange={()=>setMessenger('whatsapp')} /> WhatsApp</label>
        <label className="inline-flex items-center gap-2"><input type="radio" checked={messenger==='telegram'} onChange={()=>setMessenger('telegram')} /> Telegram</label>
      </div>
      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={ex} onChange={e=>setEx((e.target as HTMLInputElement).checked)} /> Прислать 2–3 примера сделок</label>
      <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:opacity-90">Получить расчёт</button>
      {status==='ok' && <p className="text-sm text-green-700">Готово! Свяжемся в мессенджере.</p>}
      {status==='err' && <p className="text-sm text-red-600">Проверьте поля и попробуйте ещё раз.</p>}
      <p className="text-xs text-gray-500">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
    </form>
  )
}
