import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // sanitize incoming body to primitives
  const name = typeof body.name === 'string' ? body.name : String(body.name ?? '')
  const phone = typeof body.phone === 'string' ? body.phone : String(body.phone ?? '')
  const own = !!body.ownEquipment
  
  const lines = [
    `🔔 Новый лид с сайта 'https://lizing-phi.vercel.app'`,
    `👤 Имя: ${name}`,
    `📞 Тел: ${phone}`,
    `🚗 Своя техника: ${own ? 'да' : 'нет'}`,
   
  ]
  if (body.type) lines.push(`🛠 Тип: ${String(body.type)}`)
  if (body.region) lines.push(`📍 Регион: ${String(body.region)}`)
  if (body.term) lines.push(`⏱ Срок: ${String(body.term)}`)
  if (body.upfrontMode)
    lines.push(
      `💰 Формат аванса: ${
        body.upfrontMode === 'firstpayment' ? 'первый платёж' : 'с авансом'
      }`
    )
  const text = lines.join('\n')

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (token && chatId) {
      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`
      await fetch(url)
    }
  } catch (e) { console.error('telegram error', e) }

  return NextResponse.json({ ok: true })
}