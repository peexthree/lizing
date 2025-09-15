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
    <section id="how" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute left-1/3 top-16 hidden h-[480px] w-px bg-gradient-to-b from-white/60 via-accent/40 to-transparent md:block" />
        <div className="pointer-events-none absolute right-1/3 top-32 hidden h-[520px] w-px bg-gradient-to-b from-white/60 via-accent/30 to-transparent lg:block" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Как мы работаем</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Прозрачный маршрут сделки от заявки до выдачи</h2>
          <p className="mt-4 text-lg text-dark/65">
            Вы управляете решением, а мы берём на себя расчёты, переговоры с лизинговыми компаниями и контроль документов.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="relative flex h-full flex-col gap-4 rounded-4xl border border-white/60 bg-white/85 p-7 text-left shadow-glow backdrop-blur-2xl animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="absolute right-6 top-6 text-5xl font-black text-dark/5">0{i + 1}</span>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <div className="relative">
                <h3 className="text-lg font-semibold text-dark">{title}</h3>
                <p className="mt-3 text-sm text-dark/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a
            href="https://wa.me/79000000000?text=Здравствуйте!%20У%20меня%20вопрос%20по%20лизингу."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Задать вопрос в WhatsApp"
            className="group inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent/40 bg-white/40 px-8 py-3 text-sm font-semibold text-accent backdrop-blur-md transition hover:border-accent hover:bg-white/70 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Задать вопрос
          </a>
        </div>
      </div>
    </section>
  )
}