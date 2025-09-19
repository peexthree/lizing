'use client'

import Link from 'next/link'
import { Calculator as CalculatorIcon, Sparkles } from 'lucide-react'

export default function CalculatorModal() {
  return (
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

        <Link
          href="/calculator"
          className="group relative flex w-full max-w-2xl items-center justify-between gap-4 rounded-full border border-white/25 bg-gradient-to-r from-accent via-[#4f7bff] to-[#60a5fa] px-6 py-5 text-left shadow-[0_40px_90px_-45px_rgba(15,23,42,0.9)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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
        </Link>

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
  )
}