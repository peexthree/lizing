export default function WhyUs() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
         <h2 className="glass-title text-center text-2xl font-bold md:text-3xl">Почему «Лизинг и точка»</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: '50+ лизингодателей', text: 'Выше одобрение и лучшие условия за счёт конкуренции' },
            { title: 'Торгуемся за вас', text: 'Снижаем цену у поставщиков и улучшаем ставку/аванс' },
            { title: 'Минимальный аванс', text: 'В т.ч. первый платёж вместо аванса — по подходящим программам' },
            { title: 'Прозрачность', text: 'Примеры сделок и расчёты до заявки, без обязательств' },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-soft-lg backdrop-blur-2xl">
              <h3 className="font-semibold text-text">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
