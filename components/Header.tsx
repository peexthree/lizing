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
    backgroundColor: 'rgba(10, 10, 15, 0.65)',
    borderColor: 'rgba(234, 179, 8, 0.18)',
    boxShadow: '0 18px 70px -45px rgba(234, 179, 8, 0.35)',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    backdropFilter: 'blur(18px)',
  },
  scrolled: {
    backgroundColor: 'rgba(10, 10, 15, 0.88)',
    borderColor: 'rgba(234, 179, 8, 0.28)',
    boxShadow: '0 25px 70px -30px rgba(10, 10, 15, 0.65)',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    backdropFilter: 'blur(18px)',
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
        className="relative w-full border-b border-white/10 bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40"

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

          <nav className="hidden items-center gap-x-6 text-sm font-medium text-slate-200 lg:flex lg:gap-x-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-x-4 md:flex">
            <a
              href={CONTACT.href}
              className="flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:text-white"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>{CONTACT.label}</span>
            </a>
            <button
              type="button"
              onClick={handleLeadClick}
              className="rounded-full bg-gradient-to-r from-accent via-accent-alt to-accent px-5 py-2.5 text-sm font-semibold text-black shadow-glow transition-all hover:shadow-[0_0_25px_rgba(234,179,8,0.45)] active:scale-95"
            >
              Оставить заявку
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={handleLeadClick}
              aria-label="Оставить заявку"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-alt text-black shadow-glow transition hover:shadow-[0_0_18px_rgba(234,179,8,0.45)] active:scale-95"
            >
              <PenIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Открыть меню"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition hover:bg-white/10"
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
            className="absolute w-full border-b border-white/10 bg-[#08080f]/95 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-y-1 p-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-md px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-3 border-t border-white/10" />

              <div className="px-4 py-2">
                <p className="mb-3 text-sm text-slate-400">Связаться с нами:</p>
                <div className="flex items-center gap-x-4">
                  <a
                    href={CONTACT.href}
                    aria-label="Позвонить"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20"
                  >
                    <PhoneIcon className="h-5 w-5" />
                  </a>
                  {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20"
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