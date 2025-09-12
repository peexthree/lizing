import Image from 'next/image'

export default function CaseStudies() {
  const cases = [
    { src: '/cases/car.webp', alt: 'Легковой автомобиль' },
    { src: '/cases/truck.webp', alt: 'Грузовой автомобиль' },
    { src: '/cases/excavator.webp', alt: 'Спецтехника' },
  ]
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Примеры техники</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <div key={c.src} className="overflow-hidden rounded-2xl">
              <Image src={c.src} alt={c.alt} width={400} height={300} className="h-48 w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
