import Script from 'next/script'

import FAQ, { faq } from '@/components/FAQ'
import HeroSection from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import LeadForm from '@/components/LeadForm'
import ManagerIntro from '@/components/ManagerIntro'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import Trust from '@/components/Trust'
import CalculatorModal from '@/components/calculator/CalculatorModal'

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
    {
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
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
        <CalculatorModal />
        <Stats />
        <ManagerIntro />
        <HowItWorks />
        <Testimonials />
        <Trust />
        <FAQ />
      </main>
      <LeadForm />
    </>
  )
}

export default Page