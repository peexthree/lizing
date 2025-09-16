import { Mail, MessageCircle, Phone, Send } from 'lucide-react'

const phoneNumbers = [
  { label: '+7 (967) 77‑28‑299', href: 'tel:+79677728299' },
  { label: '+7 (918) 37‑98‑548', href: 'tel:+79183798548' },
  { label: '8 800 444‑45‑84', href: 'tel:88004444584' },
]

const emailAddresses = [
  { label: 'erevakshin@lizing-i-tochka.ru', href: 'mailto:erevakshin@lizing-i-tochka.ru' },
  { label: 'dpalenov@lizing-i-tochka.ru', href: 'mailto:dpalenov@lizing-i-tochka.ru' },
]

const quickLinks = [
  { label: 'FAQ', href: '#faq' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Контакты', href: '#contacts' },
  { label: 'Политика конфиденциальности', href: '/privacy' },
]

const socialLinks = [
  { label: 'WhatsApp', href: 'https://wa.me/79677728299', icon: MessageCircle },
  { label: 'Telegram', href: 'https://t.me/dpvlen', icon: Send },
  { label: 'E‑mail', href: 'mailto:erevakshin@lizing-i-tochka.ru', icon: Mail },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/50 bg-white/75 backdrop-blur-2xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb left-[18%] top-[-4rem] hidden h-[240px] w-[240px] bg-accent/15 md:block" />
        <div className="floating-orb right-[12%] bottom-[-6rem] hidden h-[260px] w-[260px] bg-white/35 md:block" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 text-sm text-dark/70">
        <div className="grid gap-10 md:grid-cols-[1.25fr_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="text-lg font-semibold text-dark">Лизинг и точка</div>
            <p>
              Сопровождаем сделки в лизинге: от подбора техники и переговоров с компаниями до выдачи и страхования.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              24/7 заявки
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">Контакты</div>
              <ul className="mt-3 space-y-2">
                {phoneNumbers.map(phone => (
                  <li key={phone.href}>
                    <a
                      href={phone.href}
                      className="flex items-center gap-2 text-sm text-dark transition hover:text-accent"
                    >
                      <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">E‑mail</div>
              <ul className="mt-3 space-y-1">
                {emailAddresses.map(email => (
                  <li key={email.href}>
                    <a
                      href={email.href}
                      className="flex items-center gap-2 text-sm text-dark transition hover:text-accent"
                    >
                      <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                      {email.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">Соцсети</div>
              <div className="mt-3 flex items-center gap-3">
                {socialLinks.map(link => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-2 text-xs font-semibold text-dark shadow-sm transition hover:border-accent hover:text-accent"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="space-y-5 md:text-right">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">Быстрые ссылки</div>
            <nav className="grid gap-2 text-sm">
              {quickLinks.map(link => (
                <a key={link.href} href={link.href} className="transition hover:text-accent">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="rounded-3xl border border-white/60 bg-white/80 p-5 text-xs text-dark/70 shadow-sm backdrop-blur">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-dark/50">Реквизиты</div>
              <p className="mt-3">ИП Ревакшин Евгений Олегович</p>
              <p>ОГРНИП 322237500268431 · ИНН 230907403260</p>
              <p className="mt-2">Юр. адрес: 350033, г. Краснодар, пер. Глиняный, д. 4, кв. 3</p>
              <p>Почтовый адрес: 344092, г. Ростов-на-Дону, пр-т Космонавтов, 2Е, офис 13</p>
              <p className="mt-2">ЭДО: Контур Диадок</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/50 pt-6 text-xs text-dark/60 md:flex-row md:items-center md:justify-between">
          <p>Расчёты на сайте носят информационный характер и не являются публичной офертой.</p>
          <p className="text-dark/50">© {new Date().getFullYear()} «Лизинг и точка». Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}