import Image from 'next/image'

export default function CaseStudies() {
  const cases = [
    {
      src: '/cases/car.webp',
      alt: 'Hyundai Solaris',
      title: 'Hyundai Solaris',
      desc: '1.25 млн ₽, аванс 10%, 36 мес — платёж 32 450 ₽/мес',
    },
  ]
  return (
    <section id="examples" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Примеры сделок</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <div key={c.src} className="overflow-hidden rounded-2xl bg-white shadow">
              <Image
                src={c.src}
                alt={c.alt}
                width={400}
                height={300}
                className="h-48 w-full object-cover"
                sizes="(min-width:768px) 33vw, 100vw"
                loading="lazy"
              />
              <div className="p-4 text-sm">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-dark/70">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}