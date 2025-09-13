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
      desc: 'от 0% или первый платёж',
    },
    {
      icon: Clock,
      title: 'Быстрое одобрение',
      desc: 'предварительный ответ за 1 день',
    },
    {
      icon: Users,
      title: 'Для юр. и физ. лиц',
      desc: 'компании, ИП/самозанятые',
    },
    { icon: BadgeDollarSign, title: 'Выкуп по остаточной стоимости' },
    { icon: Calendar, title: 'Гибкий график' },
    { icon: EyeOff, title: 'Без скрытых платежей' },
  ]

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              {desc && <p className="mt-2 text-sm text-dark/70">{desc}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}