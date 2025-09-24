'use client'

import { motion, useInView, useReducedMotion, type MarginType, type MotionProps, type Transition } from 'framer-motion'
import { useMemo, useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'

type MarginInput = string | readonly (string | number | null | undefined)[]

type PolymorphicProps<T extends ElementType> = MotionProps &
  Omit<ComponentPropsWithoutRef<T>, keyof MotionProps | 'ref'> & {
    children?: ReactNode
  }

type RevealOnScrollProps<T extends ElementType = 'div'> = PolymorphicProps<T> & {
  as?: T
  once?: boolean
  delay?: number
  duration?: number
  margin?: MarginInput
}

const DEFAULT_INITIAL = { opacity: 0, y: 32 }
const DEFAULT_ANIMATE = { opacity: 1, y: 0 }
const DEFAULT_EASE: Transition['ease'] = [0.22, 1, 0.36, 1]

const normalizeMargin = (margin?: MarginInput): MarginType | undefined => {
  if (!margin) return undefined

  const toUnit = (value: string | number | null | undefined) => {
    if (value == null) return '0px'
    if (typeof value === 'number') return `${value}px`

    const trimmed = value.trim()
    if (/^-?\d+(px|%)$/.test(trimmed)) return trimmed

    const numeric = Number.parseFloat(trimmed)
    return Number.isFinite(numeric) ? `${numeric}px` : '0px'
  }

  if (typeof margin === 'string') {
    const parts = margin
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    while (parts.length < 4) parts.push('0px')
    return parts.slice(0, 4).map(toUnit).join(' ') as MarginType
  }

  const parts = Array.from(margin).slice(0, 4)
  while (parts.length < 4) parts.push('0px')

  return parts.map(toUnit).slice(0, 4).join(' ') as MarginType
}

const createTransition = (
  options: { delay?: number; duration?: number; reduceMotion: boolean },
  override?: Transition
): Transition => {
  const { delay = 0, duration = 0.6, reduceMotion } = options
  const baseDelay = reduceMotion ? 0 : delay

  if (!override) {
    return {
      duration,
      ease: DEFAULT_EASE,
      delay: baseDelay
    }
  }

  return {
    duration,
    ease: DEFAULT_EASE,
    delay: baseDelay,
    ...override,
    delay: reduceMotion ? 0 : override.delay ?? delay
  }
}

const RevealOnScroll = <T extends ElementType = 'div'>(props: RevealOnScrollProps<T>) => {
  const {
    as,
    once = true,
    delay,
    duration,
    margin,
    initial: initialProp,
    animate: animateProp,
    transition: transitionProp,
    children,
    ...rest
  } = props

  const shouldReduceMotion = useReducedMotion()
  const Component = (as ?? 'div') as ElementType
  const MotionComponent = useMemo(() => motion(Component), [Component])

  const elementRef = useRef<HTMLElement | null>(null)
  const normalizedMargin = useMemo(() => normalizeMargin(margin), [margin])
  const isInView = useInView(elementRef, {
    once,
    margin: normalizedMargin
  })

  const initial = useMemo(() => {
    if (initialProp) return initialProp
    if (shouldReduceMotion) return { ...DEFAULT_ANIMATE }
    return { ...DEFAULT_INITIAL }
  }, [initialProp, shouldReduceMotion])

  const animate = useMemo(() => {
    if (animateProp) return animateProp
    return { ...DEFAULT_ANIMATE }
  }, [animateProp])

  const transition = useMemo(
    () => createTransition({ delay, duration, reduceMotion: shouldReduceMotion }, transitionProp),
    [delay, duration, shouldReduceMotion, transitionProp]
  )

  return (
    <MotionComponent
      ref={elementRef}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={transition}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}

export default RevealOnScroll

