'use client'

import { Phone, MessageCircle, PenLine, Menu } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import type { MouseEvent as ReactMouseEvent, SVGProps } from 'react'
import { openLeadForm } from '@/lib/openLeadForm'
import { openCalculator } from '@/lib/openCalculator'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.47A11.8 11.8 0 0 0 11.99 0C5.37 0 .01 5.34.01 11.94c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.64a11.96 11.96 0 0 0 5.73 1.46h.01c6.62 0 11.99-5.34 11.99-11.94a11.83 11.83 0 0 0-3.46-8.41Zm-8.53 18.23h-.01a9.97 9.97 0 0 1-5.08-1.4l-.36-.21-3.72.98 1-3.62-.24-.37a9.88 9.88 0 0 1-1.51-5.27c0-5.46 4.46-9.9 9.95-9.9 2.66 0 5.16 1.03 7.04 2.9a9.85 9.85 0 0 1 2.92 7c0 5.46-4.47 9.9-9.99 9.9Zm5.46-7.43c-.3-.15-1.77-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48-.9-.79-1.51-1.76-1.69-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.2-.24-.58-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1-1.04 2.44 0 1.43 1.07 2.8 1.22 3 .15.2 2.1 3.2 5.08 4.48.71.3 1.27.48 1.7.62.71.22 1.35.19 1.86.12.57-.08 1.77-.72 2.02-1.43.25-.7.25-1.3.17-1.43-.08-.12-.27-.2-.57-.35Z" />
    </svg>
  )
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 240" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0Zm58.28 81.36-18.63 88.04c-1.41 6.3-5.15 7.87-10.44 4.91l-28.87-21.3-13.91 13.4c-1.53 1.53-2.8 2.8-5.74 2.8l2.05-29.15 53.05-47.95c2.31-2.05-.5-3.2-3.58-1.15l-65.5 41.23-28.2-8.83c-6.12-1.9-6.25-6.12 1.27-9.07l110.07-42.48c5.12-1.9 9.59 1.15 7.93 9.07Z" />
    </svg>
  )
}


export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

 const handleCalculatorClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      event.preventDefault()
      openCalculator()
      setOpen(false)
    },
    []
  )
 const handleLeadClick = useCallback(() => {
    openLeadForm()
    setOpen(false)
  }, [])


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? 'rgba(255, 255, 255, 0.68)'
            : 'rgba(255, 255, 255, 0.48)',
          borderColor: scrolled
            ? 'rgba(255, 255, 255, 0.4)'
            : 'rgba(255, 255, 255, 0.28)',
          boxShadow: scrolled
            ? '0 24px 55px rgba(15, 23, 42, 0.18)'
            : '0 18px 45px rgba(15, 23, 42, 0.14)',
          paddingTop: scrolled ? '0.6rem' : '0.95rem',
          paddingBottom: scrolled ? '0.6rem' : '0.95rem'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-full overflow-hidden rounded-b-3xl border border-white/30 bg-white/30 px-3 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          {/* Логотип */}
          <motion.div
            animate={{ scale: scrolled ? 0.6 : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Лизинг и точка"
              height={96}
              width={96}
              className="h-12 w-auto md:h-16 lg:h-20"
              priority
            />
          </motion.div>

          {/* Навигация desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#how" className="text-dark hover:text-accent transition-colors">Как работает</a>
            <a
              href="/calculator"
              onClick={handleCalculatorClick}
              className="text-dark hover:text-accent transition-colors"
            >
              Калькулятор
            </a>
            
            <a href="#faq" className="text-dark hover:text-accent transition-colors">FAQ</a>
            
          </nav>

          {/* Контакты desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+79677728299"
              className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Позвонить</span>
            </a>
            <a
              href="https://wa.me/79677728299"
              className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => openLeadForm()}
              className="flex items-center gap-2 rounded-full bg-accent text-white px-4 py-2 text-sm font-semibold shadow hover:shadow-lg transition-all"
            >
              <PenLine className="h-4 w-4" />
              <span>Заявка</span>
            </button>
          </div>

         {/* Мобильные действия */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:+79677728299"
              aria-label="Позвонить"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/79677728299"
              aria-label="Написать в WhatsApp"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/dpvlen"
              aria-label="Написать в Telegram"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
            >
              <TelegramIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              aria-label="Оставить заявку"
              onClick={handleLeadClick}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316] text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
            >
              <PenLine className="h-5 w-5" />
            </button>
            <button
              className="rounded-md p-2 text-dark transition hover:bg-accent/10"
              onClick={() => setOpen(!open)}
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Выпадающее меню mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-white/30 bg-white/60 backdrop-blur-2xl shadow-xl supports-[backdrop-filter]:bg-white/30"
          >
            <nav className="flex flex-col gap-4 px-4 py-6 text-sm font-medium">
              <a href="#how" className="text-dark hover:text-accent transition">Как работает</a>
              <a
                href="/calculator"
                onClick={handleCalculatorClick}
                className="text-dark hover:text-accent transition"
              >
                Калькулятор
              </a>
              <a href="#examples" className="text-dark hover:text-accent transition">Примеры</a>
               <div className="mt-2 flex items-center gap-3">
                <a
                  href="tel:+79677728299"
                  aria-label="Позвонить"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
                >
                  <Phone className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/79677728299"
                  aria-label="Написать в WhatsApp"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://t.me/dpvlen"
                  aria-label="Написать в Telegram"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0088cc] text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
                >
                  <TelegramIcon className="h-5 w-5" />
                </a>
                <button
                  type="button"
                  aria-label="Оставить заявку"
                  onClick={handleLeadClick}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316] text-white shadow-sm transition hover:scale-[1.03] active:scale-95"
                >
                  <PenLine className="h-5 w-5" />
                </button>
              </div>
  </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

