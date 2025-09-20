'use client'

import { useEffect } from 'react'

import Calculator from '@/components/calculator/Calculator'
import type { CalculatorPrefillDetail } from '@/hooks/useLeasingCalculator'

type CalculatorPageContentProps = {
  prefill?: CalculatorPrefillDetail
}

export default function CalculatorPageContent({ prefill }: CalculatorPageContentProps) {
  useEffect(() => {
    if (!prefill || Object.keys(prefill).length === 0) {
      return
    }

    window.dispatchEvent(
      new CustomEvent<CalculatorPrefillDetail>('prefill-calculator', {
        detail: prefill
      })
    )
  }, [prefill])

  return (
    <main className="min-h-screen bg-[#0f1a3b] text-white">
      <Calculator variant="page" id="calculator" />
 <LeadForm />
    </main>

  )
}