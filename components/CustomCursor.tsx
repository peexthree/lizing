'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', mMove)
      document.addEventListener('mouseenter', mEnter)
      document.addEventListener('mouseleave', mLeave)
      document.addEventListener('mousedown', mDown)
      document.addEventListener('mouseup', mUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mMove)
      document.removeEventListener('mouseenter', mEnter)
      document.removeEventListener('mouseleave', mLeave)
      document.removeEventListener('mousedown', mDown)
      document.removeEventListener('mouseup', mUp)
    }

    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const mEnter = () => {
      setHidden(false)
    }

    const mLeave = () => {
      setHidden(true)
    }

    const mDown = () => {
      setClicked(true)
    }

    const mUp = () => {
      setClicked(false)
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => removeEventListeners()
  }, [])

  const handleLinkHoverEvents = () => {
    document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
      el.addEventListener('mouseenter', () => setLinkHovered(true))
      el.addEventListener('mouseleave', () => setLinkHovered(false))
    })
  }

  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null
  }

  const cursorClasses = `
    fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-emerald-400 pointer-events-none z-[9999] transition-transform duration-150 ease-out mix-blend-difference
    ${hidden ? 'opacity-0' : 'opacity-100'}
  `

  const dotClasses = `
    fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out
    ${hidden ? 'opacity-0' : 'opacity-100'}
  `

  return (
    <>
      <motion.div
        className={cursorClasses}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className={dotClasses}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40 }}
      />
    </>
  )
}
