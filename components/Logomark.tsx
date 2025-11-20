import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface LogomarkProps {
  className?: string
}

const Logomark: FC<LogomarkProps> = ({ className }) => {
  return (
    <Link
      href="/"
      aria-label="На главную"
      className={`relative block ${className}`}
    >
      <Image
        src="/logos/logomark-light.png"
        alt="Лизинг и точка"
        fill
        className="object-contain"
      />
    </Link>
  )
}

export default Logomark
