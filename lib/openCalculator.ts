import type { CalculatorPrefillDetail } from '@/hooks/useLeasingCalculator'

export type { CalculatorPrefillDetail }

/**
 * Открывает страницу калькулятора и опционально передаёт значения для предзаполнения.
 */
export function openCalculator(prefill?: CalculatorPrefillDetail) {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams()

  if (prefill) {
    if (typeof prefill.cost === 'number' && Number.isFinite(prefill.cost)) {
      params.set('cost', String(prefill.cost))
    }

    if (typeof prefill.term === 'number' && Number.isFinite(prefill.term)) {
      params.set('term', String(prefill.term))
    }

    if (typeof prefill.advance === 'number' && Number.isFinite(prefill.advance)) {
      params.set('advance', String(prefill.advance))
    }
  }

  const query = params.toString()
  const url = query ? `/calculator?${query}` : '/calculator'

  window.location.href = url
}