'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Logomark from '@/components/Logomark' // Используем новый компонент
import { usePathname, useRouter } from 'next/navigation'

const navLinks = [
    { href: '#benefits', label: 'Преимущества' },
    { href: '#use-cases', label: 'Для кого' },
    { href: '#how-it-works', label: 'Как это работает' },
    { href: '#faq', label: 'Вопросы' },
];

const leasingTypes = ['Авто', 'Оборудование', 'Недвижимость'];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLeasingTypes, setShowLeasingTypes] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        if (pathname !== '/') {
            router.push(`/${href}` as any);
        } else {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 80 is header height
                    behavior: 'smooth',
                });
            }
        }
    }, [pathname, router]);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-soft-sm' : 'bg-background'}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Logomark className="h-10 w-40" />
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li className="relative">
                                <button onClick={() => setShowLeasingTypes(!showLeasingTypes)} className="font-medium text-muted hover:text-text transition-colors flex items-center">
                                    Лизинг <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${showLeasingTypes ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {showLeasingTypes && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-white/10">
                                            <div className="py-1">
                                                {leasingTypes.map(type => (
                                                    <a key={type} href="#" className="block px-4 py-2 text-sm text-muted hover:bg-white/5 hover:text-text">
                                                        {type}
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} onClick={e => scrollTo(e, link.href)} className="font-medium text-muted hover:text-text transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="hidden md:block">
                        <a href="#lead-form" onClick={e => scrollTo(e, '#lead-form')} className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full text-white bg-accent hover:bg-accent/90 transition-colors">
                            Оставить заявку
                        </a>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-text hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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
                        <div className="rounded-lg bg-background shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
                            <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Logomark className="h-10 w-40" />
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-text hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        <div className="-m-3 p-3 flex items-center rounded-md">
                                            <span className="ml-3 text-base font-medium text-text">Лизинг: {leasingTypes.join(', ')}</span>
                                        </div>
                                        {navLinks.map(link => (
                                            <a key={link.href} href={link.href} onClick={(e) => {scrollTo(e, link.href); setIsOpen(false) }} className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                                                <span className="ml-3 text-base font-medium text-text">{link.label}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                             <div className="py-6 px-5 space-y-6">
                                <a href="#lead-form" onClick={(e) => {scrollTo(e, '#lead-form'); setIsOpen(false) }} className="block w-full px-5 py-3 text-center font-medium text-white bg-accent rounded-md hover:bg-accent/90">
                                    Оставить заявку
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header;