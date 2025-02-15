import Navbar from '@/components/home/Navbar'
import { Footerdemo } from '@/components/home/Footer'
import React from 'react'
import PricingPage from '@/components/home/Pricing'
function Page() {
  return (
    <>
      <Navbar/>
      <div className='block'>
        <PricingPage/>
        <Footerdemo/>
      </div>
    </>
  )
}

export default Page