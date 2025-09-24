'use client';

import clsx from 'clsx';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useCallback, useMemo, useRef } from 'react';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type MarginArray = readonly string[];

type BaseProps = {
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  /** Может быть строкой вида "-15% 0px -15% 0px" или массивом из 4 значений */
  margin?: string | MarginArray;
};

type RevealOnScrollProps<T extends ElementType> = BaseProps &
  Omit<ComponentPropsWithoutRef<T>, 'ref'> & {
    as?: T;
  };

/** Приводит margin к 4 значениям с единицами px/% */
function normalizeMargin(input?: string | MarginArray): string | undefined {
  if (!input) return undefined;

  const toUnit = (v: string): string => {
    const trimmed = v.trim();
    if (/^-?\d+(px|%)$/.test(trimmed)) return trimmed;
    const n = Number.parseInt(trimmed, 10);
    return Number.isFinite(n) ? `${n}px` : '0px';
  };

  if (typeof input === 'string') {
    const parts = input.trim().split(/\s+/).filter(Boolean);
    while (parts.length < 4) parts.push('0px');
    return parts.slice(0, 4).map(toUnit).join(' ');
  }

  const parts = [...input];
  while (parts.length < 4) parts.push('0px');
  return parts.slice(0, 4).map(toUnit).join(' ');
}

const RevealOnScroll = <T extends ElementType = 'div'>({
  as,
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 24,
  once = true,
  margin = ['-15%', '0px', '-15%', '0px'] as const,
  ...rest
}: RevealOnScrollProps<T>) => {
  const Component = as ?? 'div';
  const MotionComponent = useMemo(() => motion(Component), [Component]);
  const ref = useRef<Element | null>(null);

  const setRef = useCallback((node: Element | null) => {
    ref.current = node;
  }, []);

  const normalizedMargin = useMemo(() => normalizeMargin(margin), [margin]);

  const isInView = useInView(ref, {
    once,
    // framer-motion ожидает шаблонную строку из 4 значений: "top right bottom left"
    margin: normalizedMargin as `${string} ${string} ${string} ${string}` | undefined,
  });

  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y };
  const animate = shouldReduceMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y };

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
  );
};

export default RevealOnScroll;