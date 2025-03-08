import Navbar from '@/components/home/Navbar'
import { Footerdemo } from '@/components/home/Footer'
import React from 'react'
import PricingPage from '@/components/home/Pricing'
import { Testimonials } from '@/components/home/Testimonials'
import { Hero } from '@/components/home/Hero'
import { authOptions, CustomSession } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

async function Page() {

  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <>
    {/* <p>{JSON.stringify(session)}</p> */}
    <div className='container'>
      <Navbar user={session?.user}/>
      <Hero/>
      <div className='block'>
        <PricingPage/>
      </div>
        <Testimonials/>
        <Footerdemo/>
    </div>
    </>
  )
}

export default Page