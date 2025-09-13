export const faq = [
  {
    q: 'Если у нас уже есть своя лизинговая компания?',
    a: 'Сравним 50+ предложений и выберем выгоднее.'
  },
  {
    q: 'Можно ли без аванса?',
    a: 'Да. Часто первый платёж идёт вместо аванса.'
  },
  {
    q: 'Что такое возвратный лизинг?',
    a: 'Продаёте технику ЛК и берёте её обратно. Получаете деньги.'
  },
  {
    q: 'Какие документы нужны?',
    a: 'Зависит от суммы. Дадим чек‑лист.'
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-8 space-y-4">
          {faq.map((i) => (
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