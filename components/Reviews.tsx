'use client'

import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    id: 1,
    rating: 5,
    content: `
      <p>Отличная компания, быстро и качественно выполняют свою работу. Лучшие условия на рынке. Однозначно рекомендую!</p>
    `,
    author: 'Алексей К.',
    avatar: '/avatars/avatar-1.png',
    source: 'Яндекс.Карты'
  },
  {
    id: 2,
    rating: 5,
    content: `
      <p>Отличная компания, быстрое оформление, минимум документов, по сравнению с другими лизинговыми компаниями.</p>
    `,
    author: 'Виктор',
    avatar: '/avatars/avatar-2.png',
    source: 'Яндекс.Карты'
  },
  {
    id: 3,
    rating: 5,
    content: `
      <p>Отличная компания, минимум валакиты с документами, специалисты всегда на связи, все очень быстро и качественно!</p>
    `,
    author: 'Максим',
    avatar: '/avatars/avatar-3.png',
    source: 'Яндекс.Карты'
  },
  {
    id: 4,
    rating: 5,
    content: `
      <p>Очень хорошая компания, сотрудники очень вежливые, находят быстрое решение всех вопросов.</p>
    `,
    author: 'Анна',
    avatar: '/avatars/avatar-4.png',
    source: 'Яндекс.Карты'
  },
  {
    id: 5,
    rating: 5,
    content: `
      <p>Лучшая лизинговая компания, все быстро, четко, без лишних вопросов. Рекомендую!</p>
    `,
    author: 'Игорь',
    avatar: '/avatars/avatar-5.png',
    source: 'Яндекс.Карты'
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
           <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Отзывы</span>
          <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Что говорят наши клиенты</h2>
          <p className="mt-2 text-lg leading-8 text-white/70">
            Мы гордимся нашей репутацией. Вот что говорят о нас на Яндекс.Картах.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="pt-8 sm:inline-block sm:w-full"
              >
                <figure className="rounded-3xl border border-white/10 bg-white/5 p-8 text-sm leading-6 shadow-soft-lg backdrop-blur-2xl">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews[activeIndex].rating > rating ? 'text-yellow-400' : 'text-gray-600',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-6 text-white/90">
                    <div dangerouslySetInnerHTML={{ __html: reviews[activeIndex].content }} />
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img className="h-12 w-12 rounded-full bg-gray-800" src={reviews[activeIndex].avatar} alt={`Аватар пользователя ${reviews[activeIndex].author}`} />
                    <div>
                      <div className="font-semibold text-white">{reviews[activeIndex].author}</div>
                      <div className="text-white/70">{`Источник: ${reviews[activeIndex].source}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
             <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button key={index} onClick={() => setActiveIndex(index)} className={`h-2 w-2 rounded-full transition ${activeIndex === index ? 'bg-emerald-400' : 'bg-white/30'}`}></button>
            ))}
          </div>
           <div className="mt-16 text-center">
             <a href="https://yandex.ru/maps/org/lizing_i_tochka/9071444776/reviews/?ll=39.019842%2C45.034929&z=16" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:opacity-90 transition-opacity">
                Читать все отзывы на Яндекс.Картах
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
