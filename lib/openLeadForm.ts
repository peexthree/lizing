export type LeadFormPrefill = {
  calcSummary?: string
  fields?: Record<string, string>
}

export function openLeadForm(prefill?: LeadFormPrefill) {
  if (typeof window === 'undefined') return

  window.dispatchEvent(new CustomEvent<LeadFormPrefill>('open-lead-form', { detail: prefill }))
}