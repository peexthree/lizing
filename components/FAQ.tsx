export const faq = [
  {
    q: 'Какие документы нужны?',
    a: 'Подготовим чек-лист: учредительные документы, бухгалтерскую отчётность и данные по технике. Поможем собрать пакет под конкретную сумму.'
  },
  {
    q: 'Можно ли физлицу?',
    a: 'Да, есть программы для самозанятых и ИП. Подберём лизинговую компанию, которая работает с физлицами и упростим подтверждение дохода.'
  },
  {
    q: 'Как быстро одобрение?',
    a: 'От 2 часов до 2 дней: зависит от суммы и комплекта документов. Мы заранее уточняем требования и отправляем заявки параллельно в несколько ЛК.'
  },
  {
    q: 'Можно ли без аванса?',
    a: 'Да. Часто первый платёж идёт вместо аванса, а остаточный платёж помогает снизить ежемесячную нагрузку.'
  },
  {
    q: 'Что такое возвратный лизинг?',
    a: 'Продаёте технику лизинговой компании и берёте её обратно в пользование. Получаете деньги на развитие и продолжаете работать на своей технике.'
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="floating-orb left-[20%] top-[10rem] hidden h-[240px] w-[240px] bg-white/35 md:block" />
        <div className="floating-orb right-[18%] bottom-[-4rem] hidden h-[300px] w-[300px] bg-accent/25 lg:block" />
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
              className="group relative overflow-hidden rounded-4xl border border-white/60 bg-white/85 p-6 shadow-glow backdrop-blur-xl transition focus-visible:outline-none animate-fade-up"
              style={{ animationDelay: `${index * 0.08 + 0.1}s` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-dark">