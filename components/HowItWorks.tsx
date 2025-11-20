'use client'

import React from 'react'
import { motion } from 'framer-motion'

import {
  FileTextIcon,
  MessageIcon,
  CheckCircleIcon,
  SignatureIcon,
  TruckIcon,
} from '@/components/icons'
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

const timelineVariants = {
  hidden: { '--line-height': '0%' },
  visible: {
    '--line-height': '100%',
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      duration: 1,
    },
  },
}

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                Процесс
            </span>
          <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Всего 5 шагов до вашей новой техники
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-white/70">
            Мы сделали процесс получения лизинга максимально простым и прозрачным для вас.
          </p>
        </div>

        <motion.div
          className="relative mt-20"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div
            className="absolute left-1/2 top-0 w-0.5 h-full bg-white/10 origin-top"
            style={{ height: 'var(--line-height)' }}
          />
          <div className="space-y-12">
            {steps.map((step, index) => (
              <RevealOnScroll key={step.title} delay={index * 0.15}>
                <div className="flex items-start md:gap-x-8">
                  <div
                    className={`flex-shrink-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:order-2'}`}>
                     <div className={`inline-block w-full max-w-md ${index % 2 === 0 ? 'md:float-right' : 'md:float-left'}`}>
                      <div
                          className={`relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft-lg backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 w-full`}>
                          <div className="flex items-center gap-x-4">
                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-400/10 text-emerald-400">
                              <step.icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                            </div>
                          </div>
                          <p className="mt-3 text-base text-white/70">{step.description}</p>
                        </div>
                     </div>
                  </div>
                  <div className="hidden md:flex w-1/2 items-center justify-center">
                    <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-white font-bold text-lg ring-8 ring-transparent backdrop-blur-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
