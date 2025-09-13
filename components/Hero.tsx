'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'

import Logo from './Logo'

export default function Hero() {
  const slides = [
    { src: '/cases/car.webp', alt: 'Легковой автомобиль' },
    { src: '/cases/truck.webp', alt: 'Грузовой автомобиль' },
    { src: '/cases/excavator.webp', alt: 'Спецтехника' },
  ]
  const [index, setIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000)
    return () => clearInterval(id)
  }, [slides.length])

  function handleTouchStart(e: React.TouchEvent) {
    setStartX(e.touches[0].clientX)
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (startX === null) return
    const dx = e.changedTouches[0].clientX - startX
    if (Math.abs(dx) > 50) {
      setIndex((i) => (i + (dx < 0 ? 1 : -1) + slides.length) % slides.length)
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const badges = ['ЭДО: Диадок', 'Работаем по РФ', 'Официальные договоры']

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-4 py-16 text-center md:flex-row md:py-24 md:text-left">
        <div className="w-full md:w-1/2">
          <div className="flex justify-center md:justify-start">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-dark md:text-5xl">
            Авто в лизинг на лучших условиях – получи машину мечты уже сегодня
          </h1>
          <p className="mt-4 text-dark/70">
            Без переплат и сложностей: одобрение за 1 день, аванс от 0% для юрлиц,
            ИП и самозанятых.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <button
              onClick={() => scrollTo('calculator')}
              className="inline-flex items-center justify-center rounded-2xl bg-accent px-10 py-6 text-lg font-semibold text-white shadow transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              Рассчитать лизинг и узнать платёж
            </button>
            <button
              onClick={() => scrollTo('lead-form')}
              className="inline-flex items-center justify-center rounded-2xl border border-accent px-8 py-4 font-semibold text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              Оставить заявку
              <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-dark/70 md:justify-start">
            {badges.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-accent" />
                {b}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div
            className="relative h-56 w-full md:h-72"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={i === 0}
                className={`absolute inset-0 object-contain p-8 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}