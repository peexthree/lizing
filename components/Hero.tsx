'use client'

import React from 'react'

import { ArrowDownIcon, CheckCircleIcon, GaugeIcon, SparkleIcon, TimerIcon, TruckIcon, HandshakeIcon, FileTextIcon, PhoneIcon, WhatsAppLineIcon, TelegramLineIcon } from '@/components/icons'

import { openCalculator } from '@/lib/openCalculator'
import { openLeadForm } from '@/lib/openLeadForm'

const FEATURES = [
  { text: 'Аванс от 0% и одобрение в течение суток', icon: TimerIcon },
  { text: 'Легковые, грузовые, спецтехника, недвижимость и оборудование для бизнеса и частных лиц', icon: TruckIcon },
  { text: '50+ банков и лизинговых компаний в одном окне', icon: HandshakeIcon },
  { text: 'Оформление дистанционно по всей России', icon: FileTextIcon },
] as const

const CONTACT_POINTS = [
  {
    icon: PhoneIcon,
    text: '+7 967 772 8299',
    description: 'Бесплатная консультация эксперта',
    link: 'tel:+79677728299',
  },
  {
    icon: WhatsAppLineIcon,
    text: 'Написать в WhatsApp',
    description: 'Сэкономьте время и начните экономить на лизинге уже сегодня',
    link: 'https://wa.me/79677728299',
  },
  {
    icon: TelegramLineIcon,
    text: 'Написать в Telegram',
    description: 'Быстрый ответ и удобная переписка',
    link: 'https://t.me/dpvlen',
  },
] as const

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-36">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-contain md:object-cover brightness-75 mix-blend-overlay"
        >
          <source src="/herobg.webm" type="video/webm" />
          <source src="/herobg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/90 to-black/60" aria-hidden />
        <div className="absolute inset-0 z-20 bg-hero-grid opacity-40 mix-blend-screen" aria-hidden />
      </div>

      <div className="relative z-30 mx-auto max-w-4xl px-4">
        <div className="grid gap-12">
          <div className="space-y-8 text-white">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 shadow-sm backdrop-blur opacity-0 animate-fade-up"
              style={{ animationDelay: '120ms' }}
            >
              <SparkleIcon className="h-3.5 w-3.5 text-accent" aria-hidden />
              Быстрый старт
            </span>

            <h1
              className="text-balance text-4xl font-semibold leading-tight text-white opacity-0 animate-fade-up sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '200ms' }}
            >
              <span className="block">Лизинг за 24 часа.</span>
              <span className="block">Аванс от 0%.</span>
              <span className="block bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                Для бизнеса и частных лиц
              </span>
            </h1>

            <p
              className="max-w-2xl text-lg text-white/80 opacity-0 animate-fade-up sm:text-xl"
              style={{ animationDelay: '280ms' }}
            >
              Работаем по всей России и согласуем индивидуальные условия под каждый проект.
            </p>

            <ul
              className="grid gap-3 text-sm text-white/85 opacity-0 animate-fade-up sm:grid-cols-2"
              style={{ animationDelay: '320ms' }}
            >
              {FEATURES.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 rounded-3xl border border-white/25 bg-white/10 px-4 py-3 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <feature.icon className="h-4 w-4 text-accent" aria-hidden />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => openLeadForm?.()}

                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-semibold text-black shadow-glow transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark opacity-0 animate-fade-up animate-pulse-subtle"

                style={{ animationDelay: '380ms' }}
              >
                <TimerIcon className="h-5 w-5" aria-hidden />
                Оставить заявку
              </button>
              <button
                type="button"
                onClick={() => openCalculator?.()}

                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-dark opacity-0 animate-fade-up"

                style={{ animationDelay: '420ms' }}
              >
                <GaugeIcon className="h-5 w-5" aria-hidden />
                Рассчитать платёж
              </button>
            </div>

            <div className="flex flex-col gap-6 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:items-center">
              {CONTACT_POINTS.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/20 transition-all duration-300 group-hover:bg-accent/30 group-hover:border-accent/60">
                    <contact.icon className="h-5 w-5 text-accent" aria-hidden />
                  </span>
                  <div className="text-left">
                    <span className="block text-white/50">{contact.text}</span>
                    <p className="font-medium text-white">{contact.description}</p>
                  </div>
                </a>
              ))}

              <div className="flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm backdrop-blur">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/20">
                  <ArrowDownIcon className="h-5 w-5 text-accent" aria-hidden />
                </span>
                <p className="max-w-xs">
                  Прокрутите вниз: мы уже подсветили ключевые условия именно для вас.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection