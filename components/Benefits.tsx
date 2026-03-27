'use client'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import React from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const benefits = [
  {
    name: 'В лизинг можно всё',
    description: 'Легковые, грузовые автомобили, спецтехника, недвижимость и оборудование для бизнеса и частных лиц.',
  },
  {
    name: 'Работаем по всей России',
    description: 'Подберём лучшие предложения в вашем регионе. Наши партнёры — это более 50 лизинговых компаний и банков.',
  },
  {
    name: 'Экономия на налогах',
    description: 'Уменьшение налога на прибыль и возврат/зачёт НДС. Экономия в этом году может составить до 45% (25% налог на прибыль, 20% НДС), а в следующем году — до 47% (с учётом возможного изменения НДС до 22%).',
  },
  {
    name: 'Сопровождение 24/7',
    description: 'Персональный менеджер на связи даже в нерабочее время, чтобы решать ваши вопросы, когда это необходимо.',
  },
]

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="relative py-16 sm:py-32 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-teal-600/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:max-w-lg">
            <RevealOnScroll className="flex h-full flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50 text-glow">
                    Преимущества
                </span>
              <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Быстро. Удобно. Выгодно.</h2>
              <p className="mt-4 text-lg text-white/70 text-glow-subtle">
                Мы создали сервис, который помогает бизнесу и частным лицам получать лучшие условия по лизингу без лишних усилий.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <RevealOnScroll key={benefit.name} delay={index * 0.1} className="h-full">
                <div className="relative h-full glass-pane group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(52,211,153,0.3)] hover:border-emerald-500/50 overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3 z-10">
                    <CheckCircleIcon className="h-7 w-7 text-emerald-400 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-white text-glow">{benefit.name}</h3>
                  </div>
                  <p className="relative mt-3 text-base text-white/70 text-glow-subtle z-10">{benefit.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
