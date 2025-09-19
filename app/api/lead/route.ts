import { NextRequest, NextResponse } from 'next/server'
import { INITIAL_CALCULATOR_STATE } from '@/config/calculator.config'
import { onLeadSubmit } from '@/lib/onLeadSubmit'

const rubFormatter = new Intl.NumberFormat('ru-RU')

const formatRubAmount = (value: number) => `${rubFormatter.format(Math.round(value))} ₽`

const normalizeRateValue = (value: string) =>
  value.replace(/\s*%\s*/g, '% ').replace(/\s+/g, ' ').trim()

const formatAdvanceValue = (raw: string, fallbackPercent?: string) => {
  const trimmed = raw.trim()
  if (!trimmed) return ''
  const match = trimmed.match(/^(.+?)\s*\(([^)]+)\)$/)
  if (match) {
    const amount = match[1].trim()
    const percent = match[2].trim()
    if (percent) return `${percent} (${amount})`
  }
  if (fallbackPercent && fallbackPercent.includes('%') && !trimmed.includes('%')) {
    return `${fallbackPercent.trim()} (${trimmed})`
  }
  return trimmed
}

const calculateMonthlyPayment = (
  cost: number,
  advancePercent: number,
  term: number,
  rate: number,
  residualPercent: number
) => {
  if (term <= 0) return 0
  const advanceRub = (cost * advancePercent) / 100
  const residualRub = (cost * residualPercent) / 100
  const financed = cost - advanceRub - residualRub
  if (financed <= 0) return 0
  const monthlyRate = rate / 12 / 100
  if (monthlyRate <= 0) return financed / term
  const factor = Math.pow(1 + monthlyRate, term)
  const denominator = factor - 1
  return denominator > 0 ? financed * ((monthlyRate * factor) / denominator) : financed / term
}

const DEFAULT_CALC_VALUES = (() => {
  const { cost, advance, term, rate, residual } = INITIAL_CALCULATOR_STATE
  const advanceRub = (cost * advance) / 100
  const residualRub = (cost * residual) / 100
  const monthlyPayment = calculateMonthlyPayment(cost, advance, term, rate, residual)

  return {
    cost: formatRubAmount(cost),
    advance: formatAdvanceValue(`${formatRubAmount(advanceRub)} (${Math.round(advance)}%)`),
    term: `${Math.round(term)} мес.`,
    rate: normalizeRateValue(`${rate} % годовых`),
    residual: formatRubAmount(residualRub),
    payment: formatRubAmount(monthlyPayment),
  }
})()

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
    .map((line: string) => line.trim())
    .filter(Boolean)

  const calcMap = new Map<string, string>()
  for (const line of calcLines) {
    const [title, ...rest] = line.split(':')
    if (!title || rest.length === 0) continue
    calcMap.set(title.trim(), rest.join(':').trim())
  }

  const costText = calcMap.get('Стоимость техники') ?? cost
  const advanceTextRaw = calcMap.get('Аванс') ?? advance
  const termText = calcMap.get('Срок') ?? term
  const rateTextRaw = calcMap.get('Ставка') ?? rate
  const residualText = calcMap.get('Остаточный платёж') ?? residual
  const paymentText = calcMap.get('Ежемесячный платёж') ?? payment

  const advanceText = advanceTextRaw ? formatAdvanceValue(advanceTextRaw, advance) : ''
  const rateText = rateTextRaw ? normalizeRateValue(rateTextRaw) : ''

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

  const requestValues: Record<keyof typeof DEFAULT_CALC_VALUES, string> = {
    cost: costText,
    advance: advanceText,
    term: termText,
    rate: rateText,
    residual: residualText,
    payment: paymentText,
  }

  const normalizeForComparison = (value: string) => value.replace(/\s+/g, ' ').trim()
  const isDefaultCalcRequest = (
    Object.entries(requestValues) as [keyof typeof DEFAULT_CALC_VALUES, string][]
  ).every(([key, value]) => {
    if (!value) return true
    const defaultValue = DEFAULT_CALC_VALUES[key]
    return normalizeForComparison(value) === normalizeForComparison(defaultValue)
  })

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

  const hasRequestData = requestLinesPlain.length > 0 || Boolean(paymentText)
  if (hasRequestData && !isDefaultCalcRequest) {
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