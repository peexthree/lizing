'use client'
import QuickForm from '@/components/QuickForm'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-dark">
              Возвратный лизинг: деньги под свою технику за 1–2 дня
            </h1>
            <p className="mt-4 text-base md:text-lg text-dark/80">
              Аванс от 0% или первый платёж. 50+ лизинговых компаний → выше одобрение и лучшие условия.
            </p>
            <ul className="mt-6 space-y-2 text-sm md:text-base text-dark/70 list-disc list-inside">
              <li>Деньги в оборот, техника остаётся у вас</li>
              <li>Гибкие графики: сезонный, дегрессия</li>
              <li>Платежи — в расходы (УСН/ОСНО)</li>
            </ul>
          </div>
          <div>
            <QuickForm />
          </div>
        </div>
      </div>
    </section>
  )
}
