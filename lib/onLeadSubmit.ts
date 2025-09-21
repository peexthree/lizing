type LeadSubmitMeta = {
  name: string
  phone: string
  phoneDisplay: string
  source: string
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
  ownEquipment: string
  messenger: string
  wantExamples: string
}

type LeadSubmitPayload = {
  plain: string
  html: string
  meta: LeadSubmitMeta
}

type LeadSubmitErrorCode = 'missing-config' | 'telegram-error'

export class LeadSubmitError extends Error {
  readonly code: LeadSubmitErrorCode

  constructor(message: string, code: LeadSubmitErrorCode) {
    super(message)
    this.name = 'LeadSubmitError'
    this.code = code
  }
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
 html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\n{3,}/g, '\n\n')

const safeParseNumber = (value: string | undefined) => {
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export async function onLeadSubmit(data: LeadSubmitPayload): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()
  const threadId = process.env.TELEGRAM_THREAD_ID?.trim()

  if (!botToken || !chatId) {
    const missingConfig: string[] = []
    if (!botToken) missingConfig.push('TELEGRAM_BOT_TOKEN')
    if (!chatId) missingConfig.push('TELEGRAM_CHAT_ID')

    const message = `Telegram integration is not configured: ${missingConfig.join(', ')}`
    if (process.env.NODE_ENV === 'production') {
      throw new LeadSubmitError(message, 'missing-config')
    }

    console.warn(message)
    console.info('Lead payload (not sent to Telegram):', JSON.stringify(data, null, 2))
    return false
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT)

  const telegramChatId: string = chatId

  const payload: TelegramSendMessagePayload = {
    chat_id: telegramChatId,
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
        throw new LeadSubmitError('Telegram response parsing failed', 'telegram-error')
      }
    }

    if (!response.ok || !json?.ok) {
      const description = json?.description || response.statusText
      throw new LeadSubmitError(`Telegram sendMessage failed: ${description}`, 'telegram-error')
    }
  } catch (error) {
    if (error instanceof LeadSubmitError) {
      throw error
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new LeadSubmitError('Telegram request timed out', 'telegram-error')
    }
    const message = error instanceof Error ? error.message : 'Unknown Telegram error'
    throw new LeadSubmitError(message, 'telegram-error')
  } finally {
    clearTimeout(timeout)
  }

  return true
}