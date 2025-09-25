import Image from 'next/image'
import type { CSSProperties } from 'react'
export default function Partners() {
  const partners = Array.from({ length: 5 }, () => '/partner-placeholder.svg')

  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute left-[-5rem] top-16 hidden h-[360px] w-[360px] rounded-full bg-accent/15 blur-3xl opacity-70 md:block" />
        <div className="pointer-events-none absolute right-[-6rem] bottom-[-4rem] hidden h-[400px] w-[400px] rounded-full bg-white/25 blur-3xl opacity-70 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Партнёры</span>
          <h2 className="glass-title glass-title--light mt-4 text-3xl font-bold text-dark md:text-4xl">Работаем с надёжными лизинговыми компаниями</h2>
          <p className="mt-4 text-lg text-dark/65">
            Сотрудничаем с банками, страховыми и крупнейшими лизинговыми компаниями. Это помогает быстро согласовывать условия и находить оптимальные решения.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {partners.map((src, index) => (
            <li
              key={`partner-${index}`}
              className="flex h-28 items-center justify-center px-6 py-4"
            >
              <div
                className="premium-gold-frame premium-gold-frame--light flex h-full w-full items-center justify-center rounded-3xl"
                style={{
                  '--premium-frame-padding': '0.75rem',
                } as CSSProperties}
              >
                <div className="premium-gold-frame__inner">
                  <Image
                    src={src}
                    alt={`Логотип партнёра ${index + 1}`}
                    width={160}
                    height={64}
                    className="premium-gold-frame__image h-12 w-auto object-contain opacity-90"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}