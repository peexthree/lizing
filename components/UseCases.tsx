'use client'

import React from 'react'
import {
  RocketLaunchIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const useCases = [
  {
    icon: RocketLaunchIcon,
    title: 'Запуск нового направления',
    description: 'Когда нужно быстро стартовать, а свободных средств не хватает. Лизинг — это ваш шанс обогнать конкурентов, не замораживая оборотные средства.',
  },
  {
    icon: ArrowTrendingUpIcon,
    title: 'Расширение автопарка',
    description: 'Ваш бизнес растёт, и вам требуется больше техники. Мы поможем получить её на выгодных условиях, чтобы вы могли выполнять больше заказов.',
  },
  {
    icon: CalendarDaysIcon,
    title: 'Сезонные работы',
    description: 'Нужна техника на определённый срок? Подберём для вас лизинговую программу с удобным графиком платежей, который учтёт сезонность вашего бизнеса.',
  },
  {
    icon: UserGroupIcon,
    title: 'Для новых ИП и ООО',
    description: 'Даже если ваша компания только начала свой путь, у нас есть решения. Поможем получить финансирование, когда банки отказывают.',
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Обновление оборудования',
    description: 'Старая техника требует постоянных вложений? Обновите её без крупных единовременных затрат и повысьте эффективность своего производства.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Возвратный лизинг',
    description: 'Срочно нужны деньги на развитие? Продайте вашу технику лизинговой компании и сразу же возьмите её в аренду. Вы продолжаете работать и получаете средства.',
  },
]

const UseCases: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">Когда лизинг — лучшее решение</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">Лизинг — это гибкий инструмент, который решает множество бизнес-задач. Вот лишь несколько ситуаций, когда он особенно полезен.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <RevealOnScroll key={useCase.title} delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-background shadow-soft-sm transition-all duration-300 hover:shadow-soft-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                  <useCase.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-text">{useCase.title}</h3>
                <p className="mt-2 text-base text-muted">{useCase.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
