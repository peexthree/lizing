export default function Segments() {
  const items = [
    { title: 'Легковые авто', text: 'Новые и б/у. С остаточным платежом и без.' },
    { title: 'Грузовые/LCV', text: 'Фургоны, тягачи, спецнадстройки.' },
    { title: 'Спецтехника', text: 'Стройка, дорожная, сельхоз. Возвратный лизинг под свою технику.' },
    { title: 'Недвижимость', text: 'Коммерческие помещения, склады, офисы, строительство под арендатора.' },
    { title: 'Оборудование', text: 'Промышленное, медицинское, торговое и ИТ.' },
    { title: 'Возвратный лизинг', text: 'Деньги под собственные активы без остановки работы.' },
  ]
  return (
      <section className="relative overflow-hidden py-20">

    <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Сегменты</span>
          <h2 className="glass-title mt-4 text-3xl font-bold text-text md:text-4xl">Виды и сегменты лизинга</h2>
          <p className="mt-4 text-lg text-text/80">
            Берём на сопровождение проекты любой сложности — от легковых автомобилей до тяжёлой спецтехники, недвижимости и оборудования для производства.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-7 text-left shadow-soft-lg backdrop-blur-2xl transition hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span className="pointer-events-none absolute -right-10 top-6 text-7xl font-black text-accent/10">0{index + 1}</span>
              <h3 className="relative text-lg font-semibold text-text">{item.title}</h3>
              <p className="relative mt-3 text-sm text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}