'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const integerFormatter = new Intl.NumberFormat('ru-RU')

type AnimatedCounterProps = {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  format?: (value: number) => string
  className?: string
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}

function AnimatedCounter({
  value,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  format,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    let animationFrame: number
    const start = performance.now()

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const nextValue = value * easedProgress

      setDisplayValue(nextValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  const resolvedValue = useMemo(() => {
    if (decimals > 0) {
      return Number(displayValue.toFixed(decimals))
    }

    return Math.round(displayValue)
  }, [displayValue, decimals])

  const formattedValue = useMemo(() => {
    if (format) {
      return format(resolvedValue)
    }

    if (decimals > 0) {
      return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(resolvedValue)
    }

    return integerFormatter.format(resolvedValue)
  }, [format, resolvedValue, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}

const stats = [
  {
    value: 26,
    label: 'лет на рынке',
    description: 'Команда с реальным опытом в подборе техники и финансировании проектов.',
  },
  {
    value: 690_000,
    label: 'оформленных сделок',
    description: 'Проверенные кейсы лизинговых партнёров по всей стране.',
    format: (value: number) => new Intl.NumberFormat('ru-RU').format(value),
  },
  {
    value: 120,
    label: 'партнёров',
    suffix: '+',
    description: 'Лизинговые компании и банки, с которыми работаем ежедневно.',
  },
] satisfies Array<{
  value: number
  label: string
  description: string
  suffix?: string
  format?: (value: number) => string
}>

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="floating-orb left-[10%] top-[2rem] hidden h-[220px] w-[220px] bg-white/30 md:block" />
        <div className="floating-orb right-[14%] bottom-[-4rem] hidden h-[280px] w-[280px] bg-accent/20 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Наши цифры</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Работаем с масштабом крупных игроков</h2>
          <p className="mt-4 text-base text-dark/70 md:text-lg">
            Эти показатели — результат долгосрочного сопровождения клиентов и выстроенной сети проверенных партнёров.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/85 p-8 shadow-glow backdrop-blur">
          <div className="grid gap-10 sm:grid-cols-3">
            {stats.map(({ value, label, description, suffix, format }, index) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  format={format}
                  className="text-4xl font-semibold text-dark sm:text-5xl"
                />
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-dark/50">{label}</span>
                <p className="text-sm text-dark/70">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}