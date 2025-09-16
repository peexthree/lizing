import Image from 'next/image'
import { ArrowDown, CheckCircle2, GaugeCircle, Sparkles, Timer } from 'lucide-react'
import { openLeadForm } from '@/lib/openLeadForm'
const features = [
  'Аванс от 0% и одобрение в течение суток',
  'Легковые, грузовые и спецтехника для бизнеса и частных лиц',
  '50+ банков и лизинговых компаний в одном окне',
  'Оформление дистанционно по всей России'
]

const contacts = [
  { label: '8 800 444-45-84', description: 'Консультация бесплатно' },
  { label: 'Срок сделки', description: 'от 24 часов' }
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-36">
      <div className="absolute inset-0">
        <Image
          src="https://plus.unsplash.com/premium_photo-1731701708674-41a2d0b28f69?auto=format&fit=crop&w=1920&q=80"
          alt="Современный офис с автомобилем у стеклянного фасада"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/80 to-dark/90"
          aria-hidden
        />
        <div className="absolute inset-0 bg-hero-grid opacity-40 mix-blend-screen" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,440px)]">
          <div className="space-y-8 text-white">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 shadow-sm backdrop-blur opacity-0 animate-fade-up"
              style={{ animationDelay: '120ms' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
              Быстрый старт
            </span>

            <h1
              className="text-balance text-4xl font-semibold leading-tight text-white opacity-0 animate-fade-up sm:text-5xl lg:text-6xl"
              style={{ animationDelay: '200ms' }}
            >
              <span className="block">Лизинг за 24 часа.</span>
              <span className="block">Аванс от 0%.</span>
              <span className="block bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                Для бизнеса и частных лиц
              </span>
            </h1>

            <p
              className="max-w-2xl text-lg text-white/80 opacity-0 animate-fade-up sm:text-xl"
              style={{ animationDelay: '280ms' }}
            >
              Работаем по всей России. Индивидуальные условия.
            </p>

            <ul
              className="grid gap-3 text-sm text-white/85 opacity-0 animate-fade-up sm:grid-cols-2"
              style={{ animationDelay: '320ms' }}
            >
              {features.map(feature => (
                <li
                  key={feature}
                  className="flex items-center gap-2 rounded-3xl border border-white/25 bg-white/10 px-4 py-3 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
               <button
                type="button"
                onClick={() => openLeadForm()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark opacity-0 animate-fade-up"
                style={{ animationDelay: '380ms' }}
              >
                <Timer className="h-5 w-5" aria-hidden />
                Оставить заявку
             </button>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:border-white/40 hover:bg-white/20 opacity-0 animate-fade-up"
                style={{ animationDelay: '420ms' }}
              >
                <GaugeCircle className="h-5 w-5" aria-hidden />
                Рассчитать платёж
              </a>
            </div>

            <div className="flex flex-col gap-6 text-sm text-white/70 sm:flex-row sm:flex-wrap sm:items-center">
              {contacts.map(contact => (
                <div key={contact.label} className="text-center sm:text-left">
                  <span className="block text-white/50">{contact.label}</span>
                  <p className="font-medium text-white">{contact.description}</p>
                </div>
              ))}

              <div className="flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-sm backdrop-blur">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/20">
                  <ArrowDown className="h-5 w-5 text-accent" aria-hidden />
                </span>
                <p className="max-w-xs">
                  Прокрутите вниз — мы подсветили ключевые условия для вашего сценария.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 shadow-hero backdrop-blur">
              <Image
                src="https://images.unsplash.com/photo-1617813483334-4b464ee8104d?auto=format&fit=crop&w=1280&q=80"
                alt="Современный грузовик возле бизнес-центра"
                width={960}
                height={640}
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="h-[400px] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden />

              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                12 000+ км сопровождения
              </div>

              <div className="absolute right-6 bottom-6 flex items-center gap-3 rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur">
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