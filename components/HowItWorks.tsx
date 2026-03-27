'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileTextIcon, MessageIcon, CheckCircleIcon, SignatureIcon, TruckIcon } from '@/components/icons'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const steps = [
  {
    icon: FileTextIcon,
    title: 'Оставляете заявку',
    description: 'Передаёте информацию о технике и вашей компании любым удобным способом — онлайн, по телефону или в мессенджере.',
  },
  {
    icon: MessageIcon,
    title: 'Консультация и сбор документов',
    description: 'Мы связываемся, уточняем детали, помогаем собрать необходимые документы и выбираем лучшие условия.',
  },
  {
    icon: CheckCircleIcon,
    title: 'Получение одобрения',
    description: 'В течение 24 часов вы получаете предварительное решение с полным расчётом платежей.',
  },
  {
    icon: SignatureIcon,
    title: 'Подписание договора',
    description: 'Готовим и согласовываем договор лизинга, спецификации и график платежей. Всё прозрачно и понятно.',
  },
  {
    icon: TruckIcon,
    title: 'Выдача техники',
    description: 'После подписания документов мы организуем получение и доставку техники в ваш регион.',
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50 text-glow">Процесс</span>
          <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Всего 5 шагов до вашей новой техники
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-white/70 text-glow-subtle">
            Мы сделали процесс получения лизинга максимально простым и прозрачным для вас.
          </p>
        </div>

        <div className="mt-24 max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500/10 via-emerald-400/50 to-emerald-500/10 rounded-full md:-translate-x-1/2" />

          {steps.map((step, index) => (
            <RevealOnScroll
              key={step.title}
              delay={index * 0.15}
            >
              <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>

                {/* Timeline Dot */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] border-4 border-black z-10 -translate-x-1/2" />

                {/* Content Card */}
                <div className={`w-full ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="group relative glass-pane transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'flex-row'}`}>
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black/50 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-300 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                          <step.icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold tracking-wide text-white group-hover:text-emerald-50 transition-colors">{step.title}</h3>
                    </div>

                    <p className="text-base text-white/60 leading-relaxed">
                      {step.description}
                    </p>

                    <div className={`absolute ${index % 2 === 0 ? 'bottom-2 left-4 md:right-4 md:left-auto' : 'bottom-2 right-4'} text-[8rem] font-black text-white/[0.02] group-hover:text-emerald-500/10 transition-colors duration-500 pointer-events-none select-none leading-none -z-10`}>
                      {index + 1}
                    </div>
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
