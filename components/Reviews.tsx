
'use client'

import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/20/solid'
import { buttonVariants } from '@/components/ui/Button'

const reviews = [
  { id: 19, rating: 5, date: '21 мая 2024', content: "<p>Будь готов рискнуть всем, если ты искренне веришь в свою цель.</p>", author: 'Илон Маск', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Илон%20Маск', source: 'Цитата' },
  { id: 1, rating: 5, date: '14 мая 2024', content: "<p>Отличная компания, быстро и качественно выполняют свою работу. Лучшие условия на рынке. Однозначно рекомендую!</p>", author: 'Алексей К.', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Алексей%20К.', source: 'Яндекс.Карты' },
  { id: 2, rating: 5, date: '11 мая 2024', content: "<p>Отличная компания, быстрое оформление, минимум документов, по сравнению с другими лизинговыми компаниями.</p>", author: 'Виктор', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Виктор', source: 'Яндекс.Карты' },
  { id: 3, rating: 5, date: '5 мая 2024', content: "<p>Отличная компания, минимум валакиты с документами, специалисты всегда на связи, все очень быстро и качественно!</p>", author: 'Максим', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Максим', source: 'Яндекс.Карты' },
  { id: 4, rating: 5, date: '28 апреля 2024', content: "<p>Очень хорошая компания, сотрудники очень вежливые, находят быстрое решение всех вопросов.</p>", author: 'Анна', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Анна', source: 'Яндекс.Карты' },
  { id: 5, rating: 5, date: '21 апреля 2024', content: "<p>Лучшая лизинговая компания, все быстро, четко, без лишних вопросов. Рекомендую!</p>", author: 'Игорь', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Игорь', source: 'Яндекс.Карты' },
  { id: 6, rating: 5, date: '15 апреля 2024', content: "<p>Профессионалы своего дела. Всегда на связи, оперативно решают любые вопросы. Условия одни из лучших.</p>", author: 'Дмитрий', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Дмитрий', source: 'Яндекс.Карты' }
]

const duplicatedReviews = [...reviews, ...reviews]

export default function Reviews() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[20rem] bg-emerald-900/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
           <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Отзывы</span>
          <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Что говорят наши клиенты</h2>
          <p className="mt-4 text-lg text-white/70 text-glow-subtle">
            Мы гордимся нашей репутацией. Вот что говорят о нас на Яндекс.Картах.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap py-4 items-stretch hover:[animation-play-state:paused]">
          {duplicatedReviews.map((review, index) => (
            <div key={`${review.id}-${index}`} className="w-[350px] md:w-[450px] flex-none mx-4">
              <div className="h-full carbon-card !p-6 flex flex-col justify-between whitespace-normal">
                <div>
                  <div className="flex items-center gap-x-4 mb-4">
                    <Image className="h-12 w-12 rounded-full bg-gray-800 object-cover" src={review.avatar} alt={`Аватар пользователя ${review.author}`} width={48} height={48} unoptimized />
                    <div>
                      <div className="font-semibold text-white tracking-wide">{review.author}</div>
                      <div className="text-xs text-emerald-400">{review.source}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`${review.rating > rating ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'text-gray-700'} h-5 w-5 flex-shrink-0`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-white/80 text-sm leading-[1.5]">
                    <div dangerouslySetInnerHTML={{ __html: review.content }} />
                  </blockquote>
                </div>
                <div className="mt-6 text-xs text-white/40 tracking-wider">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Fades for Marquee */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="mt-16 text-center relative z-10">
        <a href="https://yandex.ru/maps/org/lizing_i_tochka/9071444776/reviews/?ll=39.019842%2C45.034929&z=16" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "glow" })}>
          Читать все отзывы на Яндекс.Картах
        </a>
      </div>
    </section>
  )
}
