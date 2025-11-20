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
      className={`relative block ${className}`}
    >
      <Image
        src="/logos/logotype-dark.png"
        alt="Лизинг и точка"
        fill
        className="object-contain dark:hidden"
      />
      <Image
        src="/logos/logotype-light.png"
        alt="Лизинг и точка"
        fill
        className="object-contain hidden dark:block"
      />
    </Link>
  )
}

export default Logo
