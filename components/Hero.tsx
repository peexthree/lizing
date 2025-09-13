'use client'

import Image from 'next/image'

export default function Hero() {
  function scrollToForm() {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[75vh] overflow-hidden">
      <Image
        src="/cases/car.webp"
        alt="Премиальный автомобиль"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">
          Авто в лизинг на лучших условиях
        </h1>
        <button
          onClick={scrollToForm}
          className="mt-8 rounded-2xl bg-accent px-10 py-4 text-lg font-semibold text-white shadow transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          Получить предложение
        </button>
      </div>
    </section>
  )
}

