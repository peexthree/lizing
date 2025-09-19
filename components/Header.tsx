'use client'

import { Phone, MessageCircle, PenLine, Menu } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { openLeadForm } from '@/lib/openLeadForm'
import { openCalculator } from '@/lib/openCalculator'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
            animate={{ scale: scrolled ? 0.8 : 1 }}
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
              href="#calculator"
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

          {/* Мобильное меню */}
          <button
            className="md:hidden rounded-md p-2 text-dark transition hover:bg-accent/10"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6" />
          </button>
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
                href="#calculator"
                onClick={handleCalculatorClick}
                className="text-dark hover:text-accent transition"
              >
                Калькулятор
              </a>
              <a href="#examples" className="text-dark hover:text-accent transition">Примеры</a>
              
              <a
                href="tel:+79677728299"
                className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition"
              >
                <Phone className="h-4 w-4" />
                <span>Позвонить</span>
              </a>
              <a
                href="https://wa.me/79677728299"
                className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => openLeadForm()}
                className="flex items-center justify-center gap-2 rounded-full bg-accent text-white px-4 py-2 text-sm font-semibold shadow hover:shadow-lg transition-all"
              >
                <PenLine className="h-4 w-4" />
                <span>Заявка</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
