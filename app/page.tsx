'use client';
import HeroSection from '@/components/Hero'
import CalculatorModal from '@/components/CalculatorModal'
import Advantages from '@/components/Advantages'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import Partners from '@/components/Partners'
import Trust from '@/components/Trust'
import Calculator from '@/components/Calculator'

import FAQ, { faq } from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import StickyBar from '@/components/StickyBar'
import Stats from '@/components/Stats'

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': '#organization',
        name: 'Лизинг и точка',
        url: 'https://lizing-i-tochka.ru',
        logo: 'https://lizing-i-tochka.ru/logo.svg',
        email: [
          'dpalenov@lizing-i-tochka.ru',
          'erevakshin@lizing-i-tochka.ru'
        ],
        telephone: [
          '+7 (967) 77-28-299',
          '+7 (918) 37-98-548',
          '8 800 444-45-84'
        ],
      },
      ...['Лизинг автомобилей', 'Лизинг грузовой техники', 'Лизинг спецтехники'].map(
        (name) => ({
          '@type': 'Service',
          name,
          provider: { '@id': '#organization' },
          areaServed: { '@type': 'Country', name: 'Россия' }
        })
      ),
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((i) => ({
          '@type': 'Question',
          name: i.q,
          acceptedAnswer: { '@type': 'Answer', text: i.a }
        }))
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>

      <HeroSection />
   
 <CalculatorModal />
      <Stats />
      <Advantages />
      <HowItWorks />
      <Testimonials />
      <Partners />
      <Trust />
         <Calculator />


      <FAQ />
      <LeadForm />
      <StickyBar />
    </>
  )
}
