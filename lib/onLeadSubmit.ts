type LeadSubmitMeta = {
  name: string
  phone: string
  phoneDisplay: string
  clientType: string
  tech: string
  budget: string
  comment: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  referrer: string
  calc: string
  cost: string
  advance: string
  term: string
  rate: string
  residual: string
  payment: string
  host: string
  isDefaultCalcRequest: boolean
}

type LeadSubmitPayload = {
  plain: string
  html: string
  meta: LeadSubmitMeta
}

type TelegramSendMessagePayload = {
  chat_id: string
  text: string
  parse_mode: 'HTML'
  disable_web_page_preview: true
  message_thread_id?: number
}

type TelegramResponse = {
  ok: boolean
  description?: string
}

const TELEGRAM_TIMEOUT = 10_000

const TELEGRAM_API_BASE = 'https://api.telegram.org'

const normalizeHtmlMessage = (html: string) =>
  html.replace(/<br\s*\/?>/gi, '<br>')

const safeParseNumber = (value: string | undefined) => {
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export async function onLeadSubmit(data: LeadSubmitPayload) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()
  const threadId = process.env.TELEGRAM_THREAD_ID?.trim()

  const missingConfig: string[] = []
  if (!botToken) missingConfig.push('TELEGRAM_BOT_TOKEN')
  if (!chatId) missingConfig.push('TELEGRAM_CHAT_ID')

  if (missingConfig.length > 0) {
    const message = `Telegram integration is not configured: ${missingConfig.join(', ')}`
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message)
    }

    console.warn(message)
    console.info('Lead payload (not sent to Telegram):', JSON.stringify(data, null, 2))
    return
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT)

  const payload: TelegramSendMessagePayload = {
    chat_id: chatId,
    text: normalizeHtmlMessage(data.html),
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  }

  const resolvedThreadId = safeParseNumber(threadId)
  if (typeof resolvedThreadId === 'number') {
    payload.message_thread_id = resolvedThreadId
  }

  try {
    const response = await fetch(`${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    let json: TelegramResponse | undefined
    try {
      json = (await response.json()) as TelegramResponse
    } catch (parseError) {
      if (response.ok) {
        throw new Error('Telegram response parsing failed')
      }
    }

    if (!response.ok || !json?.ok) {
      const description = json?.description || response.statusText
      throw new Error(`Telegram sendMessage failed: ${description}`)
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Telegram request timed out')
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}