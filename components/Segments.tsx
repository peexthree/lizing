export default function Segments() {
  const items = [
    { title: 'Легковые авто', text: 'Новые и б/у. С остаточным платежом и без.' },
    { title: 'Грузовые/LCV', text: 'Фургоны, тягачи, спецнадстройки.' },
    { title: 'Спецтехника', text: 'Стройка, дорожная, сельхоз. Возвратный лизинг под свою технику.' },
    { title: 'Оборудование', text: 'Промышленное, медицинское, торговое.' },
    { title: 'Возвратный лизинг', text: 'Деньги под собственные активы без остановки работы.' },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold">Виды и сегменты лизинга</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-gray-200 bg-bgsoft p-6">
              <h3 className="font-semibold">{i.title}</h3>
              <p className="mt-2 text-sm text-dark/70">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
