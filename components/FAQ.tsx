'use client'

import React, { useState } from 'react' 
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

const faqData = [
    {
        question: 'Какие виды транспорта и техники можно взять в лизинг?',
        answer: 'Вы можете приобрести в лизинг практически всё, что нужно для вашего бизнеса: легковые авто, грузовики, спецтехнику (тракторы, экскаваторы), а также промышленное оборудование и коммерческую недвижимость.'
    },
    {
        question: 'Кто может стать вашим клиентом?',
        answer: 'Мы работаем с юридическими лицами (ООО, АО) и индивидуальными предпринимателями (ИП), которые зарегистрированы и ведут бизнес в России не менее 6 месяцев.'
    },
    {
        question: 'Какой минимальный аванс?',
        answer: 'Обычно аванс составляет от 10% до 20%. Однако для компаний с хорошей финансовой историей или при наличии дополнительного залога мы можем предложить программы с авансом 0%.'
    },
    {
        question: 'На какой срок можно оформить договор лизинга?',
        answer: 'Договор лизинга заключается на срок от 1 года до 5 лет. Мы поможем вам выбрать оптимальный срок и график платежей, чтобы они соответствовали окупаемости техники.'
    },
    {
        question: 'Как быстро я смогу получить технику?',
        answer: 'Обычно от 3 до 7 рабочих дней. Этот срок начинается после того, как вы предоставите все необходимые документы, и ваша заявка будет одобрена. Он включает в себя подписание договора и передачу вам техники.'
    },
    {
        question: 'Можно ли досрочно выкупить предмет лизинга?',
        answer: 'Да, такая возможность есть. В большинстве договоров досрочный выкуп возможен уже через 6 или 12 месяцев. Все условия выкупа заранее прописываются в вашем договоре лизинга.'
    },
];

const AccordionItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; }> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/10 py-6">
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
                        <p className="text-base text-slate-300/90" style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>{answer}</p>
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
        <section id="faq" className="py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                     <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
                        FAQ
                    </span>
                    <h2 className="glass-title mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">Вопросы и ответы</h2>
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