'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
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

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)

const AnimatedCounter = ({
  value,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  format,
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    let animationFrame = 0
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
  }, [duration, isInView, value])

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
  }, [decimals, format, resolvedValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}

const STATS = [
  {
    value: 13,
    label: 'лет на рынке',
    description: '13 лет сопровождаем лизинговые проекты по всей России.',
  },
  {
    value: 5_000,
    label: 'договоров оформлено',
    suffix: '+',
    description: 'Более 5000 договоров для бизнеса и частных клиентов.',
    format: (value: number) => new Intl.NumberFormat('ru-RU').format(value),
  },
  {
    value: 50,
    label: 'партнёров',
    suffix: '+',
    description: '50+ банков и лизинговых компаний в нашей партнёрской сети.',
  },
] satisfies Array<{
  value: number
  label: string
  description: string
  suffix?: string
  format?: (value: number) => string
}>

const Stats = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(234,179,8,0.1),transparent_60%),radial-gradient(circle_at_85%_12%,rgba(212,175,55,0.12),transparent_58%),linear-gradient(160deg,rgba(6,6,10,0.92),rgba(10,10,18,0.8))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="floating-orb left-[10%] top-[2rem] hidden h-[220px] w-[220px] bg-accent/20 blur-3xl md:block" />
        <div className="floating-orb right-[14%] bottom-[-4rem] hidden h-[280px] w-[280px] bg-white/10 blur-3xl lg:block" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-slate-200">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Наши цифры</span>
           <h2 className="glass-title mt-4 text-3xl font-bold text-white md:text-4xl">Работаем с масштабом крупных игроков</h2>
          <p className="mt-4 text-base text-slate-300/80 md:text-lg">
            Эти показатели — результат долгосрочного сопровождения клиентов и сети проверенных партнёров.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/80 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="grid gap-10 sm:grid-cols-3">
            {STATS.map(({ value, label, description, suffix, format }, index) => (
              <RevealOnScroll
                key={label}
                delay={index * 0.12}
                className="flex flex-col items-center gap-3 text-center text-slate-200 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  format={format}
                  className="text-4xl font-semibold text-white sm:text-5xl"
                />
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300/70">{label}</span>
                <p className="text-sm text-slate-300/80">{description}</p>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default Stats