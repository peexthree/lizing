import { NextRequest, NextResponse } from 'next/server'
import { onLeadSubmit } from '@/lib/onLeadSubmit'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // sanitize incoming body to primitives
  const name =
    (typeof body.name === 'string' ? body.name : String(body.name ?? '')).trim()
  const phone =
    (typeof body.phone === 'string' ? body.phone : String(body.phone ?? '')).trim()
  const phoneDisplay =
    typeof body.phone_display === 'string' && body.phone_display.trim()
      ? body.phone_display.trim()
      : ''
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
  const cost = typeof body.cost === 'string' ? body.cost : ''
  const advance = typeof body.advance === 'string' ? body.advance : ''
  const term = typeof body.term === 'string' ? body.term : ''
  const rate = typeof body.rate === 'string' ? body.rate : ''
  const residual = typeof body.residual === 'string' ? body.residual : ''
  const payment = typeof body.payment === 'string' ? body.payment : ''

  const host = req.headers.get('host') ?? 'lizing-phi.vercel.app'
  const separator = '━━━━━━━━━━━━━━━━━━━━'

  const phoneDigits = phone.replace(/\D/g, '')
  const formattedPhone =
    phoneDisplay || (phoneDigits ? (phoneDigits.startsWith('7') ? `+${phoneDigits}` : phoneDigits) : phone)
  const waLink = phoneDigits ? `https://wa.me/${phoneDigits}` : ''
  const telegramLink = phoneDigits ? `https://t.me/+${phoneDigits}` : ''

  const calcLines = calc
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  const calcMap = new Map<string, string>()
  for (const line of calcLines) {
    const [title, ...rest] = line.split(':')
    if (!title || rest.length === 0) continue
    calcMap.set(title.trim(), rest.join(':').trim())
  }

  const normalizeRate = (value: string) => value.replace(/\s*%\s*/g, '% ').trim()
  const formatAdvance = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return ''
    const match = trimmed.match(/^(.+?)\s*\(([^)]+)\)$/)
    if (match) {
      const amount = match[1].trim()
      const percent = match[2].trim()
      if (percent) return `${percent} (${amount})`
    }
    if (advance && advance.includes('%') && !trimmed.includes('%')) {
      return `${advance.trim()} (${trimmed})`
    }
    return trimmed
  }

  const costText = calcMap.get('Стоимость техники') ?? cost
  const advanceTextRaw = calcMap.get('Аванс') ?? advance
  const termText = calcMap.get('Срок') ?? term
  const rateTextRaw = calcMap.get('Ставка') ?? rate
  const residualText = calcMap.get('Остаточный платёж') ?? residual
  const paymentText = calcMap.get('Ежемесячный платёж') ?? payment

  const advanceText = advanceTextRaw ? formatAdvance(advanceTextRaw) : ''
  const rateText = rateTextRaw ? normalizeRate(rateTextRaw) : ''

  const escapeHtml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const requestLinesPlain: string[] = []
  const requestLinesHtml: string[] = []
  const pushRequestLine = (label: string, value: string) => {
    if (!value) return
    requestLinesPlain.push(`• ${label}: ${value}`)
    requestLinesHtml.push(`• ${label}: ${escapeHtml(value)}`)
  }

  pushRequestLine('Стоимость', costText)
  pushRequestLine('Аванс', advanceText)
  pushRequestLine('Срок', termText)
  pushRequestLine('Ставка', rateText)
  pushRequestLine('Остаток', residualText)

  const plainLines: string[] = []
  const htmlLines: string[] = []

  const resolvedHost = host || '—'
  plainLines.push(`🚀 *Новый лид с сайта!*  — ${resolvedHost}`)
  htmlLines.push(`🚀 <b>Новый лид с сайта!</b>  — ${escapeHtml(resolvedHost)}`)
  plainLines.push(separator)
  htmlLines.push(separator)
  plainLines.push('')
  htmlLines.push('')

  const resolvedName = name || '—'
  plainLines.push(`👤 *Имя:* ${resolvedName}`)
  htmlLines.push(`👤 <b>Имя:</b> ${escapeHtml(resolvedName)}`)

  const resolvedPhone = formattedPhone || '—'
  plainLines.push(`📞 *Телефон:* ${resolvedPhone}`)
  htmlLines.push(`📞 <b>Телефон:</b> ${escapeHtml(resolvedPhone)}`)

  if (waLink) {
    plainLines.push(`💬 *WhatsApp:* ${waLink}`)
    htmlLines.push(`💬 <b>WhatsApp:</b> ${escapeHtml(waLink)}`)
  }
  if (telegramLink) {
    plainLines.push(`✈️ *Telegram:* ${telegramLink}`)
    htmlLines.push(`✈️ <b>Telegram:</b> ${escapeHtml(telegramLink)}`)
  }

  if (requestLinesPlain.length > 0 || paymentText) {
    plainLines.push('')
    htmlLines.push('')
    plainLines.push(separator)
    htmlLines.push(separator)
    if (requestLinesPlain.length > 0) {
      plainLines.push(`📊 *Запрос клиента*`)
      htmlLines.push(`📊 <b>Запрос клиента</b>`)
      plainLines.push(...requestLinesPlain)
      htmlLines.push(...requestLinesHtml)
    }
    if (paymentText) {
      if (requestLinesPlain.length > 0) {
        plainLines.push('')
        htmlLines.push('')
      }
      plainLines.push(`💰 *Ежемесячный платёж:* *${paymentText}*`)
      htmlLines.push(`💰 <b>Ежемесячный платёж:</b> <b>${escapeHtml(paymentText)}</b>`)
    }
    plainLines.push(separator)
    htmlLines.push(separator)
  }

  const metaLinesPlain: string[] = []
  const metaLinesHtml: string[] = []
  const pushMetaLine = (label: string, value: string) => {
    if (!value) return
    metaLinesPlain.push(`${label}: ${value}`)
    metaLinesHtml.push(`${label}: ${escapeHtml(value)}`)
  }

  pushMetaLine('🏢 Тип клиента', clientType)
  pushMetaLine('🚘 Техника', tech)
  pushMetaLine('💸 Бюджет', budget)
  pushMetaLine('📝 Комментарий', comment)
  pushMetaLine('utm_source', utm_source)
  pushMetaLine('utm_medium', utm_medium)
  pushMetaLine('utm_campaign', utm_campaign)
  pushMetaLine('utm_content', utm_content)
  pushMetaLine('referrer', referrer)

  // support legacy fields
  if (body.type) pushMetaLine('🛠 Тип', String(body.type))
  if (body.region) pushMetaLine('📍 Регион', String(body.region))
  if (body.term) pushMetaLine('⏱ Срок', String(body.term))
  if (body.upfrontMode)
    pushMetaLine(
      '💰 Формат аванса',
      body.upfrontMode === 'firstpayment' ? 'первый платёж' : 'с авансом'
    )
  if (body.source) pushMetaLine('🔎 Источник', String(body.source))
  if (body.ownEquipment !== undefined)
    pushMetaLine('🚜 Своя техника', body.ownEquipment ? 'да' : 'нет')
  if (body.messenger) pushMetaLine('✉️ Мессенджер', String(body.messenger))
  if (body.wantExamples !== undefined)
    pushMetaLine('📁 Примеры', body.wantExamples ? 'да' : 'нет')

  if (metaLinesPlain.length > 0) {
    plainLines.push('')
    htmlLines.push('')
    plainLines.push(...metaLinesPlain)
    htmlLines.push(...metaLinesHtml)
  }

  plainLines.push('')
  htmlLines.push('')
  plainLines.push(`⚡ Свяжитесь с клиентом в течение *30 минут*!`)
  htmlLines.push(`⚡ Свяжитесь с клиентом в течение <b>30 минут</b>!`)

  const text = plainLines.join('\n')
  const telegramText = htmlLines.join('\n')

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    const chatIds = [chatId, '428273621'].filter((id): id is string => Boolean(id))

    if (token && chatIds.length > 0) {
      for (const id of chatIds) {
        const url = new URL(`https://api.telegram.org/bot${token}/sendMessage`)
        url.searchParams.set('chat_id', id)
        url.searchParams.set('text', telegramText)
        url.searchParams.set('parse_mode', 'HTML')
        url.searchParams.set('disable_web_page_preview', '1')
        await fetch(url)
      }
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

  if (waLink) {
    try {
      await fetch(waLink)
    } catch (e) {
      console.error('whatsapp error', e)
    }
  }

  try {
    await onLeadSubmit(body)
  } catch (e) {
    console.error('crm hook error', e)
  }

  return NextResponse.json({ ok: true })
}