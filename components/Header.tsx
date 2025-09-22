'use client'

import { Phone, MessageCircle, PenLine, Menu, X } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import type { MouseEvent as ReactMouseEvent, SVGProps } from 'react'
import { openLeadForm } from '@/lib/openLeadForm'
import { openCalculator } from '@/lib/openCalculator'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'

// Ваши SVG-иконки остаются без изменений
function WhatsAppIcon(props: SVGProps<SVGSVGElement>) { /* ... */ }
function TelegramIcon(props: SVGProps<SVGSVGElement>) { /* ... */ }


// --- Улучшение: выносим анимации в Variants для чистоты кода ---
const headerVariants: Variants = {
  top: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(226, 232, 240, 0.4)', // slate-200/40
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  scrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(226, 232, 240, 0.6)', // slate-200/60
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
  },
}

const logoVariants: Variants = {
  top: { scale: 1, originX: 0 },
  scrolled: { scale: 0.85, originX: 0 },
}


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Обработчики кликов остаются без изменений
  const handleCalculatorClick = useCallback((event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    openCalculator()
    setIsMenuOpen(false)
  }, [])

  const handleLeadClick = useCallback(() => {
    openLeadForm()
    setIsMenuOpen(false)
  }, [])

  // Эффект для отслеживания скролла
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Проверяем при загрузке
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full"
    >
      <motion.div
        variants={headerVariants}
        animate={isScrolled ? 'scrolled' : 'top'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-full border-b backdrop-blur-lg supports-[backdrop-filter]:bg-white/70"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Логотип */}
          <motion.div
            variants={logoVariants}
            animate={isScrolled ? 'scrolled' : 'top'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
            <a href="#" aria-label="На главную">
              <Image
                src="/logo.svg"
                alt="Лизинг и точка"
                height={64}
                width={150} // Лучше использовать более горизонтальный логотип для хедера
                className="h-10 w-auto md:h-12"
                priority
              />
            </a>
          </motion.div>

          {/* Навигация desktop */}
          <nav className="hidden items-center gap-x-6 text-sm font-medium text-slate-700 lg:flex lg:gap-x-8">
            <a href="#how" className="hover:text-slate-900 transition-colors">Как работает</a>
            <a href="#" onClick={handleCalculatorClick} className="hover:text-slate-900 transition-colors">Калькулятор</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </nav>

          {/* Контакты и CTA desktop */}
          <div className="hidden items-center gap-x-4 md:flex">
            <a href="tel:+79677728299" className="text-sm font-semibold text-slate-800 hover:text-slate-950 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+7 (967) 772-82-99</span>
            </a>
            {/* --- Улучшение: Главный CTA выделен, второстепенный - скромнее --- */}
            <button
              onClick={handleLeadClick}
              className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:bg-slate-800 active:scale-95"
            >
              Оставить заявку
            </button>
          </div>

          {/* --- Улучшение: Упрощенная мобильная шапка --- */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleLeadClick}
              aria-label="Оставить заявку"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 active:scale-95"
            >
              <PenLine className="h-5 w-5" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-200/70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- Улучшение: Более чистое мобильное меню --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute w-full shadow-xl bg-white/90 backdrop-blur-lg border-b border-slate-200/60"
          >
            <nav className="flex flex-col gap-y-1 p-4">
              <a href="#how" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">Как работает</a>
              <a href="#" onClick={handleCalculatorClick} className="px-4 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">Калькулятор</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">FAQ</a>
              
              <div className="border-t border-slate-200/80 my-3"></div>

              <div className="px-4 py-2">
                <p className="text-sm text-slate-500 mb-3">Связаться с нами:</p>
                <div className="flex items-center gap-x-4">
                  <a href="tel:+79677728299" aria-label="Позвонить" className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"><Phone className="h-5 w-5" /></a>
                  <a href="https://wa.me/79677728299" aria-label="Написать в WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"><WhatsAppIcon className="h-5 w-5" /></a>
                  <a href="https://t.me/dpvlen" aria-label="Написать в Telegram" className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"><TelegramIcon className="h-5 w-5" /></a>
                </div>
              </div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}