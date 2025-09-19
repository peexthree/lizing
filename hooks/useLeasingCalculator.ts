// src/hooks/useLeasingCalculator.ts

import { useReducer, useMemo, useCallback, useEffect } from 'react';
import {
  INITIAL_CALCULATOR_STATE,
  SLIDER_CONFIG,
  CALCULATION_SCHEMA,
  CURRENCY_FORMATTER,
  type CalculatorState,
} from '@/config/calculator.config';
import { openLeadForm } from '@/lib/openLeadForm';

// --- Types ---
type State = CalculatorState;

type Action =
  | { type: 'SET_FIELD'; field: keyof State; value: number | string }
  | { type: 'SET_COST'; value: number }
  | { type: 'TOGGLE_ADVANCE_MODE'; advanceRub: number; advancePercent: number };

export type CalculatorPrefillDetail = { cost?: number; term?: number; advance?: number };

const STORAGE_KEY = 'leasing-calculator-state';

const INITIALIZER = (): State => {
  if (typeof window === 'undefined') {
    return INITIAL_CALCULATOR_STATE;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_CALCULATOR_STATE;
    }

    const parsed = JSON.parse(raw) as unknown;
    const result = CALCULATION_SCHEMA.safeParse(parsed);
    if (result.success) {
      return { ...INITIAL_CALCULATOR_STATE, ...result.data };
    }
  } catch (error) {
    console.warn('[calculator] Failed to read saved state', error);
  }

  return INITIAL_CALCULATOR_STATE;
};

// --- Reducer ---
function calculatorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      if (action.field === 'advanceMode') {
        return { ...state, advanceMode: action.value as State['advanceMode'] };
      }

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
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_CALCULATOR_STATE, INITIALIZER);
  const { cost, advance, advanceMode, term, rate, residual } = state;

  const clamp = useCallback((value: number, min: number, max: number) => {
    if (Number.isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
  }, []);

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
    
    const summaryLines = [
      `Стоимость техники: ${formatRub(safeCost)}`,
      `Аванс: ${formatRub(advanceRub)} (${Math.round(advancePercent)}%)`,
      `Срок: ${Math.round(safeTerm)} мес.`,
      `Ставка: ${Number(safeRate.toFixed(2))} % годовых`,
      `Ежемесячный платёж: ${formatRub(monthlyPayment)}`,
      `Остаточный платёж: ${formatRub(residualRub)}`,
    ];

    const summary = summaryLines.slice(0, 4).join(' · ');
    const detailedSummary = summaryLines.join('\n');

    return {
      advanceRub,
      advancePercent,
      residualRub,
      financed,
      monthlyPayment,
      total,
      overpayment,
      effectiveRate,
      summary,
      summaryLines,
      detailedSummary,
    };

  }, [cost, advance, advanceMode, term, rate, residual]);

  const { advanceRub, advancePercent } = calculations;

  // --- Event Handlers ---
  const handleFieldChange = useCallback((field: keyof State, value: number | string) => {
    if (field === 'advanceMode') {
      dispatch({ type: 'SET_FIELD', field, value });
      return;
    }

    const numericValue = Number(value);

    switch (field) {
      case 'cost':
        dispatch({
         type: 'SET_FIELD',
          field,
          value: clamp(numericValue, SLIDER_CONFIG.cost.min, SLIDER_CONFIG.cost.max),
        });
        break;
      case 'advance': {
        const min = advanceMode === 'percent' ? SLIDER_CONFIG.advancePercent.min : SLIDER_CONFIG.advanceCurrency.min;
        const max = advanceMode === 'percent' ? SLIDER_CONFIG.advancePercent.max : cost;
        dispatch({ type: 'SET_FIELD', field, value: clamp(numericValue, min, max) });
        break;
      }
      case 'term':
        dispatch({ type: 'SET_FIELD', field, value: clamp(numericValue, SLIDER_CONFIG.term.min, SLIDER_CONFIG.term.max) });
        break;
      case 'rate':
        dispatch({ type: 'SET_FIELD', field, value: clamp(numericValue, SLIDER_CONFIG.rate.min, SLIDER_CONFIG.rate.max) });
        break;
      case 'residual':
        dispatch({ type: 'SET_FIELD', field, value: clamp(numericValue, SLIDER_CONFIG.residual.min, SLIDER_CONFIG.residual.max) });
        break;
      default:
        dispatch({ type: 'SET_FIELD', field, value: numericValue });
    }
  }, [advanceMode, clamp, cost]);

  const handleCostChange = useCallback(
    (value: number) => {
      const safeValue = clamp(value, SLIDER_CONFIG.cost.min, SLIDER_CONFIG.cost.max);
      dispatch({ type: 'SET_COST', value: safeValue });
    },
    [clamp],
  );

  const toggleAdvanceMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_ADVANCE_MODE', advanceRub, advancePercent });
  }, [advanceRub, advancePercent]);

  const persistSummary = useCallback((summary: string) => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      window.localStorage.setItem('calc', summary);
      window.dispatchEvent(new CustomEvent('calc-summary', { detail: summary }));
      return true;
    } catch (error) {
      console.warn('[calculator] Failed to persist summary', error);
      return false;
    }
  }, []);

  const handleApplyToForm = useCallback(() => {
    const parsed = CALCULATION_SCHEMA.safeParse(state);
    if (!parsed.success) {
      console.warn('[calculator] Unable to apply because state is invalid', parsed.error);
      return;
    }

    const safeState = parsed.data;
    persistSummary(calculations.detailedSummary);
    openLeadForm({
      calcSummary: calculations.detailedSummary,
      fields: {
        cost: formatRub(safeState.cost),
        advance:
          safeState.advanceMode === 'percent'
            ? `${Math.round(calculations.advancePercent)}%`
            : formatRub(calculations.advanceRub),
        term: `${Math.round(safeState.term)} мес.`,
        rate: `${Number(safeState.rate.toFixed(2))} %`,
        residual: `${Math.round(safeState.residual)} %`,
        payment: formatRub(calculations.monthlyPayment),
      },
    });
  }, [calculations, persistSummary, state]);

  const handleShare = useCallback((channel: 'whatsapp' | 'email') => {
    if (typeof window === 'undefined') return;

    const text = encodeURIComponent(`Расчет по лизингу:\n${calculations.summary}`);
    if (channel === 'whatsapp') {
      window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
      return;
    }

    window.location.href = `mailto:?subject=${encodeURIComponent('Расчет лизинга')}&body=${text}`;
  }, [calculations.summary]);

  // --- Effects ---
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CalculatorPrefillDetail>).detail;
      if (typeof detail.cost === 'number') handleFieldChange('cost', detail.cost);
      if (typeof detail.term === 'number') handleFieldChange('term', detail.term);
      if (typeof detail.advance === 'number') {
        dispatch({ type: 'SET_FIELD', field: 'advanceMode', value: 'percent' });
        const constrained = clamp(detail.advance, SLIDER_CONFIG.advancePercent.min, SLIDER_CONFIG.advancePercent.max);
        dispatch({ type: 'SET_FIELD', field: 'advance', value: constrained });
      }
    };
    window.addEventListener('prefill-calculator', handler);
    return () => window.removeEventListener('prefill-calculator', handler);
  }, [clamp, handleFieldChange]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const payload = CALCULATION_SCHEMA.safeParse(state);
    if (!payload.success) {
      console.warn('[calculator] Failed to persist state', payload.error);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.data));
  }, [state]);

  useEffect(() => {
    persistSummary(calculations.detailedSummary);
  }, [calculations.detailedSummary, persistSummary]);

  const handleSaveCalculation = useCallback(
    () => persistSummary(calculations.detailedSummary),
    [calculations.detailedSummary, persistSummary],
  );

  return {
    state,
    calculations,
    handleFieldChange,
    handleCostChange,
    toggleAdvanceMode,
    handleApplyToForm,
    handleShare,
    handleSaveCalculation,
  };
}

