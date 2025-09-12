export default function Advantages() {
  const items = [
    { title: 'Низкий аванс', text: 'От 0% или первый платёж' },
    { title: 'Быстрое одобрение', text: 'Предварительный ответ за 1 день' },
    { title: 'Для юр. и физ. лиц', text: 'Работаем с компаниями и ИП/самозанятыми' },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-gray-200 p-6 text-center">
              <h3 className="font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-dark/70">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
