'use client'

import Link from 'next/link'
import { CalculatorIcon, SparkleIcon } from '@/components/icons'

export default function CalculatorModal() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(234,179,8,0.2),transparent_58%),radial-gradient(circle_at_82%_30%,rgba(212,175,55,0.16),transparent_62%),linear-gradient(145deg,#07070f_0%,#10111c_55%,#161725_100%)]"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 opacity-60" aria-hidden>
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -right-16 bottom-[-5rem] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 text-center text-white">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 shadow-lg backdrop-blur">
          <SparkleIcon className="h-4 w-4 text-accent" aria-hidden />
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
          className="group relative flex w-full max-w-2xl items-center justify-between gap-4 rounded-full border border-white/15 bg-gradient-to-r from-accent via-accent-alt to-accent px-6 py-5 text-left text-ink shadow-[0_40px_120px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <span className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white/20 shadow-inner transition-transform duration-300 group-hover:scale-105">
            <CalculatorIcon className="h-10 w-10 text-white" aria-hidden />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1 text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Рассчитать платёж</span>
            <span className="text-2xl font-semibold leading-tight sm:text-3xl">Открыть калькулятор</span>
            <span className="text-sm text-white/75">3 шага · Сохранение расчёта · Автоматическое заполнение заявки</span>
          </span>
          <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold uppercase tracking-[0.45em] text-white">
            GO
          </span>
        </Link>

        <div className="grid w-full gap-4 text-left text-sm text-white/80 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-surface/70 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Сохранение</div>
            <p className="mt-2 leading-relaxed">Результат расчёта автоматически сохраняется и подтягивается в заявку.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface/70 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Отправка</div>
            <p className="mt-2 leading-relaxed">Заявка с расчётом прилетает в Telegram команде без ручного ввода.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface/70 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Скорость</div>
            <p className="mt-2 leading-relaxed">Подбор условий и заявка занимают меньше минуты — всё в одном окне.</p>
          </div>
        </div>
      </div>
    </section>
  )
}