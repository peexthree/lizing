'use client'

/* import { Button } from '@/components/ui/Button' */
import { buttonVariants } from '@/components/ui/Button'
/* import { openLeadForm } from '@/lib/openLeadForm' */

export default function Hero() {
  return (
    <>
    {/* <section className="relative flex h-screen min-h-[667px] w-full items-center justify-center overflow-hidden text-center text-white"> */}
    <section className="relative flex h-[100dvh] min-h-[667px] w-full items-center justify-center overflow-hidden text-center text-white">
      <div className="absolute inset-0 z-10 bg-black/60"></div>
      <video
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Branded_race_car_drives_fast_202604291548 (online-video-cutter.com).mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 mx-auto max-w-3xl animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
        {/* <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl text-glow"> */}
        <h1 className="text-4xl font-black leading-[1.2] tracking-tight text-white sm:text-5xl md:text-6xl text-glow">
          Лизинг для вашего бизнеса
        </h1>
        {/* <p className="mt-4 text-lg font-semibold text-white/90 sm:text-xl text-glow-subtle"> */}
        <p className="mt-4 text-lg font-semibold leading-[1.5] tracking-wide text-white/90 sm:text-xl text-glow-subtle">
          Авто | Спецтехника | Оборудование | Недвижимость
        </p>
        {/* <p className="mt-6 max-w-xl mx-auto text-lg text-white/80 sm:text-xl text-glow-subtle"> */}
        <p className="mt-6 max-w-xl mx-auto text-lg leading-[1.5] tracking-wide text-white/80 sm:text-xl text-glow-subtle">
          50+ банков конкурируют за вашу заявку. Лучшие условия лизинга за 24 часа.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* <Button variant="glow" size="lg" onClick={() => openLeadForm({ fields: { title: 'Заявка с главного экрана' } })}>
            Получить лучшие условия
          </Button> */}
          <a className={buttonVariants({ variant: "glow", size: "lg" })} href="tel:+79677728299">
            Позвонить нам
          </a>
        </div>
      </div>
    </section>
    </>
  )
}
