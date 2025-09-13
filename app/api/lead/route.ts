import { NextRequest, NextResponse } from 'next/server'
import { onLeadSubmit } from '@/lib/onLeadSubmit'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // sanitize incoming body to primitives
  const name = typeof body.name === 'string' ? body.name : String(body.name ?? '')
  const phone = typeof body.phone === 'string' ? body.phone : String(body.phone ?? '')
  const clientType = typeof body.clientType === 'string' ? body.clientType : ''
  const tech = typeof body.tech === 'string' ? body.tech : ''
  const budget = typeof body.budget === 'string' ? body.budget : ''
  const comment = typeof body.comment === 'string' ? body.comment : ''
  const utm_source = typeof body.utm_source === 'string' ? body.utm_source : ''
  const utm_medium = typeof body.utm_medium === 'string' ? body.utm_medium : ''
  const utm_campaign = typeof body.utm_campaign === 'string' ? body.utm_campaign : ''
  const utm_content = typeof body.utm_content === 'string' ? body.utm_content : ''
  const referrer = typeof body.referrer === 'string' ? body.referrer : ''
  const calc = typeof body.calc === 'string' ? body.calc : ''

  const lines = [
    `🔔 Новый лид с сайта 'https://lizing-phi.vercel.app'`,
    `👤 Имя: ${name}`,
    `📞 Тел: ${phone}`,
  ]
  if (clientType) lines.push(`🏢 Тип клиента: ${clientType}`)
  if (tech) lines.push(`🚘 Техника: ${tech}`)
  if (budget) lines.push(`💸 Бюджет: ${budget}`)
  if (comment) lines.push(`📝 Комментарий: ${comment}`)
  if (calc) lines.push(`🧮 Расчёт: ${calc}`)
  if (utm_source) lines.push(`utm_source: ${utm_source}`)
  if (utm_medium) lines.push(`utm_medium: ${utm_medium}`)
  if (utm_campaign) lines.push(`utm_campaign: ${utm_campaign}`)
  if (utm_content) lines.push(`utm_content: ${utm_content}`)
  if (referrer) lines.push(`referrer: ${referrer}`)

  // support legacy fields
  if (body.type) lines.push(`🛠 Тип: ${String(body.type)}`)
  if (body.region) lines.push(`📍 Регион: ${String(body.region)}`)
  if (body.term) lines.push(`⏱ Срок: ${String(body.term)}`)
  if (body.upfrontMode)
    lines.push(
      `💰 Формат аванса: ${
        body.upfrontMode === 'firstpayment' ? 'первый платёж' : 'с авансом'
      }`
    )
  if (body.source) lines.push(`🔎 Источник: ${String(body.source)}`)
  if (body.ownEquipment !== undefined)
    lines.push(`🚜 Своя техника: ${body.ownEquipment ? 'да' : 'нет'}`)
  if (body.messenger) lines.push(`✉️ Мессенджер: ${String(body.messenger)}`)
  if (body.wantExamples !== undefined)
    lines.push(`📁 Примеры: ${body.wantExamples ? 'да' : 'нет'}`)

  const waLink = `https://wa.me/${phone.replace(/\D/g, '')}`
  lines.push(`WhatsApp: ${waLink}`)
  const text = lines.join('\n')

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (token && chatId) {
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`
      await fetch(url)
    }
  } catch (e) {
    console.error('telegram error', e)
  }

  try {
    await fetch('https://formsubmit.co/ajax/dpalenov@lizing-i-tochka.ru', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })
  } catch (e) {
    console.error('email error', e)
  }

  try {
    await fetch(waLink)
  } catch (e) {
    console.error('whatsapp error', e)
  }

  try {
    await onLeadSubmit(body)
  } catch (e) {
    console.error('crm hook error', e)
  }

  return NextResponse.json({ ok: true })
}