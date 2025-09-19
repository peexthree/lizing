// src/hooks/useLeasingCalculator.ts

import { useReducer, useMemo, useCallback, useEffect, useRef } from 'react';
import { z } from 'zod';
import {
  INITIAL_CALCULATOR_STATE,
  SLIDER_CONFIG,
  CALCULATION_SCHEMA,
  CURRENCY_FORMATTER,
} from '@/config/calculator.config';
import { openLeadForm } from '@/lib/openLeadForm';

// --- Types ---
type State = typeof INITIAL_CALCULATOR_STATE;

type Action =
  | { type: 'SET_FIELD'; field: keyof State; value: number | string }
  | { type: 'SET_COST'; value: number }
  | { type: 'TOGGLE_ADVANCE_MODE'; advanceRub: number; advancePercent: number };

type PrefillDetail = { cost?: number; term?: number; advance?: number };

// --- Reducer ---
function calculatorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: Number(action.value) };
    case 'SET_COST': {
        const newCost = Number(action.value);
        if (state.advanceMode === 'currency' && state.advance > newCost) {
            return { ...state, cost: newCost, advance: newCost };
        }
        return { ...state, cost: newCost };
    }
    case 'TOGGLE_ADVANCE_MODE':
      if (state.advanceMode === 'percent') {
        return { ...state, advanceMode: 'currency', advance: Math.round(action.advanceRub) };
      }
      return { ...state, advanceMode: 'percent', advance: Math.round(action.advancePercent) };
    default:
      return state;
  }
}

// --- Helper Functions ---
export function formatRub(n: number) {
  return `${CURRENCY_FORMATTER.format(Math.round(n))} ₽`;
}

// --- The Hook ---
export function useLeasingCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_CALCULATOR_STATE);
  const { cost, advance, advanceMode, term, rate, residual } = state;

  const calculations = useMemo(() => {
    // Calculation logic is exactly the same as in your original code
    const safeCost = Math.max(cost, 0);
    const safeAdvance = Math.max(advance, 0);
    const safeTerm = Math.max(term, 1);
    const safeRate = Math.max(rate, 0);
    const safeResidual = Math.max(residual, 0);

    const advanceRub = advanceMode === 'percent' ? (safeCost * safeAdvance) / 100 : safeAdvance;
    const advancePercent = safeCost > 0 ? (advanceRub / safeCost) * 100 : 0;
    const residualRub = (safeCost * safeResidual) / 100;
    const financed = safeCost - advanceRub - residualRub;
    const monthlyRate = safeRate / 12 / 100;

    let monthlyPayment = 0;
    if (financed > 0) {
      if (monthlyRate > 0) {
        const factor = Math.pow(1 + monthlyRate, safeTerm);
        const denominator = factor - 1;
        monthlyPayment = denominator > 0 ? financed * ((monthlyRate * factor) / denominator) : financed / safeTerm;
      } else {
        monthlyPayment = financed / safeTerm;
      }
    }

    const total = advanceRub + residualRub + monthlyPayment * safeTerm;
    const overpayment = total - safeCost;
    const effectiveRate = safeCost > 0 ? (total / safeCost - 1) * 100 : 0;
    
    const summary = [
        `Стоимость: ${formatRub(safeCost)}`,
        `Аванс: ${formatRub(advanceRub)} (${Math.round(advancePercent)}%)`,
        `Срок: ${Math.round(safeTerm)} мес.`,
        `Платёж: ${formatRub(monthlyPayment)}`,
    ].join(' · ');

    return { advanceRub, advancePercent, residualRub, financed, monthlyPayment, total, overpayment, effectiveRate, summary };
  }, [cost, advance, advanceMode, term, rate, residual]);

  const { advanceRub, advancePercent } = calculations;

  // --- Event Handlers ---
  const handleFieldChange = useCallback((field: keyof State, value: number | string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);
  
  const handleCostChange = useCallback((value: number) => {
      dispatch({ type: 'SET_COST', value });
  }, []);

  const toggleAdvanceMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_ADVANCE_MODE', advanceRub, advancePercent });
  }, [advanceRub, advancePercent]);
  
  const handleApplyToForm = useCallback(() => {
    // ... same logic as before, but using state and calculations from the hook
  }, [/* dependencies */]);

  const handleShare = useCallback((channel: 'whatsapp' | 'email') => {
    // ... same logic as before
  }, [calculations.summary]);

  // --- Effects ---
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<PrefillDetail>).detail;
      if (detail.cost) handleFieldChange('cost', detail.cost);
      if (detail.term) handleFieldChange('term', detail.term);
      if (detail.advance) {
        handleFieldChange('advanceMode', 'percent');
        handleFieldChange('advance', detail.advance);
      }
    };
    window.addEventListener('prefill-calculator', handler);
    return () => window.removeEventListener('prefill-calculator', handler);
  }, [handleFieldChange]);

  // Effect for saving to localStorage remains the same

  return {
    state,
    calculations,
    handleFieldChange,
    handleCostChange,
    toggleAdvanceMode,
    handleApplyToForm,
    handleShare,
  };
}