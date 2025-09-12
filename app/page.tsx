import Hero from '@/components/Hero'
import Advantages from '@/components/Advantages'
import HowItWorks from '@/components/HowItWorks'
import CaseStudies from '@/components/CaseStudies'
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
        <CaseStudies />
        <LeadForm />
        <Contacts />
        <Footer />
      </main>
      <StickyBar />
    </>
  )
}