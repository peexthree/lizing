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
       window.dispatchEvent(new Event('open-calculator'))
  }

  return (
    <section id="examples" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/45 to-transparent" />
        <div className="floating-orb left-[12%] top-[6rem] hidden h-[280px] w-[280px] bg-white/35 md:block" />
        <div className="floating-orb right-[10%] bottom-[-3rem] hidden h-[320px] w-[320px] bg-accent/25 lg:block" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Примеры техники</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Подбираем решения под разные задачи</h2>
          <p className="mt-4 text-lg text-dark/70">
            От премиальных седанов до тяжёлой спецтехники — под каждую нишу найдём выгодный лизинговый сценарий и закрепим поставщика.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Сценарии 2025
            </span>
            <span className="rounded-full border border-white/70 bg-white/85 px-4 py-2 text-dark/60 shadow-sm backdrop-blur">
              Prefill калькулятора
            </span>
          </div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                <p className="text-xs text-dark/60">
                  Автоматически подставим параметры в калькулятор и сохраним расчёт в форме заявки.
                </p>
              </div>
              <div className="card-glow" aria-hidden="true" />
              <div className="shine-overlay" aria-hidden="true" />
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
              <div className="mt-4 flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Сопровождение сделки
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-[2.2rem] border border-white/60 bg-white/85 p-6 text-sm text-dark/70 shadow-glow backdrop-blur-xl">
          <p>
            Нужен конкретный расчёт под вашу технику? Выберите сценарий выше или отправьте запрос — мы соберём несколько предложений и покажем, как снизить платёж с помощью аванса или остаточного платежа.
          </p>
        </div>
      </div>
    </section>
  )
}

