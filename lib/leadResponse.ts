const DEFAULT_ERROR_MESSAGE =
  'Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь напрямую.'

const DEFAULT_WARNING_MESSAGE =
  'Заявка получена, мы свяжемся с вами в ближайшее время.'

type LeadResponsePayload = {
  delivered?: unknown
  warning?: unknown
  error?: unknown
}

type ParsedLeadResponse = {
  delivered: boolean
  warningMessage: string | null
  errorMessage: string
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const getWarningMessage = (code: string | null) => {
  switch (code) {
    case 'telegram-not-configured':
      return 'Заявка сохранена, но уведомление не отправлено. Мы обработаем её вручную.'
    case 'telegram-delivery-failed':
      return 'Заявка отправлена, но уведомление не доставлено. Менеджер проверит её вручную.'
    default:
      return DEFAULT_WARNING_MESSAGE
  }
}

const getErrorMessage = (code: string | null) => {
  if (!code) return DEFAULT_ERROR_MESSAGE

  if (code.toLowerCase().includes('failed to submit')) {
    return 'Сервис временно недоступен. Напишите нам в WhatsApp или Telegram.'
  }

  return DEFAULT_ERROR_MESSAGE
}

export const parseLeadResponse = (data: unknown): ParsedLeadResponse => {
  if (!isRecord(data)) {
    return {
      delivered: true,
      warningMessage: null,
      errorMessage: DEFAULT_ERROR_MESSAGE,
    }
  }

  const payload = data as LeadResponsePayload
  const delivered = typeof payload.delivered === 'boolean' ? payload.delivered : true
  const warningCode = typeof payload.warning === 'string' ? payload.warning : null
  const errorCode = typeof payload.error === 'string' ? payload.error : null

  return {
    delivered,
    warningMessage: delivered ? null : getWarningMessage(warningCode),
    errorMessage: getErrorMessage(errorCode),
  }
}

export { DEFAULT_ERROR_MESSAGE, DEFAULT_WARNING_MESSAGE }

export type { ParsedLeadResponse }
