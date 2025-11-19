
import Link from 'next/link'
import Logo from '@/components/Logo' // Исправленный импорт

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Навигация',
      links: [
        { text: 'Как мы работаем', href: '/#how' },
        { text: 'Преимущества', href: '/#why' },
        { text: 'Вопросы и ответы', href: '/#faq' },
        { text: 'Оставить заявку', href: '/#lead-form' },
      ],
    },
    {
      title: 'Документы',
      links: [
        { text: 'Политика конфиденциальности', href: '/privacy' },
      ],
    },
    {
      title: 'Контакты',
      links: [
        { text: 'dpalenov@lizing-i-tochka.ru', href: 'mailto:dpalenov@lizing-i-tochka.ru' },
        { text: '+7 967 772 8299', href: 'tel:+79677728299' },
      ],
    },
  ]

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/65 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4 text-slate-300">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Logo and Copyright */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-4 text-sm text-slate-400/80">
              Лизинг авто и спецтехники по всей России. Быстрое одобрение и индивидуальные условия.
            </p>
            <p className="mt-6 text-xs text-slate-500">
              © {currentYear} Лизинг и точка. Все права защищены.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-accent"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
