import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="На главную"
      className="relative block h-16 w-16"
    >
      <Image
        src="/logo.svg"
        alt="Лизинг"
        fill
        sizes="4rem"
        className="h-full w-full object-contain"
        priority
      />
    </Link>
  )
}