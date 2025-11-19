import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href="/"
      aria-label="На главную"
      className={`relative block h-20 w-auto ${className}`}
    >
      <Image
        src="/logo.svg"
        alt="Лизинг и точка"
        fill
        className="object-contain"
      />
    </Link>
  )
}

export default Logo
