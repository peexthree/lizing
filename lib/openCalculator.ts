import type { CalculatorPrefillDetail } from '@/hooks/useLeasingCalculator'

export type { CalculatorPrefillDetail }

/**
 * Открывает модальный калькулятор и опционально передаёт значения для предзаполнения.
 */
export function openCalculator(prefill?: CalculatorPrefillDetail) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new Event('open-calculator'))

  if (prefill && Object.keys(prefill).length > 0) {
    window.dispatchEvent(
      new CustomEvent<CalculatorPrefillDetail>('prefill-calculator', {
        detail: prefill
      })
    )
  }
}