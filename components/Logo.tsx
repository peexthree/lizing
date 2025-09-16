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
  alt="Лизинг и точка"
  height={0}
  width={0}
  className="h-14 w-auto md:h-16"
/>
    </Link>
  )
}