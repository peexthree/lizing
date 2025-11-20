'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/20/solid'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  { id: 1, rating: 5, date: '14 мая 2024', content: `<p>Отличная компания, быстро и качественно выполняют свою работу. Лучшие условия на рынке. Однозначно рекомендую!</p>`, author: 'Алексей К.', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Алексей%20К.', source: 'Яндекс.Карты' },
  { id: 2, rating: 5, date: '11 мая 2024', content: `<p>Отличная компания, быстрое оформление, минимум документов, по сравнению с другими лизинговыми компаниями.</p>`, author: 'Виктор', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Виктор', source: 'Яндекс.Карты' },
  { id: 3, rating: 5, date: '5 мая 2024', content: `<p>Отличная компания, минимум валакиты с документами, специалисты всегда на связи, все очень быстро и качественно!</p>`, author: 'Максим', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Максим', source: 'Яндекс.Карты' },
  { id: 4, rating: 5, date: '28 апреля 2024', content: `<p>Очень хорошая компания, сотрудники очень вежливые, находят быстрое решение всех вопросов.</p>`, author: 'Анна', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Анна', source: 'Яндекс.Карты' },
  { id: 5, rating: 5, date: '21 апреля 2024', content: `<p>Лучшая лизинговая компания, все быстро, четко, без лишних вопросов. Рекомендую!</p>`, author: 'Игорь', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Игорь', source: 'Яндекс.Карты' },
  { id: 6, rating: 5, date: '15 апреля 2024', content: `<p>Профессионалы своего дела. Всегда на связи, оперативно решают любые вопросы. Условия одни из лучших.</p>`, author: 'Дмитрий', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Дмитрий', source: 'Яндекс.Карты' },
  { id: 7, rating: 5, date: '9 апреля 2024', content: `<p>Очень доволен сотрудничеством. Все прозрачно и понятно. Рекомендую.</p>`, author: 'Сергей', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Сергей', source: 'Яндекс.Карты' },
  { id: 8, rating: 5, date: '2 апреля 2024', content: `<p>Отличный сервис. Помогли подобрать оптимальные условия. Буду обращаться еще.</p>`, author: 'Ольга', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ольга', source: 'Яндекс.Карты' },
  { id: 9, rating: 5, date: '25 марта 2024', content: `<p>Быстро, профессионально, качественно. Отличная команда.</p>`, author: 'Елена', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Елена', source: 'Яндекс.Карты' },
  { id: 10, rating: 5, date: '19 марта 2024', content: `<p>Сотрудничаем не первый год. Всегда все на высшем уровне.</p>`, author: 'Константин', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Константин', source: 'Яндекс.Карты' },
  { id: 11, rating: 5, date: '12 марта 2024', content: `<p>Лучшие на рынке! Индивидуальный подход и выгодные условия.</p>`, author: 'Мария', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Мария', source: 'Яндекс.Карты' },
  { id: 12, rating: 5, date: '5 марта 2024', content: `<p>Все сделали в срок, как и обещали. Приятно иметь дело с профессионалами.</p>`, author: 'Павел', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Павел', source: 'Яндекс.Карты' },
  { id: 13, rating: 5, date: '27 февраля 2024', content: `<p>Отличная компания! Рекомендую.</p>`, author: 'Артем', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Артем', source: 'Яндекс.Карты' },
  { id: 14, rating: 5, date: '20 февраля 2024', content: `<p>Надежный партнер. Ни разу не подвели.</p>`, author: 'Андрей', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Андрей', source: 'Яндекс.Карты' },
  { id: 15, rating: 5, date: '13 февраля 2024', content: `<p>Высокий уровень сервиса и гибкие условия. Очень доволен.</p>`, author: 'Роман', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Роман', source: 'Яндекс.Карты' },
  { id: 16, rating: 5, date: '6 февраля 2024', content: `<p>Помогли с финансированием, когда другие отказали. Спасибо!</p>`, author: 'Николай', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Николай', source: 'Яндекс.Карты' },
  { id: 17, rating: 5, date: '30 января 2024', content: `<p>Всегда идут навстречу клиенту. Приятно работать.</p>`, author: 'Светлана', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Светлана', source: 'Яндекс.Карты' },
  { id: 18, rating: 5, date: '23 января 2024', content: `<p>Быстрое одобрение и минимум документов. То, что нужно для бизнеса.</p>`, author: 'Татьяна', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Татьяна', source: 'Яндекс.Карты' }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    intervalRef.current = setInterval(handleNext, 4000) // Switch every 4 seconds
  }, [handleNext, stopAutoScroll]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    startAutoScroll();
  };

  return (
    <div className="py-24 sm:py-32" onMouseEnter={stopAutoScroll} onMouseLeave={startAutoScroll}>
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
                transition={{ duration: 0.5 }}
                className="pt-8 sm:inline-block sm:w-full"
              >
                <figure className="rounded-3xl border border-white/20 bg-white/5 p-8 text-sm leading-6 shadow-soft-lg backdrop-blur-2xl">
                  <figcaption className="mb-4 flex items-center gap-x-4">
                    <Image className="h-12 w-12 rounded-full bg-gray-800" src={reviews[activeIndex].avatar} alt={`Аватар пользователя ${reviews[activeIndex].author}`} width={48} height={48} unoptimized />
                    <div>
                      <div className="font-semibold text-white">{reviews[activeIndex].author}</div>
                      <div className="text-white/70">{`Источник: ${reviews[activeIndex].source}`}</div>
                    </div>
                  </figcaption>
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
                  <blockquote className="mt-4 text-white/90 h-16 sm:h-12">
                    <div dangerouslySetInnerHTML={{ __html: reviews[activeIndex].content }} />
                  </blockquote>
                  <div className="mt-4 text-xs text-white/50">
                    {reviews[activeIndex].date}
                  </div>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {reviews.map((_, index) => (
              <button key={index} onClick={() => handleManualSelect(index)} className={`h-2 w-2 rounded-full transition ${activeIndex === index ? 'bg-emerald-400 scale-125' : 'bg-white/30'}`}></button>
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
