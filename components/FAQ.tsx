export default function FAQ() {
  const qa = [
    { q: 'Если у нас уже есть своя лизинговая компания?', a: 'Сравним условия по 50+ ЛК, добьёмся скидок и лучшего аванса/ставки.' },
    { q: 'Можно ли без аванса?', a: 'Для ряда программ — да. Часто работает формат «первый платёж вместо аванса».' },
    { q: 'Что такое возвратный лизинг?', a: 'Деньги под вашу технику: продаёте ЛК и тут же берёте её в лизинг, продолжаете пользоваться.' },
    { q: 'Какие документы нужны?', a: 'Минимальный набор зависит от суммы. Подскажем чек‑лист для быстрого одобрения.' },
  ]
  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-8 space-y-4">
          {qa.map((i) => (
            <details key={i.q} className="rounded-2xl bg-white p-6 shadow">
              <summary className="cursor-pointer list-none font-semibold">{i.q}</summary>
              <p className="mt-2 text-sm text-dark/70">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}