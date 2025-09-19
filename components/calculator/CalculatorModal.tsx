// src/components/calculator/CalculatorModal.tsx

'use client';

import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { GaugeCircle, X } from 'lucide-react';
import Calculator from './Calculator';

// Это тот самый компонент, который вы предоставили. Он уже готов.
// Он импортирует <Calculator /> и передает ему variant="modal"
export default function CalculatorModal() {
  const [isOpen, setIsOpen] = useState(false);

  // ... вся ваша логика открытия/закрытия из вашего файла
  // useCallback, useEffects... все они остаются здесь.
  
  // ...
  // ...

  return (
    <>
      <section className="py-24 text-center">
        {/* ... ваша верстка для секции с кнопкой "Открыть калькулятор" ... */}
        <button
          type="button"
          onClick={() => setIsOpen(true)} // Пример упрощенного открытия
          className="..."
        >
          <GaugeCircle className="h-5 w-5" />
          Открыть калькулятор
        </button>
      </section>

      {/* Оверлей и модальное окно */}
      <div
        className={`fixed inset-0 z-[80] ... ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        role="dialog"
        aria-modal="true"
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <div className={`relative ... ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 ..."
            aria-label="Закрыть калькулятор"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex h-full flex-col px-3 pb-6 pt-14 sm:px-8 sm:pt-16">
            {/* ВОТ КЛЮЧЕВОЙ МОМЕНТ! */}
            <Calculator variant="modal" />
          </div>

        </div>
      </div>
    </>
  );
}