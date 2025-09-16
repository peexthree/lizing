import type { LeadFormPrefill } from '@/lib/openLeadForm'

declare global {
  interface WindowEventMap {
    'open-lead-form': CustomEvent<LeadFormPrefill>
  }
}

export {}