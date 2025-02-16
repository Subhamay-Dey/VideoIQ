import Navbar from '@/components/home/Navbar'
import { Footerdemo } from '@/components/home/Footer'
import React from 'react'
import PricingPage from '@/components/home/Pricing'
import { Testimonials } from '@/components/home/Testimonials'
import { Hero } from '@/components/home/Hero'

function Page() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <div className='block'>
        <PricingPage/>
      </div>
        <Testimonials/>
        <Footerdemo/>
    </>
  )
}

export default Page