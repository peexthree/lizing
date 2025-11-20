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
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Процесс</span>
          <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Всего 5 шагов до вашей новой техники
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-white/70">
            Мы сделали процесс получения лизинга максимально простым и прозрачным для вас.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {steps.map((step, index) => (
            <RevealOnScroll
              key={step.title}
              delay={index * 0.1}
              className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <div
                style={{ transformStyle: 'preserve-3d' }}
                className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft-lg backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400/50 hover:bg-emerald-400/10"
              >
                <div
                  style={{ transform: 'translateZ(-1px)' }}
                  className="absolute top-4 right-6 text-7xl font-black text-white/5 transition-colors group-hover:text-emerald-400/20 -z-10"
                >
                  0{index + 1}
                </div>
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-base text-white/70">{step.description}</p>
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
