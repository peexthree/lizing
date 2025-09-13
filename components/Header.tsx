'use client'

import { Phone, MessageCircle, PenLine } from 'lucide-react'
import Logo from './Logo'

function scrollToForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-white/20">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <Logo />
        <nav className="ml-8 hidden md:flex items-center gap-6">
          <a href="#how" className="text-sm font-medium text-dark hover:text-accent">Как работает</a>
          <a href="#calculator" className="text-sm font-medium text-dark hover:text-accent">Калькулятор</a>
          <a href="#examples" className="text-sm font-medium text-dark hover:text-accent">Примеры</a>
          <a href="#faq" className="text-sm font-medium text-dark hover:text-accent">FAQ</a>
          <a href="#contacts" className="text-sm font-medium text-dark hover:text-accent">Контакты</a>
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <a
            href="tel:+79677728299"
            aria-label="Позвонить"
            className="flex items-center gap-1 rounded-2xl bg-accent px-4 py-2 text-white shadow"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">Позвонить</span>
          </a>
          <a
            href="https://wa.me/79677728299"
            aria-label="WhatsApp"
            className="flex items-center gap-1 rounded-2xl bg-accent px-4 py-2 text-white shadow"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
          <button
            onClick={scrollToForm}
            aria-label="Оставить заявку"
            className="flex items-center gap-1 rounded-2xl bg-accent px-4 py-2 text-white shadow"
          >
            <PenLine className="h-4 w-4" />
            <span className="text-sm font-medium">Заявка</span>
          </button>
        </div>
      </div>
    </header>
  )
}