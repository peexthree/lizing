import { Mail, MessageCircle, Phone, Send, type LucideIcon } from 'lucide-react'

export default function Contacts() {
  const contactLinks: { href: string; label: string; icon: LucideIcon; external: boolean }[] = [
    { href: 'tel:+79677728299', label: 'Позвонить', icon: Phone, external: false },
    { href: 'https://wa.me/79677728299', label: 'WhatsApp', icon: MessageCircle, external: true },
    { href: 'mailto:erevakshin@lizing-i-tochka.ru', label: 'E‑mail', icon: Mail, external: false },
    { href: 'https://t.me/dpvlen', label: 'Telegram', icon: Send, external: true }
  ]

  const serviceCities = [
    'Москва',
    'Санкт-Петербург',
    'Краснодар',
    'Ростов-на-Дону',
    'Екатеринбург',
    'Новосибирск',
    'Казань',
    'Самара',
    'Нижний Новгород',
    'Воронеж'
  ]

  return (
    <section id="contacts" className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="floating-orb left-[12%] top-[8rem] hidden h-[260px] w-[260px] bg-white/35 md:block" />
        <div className="floating-orb right-[16%] bottom-[-3rem] hidden h-[320px] w-[320px] bg-accent/20 lg:block" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold text-dark md:text-4xl">Контакты</h2>
        <p className="mt-4 text-center text-base text-dark/70">
          Быстро отвечаем в мессенджерах, консультируем по телефону и берём проект в работу сразу после заявки.
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)] md:items-start">
          <div className="space-y-6 text-sm text-dark/80">
            <div className="grid gap-3 sm:grid-cols-2">
              {contactLinks.map(link => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact-pill w-full"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
@@ -72,46 +84,64 @@ export default function Contacts() {
                      )
                    })}
                  </div>
                </div>
              </details>

              <details className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-glow backdrop-blur">
                <summary className="cursor-pointer font-semibold text-dark">Реквизиты</summary>
                <div className="mt-2 space-y-1 text-dark/80">
                  <p>ИП Ревакшин Евгений Олегович</p>
                  <p>ОГРНИП 322237500268431</p>
                  <p>ИНН 230907403260</p>
                  <p>Юр. адрес: 350033, г. Краснодар, пер. Глиняный, д. 4, кв. 3</p>
                  <p>
                    Почтовый адрес: 344092, г. Ростов-на-Дону, пр-т Космонавтов, 2Е,
                    офис 13
                  </p>
                </div>
              </details>
              <div className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-glow backdrop-blur">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">График</div>
                <p className="mt-2 text-sm text-dark/70">Рабочие дни: Пн–Пт 09:00–19:00, без выходных для онлайн заявок.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 text-sm text-dark/70 md:items-end">
            <div className="map-shell relative w-full max-w-xl">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=99.115868%2C61.060099&z=3&l=map"
                title="Карта работы по России"
                className="h-[320px] w-full border-0"
                loading="lazy"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-dark/10" />
              <div className="pointer-events-none absolute bottom-6 left-6 max-w-xs rounded-3xl bg-dark/80 px-5 py-4 text-left text-white shadow-lg">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">География</span>
                <p className="mt-2 text-lg font-semibold">Работаем по всей России</p>
                <p className="mt-1 text-xs text-white/70">
                  Берём в работу проекты в любом регионе и синхронизируем логистику с поставщиками.
                </p>
              </div>
            </div>
            <ul className="grid w-full max-w-xl gap-2 text-dark/70 sm:grid-cols-2">
              {serviceCities.map(city => (
                <li
                  key={city}
                  className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/85 px-4 py-2 shadow-sm backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  {city}
                </li>
              ))}
            </ul>
            <p className="max-w-xl rounded-3xl border border-white/60 bg-white/80 px-5 py-4 text-center shadow-sm backdrop-blur">
              Работаем по всей России: подбираем технику, организуем доставку и страхование в вашем регионе.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}