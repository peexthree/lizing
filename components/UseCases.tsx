'use client'

import React from 'react'
// import {
//   RocketLaunchIcon,
//   ArrowTrendingUpIcon,
//   CalendarDaysIcon,
//   UserGroupIcon,
//   BuildingOffice2Icon,
//   ShieldCheckIcon,
// } from '@heroicons/react/24/outline'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

// const useCases = [
//   {
//     icon: RocketLaunchIcon,
//     title: 'Запуск нового направления',
//     description: 'Когда нужно быстро стартовать, а свободных средств не хватает. Лизинг — это ваш шанс обогнать конкурентов, не замораживая оборотные средства.',
//   },
//   {
//     icon: ArrowTrendingUpIcon,
//     title: 'Расширение автопарка',
//     description: 'Ваш бизнес растёт, и вам требуется больше техники. Мы поможем получить её на выгодных условиях, чтобы вы могли выполнять больше заказов.',
//   },
//   {
//     icon: CalendarDaysIcon,
//     title: 'Сезонные работы',
//     description: 'Нужна техника на определённый срок? Подберём для вас лизинговую программу с удобным графиком платежей, который учтёт сезонность вашего бизнеса.',
//   },
//   {
//     icon: UserGroupIcon,
//     title: 'Для новых ИП и ООО',
//     description: 'Даже если ваша компания только начала свой путь, у нас есть решения. Поможем получить финансирование, когда банки отказывают.',
//   },
//   {
//     icon: BuildingOffice2Icon,
//     title: 'Обновление оборудования',
//     description: 'Старая техника требует постоянных вложений? Обновите её без крупных единовременных затрат и повысьте эффективность своего производства.',
//   },
//   {
//     icon: ShieldCheckIcon,
//     title: 'Возвратный лизинг',
//     description: 'Срочно нужны деньги на развитие? Продайте ваше имущество лизинговой компании и сразу же возьмите его в аренду. Вы продолжаете работать и получаете средства.',
//   },
// ]

const useCases = [
  {
    icon: '/cases/case-1-start.svg',
    title: 'Запуск нового направления',
    description: 'Когда нужно быстро стартовать, а свободных средств не хватает. Лизинг — это ваш шанс обогнать конкурентов, не замораживая оборотные средства.',
  },
  {
    icon: '/cases/case-2-fleet.svg',
    title: 'Расширение автопарка',
    description: 'Ваш бизнес растёт, и вам требуется больше техники. Мы поможем получить её на выгодных условиях, чтобы вы могли выполнять больше заказов.',
  },
  {
    icon: '/cases/case-3-season.svg',
    title: 'Сезонные работы',
    description: 'Нужна техника на определённый срок? Подберём для вас лизинговую программу с удобным графиком платежей, который учтёт сезонность вашего бизнеса.',
  },
  {
    icon: '/cases/case-4-startup.svg',
    title: 'Для новых ИП и ООО',
    description: 'Даже если ваша компания только начала свой путь, у нас есть решения. Поможем получить финансирование, когда банки отказывают.',
  },
  {
    icon: '/cases/case-5-equipment.svg',
    title: 'Обновление оборудования',
    description: 'Старая техника требует постоянных вложений? Обновите её без крупных единовременных затрат и повысьте эффективность своего производства.',
  },
  {
    icon: '/cases/case-6-return.svg',
    title: 'Возвратный лизинг',
    description: 'Срочно нужны деньги на развитие? Продайте ваше имущество лизинговой компании и сразу же возьмите его в аренду. Вы продолжаете работать и получаете средства.',
  },
]

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="relative py-16 sm:py-32 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-emerald-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-900/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
                Кейсы
            </span>
          <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">Когда лизинг — лучшее решение</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted">Лизинг — это гибкий инструмент, который решает множество бизнес-задач. Вот лишь несколько ситуаций, когда он особенно полезен.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <RevealOnScroll key={useCase.title} delay={index * 0.1} className="h-full">
              <div className="carbon-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface">
                  {/* <useCase.icon className="h-7 w-7 text-accent" /> */}
                  <img src={useCase.icon} alt={useCase.title} className="h-7 w-7" />
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
