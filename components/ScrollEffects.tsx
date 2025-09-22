// components/SmoothScroller.tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

const SmoothScroller = () => {
  // Используем useRef чтобы сохранить инстанс Lenis между рендерами
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Инициализация Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // формула для плавности
      smoothTouch: true, // Плавный скролл на мобильных устройствах
    })
    
    lenisRef.current = lenis

    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    // --- Ваша логика для parallax-эффектов, адаптированная под Lenis ---
    const setScrollVariables = (scroll: number) => {
      // Отключаем эффекты, если пользователь предпочитает меньше движений
      if (prefersReducedMotion.matches) {
        root.style.setProperty('--scroll-y', '0px')
        root.style.setProperty('--scroll-parallax', '0px')
        root.style.setProperty('--scroll-soft', '0px')
        root.style.setProperty('--scroll-overlay', '0px')
        return
      }
      
      // Расчет переменных, как и в вашем коде
      const parallax = scroll * 0.35
      const soft = scroll * 0.18
      const overlay = scroll * -0.12

      root.style.setProperty('--scroll-y', `${scroll}px`)
      root.style.setProperty('--scroll-parallax', `${parallax}px`)
      root.style.setProperty('--scroll-soft', `${soft}px`)
      root.style.setProperty('--scroll-overlay', `${overlay}px`)
    }

    // Слушаем событие 'scroll' от Lenis, а не от window.
    // Это обеспечивает идеальную синхронизацию.
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      setScrollVariables(scroll)
    })
    
    // --- Анимационный цикл, необходимый для работы Lenis ---
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    
    // Очистка при размонтировании компонента
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return null // Компонент ничего не рендерит, только добавляет эффекты
}

export default SmoothScroller