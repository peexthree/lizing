import Image from 'next/image'
import { ArrowDown, CheckCircle2, GaugeCircle, Sparkles, Timer } from 'lucide-react'

const features = [
  'Аванс от 0% и гибкий график платежей',
  '50+ банков и лизинговых компаний в одном окне',
  'Оформление дистанционно и по всей России',
  'Подберём технику и застрахуем в день сделки'
]

const contacts = [
  { label: '8 800 444-45-84', description: 'Консультация бесплатно' },
  { label: 'Срок сделки', description: 'от 24 часов' }
]

export default function HeroSection() {
  return (
    <section className="py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,440px)]">
          <div className="space-y-8 text-dark">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-dark/70 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
              Новый уровень лизинга
            </span>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              <span className="block text-dark/80">Подберите технику</span>
              <span className="block bg-gradient-to-r from-dark via-dark to-accent bg-clip-text text-transparent">
                и закройте сделку за 1 день
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-dark/70 sm:text-xl">
              Команда «Лизинг и точка» ведёт ваш проект от заявки до получения ключей. Мы сопоставляем десятки предложений,
              ускоряем одобрение и сохраняем фонды на развитие бизнеса.
            </p>

            <ul className="grid gap-3 text-sm text-dark/80 sm:grid-cols-2">
              {features.map(feature => (
                <li
                  key={feature}
                  className="flex items-center gap-2 rounded-3xl border border-white/60 bg-white/85 px-4 py-3 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                <Timer className="h-5 w-5" aria-hidden />
                Получить расчёт
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-white/80 px-6 py-3 text-sm font-semibold text-accent shadow-sm transition hover:border-accent hover:bg-white"
              >
                <GaugeCircle className="h-5 w-5" aria-hidden />
                Рассчитать платёж
              </a>
            </div>

            <div className="flex flex-col gap-6 text-sm text-dark/65 sm:flex-row sm:flex-wrap sm:items-center">
              {contacts.map(contact => (
                <div key={contact.label} className="text-center sm:text-left">
                  <span className="block text-dark/40">{contact.label}</span>
                  <p className="font-medium text-dark">{contact.description}</p>
                </div>
              ))}

              <div className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/85 px-4 py-3 text-sm font-medium text-dark shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
                  <ArrowDown className="h-5 w-5 text-accent" aria-hidden />
                </span>
                <p className="max-w-xs">
                  Прокрутите вниз — мы подсветили ключевые условия для вашего сценария.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 shadow-hero backdrop-blur">
              <Image
                src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1280&q=80"
                alt="Элегантный автомобиль на дороге"
                width={960}
                height={640}
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="h-[400px] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />

              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold text-dark shadow-sm">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                12 000+ км сопровождения
              </div>

              <div className="absolute right-6 bottom-6 flex items-center gap-3 rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-dark shadow-sm">
                <Timer className="h-5 w-5 text-accent" aria-hidden />
                Одобрение за 1 день
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}