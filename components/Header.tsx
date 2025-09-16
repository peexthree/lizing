'use client'

import { Phone, MessageCircle, PenLine, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { openLeadForm } from '@/lib/openLeadForm'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      className="sticky top-0 z-50 backdrop-blur-xl"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? 'rgba(255,255,255,0.9)'
            : 'rgba(255,255,255,0.7)',
          boxShadow: scrolled
            ? '0 2px 12px rgba(0,0,0,0.08)'
            : '0 0 0 rgba(0,0,0,0)',
          paddingTop: scrolled ? '0.5rem' : '0.75rem',
          paddingBottom: scrolled ? '0.5rem' : '0.75rem'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="mx-auto flex max-w-6xl items-center justify-between px-4"
      >
        {/* Логотип */}
        <motion.div
          animate={{ scale: scrolled ? 0.8 : 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <Image
            src="/logo.svg"
            alt="Лизинг и точка"
            height={48}
            width={48}
            className="h-10 w-auto md:h-12"
            priority
          />
        </motion.div>

        {/* Навигация desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#how" className="text-dark hover:text-accent transition-colors">Как работает</a>
          <a href="#calculator" className="text-dark hover:text-accent transition-colors">Калькулятор</a>
          <a href="#examples" className="text-dark hover:text-accent transition-colors">Примеры</a>
          <a href="#faq" className="text-dark hover:text-accent transition-colors">FAQ</a>
          <a href="#contacts" className="text-dark hover:text-accent transition-colors">Контакты</a>
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
          className="md:hidden rounded-md p-2 text-dark hover:bg-accent/10 transition"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </motion.div>

      {/* Выпадающее меню mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-lg"
          >
            <nav className="flex flex-col gap-4 px-4 py-6 text-sm font-medium">
              <a href="#how" className="text-dark hover:text-accent transition">Как работает</a>
              <a href="#calculator" className="text-dark hover:text-accent transition">Калькулятор</a>
              <a href="#examples" className="text-dark hover:text-accent transition">Примеры</a>
              <a href="#faq" className="text-dark hover:text-accent transition">FAQ</a>
              <a href="#contacts" className="text-dark hover:text-accent transition">Контакты</a>
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
