export default function HowItWorks() {
  const steps = [
    { n: 1, t: 'Заявка', d: 'Оставляете контакты — свяжемся и уточним задачу' },
    { n: 2, t: 'Предварительное решение', d: 'Подбор условий у 50+ ЛК, согласуем формат' },
    { n: 3, t: 'Договор / ЭДО', d: 'Контур Диадок, минимальный пакет документов' },
    { n: 4, t: 'Получение имущества/финансирования', d: 'Без простоев, деньги в обороте' },
  ]
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Как это работает</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(s => (
            <div key={s.n} className="rounded-2xl bg-white p-6 shadow">
              <div className="text-accent font-bold text-xl">{s.n}</div>
              <h3 className="mt-2 font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-dark/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
