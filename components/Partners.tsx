import Image from 'next/image'

export default function Partners() {
  const partners = Array.from({ length: 5 }, () => '/partner-placeholder.svg')
  return (
    <section className="py-8 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          {partners.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Логотип партнёра ${i + 1}`}
              width={160}
              height={64}
              className="h-16 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  )
}