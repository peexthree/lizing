// наверху файла
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { MarginType } from 'framer-motion' // 👈 добавить

// ...

const normalizedMargin = useMemo<MarginType | undefined>(() => {
  if (!margin) return undefined

  const toUnit = (v: string) => {
    const t = v.trim()
    if (/^-?\d+(px|%)$/.test(t)) return t
    const n = Number.parseInt(t, 10)
    return Number.isFinite(n) ? `${n}px` : '0px'
  }

  if (typeof margin === 'string') {
    const parts = margin.trim().split(/\s+/).filter(Boolean)
    while (parts.length < 4) parts.push('0px')
    return parts.slice(0, 4).map(toUnit).join(' ') as MarginType
  }

  const parts = [...margin]
  while (parts.length < 4) parts.push('0px')
  return parts.slice(0, 4).map(toUnit).join(' ') as MarginType
}, [margin])

const isInView = useInView(ref, {
  once,
  margin: normalizedMargin, // 👈 больше никаких шаблонных строк/union’ов
})
