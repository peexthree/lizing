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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(234,179,8,0.12),transparent_58%),radial-gradient(circle_at_82%_28%,rgba(212,175,55,0.16),transparent_60%),linear-gradient(150deg,rgba(6,6,10,0.92),rgba(12,12,20,0.82))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute left-[12%] top-[8rem] hidden h-[260px] w-[260px] rounded-full bg-accent/25 blur-3xl opacity-80 md:block" />
        <div className="pointer-events-none absolute right-[14%] bottom-[-4rem] hidden h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl opacity-70 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4 text-slate-200">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Доверие</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Цифры, которые подтверждают результат</h2>
          <p className="mt-4 text-lg text-slate-300/80">
            Развиваем партнёрскую сеть, контролируем сроки и сопровождаем клиентов по всей России. Делимся ключевыми показателями за прошлый год.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, index) => (
            <RevealOnScroll
              key={stat.value}
              delay={index * 0.1}
              className="flex h-full flex-col items-center justify-center rounded-4xl border border-white/10 bg-surface/85 p-8 text-center text-slate-200 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <div className="text-4xl font-mono font-bold text-accent md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-slate-300/70">{stat.label}</div>
            </RevealOnScroll>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default Trust