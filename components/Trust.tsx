import RevealOnScroll from '@/components/ui/RevealOnScroll'

const STATS = [
  { value: '500+', label: 'сделок в год' },
  { value: '10 000', label: 'клиентов по всей России' },
  { value: '35', label: 'банков и лизинговых партнёров' },
  { value: '92%', label: 'решений доводим до выдачи техники' }
] as const

const Trust = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute left-[12%] top-[8rem] hidden h-[260px] w-[260px] rounded-full bg-accent/20 blur-3xl opacity-80 md:block" />
        <div className="pointer-events-none absolute right-[14%] bottom-[-4rem] hidden h-[320px] w-[320px] rounded-full bg-white/30 blur-3xl opacity-70 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Доверие</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Цифры, которые подтверждают результат</h2>
          <p className="mt-4 text-lg text-dark/65">
            Развиваем партнёрскую сеть, контролируем сроки и сопровождаем клиентов по всей России. Делимся ключевыми показателями за прошлый год.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, index) => (
            <RevealOnScroll
              key={stat.value}
              delay={index * 0.1}
              className="flex h-full flex-col items-center justify-center rounded-4xl border border-white/60 bg-white/80 p-8 text-center shadow-glow backdrop-blur-2xl"
            >
              <div className="text-4xl font-mono font-bold text-accent md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-dark/45">{stat.label}</div>
            </RevealOnScroll>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default Trust