'use client'

import { motion, useReducedMotion, type MotionProps, type Transition } from 'framer-motion'
import { useMemo, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'

// Упрощено: Framer Motion ожидает строку CSS margin (RootMargin)
type MarginInput = string

type PolymorphicProps<T extends ElementType> = MotionProps &
  Omit<ComponentPropsWithoutRef<T>, keyof MotionProps | 'ref'> & {
    children?: ReactNode
  }

type RevealOnScrollProps<T extends ElementType = 'div'> = PolymorphicProps<T> & {
  as?: T
  once?: boolean
  delay?: number
  duration?: number
  // Используем простой string, чтобы избежать Type Error
  margin?: MarginInput 
}

const DEFAULT_INITIAL = { opacity: 0, y: 32 }
const DEFAULT_ANIMATE = { opacity: 1, y: 0 }

// ИСПРАВЛЕНО: Убран тип Transition['ease'], использован 'as const'
const DEFAULT_EASE = [0.22, 1, 0.36, 1] as const

// УДАЛЕНА: Функция normalizeMargin удалена, так как Framer Motion ожидает
// строку CSS margin (RootMargin) и она не нужна для нормализации.
// Если margin передается как string, он уже готов.

const createTransition = (
  options: { delay?: number; duration?: number; reduceMotion: boolean },
  override?: Transition
): Transition => {
  const { delay = 0, duration = 0.6, reduceMotion } = options
  const baseDelay = reduceMotion ? 0 : delay

  const baseTransition = {
    duration,
    ease: DEFAULT_EASE,
    delay: baseDelay
  }

  if (!override) {
    return baseTransition
  }

  return {
    ...baseTransition,
    ...override,
    // Принудительно устанавливаем задержку на 0, если reduceMotion включен
    delay: reduceMotion ? 0 : override.delay ?? delay
  }
}

const RevealOnScroll = <T extends ElementType = 'div'>(
  props: RevealOnScrollProps<T>
) => {
  const {
    as,
    once = true,
    delay,
    duration,
    margin, // Это уже string | undefined
    children,
    ...motionProps
  } = props

  const { initial, whileInView, transition, viewport, ...rest } = motionProps

  const reduceMotion = useReducedMotion()
  const Component = (as ?? 'div') as ElementType
  const MotionComponent = useMemo(() => motion(Component), [Component])

  // normalizedMargin теперь просто margin
  const resolvedViewport = useMemo(
    () => ({
      ...(viewport ?? {}),
      once: viewport?.once ?? once,
      // Используем prop margin напрямую, Framer Motion обработает его
      margin: viewport?.margin ?? margin 
    }),
    [margin, once, viewport]
  )

  const resolvedInitial = initial ?? (reduceMotion ? undefined : DEFAULT_INITIAL)
  const resolvedWhileInView =
    whileInView ?? (reduceMotion ? undefined : DEFAULT_ANIMATE)
  const resolvedTransition = useMemo(
    () =>
      reduceMotion
        ? transition
        : createTransition({ delay, duration, reduceMotion }, transition),
    [delay, duration, reduceMotion, transition]
  )

  return (
    <MotionComponent
      {...rest}
      initial={resolvedInitial}
      whileInView={resolvedWhileInView}
      transition={resolvedTransition}
      viewport={resolvedViewport}
    >
      {children}
    </MotionComponent>
  )
}

export default RevealOnScroll