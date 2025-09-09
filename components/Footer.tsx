export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-dark/70">
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>
        <p className="mt-6 text-xs">Расчёты на сайте носят информационный характер и не являются публичной офертой. © {new Date().getFullYear()} Лизинг и точка</p>
      </div>
    </footer>
  )
}
