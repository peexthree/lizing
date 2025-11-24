'use client'

import Link from 'next/link'
import React, { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

const NAV_SECTIONS = [
  {
    title: 'Разделы',
    links: [
      { href: '/#benefits', label: 'Преимущества' },
      { href: '/#how-it-works', label: 'Как это работает' },
      { href: '/#faq', label: 'Вопросы и ответы' },
      { href: '/#lead-form', label: 'Оставить заявку' },
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
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.split('#')[1];

    if (href.startsWith('/') && !href.startsWith('/#')) {
        router.push(href);
        return;
    }

    if (pathname === '/' && targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth',
        });
      }
    } else {
      router.push(`/${targetId ? '#' + targetId : ''}`);
    }
  }, [pathname, router]);

  return (
    <footer className="glass-footer mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
             <Link href="/" aria-label="Вернуться на главную">
                <Logo className="h-32 w-64 text-text" />
             </Link>
            <p className="mt-4 text-base text-muted text-glow-subtle">
              Ваш надёжный партнёр в мире лизинга. Предлагаем лучшие условия и быстрое оформление для роста вашего бизнеса по всей России.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {NAV_SECTIONS.map(section => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text text-glow">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map(link => (
                    <li key={link.label}>
                       <a 
                         href={link.href} 
                         onClick={(e) => handleNavClick(e, link.href)} 
                         className="text-base text-muted hover:text-accent transition-colors text-glow"
                       >
                          {link.label}
                       </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
                 <h3 className="text-sm font-semibold uppercase tracking-wider text-text text-glow">Контакты</h3>
                 <ul className="mt-4 space-y-3">
                     <li><a href="tel:+79991234567" className="text-base text-muted hover:text-accent transition-colors text-glow">+7 (999) 123-45-67</a></li>
                     <li><a href="mailto:erevakshin@lizing-i-tochka.ru" className="text-base text-muted hover:text-accent transition-colors text-glow">erevakshin@lizing-i-tochka.ru</a></li>
                 </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted text-glow-subtle">&copy; {currentYear} Лизинг и точка. Все права защищены.</p>
          <p className="text-sm text-muted mt-4 sm:mt-0 text-glow-subtle">Разработано с ❤️</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer