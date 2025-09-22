'use client'

import { useEffect } from 'react'

import { applyScrollCssVariables, resetScrollCssVariables } from '@/lib/scroll'

const prefersReducedMotionQuery = '(prefers-reduced-motion: reduce)'

const ScrollEffects = () => {
  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia(prefersReducedMotionQuery)

    let frameId: number | null = null

    const updateVariables = () => {
      frameId = null
      applyScrollCssVariables(root, window.scrollY)
    }

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(updateVariables)
    }

    const enable = () => {
      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    const disable = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }

      window.removeEventListener('scroll', handleScroll)
      resetScrollCssVariables(root)
    }

    const handlePreferenceChange = () => {
      disable()

      if (!mediaQuery.matches) {
        enable()
      }
    }

    handlePreferenceChange()

    const mediaListener = () => handlePreferenceChange()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', mediaListener)
    } else {
      mediaQuery.addListener(mediaListener)
    }

    return () => {
      disable()

      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', mediaListener)
      } else {
        mediaQuery.removeListener(mediaListener)
      }
    }
  }, [])

  return null
}

export default ScrollEffects