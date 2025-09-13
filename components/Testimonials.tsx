import React from 'react'

export default function Testimonials() {
  const testimonials = [
    { name: 'И.П., Москва', quote: 'Быстро оформили договор и подобрали выгодные условия.' },
    { name: 'О.С., Екатеринбург', quote: 'Все прозрачно и без скрытых комиссий.' },
    { name: 'А.К., Казань', quote: 'Сервис помог обновить парк техники в срок.' },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Отзывы клиентов</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.name} className="rounded-2xl border border-gray-200 p-6">
              <p className="text-dark/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}