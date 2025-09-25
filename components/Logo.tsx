import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="На главную"
      className="relative block h-20 w-20"
    >
      <Image
        src="/logo.svg"
        alt="Лизинг и точка"
        height={0}
        width={0}
        className="h-16 w-auto md:h-20 lg:h-24"
      />
    </Link>
  )
}