import type { Metadata } from 'next'

import CalculatorPageContent from './CalculatorPageContent'
import type { CalculatorPrefillDetail } from '@/hooks/useLeasingCalculator'

export const metadata: Metadata = {
  title: 'Калькулятор лизинга — Лизинг и точка',
  description:
    'Подберите условия лизинга: настройте стоимость, срок, аванс и получите мгновенный расчёт платежа с возможностью отправить заявку.',
}

type CalculatorPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

function parseNumberParam(value?: string | string[]): number | undefined {
  if (Array.isArray(value)) {
    return parseNumberParam(value[0])
  }

  if (typeof value !== 'string') {
    return undefined
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export default async function CalculatorPage({
  searchParams,
}: CalculatorPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const prefill: CalculatorPrefillDetail = {}

  const cost = parseNumberParam(resolvedSearchParams.cost)
  if (typeof cost === 'number') {
    prefill.cost = cost
  }

  const term = parseNumberParam(resolvedSearchParams.term)
  if (typeof term === 'number') {
    prefill.term = term
  }

  const advance = parseNumberParam(resolvedSearchParams.advance)
  if (typeof advance === 'number') {
    prefill.advance = advance
  }

  const hasPrefill = Object.keys(prefill).length > 0

  return <CalculatorPageContent prefill={hasPrefill ? prefill : undefined} />
}