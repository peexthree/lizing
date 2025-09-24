'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import Calculator from '@/components/calculator/Calculator'
import LeadForm from '@/components/LeadForm'
import { ArrowRightIcon, GaugeIcon, MessageIcon, SparkleIcon, TimerIcon } from '@/components/icons'
import type { CalculatorPrefillDetail } from '@/hooks/useLeasingCalculator'

type CalculatorPageContentProps = {
  prefill?: CalculatorPrefillDetail
}

export default function CalculatorPageContent({ prefill }: CalculatorPageContentProps) {
  useEffect(() => {
    if (!prefill || Object.keys(prefill).length === 0) {
      return
    }

    window.dispatchEvent(
      new CustomEvent<CalculatorPrefillDetail>('prefill-calculator', {
        detail: prefill
      })
    )
  }, [prefill])

  const highlightCards = [
    {
      title: 'Умные сценарии',
      description: 'Выбирайте аванс в процентах или рублях — калькулятор пересчитывает условия мгновенно.',
      Icon: GaugeIcon
    },
    {
      title: 'Чистая математика',
      description: 'Прозрачные платежи и переплата: никаких скрытых комиссий и сложных формул.',
      Icon: SparkleIcon
    },
    {
      title: 'Фокус на скорости',
      description: 'Технологичный интерфейс помогает собрать запрос для одобрения без долгих таблиц.',
      Icon: TimerIcon
    },
    {
      title: 'Совместная работа',
      description: 'Делитесь расчётом с коллегами и менеджером, чтобы быстрее принять решение.',
      Icon: MessageIcon
    }
  ]

  const infoPoints = [
    'Сохраняйте выбранные параметры и возвращайтесь к ним с любого устройства.',
    'Настройте остаточный платёж, чтобы оптимизировать ежемесячную нагрузку на бюджет.',
    'Формируйте заявку в один клик — данные автоматически подставятся в форму.',
    'Поддержка менеджера поможет подобрать партнёра и закрыть сделку быстрее.'
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05091e] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.22),transparent_58%),radial-gradient(circle_at_82%_12%,rgba(56,189,248,0.18),transparent_60%),linear-gradient(160deg,#030712,#111c3a_48%,#020617)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-32 bg-gradient-to-b from-black/70 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition group-hover:-translate-x-1 group-hover:border-white/35">
              <ArrowRightIcon className="h-4 w-4 -scale-x-100" aria-hidden />
            </span>
            Назад на главную
          </Link>
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
            Технологичный расчёт
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-8">
            <div className="rounded-[36px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_45px_120px_rgba(3,7,18,0.55)] backdrop-blur-2xl sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Калькулятор лизинга</span>
                  <h1 className="text-3xl font-semibold sm:text-4xl">Современный расчёт для сложных проектов</h1>
                  <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                    Настройте параметры сделки за пару минут — система мгновенно пересчитает платежи, покажет переплату и готовый
                    итог для передачи менеджеру.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-left text-xs text-white/60 sm:max-w-xs">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">В реальном времени</div>
                  <div className="mt-2 text-2xl font-semibold text-white">Данные обновляются</div>
                  <p className="mt-2 text-sm text-white/70">
                    Сохраните расчёт или отправьте его в заявку — все значения синхронизированы.
                  </p>
                </div>
              </div>

              <div className="mt-8 [&>section]:rounded-[32px] [&>section]:border [&>section]:border-white/10 [&>section]:bg-[#0b1230]/80 [&>section]:shadow-[0_35px_100px_rgba(3,7,18,0.45)] [&>section]:backdrop-blur-xl [&>section]:py-10 [&>section]:sm:py-12 [&>section>div]:max-w-none [&>section>div]:px-4 [&>section>div]:sm:px-8">
                <Calculator variant="page" id="calculator" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlightCards.map(card => (
                <div
                  key={card.title}
                  className="group rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_60px_rgba(3,7,18,0.35)] transition hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-accent transition group-hover:scale-105">
                    <card.Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_40px_100px_rgba(3,7,18,0.45)] backdrop-blur-2xl sm:p-8">
              <h2 className="text-2xl font-semibold text-white">Параметры под контролем</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Настраивайте сроки, аванс и остаточную стоимость — система помогает подобрать оптимальный график с учётом вашей
                нагрузки и ожидаемой стоимости техники в конце срока.
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/70">
                {infoPoints.map(point => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:sticky lg:top-24">
              <LeadForm variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

