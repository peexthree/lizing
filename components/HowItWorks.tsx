'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircleIcon, FileTextIcon, MessageIcon, SignatureIcon, TruckIcon } from '@/components/icons'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function HowItWorks() {
  const steps = [
    {
      icon: FileTextIcon,
      title: 'Оставляете заявку',
      text: 'Передаёте информацию о технике и компании любым удобным способом — онлайн или по телефону.'
    },
    {
      icon: MessageIcon,
      title: 'Консультация',
      text: 'Связываемся, уточняем задачи, собираем документы и договариваемся о приоритетных программах.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Одобрение',
      text: 'В течение 24 часов получаете предварительное решение с расчётом платежей и рекомендациями.'
    },
    {
      icon: SignatureIcon,
      title: 'Документы',
      text: 'Готовим договор, проверяем страхование и спецификации, согласовываем график платежей.'
    },
    {
      icon: TruckIcon,
      title: 'Выдача техники',
      text: 'Организуем приёмку, доставку и финальный контроль, чтобы техника вышла на линию в срок.'
    }
  ]

  const timelineRef = useRef<HTMLOListElement>(null)
  const isInView = useInView(timelineRef, { once: true, margin: '-200px' })

  return (
    <section id="how" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(0,206,209,0.12),transparent_58%),radial-gradient(circle_at_88%_22%,rgba(0,163,166,0.16),transparent_62%),linear-gradient(160deg,rgba(6,6,10,0.9),rgba(12,12,20,0.82))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 to-transparent" />
        <div className="pointer-events-none absolute left-1/3 top-16 hidden h-[480px] w-px bg-gradient-to-b from-white/20 via-accent/40 to-transparent md:block" />
        <div className="pointer-events-none absolute right-1/3 top-32 hidden h-[520px] w-px bg-gradient-to-b from-white/15 via-accent/30 to-transparent lg:block" />
        <div className="floating-orb left-[10%] bottom-[-3rem] hidden h-[260px] w-[260px] bg-white/10 blur-3xl md:block" />
        <div className="floating-orb right-[6%] top-[8rem] hidden h-[320px] w-[320px] bg-accent/25 blur-3xl lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4 text-slate-200">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Как мы работаем</span>
          <h2 className="glass-title mt-4 text-3xl font-bold text-white md:text-4xl">Таймлайн сделки от заявки до выдачи техники</h2>
          <p className="mt-4 text-lg text-slate-300/80">
            Мы сопровождаем каждый шаг: держим связь, контролируем документы и согласовываем условия с партнёрами.
          </p>
        </RevealOnScroll>

        <motion.ol
          ref={timelineRef}
          initial={{ '--line-height': '0%' }}
          animate={{ '--line-height': isInView ? '100%' : '0%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="relative mt-14 space-y-8 pl-6 before:absolute before:left-[1.45rem] before:top-4 before:h-[calc(var(--line-height,0%)-2rem)] before:w-px before:bg-gradient-to-b before:from-accent/45 before:via-white/10 before:to-transparent sm:pl-8 md:pl-12"
        >
          {steps.map(({ icon: Icon, title, text }, index) => (
            <RevealOnScroll key={title} as="li" delay={index * 0.12} className="relative pl-8 sm:pl-10 md:pl-12">
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: isInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-3xl border border-accent/40 bg-black/60 text-accent shadow-[0_20px_45px_rgba(0,206,209,0.25)]"
              >
                <Icon aria-hidden="true" className="h-6 w-6" />
              </motion.span>
              <div className="relative rounded-4xl border border-white/10 bg-surface/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Шаг 0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-slate-300/80">{text}</p>
                <div className="card-glow" aria-hidden="true" />
              </div>
            </RevealOnScroll>
          ))}
        </motion.ol>

        <RevealOnScroll className="mt-12 flex justify-center">
          <a
            href="#lead-form"
            className="group inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent/40 bg-gradient-to-r from-accent via-accent-alt to-accent px-8 py-3 text-sm font-semibold text-black shadow-glow transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            <MessageIcon aria-hidden="true" className="h-5 w-5" />
            Получить расчёт
          </a>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 grid gap-4 rounded-[2.2rem] border border-white/10 bg-surface/80 p-6 text-sm text-slate-300/80 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/70">Мониторинг</p>
            <p>Фиксируем ключевые этапы в CRM и обновляем статус сделки в общем чате.</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/70">Юридический блок</p>
            <p>Проверяем договоры, страхование и спецификации до подписания.</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3ем] text-slate-300/70">Финальный контроль</p>
            <p>Организуем выдачу техники в нужном регионе и помогаем с передачей.</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
