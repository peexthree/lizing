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
    description: 'Уменьшение налога на прибыль и возврат НДС до 20% от стоимости.',
  },
  {
    name: 'Сопровождение 24/7',
    description: 'Персональный менеджер на связи даже в нерабочее время, чтобы решать ваши вопросы, когда это необходимо.',
  },
]

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:max-w-lg">
            <RevealOnScroll className="flex h-full flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                    Преимущества
                </span>
              <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Быстро. Удобно. Выгодно.</h2>
              <p className="mt-4 text-lg text-white/70">
                Мы создали сервис, который помогает бизнесу и частным лицам получать лучшие условия по лизингу без лишних усилий.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <RevealOnScroll key={benefit.name} delay={index * 0.1} className="h-full">
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft-lg backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-7 w-7 text-emerald-400 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-white">{benefit.name}</h3>
                  </div>
                  <p className="mt-3 text-base text-white/70">{benefit.description}</p>
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
