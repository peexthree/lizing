'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
  CloseIcon,
  MenuIcon,
  PenIcon,
  PhoneIcon,
  TelegramLineIcon,
  WhatsAppLineIcon,
} from '@/components/icons'
import { useCallback, useEffect, useState } from 'react'

import { openLeadForm } from '@/lib/openLeadForm'

const headerVariants: Variants = {
  top: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(226, 232, 240, 0.4)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  scrolled: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(226, 232, 240, 0.6)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
  },
}

const logoVariants: Variants = {
  top: { scale: 1, originX: 0 },
  scrolled: { scale: 0.85, originX: 0 },
}

const NAV_LINKS = [
  { href: '/#how', label: 'Как работает' },
  { href: '/calculator', label: 'Калькулятор' },
  { href: '/#faq', label: 'FAQ' },
] as const

const CONTACT = {
  href: 'tel:+79677728299',
  label: '+7 (967) 772-82-99',
} as const

const SOCIAL_LINKS = [
  { href: 'https://wa.me/79677728299', Icon: WhatsAppLineIcon, label: 'Написать в WhatsApp' },
  { href: 'https://t.me/dpvlen', Icon: TelegramLineIcon, label: 'Написать в Telegram' },
] as const

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleLeadClick = useCallback(() => {
    openLeadForm()
    setIsMenuOpen(false)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

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
          <motion.div
            variants={logoVariants}
            animate={isScrolled ? 'scrolled' : 'top'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
               <Link href="/" aria-label="На главную" onClick={closeMenu} className="block">
              <Image
                src="/logo.svg"
                alt="Лизинг и точка"
                height={64}
                width={150}
                className="h-10 w-auto md:h-12"
                priority
              />
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-x-6 text-sm font-medium text-slate-700 lg:flex lg:gap-x-8">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-x-4 md:flex">
            <a
              href={CONTACT.href}
              className="flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-slate-950"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>{CONTACT.label}</span>
            </a>
            <button
              type="button"
              onClick={handleLeadClick}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
            >
              Оставить заявку
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={handleLeadClick}
              aria-label="Оставить заявку"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 active:scale-95"
            >
              <PenIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Открыть меню"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-200/70"
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute w-full border-b border-slate-200/60 bg-white/90 shadow-xl backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col gap-y-1 p-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-md px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-3 border-t border-slate-200/80" />

              <div className="px-4 py-2">
                <p className="mb-3 text-sm text-slate-500">Связаться с нами:</p>
                <div className="flex items-center gap-x-4">
                  <a
                    href={CONTACT.href}
                    aria-label="Позвонить"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  >
                    <PhoneIcon className="h-5 w-5" />
                  </a>
                  {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header