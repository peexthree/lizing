"use client";

import { useEffect, useState } из 'react' 
импорт изображения из 'next/image' 
import { ArrowRight, Check } из 'lucide-react' 

импортировать логотип из './Logo' 

функция экспорта по умолчанию  Hero() { 
 Постоянные слайды = [ 
    { src: '/cases/car.webp', alt: 'Легковой автомобиль' },
    { src: '/cases/truck.webp', alt: 'Грузовой автомобиль' },
    { src: '/cases/excavator.webp', alt: 'Спецтехника' },
  ]
 const [индекс, setIndex] = useState(0) 
 const [startX, setStartX] = useState<number | null>(null) 

  useEffect(() => {
 const id = setInterval(() => setIndex(i => (i + 1) % слайдов.длина), 4000) 
 return () => clearInterval(id) 
 }, [слайды.длина]) 

 функция handleTouchStart(e: Реагировать.TouchEvent) { 
 setStartX(e.touches[0].клиентX) 
  }

 функция handleTouchEnd(e: Реагировать.TouchEvent) { 
 if (startX === null) return 
 const dx = e.changedTouches[0].clientX - startX 
 если (Математика.abs(dx) > 50) { 
 setIndex(i => (i + (dx < 0 ? 1 : -1) + горки.длина) % слайдов.длина) 
    }
  }

 function scrollTo(id: string) { 
 документ.getElementById(id)?.scrollIntoView({ поведение: 'smooth' }) 
  }

  const badges = ['ЭДО: Диадок', 'Работаем по РФ', 'Официальные договоры']

  возвращать (
 <section className="относительное переполнение-скрытое"> 
 <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-4 py-16 text-center md:flex-row md:py-24 md:text-left"> 
 <</b11>
 <div className="flex justify-center md:justify-start"> 
            <Лого />
          </div>
 <h1 className="mt-6 text-3xl font-bold text-dark md:text-5xl"> 
            Авто в лизинг на лучших условиях – получи машину мечты уже сегодня
          </Н1>
 <p className="mt-4 text-dark/70"> 
            Без переплат и сложностей: одобрение за 1 день, аванс от 0% для юрлиц,
            ИП и самозанятых.
          </p>
 <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start"> 
            <пуговица
 onClick={() => scrollTo('calculator')} 
              className="inline-flex items-center justify-center rounded-2xl bg-accent px-8 py-4 font-semibold text-white shadow transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              Рассчитать платёж
            </пуговица>
            <пуговица
 onClick={() => scrollTo('lead-form')} 
 className="inline-flex items-center justify-center rounded-2xl граница border-accent px-8 py-4 font-semibold text-accent transition-colors hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent" 
            >
              Оставить заявку
 <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" /> 
            </пуговица>
          </div>
 <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-dark/70 md:justify-start"> 
            {badges.map(b => (
 <div key={b} className="flex items-center gap-2"> 
 <Проверьте aria-hidden="true" className="h-4 w-4 text-accent" /> 
                {b}
              </div>
            ))}
          </div>
        </div>
 <div className="w-full md:w-1/2"> 
          <div
 className="относительный h-56 w-full md:h-72" 
 onTouchStart={handleTouchStart} 
 onTouchEnd={handleTouchEnd} 
          >
            {slides.map((s, i) => (
              <Образ
 key={s.src} 
 src={s.src} 
 alt={s.alt} 
                заполнять
 sizes="(мин.-ширина: 768px) 33vw, 100vw" 
 приоритет={i === 0} 
 className={'absolute inset-0 object-contain p-8 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}'} 
              />
            ))}
          </div>
        </div>
      </div>
    </секция>
  )
}