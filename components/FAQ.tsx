export default function FAQ() {
  const qa = [
    {
      q: 'С каким авансом можно оформить?',
      a: (
        <>
          Аванс от 0% по отдельным программам.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
    {
      q: 'Сроки одобрения?',
      a: (
        <>
          От часа до одного рабочего дня.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
    {
      q: 'Для самозанятых работает?',
      a: (
        <>
          Да, есть программы для самозанятых.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
    {
      q: 'Какие документы нужны?',
      a: (
        <>
          Паспорт, ИНН и базовый пакет. Остальное — по ситуации.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
    {
      q: 'Можно досрочно?',
      a: (
        <>
          Досрочное погашение без штрафов у большинства партнёров.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
    {
      q: 'Какой выкуп?',
      a: (
        <>
          Выкупная стоимость от 1% в конце срока.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
    {
      q: 'Работаете с б/у?',
      a: (
        <>
          Финансируем новую и б/у технику.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
    {
      q: 'Какой регион?',
      a: (
        <>
          Работаем по всей России.{' '}
          <a href="#lead-form" className="text-accent hover:underline">
            Оставить заявку
          </a>
          .
        </>
      ),
    },
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