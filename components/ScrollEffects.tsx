'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

import { applyScrollCssVariables, resetScrollCssVariables } from '@/lib/scroll'

type LenisScrollEvent = {
  scroll: number
}

const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)'

const ScrollEffects = () => {
  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia(prefersReducedMotionQuery)

    let lenis: Lenis | null = null
    let animationFrameId: number | null = null

    const handleLenisScroll = ({ scroll }: LenisScrollEvent) => {
      applyScrollCssVariables(root, scroll)
    }

    const destroyLenis = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }

      if (lenis) {
        lenis.off('scroll', handleLenisScroll as (event: unknown) => void)
        lenis.destroy()
        lenis = null
      }
    }

    const enableLenis = () => {
      destroyLenis()

      try {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          syncTouch: true,
        })
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Failed to initialize Lenis', error)
        }
        lenis = null
        return
      }

      lenis.on('scroll', handleLenisScroll as (event: unknown) => void)

      applyScrollCssVariables(root, lenis.scroll ?? window.scrollY)

      const raf = (time: number) => {
        lenis?.raf(time)
        animationFrameId = requestAnimationFrame(raf)
      }

      animationFrameId = requestAnimationFrame(raf)
    }

    const handleScrollFallback = () => {
      if (!lenis) {
        applyScrollCssVariables(root, window.scrollY)
      }
    }

    const handleMotionPreference = () => {
      if (mediaQuery.matches) {
        destroyLenis()
        resetScrollCssVariables(root)
      } else {
        enableLenis()
        if (!lenis) {
          applyScrollCssVariables(root, window.scrollY)
        }
      }
    }

    handleMotionPreference()
    if (!lenis) {
      handleScrollFallback()
    }

    window.addEventListener('scroll', handleScrollFallback, { passive: true })

    const handleMediaQueryChange = () => {
      handleMotionPreference()
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaQueryChange)
    } else {
      mediaQuery.addListener(handleMediaQueryChange)
    }

    return () => {
      destroyLenis()
      window.removeEventListener('scroll', handleScrollFallback)

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
      } else {
        mediaQuery.removeListener(handleMediaQueryChange)
      }
    }
  }, [])

  return null
}

export default ScrollEffects