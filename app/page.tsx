import Hero from '@/components/Hero'
import Advantages from '@/components/Advantages'
import HowItWorks from '@/components/HowItWorks'
import Calculator from '@/components/Calculator'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'
import Partners from '@/components/Partners'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import Contacts from '@/components/Contacts'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Advantages />
        <HowItWorks />
        <Calculator />
        <CaseStudies />
        <Testimonials />
        <Partners />
        <FAQ />
        <LeadForm />
        <Contacts />
        <Footer />
      </main>
      <StickyBar />
    </>
  )
}