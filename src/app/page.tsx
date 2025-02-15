import Navbar from '@/components/home/Navbar'
import { Footerdemo } from '@/components/home/Footer'
import React from 'react'
import PricingPage from '@/components/home/Pricing'
import { Testimonials } from '@/components/home/Testimonials'
function Page() {
  return (
    <>
      <Navbar/>
      <div className='block'>
        <PricingPage/>
        <Testimonials/>
        <Footerdemo/>
      </div>
    </>
  )
}

export default Page