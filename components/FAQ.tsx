export const faq = [
  {
    q: 'Если у нас уже есть своя лизинговая компания?',
    a: 'Сравним 50+ предложений и выберем выгоднее.'
  },
  {
    q: 'Можно ли без аванса?',
    a: 'Да. Часто первый платёж идёт вместо аванса.'
  },
  {
    q: 'Что такое возвратный лизинг?',
    a: 'Продаёте технику ЛК и берёте её обратно. Получаете деньги.'
  },
  {
    q: 'Какие документы нужны?',
    a: 'Зависит от суммы. Дадим чек‑лист.'
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/35 to-transparent" />
      </div>
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Частые вопросы</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Ответы, которые экономят время на созвоне</h2>
        </div>
        <div className="mt-12 space-y-4">
          {faq.map((item, index) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-4xl border border-white/60 bg-white/85 p-6 shadow-glow backdrop-blur-xl transition focus-visible:outline-none animate-fade-up"
              style={{ animationDelay: `${index * 0.08 + 0.1}s` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-dark">
                <span>{item.q}</span>
                <span className="text-sm font-medium text-accent transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-dark/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}