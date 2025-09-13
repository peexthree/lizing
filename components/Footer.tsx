import { Phone, MessageCircle, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-dark/70">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-semibold text-dark">Лизинг и точка</div>
            <p className="mt-2">Тел.: +7 (918) 37‑98‑548 · 8 800 444‑45‑84 · E‑mail: erevakshin@lizing-i-tochka.ru</p>
            <p className="mt-1">ЭДО: Контур Диадок</p>
          </div>
          <div>
            <p>ИП Ревакшин Евгений Олегович — ОГРНИП 322237500268431, ИНН 230907403260</p>
            <p className="mt-1">Юр. адрес: 350033, г. Краснодар, пер. Глиняный, д. 4, кв. 3</p>
            <p>Почтовый адрес: 344092, г. Ростов-на-Дону, пр-т Космонавтов, 2Е, офис 13</p>
          </div>
          <nav className="flex flex-col gap-2 md:text-right">
            <a href="#how" className="hover:text-accent">Как работает</a>
            <a href="#calculator" className="hover:text-accent">Калькулятор</a>
            <a href="#examples" className="hover:text-accent">Примеры</a>
            <a href="#faq" className="hover:text-accent">FAQ</a>
            <a href="#contacts" className="hover:text-accent">Контакты</a>
            <a href="/privacy" className="hover:text-accent">Политика конфиденциальности</a>
          </nav>
        </div>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs">
            Расчёты на сайте носят информационный характер и не являются публичной офертой.
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:+79677728299" aria-label="Позвонить" className="text-dark hover:text-accent">
              <Phone className="h-5 w-5" />
            </a>
            <a href="https://wa.me/79677728299" aria-label="WhatsApp" className="text-dark hover:text-accent">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="https://t.me/dpvlen" aria-label="Telegram" className="text-dark hover:text-accent">
              <Send className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-4 text-xs">© 2025 Лизинг и точка</p>
      </div>
    </footer>
  )
}