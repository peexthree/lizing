import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="На главную"
      className="relative block h-20 w-20"
    >
      <span
        className="premium-gold-frame flex h-full w-full items-center justify-center rounded-full"
        style={{ '--premium-frame-padding': '0.6rem' } as CSSProperties}
      >
        <span className="premium-gold-frame__inner">
          <Image
            src="/logo.svg"
            alt="Лизинг и точка"
            fill
            sizes="80px"
            className="premium-gold-frame__image object-contain"
            priority
          />
        </span>
      </span>
    </Link>
  )
}