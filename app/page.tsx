import HeroSection from '@/components/Hero'
import Advantages from '@/components/Advantages'
import HowItWorks from '@/components/HowItWorks'
import Calculator from '@/components/Calculator'
import CaseStudies from '@/components/CaseStudies'
import FAQ, { faq } from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'

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
@@ -32,26 +33,40 @@ export default function Page() {
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
      />
      <main>
        <HeroSection />
        <Advantages />
        <HowItWorks />
        <Calculator />
        <CaseStudies />
        <FAQ />
        <LeadForm />
        <Contacts />
        <Footer />
      </main>
      <StickyBar />
    </>
  )
}