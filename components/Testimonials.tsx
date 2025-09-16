export default function Testimonials() {
  const testimonials = [
    {
      name: 'И.П., Москва',
      quote:
        'Быстро подобрали условия и взяли на себя переговоры с лизинговыми компаниями — к выдаче авто пришли без задержек.'
    },
    {
      name: 'О.С., Екатеринбург',
      quote:
        'Все прозрачно и без скрытых комиссий. Помогли собрать документы и подсказали, как снизить ежемесячный платёж.'
    },
    {
      name: 'А.К., Казань',
      quote: 'Сервис помог обновить парк техники в срок — команда держала связь и контролировала каждый этап сделки.'
    }
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl opacity-80" />
        <div className="floating-orb left-[18%] bottom-[-3rem] hidden h-[260px] w-[260px] bg-white/30 md:block" />
        <div className="floating-orb right-[12%] top-[10rem] hidden h-[320px] w-[320px] bg-accent/25 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Отзывы</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Отзывы клиентов</h2>
          <p className="mt-4 text-lg text-dark/65">
            Делимся несколькими короткими отзывами от клиентов, которые оформили лизинг с нашей помощью и уже обновили свой
            автопарк.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map(({ name, quote }, index) => (
            <figure
              key={name}
              className="group relative h-full overflow-hidden rounded-4xl border border-white/60 bg-white/80 p-7 text-left shadow-glow backdrop-blur-2xl animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
              <blockquote className="relative text-sm leading-relaxed text-dark/70">
                <span className="block text-lg font-semibold text-dark/80">&ldquo;{quote}&rdquo;</span>
              </blockquote>
              <figcaption className="relative mt-6 text-sm font-semibold text-dark/80">{name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}