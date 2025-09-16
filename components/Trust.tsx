export default function Trust() {
  const stats = [
    { k: '10+ лет', v: 'на рынке' },
    { k: '1200+', v: 'клиентов' },
    { k: '50+', v: 'партнёров ЛК' },
    { k: '4,8★', v: 'рейтинг' },
  ]
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute left-[12%] top-[8rem] hidden h-[260px] w-[260px] rounded-full bg-accent/20 blur-3xl opacity-80 md:block" />
        <div className="pointer-events-none absolute right-[14%] bottom-[-4rem] hidden h-[320px] w-[320px] rounded-full bg-white/30 blur-3xl opacity-70 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Опыт</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Опыт и доверие</h2>
          <p className="mt-4 text-lg text-dark/65">
            Работаем на рынке лизинга больше десяти лет. Собрали статистику, которой гордимся, и продолжаем расти вместе с клиентами.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.k}
              className="flex h-full flex-col items-center justify-center rounded-4xl border border-white/60 bg-white/80 p-8 text-center shadow-glow backdrop-blur-2xl animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="text-3xl font-bold text-accent">{stat.k}</div>
              <div className="mt-2 text-sm font-medium uppercase tracking-[0.3em] text-dark/45">{stat.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}