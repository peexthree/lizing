'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Logomark from '@/components/Logomark'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

// Always link to homepage sections
const navLinks = [
    { href: '/#benefits', label: 'Преимущества' },
    { href: '/#use-cases', label: 'Для кого' },
    { href: '/#how-it-works', label: 'Как это работает' },
    { href: '/#faq', label: 'Вопросы' },
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleNavClick = useCallback((href: string) => {
        const targetId = href.split('#')[1];
        // If we are on the homepage and the link has a hash, scroll smoothly
        if (pathname === '/' && targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth',
                });
            }
        } else {
            // Otherwise, navigate to the page/section
            router.push(href);
        }
        setIsOpen(false); // Close mobile menu on navigation
    }, [pathname, router]);

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 emerald-glass-header">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex-shrink-0" aria-label="Вернуться на главную">
                        <Logomark className="h-10 w-40" />
                    </Link>
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a 
                                        href={link.href} 
                                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }} 
                                        className="font-medium text-white/70 hover:text-white transition-colors text-glow-subtle"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="hidden md:block">
                         <Button variant="glow-subtle" size="sm" onClick={() => handleNavClick('/#lead-form')}>
                            Оставить заявку
                        </Button>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-400"
                            aria-label="Открыть меню"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-x-0 top-0 z-50 origin-top-right transform p-2 transition"
                    >
                        <div className="rounded-2xl emerald-glass-header divide-y-2 divide-emerald-400/20">
                            <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Link href="/" aria-label="Вернуться на главную">
                                            <Logomark className="h-10 w-40" />
                                        </Link>
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-400"
                                            aria-label="Закрыть меню"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        {navLinks.map(link => (
                                            <a 
                                                key={link.href} 
                                                href={link.href} 
                                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }} 
                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-white/5"
                                            >
                                                <span className="ml-3 text-base font-medium text-white text-glow-subtle">{link.label}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                             <div className="py-6 px-5 space-y-6">
                                 <Button variant="glow" className="w-full" onClick={() => handleNavClick('/#lead-form')}>
                                    Оставить заявку
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header;