'use client'

import Image from 'next/image'
import { useEffect, useState, type CSSProperties } from 'react'

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isOpaque, setIsOpaque] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (reduceMotion.matches) {
      setIsVisible(false)
      return
    }

    const fadeTimer = window.setTimeout(() => setIsOpaque(false), 1200)
    const removeTimer = window.setTimeout(() => setIsVisible(false), 1800)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-ink transition-opacity duration-600 ease-out animate-splash-fade ${isOpaque ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
    >
      <div className="pointer-events-none relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fef6d7] to-[#f5dd85] mix-blend-screen opacity-0 animate-splash-flash" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent" />
        <div
          className="premium-gold-frame relative z-10 flex w-[min(84vw,720px)] max-w-none items-center justify-center rounded-full"
          style={{ '--premium-frame-padding': '1.5rem' } as CSSProperties}
        >
          <div className="premium-gold-frame__inner">
            <Image
              priority
              alt="Лизинг и точка"
              className="premium-gold-frame__image h-full w-full animate-splash-logo drop-shadow-[0_40px_120px_rgba(234,179,8,0.45)] object-contain"
              height={720}
              src="/logo_big.webp"
              width={720}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen