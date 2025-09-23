'use client'

import clsx from 'clsx'
import {
  motion,
  useInView,
  useReducedMotion,
  type MarginType, // 👈 Import MarginType
} from 'framer-motion'
import { useCallback, useMemo, useRef } from 'react'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

type BaseProps = {
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  margin?: MarginType // 👈 Use the imported type here
}

type RevealOnScrollProps<T extends ElementType> = BaseProps &
  Omit<ComponentPropsWithoutRef<T>, 'ref'> & {
    as?: T
  }

const RevealOnScroll = <T extends ElementType = 'div'>(
  props: RevealOnScrollProps<T>
) => {
  const {
    as,
    children,
    className,
    delay = 0,
    duration = 0.8,
    y = 24,
    once = true,
    margin = '-15% 0px',
    ...rest
  } = props

  const Component = as ?? 'div'
  const MotionComponent = useMemo(() => motion(Component), [Component])
  const ref = useRef<Element | null>(null)
  const setRef = useCallback((node: Element | null) => {
    ref.current = node
  }, [])
  const isInView = useInView(ref, { once, margin })
  const shouldReduceMotion = useReducedMotion()

  const initial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y }
  const animate = shouldReduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }

  return (
    <MotionComponent
      ref={setRef}
      className={clsx('will-change-transform', className)}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      {children}
    </MotionComponent>
  )
}

export default RevealOnScroll