import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" aria-label="На главную">
      <Image src="/logo.svg" alt="Лизинг" width={256} height={256} className="h-8 w-auto" />
    </Link>
  )
}