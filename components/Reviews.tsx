'use client'

import { StarIcon } from '@heroicons/react/20/solid'

const reviews = [
  {
    id: 1,
    rating: 5,
    content: `
      <p>Отличная компания, быстро и качественно выполняют свою работу. Лучшие условия на рынке. Однозначно рекомендую!</p>
    `,
    author: 'Алексей К.',
    source: 'Яндекс.Карты'
  },
  {
    id: 2,
    rating: 5,
    content: `
      <p>Отличная компания, быстрое оформление, минимум документов, по сравнению с другими лизинговыми компаниями.</p>
    `,
    author: 'Виктор',
    source: 'Яндекс.Карты'
  },
  {
    id: 3,
    rating: 5,
    content: `
      <p>Отличная компания, минимум валакиты с документами, специалисты всегда на связи, все очень быстро и качественно!</p>
    `,
    author: 'Максим',
    source: 'Яндекс.Карты'
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Reviews() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Отзывы наших клиентов</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Мы гордимся нашей репутацией. Вот что говорят о нас на Яндекс.Картах.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {reviews.map((review) => (
              <div key={review.id} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-6 text-gray-900">
                    <div dangerouslySetInnerHTML={{ __html: review.content }} />
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div>
                      <div className="font-semibold text-gray-900">{review.author}</div>
                      <div className="text-gray-600">{`Источник: ${review.source}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>

           <div className="mt-16 text-center">
             <a href="https://yandex.ru/maps/org/lizing_i_tochka/9071444776/reviews/?ll=39.019842%2C45.034929&z=16" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-accent hover:bg-accent/90 transition-colors">
                Читать все отзывы на Яндекс.Картах
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
