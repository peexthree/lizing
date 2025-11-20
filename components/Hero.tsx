'use client'

import React from 'react'
import Link from 'next/link'

import { GaugeIcon, PenIcon } from '@/components/icons'
import { openLeadForm } from '@/lib/openLeadForm'

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">

      <div className="relative z-30 mx-auto max-w-4xl px-4 text-center">
        <div className="grid gap-8">
          <div className="space-y-6 text-white">
            <h1
              className="text-balance text-4xl font-bold leading-tight text-white opacity-0 animate-fade-up sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '200ms' }}
            >
              50+ банков конкурируют за вашу заявку. Лучшие условия лизинга за 24 часа
            </h1>

            <p
              className="mx-auto max-w-2xl text-lg text-white/80 opacity-0 animate-fade-up sm:text-xl"
              style={{ animationDelay: '280ms' }}
            >
              Получите лучшие предложения от лизинговых компаний и банков-партнёров на автомобили, спецтехнику, недвижимость и оборудование.
            </p>

            <div
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row opacity-0 animate-fade-up"
              style={{ animationDelay: '380ms' }}
            >
              <Link
                href="#calculator"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-semibold text-black shadow-glow transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark sm:w-auto"
              >
                <GaugeIcon className="h-5 w-5" aria-hidden />
                Рассчитать платёж
              </Link>
              <button
                type="button"
                onClick={() => openLeadForm?.()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-dark sm:w-auto"
              >
                <PenIcon className="h-4 w-4" aria-hidden />
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
