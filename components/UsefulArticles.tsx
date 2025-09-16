const articles = [
  {
    title: 'Кейс: обновили автопарк без кассового разрыва',
    description: 'Как компания на 12 автомобилей использовала аванс и сезонные платежи, чтобы не замораживать оборотку.',
    category: 'Кейс',
    readingTime: '4 мин чтения'
  },
  {
    title: 'Гид по авансу и остаточному платежу',
    description: 'Разбираемся, когда выгодно брать 0% и как остаточный платёж помогает снизить ежемесячную нагрузку.',
    category: 'Советы',
    readingTime: '6 мин чтения'
  },
  {
    title: 'Как ускорить одобрение лизинга',
    description: 'Чек-лист документов и типовые требования, чтобы получить решение за 1–2 дня.',
    category: 'Экспертиза',
    readingTime: '5 мин чтения'
  }
]

export default function UsefulArticles() {
  return (
    <section id="articles" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="floating-orb left-[18%] top-[6rem] hidden h-[260px] w-[260px] bg-accent/20 md:block" />
        <div className="floating-orb right-[16%] bottom-[-4rem] hidden h-[320px] w-[320px] bg-white/35 lg:block" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Полезные статьи</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Экспертиза, кейсы и советы по лизингу</h2>
          <p className="mt-4 text-lg text-dark/70">
            Формируем библиотеку материалов, которые повышают доверие и помогают SEO: реальные кейсы, разборы условий и ответы на типовые вопросы.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">Новые публикации</span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">SEO-поддержка</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.title}
              className="group flex h-full flex-col justify-between rounded-4xl border border-white/60 bg-white/85 p-6 text-left shadow-glow backdrop-blur-xl animate-fade-up"
              style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
            >
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent/70">
                  <span className="rounded-full border border-accent/40 px-3 py-1 text-[11px] text-accent">{article.category}</span>
                  <span className="text-dark/40">{article.readingTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-dark">{article.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dark/70">{article.description}</p>
              </div>
              <button
                type="button"
                className="group/btn mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
              >
                Читать полностью
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden>
                  →
                </span>
              </button>
              <div className="card-glow" aria-hidden="true" />
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[2.2rem] border border-white/60 bg-white/85 p-6 text-center text-sm text-dark/70 shadow-glow backdrop-blur-xl">
          <p>
            Публикуем материалы каждую неделю: присылаем свежие кейсы партнёрам и добавляем ссылки на новые статьи в коммерческие предложения.
            Хотите подсветить свой кейс? Передайте детали менеджеру или напишите нам.
          </p>
        </div>
      </div>
    </section>
  )
}