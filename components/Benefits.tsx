'use client'

import React from 'react'
import { 
    CurrencyDollarIcon, 
    DocumentCheckIcon, 
    ClockIcon, 
    ArrowTrendingUpIcon as TrendingUpIcon, 
    ShieldCheckIcon, 
    UsersIcon 
} from '@heroicons/react/24/outline'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: 'Аванс от 0%',
    description: 'Предлагаем программы без первоначального взноса для финансово стабильных компаний.',
  },
  {
    icon: DocumentCheckIcon,
    title: 'Одобрение за 1 день',
    description: 'Получите предварительное решение по вашей заявке в течение 24 часов.',
  },
  {
    icon: ClockIcon,
    title: 'Экономия времени',
    description: 'Берём на себя всё общение с лизинговыми компаниями и поставщиками.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Налоговые выгоды',
    description: 'Уменьшайте налог на прибыль и возвращайте до 20% НДС со всех лизинговых платежей.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Надёжные партнёры',
    description: 'Работаем только с проверенными лизинговыми компаниями с хорошей репутацией.',
  },
  {
    icon: UsersIcon,
    title: 'Персональный менеджер',
    description: 'Закрепляем за вами специалиста, который будет вести сделку от начала до конца.',
  },
]

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Почему с нами выгодно
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
            Мы предлагаем не просто лизинг, а комплексное решение для вашего бизнеса, которое экономит ваши деньги и время.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.title} delay={index * 0.1}>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft-sm">
                  <benefit.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-text">{benefit.title}</h3>
                <p className="mt-2 text-base text-muted">{benefit.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
