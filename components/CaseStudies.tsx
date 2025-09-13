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
    <section id="examples" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold">Примеры техники</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map(item => (
            <div key={item.title} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <Image
                src={item.src}
                alt={item.title}
                width={400}
                height={300}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <p className="text-sm text-dark/70">{item.price}</p>
                <button
                  onClick={() => handleClick(item.preset)}
                  className="mt-4 w-full rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/80"
                >
                  Рассчитать платеж
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {mini.map(m => (
            <div key={m.model} className="rounded-2xl border border-gray-200 bg-bgsoft p-6">
              <h3 className="font-semibold">{m.model}</h3>
              <p className="mt-2 text-sm text-dark/70">Сумма: {m.amount}</p>
              <p className="mt-1 text-sm text-dark/70">Срок: {m.term}</p>
              <p className="mt-1 text-sm text-dark/70">{m.approval}</p>
              <p className="mt-1 text-sm text-dark/70">{m.rate}</p>
              <p className="mt-1 text-sm text-dark/70">{m.saving}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

