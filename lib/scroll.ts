export const scrollCssVariables = {
  scrollY: '--scroll-y',
  parallax: '--scroll-parallax',
  soft: '--scroll-soft',
  overlay: '--scroll-overlay',
} as const

const zeroScrollValues = {
  [scrollCssVariables.scrollY]: '0px',
  [scrollCssVariables.parallax]: '0px',
  [scrollCssVariables.soft]: '0px',
  [scrollCssVariables.overlay]: '0px',
} as const

const toPx = (value: number) => `${value}px`

export const applyScrollCssVariables = (root: HTMLElement, scroll: number) => {
  const parallax = scroll * 0.35
  const soft = scroll * 0.18
  const overlay = scroll * -0.12

  const values = {
    [scrollCssVariables.scrollY]: toPx(scroll),
    [scrollCssVariables.parallax]: toPx(parallax),
    [scrollCssVariables.soft]: toPx(soft),
    [scrollCssVariables.overlay]: toPx(overlay),
  }

  Object.entries(values).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}

export const resetScrollCssVariables = (root: HTMLElement) => {
  Object.entries(zeroScrollValues).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}