'use client'

import { type MouseEvent, useCallback, useEffect, useState } from 'react'
import { GaugeCircle, X } from 'lucide-react'

import Calculator from './Calculator'

export default function CalculatorModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
    if (typeof window !== 'undefined' && window.location.hash !== '#calculator') {
      const { pathname, search } = window.location
      window.history.replaceState(null, '', `${pathname}${search}#calculator`)
    }
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    if (typeof window !== 'undefined' && window.location.hash === '#calculator') {
      const { pathname, search } = window.location
      window.history.replaceState(null, '', `${pathname}${search}`)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleHashChange = () => {
      if (window.location.hash === '#calculator') {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const handleOpen: EventListener = () => openModal()
    const handlePrefill: EventListener = () => openModal()

    window.addEventListener('open-calculator', handleOpen)
    window.addEventListener('prefill-calculator', handlePrefill)

    return () => {
      window.removeEventListener('open-calculator', handleOpen)
      window.removeEventListener('prefill-calculator', handlePrefill)
    }
  }, [openModal])

  useEffect(() => {
    if (!isOpen) return
    const { style } = document.body
    const originalOverflow = style.overflow
    style.overflow = 'hidden'
    return () => {
      style.overflow = originalOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeModal])

  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!isOpen) return
      if (event.target === event.currentTarget) {
        closeModal()
      }
    },
    [closeModal, isOpen]
  )

  const handleOpenClick = useCallback(() => {
    openModal()
  }, [openModal])

  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Калькулятор</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Откройте калькулятор в отдельном окне</h2>
          <p className="mt-4 text-lg text-dark/70">
            Калькулятор теперь запускается в окне поверх страницы. Настройте параметры, отправьте расчёт в заявку и закройте
            окно, когда будете готовы.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Живое обновление
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Сохраняем расчёт
            </span>
         </div>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleOpenClick}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              <GaugeCircle className="h-5 w-5" aria-hidden />
              Открыть калькулятор
            </button>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center bg-dark/60 px-2 py-6 sm:px-6 sm:py-10 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role={isOpen ? 'dialog' : undefined}
        aria-modal={isOpen ? true : undefined}
        aria-label="Калькулятор лизинговых платежей"
        aria-hidden={isOpen ? undefined : true}
        onClick={handleOverlayClick}
      >
        <div
          className={`relative flex h-[min(90vh,760px)] w-full max-w-6xl flex-col overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/95 shadow-hero backdrop-blur transition-all duration-200 ${
            isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 bg-white/90 text-dark shadow transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Закрыть калькулятор"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex h-full flex-col px-3 pb-6 pt-14 sm:px-8 sm:pt-16">
            <Calculator variant="modal" />
          </div>
        </div>
      </div>
    </>
  )
}

