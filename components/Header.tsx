'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Logomark from '@/components/Logomark'
import { usePathname, useRouter } from 'next/navigation'
import { buttonVariants } from '@/components/ui/Button'

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

    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = useCallback((href: string) => {
        const targetId = href.split('#')[1];
        if (pathname === '/' && targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        } else {
            router.push(href);
        }
        setIsOpen(false);
    }, [pathname, router]);

    return (
        <>
        {/* <header className="sticky top-0 z-50 transition-all duration-300 emerald-glass-header"> */}
        <header className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"} ${isScrolled ? "pt-4" : "pt-6"}`}>
            <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "emerald-glass-header rounded-full shadow-lg shadow-emerald-500/10 border border-white/10" : "bg-transparent"}`}>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex-shrink-0 ml-2" aria-label="Вернуться на главную">
                        <Logomark className="h-8 w-32 md:h-10 md:w-40" />
                    </Link>
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a 
                                        href={link.href} 
                                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }} 
                                        className="font-medium text-white/70 hover:text-white transition-colors text-glow-subtle tracking-wide text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="hidden md:block mr-2">
                        <a className={buttonVariants({ variant: "glow-subtle", size: "sm" })} href="tel:+79677728299">
                            Позвонить нам
                        </a>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center justify-center p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-400"
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
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden fixed inset-x-4 top-4 z-50 origin-top p-2 transition"
                    >
                        <div className="rounded-2xl emerald-glass-header border border-white/10 shadow-2xl overflow-hidden backdrop-blur-3xl">
                            <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Link href="/" aria-label="Вернуться на главную">
                                            <Logomark className="h-8 w-32" />
                                        </Link>
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="inline-flex items-center justify-center p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-400"
                                            aria-label="Закрыть меню"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <nav className="grid gap-y-4">
                                        {navLinks.map((link, index) => (
                                            <motion.a
                                                key={link.href} 
                                                href={link.href} 
                                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }} 
                                                className="p-3 flex items-center rounded-xl hover:bg-white/10 transition-colors"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <span className="ml-3 text-base font-medium text-white tracking-wide">{link.label}</span>
                                            </motion.a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                             <div className="py-6 px-5 border-t border-white/10 bg-black/20">
                                <a className={buttonVariants({ variant: "glow", className: "w-full" })} href="tel:+79677728299">
                                    Позвонить нам
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
        </>
    )
}

export default Header;
