'use client'

import { useEffect } from 'react'

const ScrollEffects = () => {
  useEffect(() => {
    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) {
      root.style.setProperty('--scroll-y', '0px')
      root.style.setProperty('--scroll-parallax', '0px')
      root.style.setProperty('--scroll-soft', '0px')
      root.style.setProperty('--scroll-overlay', '0px')
      return
    }

    const setScrollVariables = (scrollY: number) => {
      const parallax = scrollY * 0.35
      const soft = scrollY * 0.18
      const overlay = scrollY * -0.12

      root.style.setProperty('--scroll-y', `${scrollY}px`)
      root.style.setProperty('--scroll-parallax', `${parallax}px`)
      root.style.setProperty('--scroll-soft', `${soft}px`)
      root.style.setProperty('--scroll-overlay', `${overlay}px`)
    }

    let rafId: number | null = null

    const updateScrollVariables = () => {
      rafId = null
      setScrollVariables(window.scrollY)
    }

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScrollVariables)
      }
    }

    setScrollVariables(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

export default ScrollEffects