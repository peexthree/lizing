import { PiggyBank, Clock, Users, BadgeDollarSign, Calendar, EyeOff } from 'lucide-react'

export default function Advantages() {
  const items = [
    { icon: PiggyBank, text: 'Низкий аванс — от 0% или первый платёж' },
    { icon: Clock, text: 'Быстрое одобрение — предварительный ответ за 1 день' },
    { icon: Users, text: 'Для юр. и физ. лиц — компании, ИП/самозанятые' },
    { icon: BadgeDollarSign, text: 'Выкуп по остаточной стоимости' },
    { icon: Calendar, text: 'Гибкий график' },
    { icon: EyeOff, text: 'Без скрытых платежей' },
  ]
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-4 rounded-2xl border border-gray-200 p-6">
              <Icon className="h-6 w-6 text-accent" />
              <p className="text-sm text-dark">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
