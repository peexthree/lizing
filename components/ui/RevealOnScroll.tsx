'use client'

import { motion, useInView, useReducedMotion, type MotionProps, type Transition } from 'framer-motion'
import { useMemo, useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'

type MarginInput = string | readonly (string | number | null | undefined)[]
type RootMargin = string

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

const normalizeMargin = (margin?: MarginInput): RootMargin | undefined => {
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
    return parts.slice(0, 4).map(toUnit).join(' ') as RootMargin
  }

  const parts = Array.from(margin).slice(0, 4)
  while (parts.length < 4) parts.push('0px')

  return parts.map(toUnit).slice(0, 4).join(' ') as RootMargin
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