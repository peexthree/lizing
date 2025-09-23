'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Menu, PenLine, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useState, type SVGProps } from 'react'

import { openLeadForm } from '@/lib/openLeadForm'

const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

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
  { href: 'https://wa.me/79677728299', Icon: WhatsAppIcon, label: 'Написать в WhatsApp' },
  { href: 'https://t.me/dpvlen', Icon: TelegramIcon, label: 'Написать в Telegram' },
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
              <Phone className="h-4 w-4" />
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
              <PenLine className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Открыть меню"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-200/70"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                    <Phone className="h-5 w-5" />
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