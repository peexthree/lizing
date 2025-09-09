export default function Trust() {
  const stats = [
    { k: '10+ лет', v: 'на рынке' },
    { k: '1200+', v: 'клиентов' },
    { k: '50+', v: 'партнёров ЛК' },
    { k: '4,8★', v: 'рейтинг' },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Опыт и доверие</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {stats.map(s => (
            <div key={s.k} className="rounded-2xl border border-gray-200 p-6 text-center">
              <div className="text-2xl font-bold text-accent">{s.k}</div>
              <div className="mt-1 text-sm text-dark/70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
