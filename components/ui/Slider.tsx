'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import clsx from 'clsx'

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

// Ваша функция для кастомной обработки скролла осталась без изменений,
// так как это очень полезная UX-доработка, которая предотвращает
// случайное изменение значения слайдера при прокрутке страницы.
const SCROLLABLE_OVERFLOW = /(auto|scroll)/i

function findScrollableContainer(element: HTMLElement): HTMLElement | null {
  if (typeof window === 'undefined') return null

  const ownerDocument = element.ownerDocument
  let current: HTMLElement | null = element.parentElement

  while (current && current !== ownerDocument.documentElement) {
    const style = window.getComputedStyle(current)
    const overflowY = style.overflowY || style.overflow
    const hasScrollableContent = current.scrollHeight > current.clientHeight

    if (hasScrollableContent && SCROLLABLE_OVERFLOW.test(overflowY)) {
      return current
    }

    current = current.parentElement
  }

  return (ownerDocument.scrollingElement as HTMLElement | null) ?? ownerDocument.documentElement
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(function Slider({ className, onWheel, ...props }, ref) {
  const handleWheel = React.useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (onWheel) {
        onWheel(event)
        if (event.defaultPrevented) {
          return
        }
      }

      if (event.ctrlKey || event.metaKey) return

      const target = event.currentTarget as HTMLElement | null
      if (!target) return

      const scrollContainer = findScrollableContainer(target)
      if (!scrollContainer) return

      const { deltaX, deltaY } = event
      if (deltaX === 0 && deltaY === 0) return

      event.preventDefault()
      scrollContainer.scrollBy({ left: deltaX, top: deltaY, behavior: 'auto' })
    },
    [onWheel]
  )

  return (
    <SliderPrimitive.Root
      ref={ref}
      onWheel={handleWheel}
      className={clsx(
        'relative flex w-full touch-none select-none items-center group', // Добавлен класс 'group' для управления дочерними элементами
        className
      )}
      {...props}
    >
      {/* Полоса слайдера (трек) */}
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        {/* Заполненная часть полосы */}
        <SliderPrimitive.Range className="absolute h-full bg-slate-900 dark:bg-slate-50" />
      </SliderPrimitive.Track>
      
      {/* Ползунок */}
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-slate-900 bg-white dark:border-slate-50 dark:bg-slate-950 shadow-md transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-slate-700 disabled:pointer-events-none disabled:opacity-50 group-hover:scale-110" />
    </SliderPrimitive.Root>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export default Slider