'use client'

import { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useState } from 'react'
import { Calculator as CalculatorIcon, Sparkles, X } from 'lucide-react'

import Calculator from './Calculator'

export default function CalculatorModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    const { style } = document.body
    const previousOverflow = style.overflow
    style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      style.overflow = previousOverflow
    }
  }, [close, isOpen])

  useEffect(() => {
    const handleOpen = () => open()
    window.addEventListener('open-calculator', handleOpen)
    return () => window.removeEventListener('open-calculator', handleOpen)
  }, [open])

  const handleOverlayClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        close()
      }
    },
    [close]
  )

  return (
    <>
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(94,140,255,0.28),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(29,78,216,0.32),_transparent_60%),linear-gradient(140deg,_#0f1a3b_0%,_#1e3a8a_38%,_#1e66ff_100%)]"
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
          <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute -right-16 bottom-[-5rem] h-80 w-80 rounded-full bg-[#60a5fa]/40 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 shadow-lg backdrop-blur">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
            Онлайн-расчёт
          </span>

          <div className="space-y-6">
            <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Откройте лучший калькулятор лизинга в один клик
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl">
              Настройте стоимость, срок и аванс, сохраните расчёт и отправьте заявку. Все данные автоматически попадут к менеджеру
              в Telegram.
            </p>
          </div>

          <button
            type="button"
            onClick={open}
            className="group relative flex w-full max-w-2xl items-center justify-between gap-4 rounded-full border border-white/25 bg-gradient-to-r from-accent via-[#4f7bff] to-[#60a5fa] px-6 py-5 text-left shadow-[0_40px_90px_-45px_rgba(15,23,42,0.9)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="calculator-modal"
          >
            <span className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white/20 shadow-inner transition-transform duration-300 group-hover:scale-105">
              <CalculatorIcon className="h-10 w-10 text-white" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Рассчитать платёж</span>
              <span className="text-2xl font-semibold leading-tight sm:text-3xl">Открыть калькулятор</span>
              <span className="text-sm text-white/75">3 шага · Сохранение расчёта · Автоматическое заполнение заявки</span>
            </span>
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/20 text-xs font-semibold uppercase tracking-[0.45em]">
              GO
            </span>
          </button>

          <div className="grid w-full gap-4 text-left text-sm text-white/80 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Сохранение</div>
              <p className="mt-2 leading-relaxed">Результат расчёта автоматически сохраняется и подтягивается в заявку.</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Отправка</div>
              <p className="mt-2 leading-relaxed">Заявка с расчётом прилетает в Telegram команде без ручного ввода.</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Скорость</div>
              <p className="mt-2 leading-relaxed">Подбор условий и заявка занимают меньше минуты — всё в одном окне.</p>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center bg-[#0f172a]/70 px-4 py-6 sm:px-6 sm:py-10 backdrop-blur transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        id="calculator-modal"
        onClick={handleOverlayClick}
      >
        <div
          className={`relative flex w-full max-w-6xl flex-col overflow-hidden rounded-[2.75rem] border border-white/70 bg-white/95 shadow-hero transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-dark/10 bg-white/90 text-dark shadow transition hover:-translate-y-0.5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Закрыть калькулятор"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex h-[min(90vh,820px)] flex-col">
            <Calculator variant="modal" />
          </div>
        </div>
      </div>
    </>
  )
}