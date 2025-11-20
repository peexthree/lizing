'use client'

import React, { useState } from 'react' 
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

const faqData = [
    {
        question: 'Какие виды транспорта и техники можно взять в лизинг?',
        answer: 'Мы работаем с легковыми автомобилями, грузовым транспортом, спецтехникой, оборудованием и даже недвижимостью. Практически любой актив для вашего бизнеса можно приобрести в лизинг.'
    },
    {
        question: 'Кто может стать вашим клиентом?',
        answer: 'Наши клиенты – это юридические лица (ООО, АО) и индивидуальные предприниматели (ИП), зарегистрированные и ведущие деятельность на территории РФ не менее 6 месяцев.'
    },
    {
        question: 'Какой минимальный аванс?',
        answer: 'Стандартный аванс начинается от 10-20%, но у нас есть программы с авансом от 0% для финансово устойчивых компаний или при предоставлении дополнительного обеспечения.'
    },
    {
        question: 'На какой срок можно оформить договор лизинга?',
        answer: 'Срок лизинга обычно составляет от 1 до 5 лет. Мы можем подобрать индивидуальный график, который будет соответствовать сроку окупаемости вашей техники.'
    },
    {
        question: 'Как быстро я смогу получить технику?',
        answer: 'После предоставления полного комплекта документов и одобрения заявки, процесс подписания договора и выдачи техники обычно занимает от 3 до 7 рабочих дней.'
    },
    {
        question: 'Можно ли досрочно выкупить предмет лизинга?',
        answer: 'Да, большинство наших договоров предусматривают возможность досрочного выкупа по истечении 6 или 12 месяцев. Условия выкупа фиксируются в договоре.'
    },
];

const AccordionItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; }> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200 py-6">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left">
                <h3 className="text-lg font-medium text-text">{question}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-accent transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="text-base text-muted">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <section id="faq" className="py-16 sm:py-24 bg-background">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">Вопросы и ответы</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
                        Здесь мы собрали ответы на самые популярные вопросы, которые помогут вам принять верное решение.
                    </p>
                </div>
                <div className="mt-12">
                    {faqData.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
                 <div className="mt-12 text-center">
                    <p className="text-lg text-muted">Не нашли ответа на свой вопрос?</p>
                    <a href="#lead-form" className="mt-4 inline-block font-semibold text-accent hover:text-accent/90 transition-colors">Свяжитесь с нами</a>
                </div>
            </div>
        </section>
    )
}

export default FAQ;
