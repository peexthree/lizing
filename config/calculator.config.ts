import { z } from 'zod';

export type CalculatorAdvanceMode = 'percent' | 'currency';

export type CalculatorState = {
  cost: number;
  advance: number;
  advanceMode: CalculatorAdvanceMode;
  term: number;
  rate: number;
  residual: number;
};

export const CURRENCY_FORMATTER = new Intl.NumberFormat('ru-RU');

export const INITIAL_CALCULATOR_STATE: CalculatorState = {
  cost: 5_000_000,
  advance: 20,
  advanceMode: 'percent',
  term: 36,
  rate: 15,
  residual: 10,
};

export const SLIDER_CONFIG = {
  cost: { min: 100_000, max: 20_000_000, step: 100_000 },
  advancePercent: { min: 0, max: 90, step: 1 },
  advanceCurrency: { min: 0, step: 1000 },
  term: { min: 1, max: 60, step: 1 },
  residual: { min: 0, max: 50, step: 1 },
  rate: { min: 0, max: 50, step: 0.5 },
};

export const CALCULATION_SCHEMA = z.object({
  cost: z.number().min(SLIDER_CONFIG.cost.min),
  advance: z.number().min(0),
  advanceMode: z.enum(['percent', 'currency']).default('percent'),
  term: z.number().min(SLIDER_CONFIG.term.min),
  rate: z.number().min(0),
  residual: z.number().min(0),
});

export type CalculatorPersistedState = z.infer<typeof CALCULATION_SCHEMA>;