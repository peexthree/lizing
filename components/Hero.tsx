'use client'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  function scrollToForm() {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="Лизинг и точка" width={80} height={80} loading="lazy" />
        </div>
        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-dark">Лизинг без лишних слов</h1>
        <button
          onClick={scrollToForm}
          className={[
            'mt-8 inline-flex items-center rounded-full bg-accent px-8 py-4 font-semibold text-white',
            'transition-colors hover:bg-accent/80',
          ].join(' ')}
        >
          Оставить заявку
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </section>
  )
}