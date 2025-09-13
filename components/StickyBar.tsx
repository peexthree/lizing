'use client'

import { Phone, MessageCircle, PenLine } from 'lucide-react'

function scrollToForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
}

export default function StickyBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-white/80 backdrop-blur p-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href="tel:+79677728299"
          aria-label="Позвонить"
          className="flex flex-1 items-center justify-center gap-1 rounded-2xl bg-accent px-4 py-3 text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          <Phone aria-hidden="true" className="h-5 w-5" />
          <span className="text-sm font-medium">Позвонить</span>
        </a>
        <a
          href="https://wa.me/79677728299"
          aria-label="WhatsApp"
          className="flex flex-1 items-center justify-center gap-1 rounded-2xl bg-accent px-4 py-3 text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
          <span className="text-sm font-medium">WhatsApp</span>
        </a>
        <button
          onClick={scrollToForm}
          aria-label="Оставить заявку"
          className="flex flex-1 items-center justify-center gap-1 rounded-2xl bg-accent px-4 py-3 text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          <PenLine aria-hidden="true" className="h-5 w-5" />
          <span className="text-sm font-medium">Оставить заявку</span>
        </button>
      </div>
    </nav>
  )
}