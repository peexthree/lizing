'use client'

import Link from 'next/link'
import React, { useCallback } from 'react'
import Logo from '@/components/Logo'

const NAV_SECTIONS = [
  {
    title: 'Разделы',
    links: [
      { href: '#benefits', label: 'Преимущества' },
      { href: '#how-it-works', label: 'Как это работает' },
      { href: '#faq', label: 'Вопросы и ответы' },
      { href: '#lead-form', label: 'Оставить заявку' },
    ],
  },
  {
    title: 'Информация',
    links: [
      { href: '/privacy', label: 'Политика конфиденциальности' },
      { href: '/terms', label: 'Условия использования' },
    ],
  },
]

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        })
      }
    }
  }, [])

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Logo className="h-12 w-auto text-text" />
            <p className="mt-4 text-base text-muted">
              Лизинг автомобилей и спецтехники по всей России. Быстрое одобрение и гибкие условия для вашего бизнеса.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {NAV_SECTIONS.map(section => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <a href={link.href} onClick={e => scrollTo(e, link.href)} className="text-base text-muted hover:text-primary transition-colors">
                          {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
                 <h3 className="text-sm font-semibold uppercase tracking-wider text-text">Контакты</h3>
                 <ul className="mt-4 space-y-3">
                     <li><a href="tel:+79991234567" className="text-base text-muted hover:text-primary transition-colors">+7 (999) 123-45-67</a></li>
                     <li><a href="mailto:info@lizing-tochka.ru" className="text-base text-muted hover:text-primary transition-colors">info@lizing-tochka.ru</a></li>
                 </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted">&copy; {currentYear} Лизинг и точка. Все права защищены.</p>
          <p className="text-sm text-muted mt-4 sm:mt-0">Разработано с ❤️</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
