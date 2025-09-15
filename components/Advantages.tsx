import {
  PiggyBank,
  Clock,
  Users,
  BadgeDollarSign,
  Calendar,
  EyeOff,
} from 'lucide-react'

export default function Advantages() {
  const items = [
    {
      icon: PiggyBank,
      title: 'Низкий аванс',
      desc: 'от 0% или первый платёж — запускаем проект без заморозки капитала',
    },
    {
      icon: Clock,
      title: 'Быстрое одобрение',
      desc: 'предварительное решение за 1 день и сопровождение до выдачи',
    },
    {
      icon: Users,
      title: 'Для юр. и физ. лиц',
      desc: 'работаем с компаниями, ИП, самозанятыми и физическими лицами',
    },
    {
      icon: BadgeDollarSign,
      title: 'Выкуп по остаточной стоимости',
      desc: 'согласуем комфортный остаток, чтобы снизить ежемесячный платёж',
    },
    {
      icon: Calendar,
      title: 'Гибкий график',
      desc: 'аннуитет, сезонные платежи или ускоренный выкуп — подстраиваемся под оборот',
    },
    {
      icon: EyeOff,
      title: 'Без скрытых платежей',
      desc: 'проверяем договоры, страхование и комиссии, чтобы избежать сюрпризов',
    },
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl opacity-70" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Преимущества</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">
            Команда, которая экономит вам время и бюджет
          </h2>
          <p className="mt-4 text-lg text-dark/70">
            Мы следим за условиями рынка, ведём переговоры с лизинговыми компаниями и предлагаем прозрачную экономику сделки.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-4xl border border-white/60 bg-white/80 p-7 text-left shadow-glow backdrop-blur-2xl transition hover:-translate-y-1 hover:border-white animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <h3 className="relative mt-6 text-lg font-semibold text-dark">{title}</h3>
              <p className="relative mt-3 text-sm text-dark/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}