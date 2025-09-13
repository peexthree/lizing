import Image from 'next/image'

export default function Contacts() {
  return (
    <section id="contacts" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-bold md:text-3xl">Контакты</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-4 text-sm text-dark/80">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <a
                href="tel:+79677728299"
                className="flex items-center justify-center rounded-lg bg-accent py-4 font-semibold text-white"
              >
                Позвонить
              </a>
              <a
                href="https://wa.me/79677728299"
                className="flex items-center justify-center rounded-lg bg-green-500 py-4 font-semibold text-white"
              >
                WhatsApp
              </a>
              <a
                href="mailto:erevakshin@lizing-i-tochka.ru"
                className="flex items-center justify-center rounded-lg bg-dark py-4 font-semibold text-white"
              >
                E‑mail
              </a>
              <a
                href="https://t.me/dpvlen"
                className="flex items-center justify-center rounded-lg bg-sky-500 py-4 font-semibold text-white"
              >
                Telegram
              </a>
            </div>

            <div className="space-y-4">
              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-semibold">Контактная информация</summary>
                <div className="mt-2 space-y-1 text-dark/80">
                  <div className="font-semibold text-dark">Лизинг и точка</div>
                  <p className="mt-2">
                    Тел.: +7 (967) 77‑28‑299, +7 (918) 37‑98‑548, 8 800 444‑45‑84
                  </p>
                  <p className="mt-1">
                    E‑mail: erevakshin@lizing-i-tochka.ru, dpalenov@lizing-i-tochka.ru
                  </p>
                  <p className="mt-1">Telegram: @dpvlen</p>
                  <p className="mt-1">ЭДО: Контур Диадок</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <a
                      href="tel:+79677728299"
                      className="flex items-center justify-center rounded-lg bg-accent py-4 font-semibold text-white"
                    >
                      Позвонить
                    </a>
                    <a
                      href="https://wa.me/79677728299"
                      className="flex items-center justify-center rounded-lg bg-green-500 py-4 font-semibold text-white"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="mailto:erevakshin@lizing-i-tochka.ru"
                      className="flex items-center justify-center rounded-lg bg-dark py-4 font-semibold text-white"
                    >
                      E‑mail
                    </a>
                    <a
                      href="https://t.me/dpvlen"
                      className="flex items-center justify-center rounded-lg bg-sky-500 py-4 font-semibold text-white"
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </details>

              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer font-semibold">Реквизиты</summary>
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
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="https://static-maps.yandex.ru/1.x/?ll=49.5,58.5&size=600,300&z=3&l=map"
              alt="Регион работы"
              width={600}
              height={300}
              unoptimized
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}