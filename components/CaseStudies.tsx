"use client"


import Image from 'next/image'

interface Preset {
  cost: number
  term: number
  advance: number
}

export default function CaseStudies() {
  const items = [
    {
      title: 'Легковой',
      src: '/cases/car.webp',
      price: '0,5–3 млн ₽',
      preset: { cost: 1500000, term: 36, advance: 20 },
    },
    {
      title: 'Грузовой',
      src: '/cases/truck.webp',
      price: '3–8 млн ₽',
      preset: { cost: 5000000, term: 48, advance: 20 },
    },
    {
      title: 'Спецтехника',
      src: '/cases/excavator.webp',
      price: '5–20 млн ₽',
      preset: { cost: 10000000, term: 48, advance: 20 },
    },
  ]

 const mini = [
    {
      model: 'Kia K5',
      amount: '2 100 000 ₽',
      term: '36 мес.',
      approval: 'Одобрено за 2 часа',
      rate: 'Ставка 10%',
      saving: 'Экономия 150 000 ₽',
    },
    {
      model: 'JCB 3CX',
      amount: '8 500 000 ₽',
      term: '48 мес.',
      approval: 'Одобрено за 1 день',
      rate: 'Ставка 12%',
      saving: 'Экономия 600 000 ₽',
    },
  ]

  function handleClick(preset: Preset) {
    window.dispatchEvent(new CustomEvent('prefill-calculator', { detail: preset }))
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="examples" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/45 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Примеры техники</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Подбираем решения под разные задачи</h2>
          <p className="mt-4 text-lg text-dark/70">
            От премиальных седанов до тяжёлой спецтехники — под каждую нишу найдём выгодный лизинговый сценарий и закрепим поставщика.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-4xl border border-white/60 bg-white/85 shadow-glow backdrop-blur-2xl animate-fade-up"
              style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-4 top-4 rounded-full bg-white/80 px-3 py-1 text-center text-xs font-semibold text-dark shadow">{item.price}</div>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-lg font-semibold text-dark">{item.title}</h3>
                <button
                  onClick={() => handleClick(item.preset)}
                  className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
                >
                  <span className="relative z-[1]">Рассчитать платёж</span>
                  <span className="absolute inset-0 translate-x-[-70%] bg-gradient-to-r from-white/30 via-white/60 to-transparent opacity-0 transition duration-500 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {mini.map((m, index) => (
            <div
              key={m.model}
              className="rounded-4xl border border-white/60 bg-white/80 p-6 shadow-glow backdrop-blur-xl animate-fade-up"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <h3 className="text-lg font-semibold text-dark">{m.model}</h3>
              <div className="mt-4 space-y-2 text-sm text-dark/70">
                <p>Сумма: {m.amount}</p>
                <p>Срок: {m.term}</p>
                <p>{m.approval}</p>
                <p>{m.rate}</p>
                <p>{m.saving}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


