import Script from 'next/script'

import FAQ from '@/components/FAQ'
import HeroSection from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import LeadForm from '@/components/LeadForm'
import Benefits from '@/components/Benefits'
import UseCases from '@/components/UseCases'
import Calculator from '@/components/Calculator'
import Reviews from '@/components/Reviews'
import SectionSeparator from '@/components/SectionSeparator'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': '#organization',
      name: 'Лизинг и точка',
      url: 'https://lizing-i-tochka.ru',
      logo: 'https://lizing-i-tochka.ru/logo.svg',
      email: ['dpalenov@lizing-i-tochka.ru', 'erevakshin@lizing-i-tochka.ru'],
      telephone: ['+7 967 772 8299'],
    },
    ...[
      'Лизинг автомобилей',
      'Лизинг грузовой техники',
      'Лизинг спецтехники',
      'Лизинг недвижимости',
      'Лизинг оборудования',
    ].map(
      name => ({
        '@type': 'Service',
        name,
        provider: { '@id': '#organization' },
        areaServed: { '@type': 'Country', name: 'Россия' },
      }),
    ),
  ],
} as const

const Page = () => {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        <HeroSection />
        <SectionSeparator />
        <Calculator />
        <Benefits />
        <UseCases />
        <Reviews />
        <HowItWorks />
        <FAQ />
        <LeadForm />
      </main>
    </>
  )
}

export default Page