import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // sanitize incoming body to primitives
  const name = typeof body.name === 'string' ? body.name : String(body.name ?? '')
  const phone = typeof body.phone === 'string' ? body.phone : String(body.phone ?? '')
  const fmt = new Intl.NumberFormat('ru-RU')


  const lines = [
    `🔔 Новый лид с сайта 'https://lizing-phi.vercel.app'`,
    `👤 Имя: ${name}`,
    `📞 Тел: ${phone}`,
   
   
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
  const cost = Number(body.cost)
  if (!Number.isNaN(cost) && cost > 0) lines.push(`💵 Стоимость: ${fmt.format(cost)} ₽`)
  const advance = Number(body.advance)
  if (!Number.isNaN(advance) && advance > 0) lines.push(`💸 Аванс: ${fmt.format(advance)} ₽`)
  const rate = Number(body.rate)
  if (!Number.isNaN(rate) && rate > 0) lines.push(`📈 Ставка: ${rate}%`)
  const residual = Number(body.residual)
  if (!Number.isNaN(residual) && residual > 0) lines.push(`🏁 Остаток: ${fmt.format(residual)} ₽`)
  const monthly = Number(body.monthly)
  if (!Number.isNaN(monthly) && monthly > 0) lines.push(`📆 Платёж: ${fmt.format(monthly)} ₽`)
  const overpayment = Number(body.overpayment)
  if (!Number.isNaN(overpayment) && overpayment > 0) lines.push(`➕ Переплата: ${fmt.format(overpayment)} ₽`)
  const total = Number(body.total)
  if (!Number.isNaN(total) && total > 0) lines.push(`🔻 К выкупу: ${fmt.format(total)} ₽`)
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