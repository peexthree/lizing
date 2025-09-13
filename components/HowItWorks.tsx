import {
  FileText,
  CheckCircle2,
  FileSignature,
  Truck,
  MessageCircle,
} from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    { icon: FileText, title: 'Заявка', text: 'Заполняете форму или звоните' },
    { icon: CheckCircle2, title: 'Одобрение', text: 'Получаете решение и расчёт' },
    { icon: FileSignature, title: 'Договор', text: 'Подписываем документы' },
    {
      icon: Truck,
      title: 'Получение техники',
      text: 'Забираете автомобиль или оборудование',
    },
  ]

  return (
    <section id="how" className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          Как это работает
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Icon aria-hidden="true" className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-dark/70">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/79000000000?text=Здравствуйте!%20У%20меня%20вопрос%20по%20лизингу."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Задать вопрос в WhatsApp"
            className="inline-flex items-center gap-2 rounded-2xl border border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Задать вопрос
          </a>
        </div>
      </div>
    </section>
  )
}