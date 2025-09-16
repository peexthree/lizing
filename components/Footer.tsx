import { Phone, MessageCircle, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/50 bg-white/75 backdrop-blur-2xl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb left-[18%] top-[-4rem] hidden h-[240px] w-[240px] bg-accent/15 md:block" />
        <div className="floating-orb right-[12%] bottom-[-6rem] hidden h-[260px] w-[260px] bg-white/35 md:block" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-12 text-sm text-dark/70">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-lg font-semibold text-dark">Лизинг и точка</div>
            <p>Тел.: +7 (918) 37‑98‑548 · 8 800 444‑45‑84</p>
            <p>E‑mail: erevakshin@lizing-i-tochka.ru</p>
            <p>ЭДО: Контур Диадок</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              24/7 заявки
            </div>
          </div>
          <div className="space-y-2">
            <p>ИП Ревакшин Евгений Олегович — ОГРНИП 322237500268431, ИНН 230907403260</p>
            <p>Юр. адрес: 350033, г. Краснодар, пер. Глиняный, д. 4, кв. 3</p>
            <p>Почтовый адрес: 344092, г. Ростов-на-Дону, пр-т Космонавтов, 2Е, офис 13</p>
          </div>
          <nav className="grid gap-2 text-sm md:text-right">
            <a href="#how" className="transition hover:text-accent">Как работает</a>
            <a href="#calculator" className="transition hover:text-accent">Калькулятор</a>
            <a href="#examples" className="transition hover:text-accent">Примеры</a>
            <a href="#faq" className="transition hover:text-accent">FAQ</a>
            <a href="#contacts" className="transition hover:text-accent">Контакты</a>
            <a href="/privacy" className="transition hover:text-accent">Политика конфиденциальности</a>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 text-xs text-dark/60 md:flex-row md:items-center md:justify-between">
          <p>
            Расчёты на сайте носят информационный характер и не являются публичной офертой.
          </p>
          <div className="flex items-center gap-4 text-dark/70">
            <a href="tel:+79677728299" aria-label="Позвонить" className="transition hover:text-accent">
              <Phone className="h-5 w-5" />
            </a>
            <a href="https://wa.me/79677728299" aria-label="WhatsApp" className="transition hover:text-accent">
              <MessageCircle className="h-5 w-5" />