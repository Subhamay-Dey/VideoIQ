import Navbar from '@/components/home/Navbar'
import { Footerdemo } from '@/components/home/Footer'
import React from 'react'

function Page() {
  return (
    <>
      <Navbar/>
      <div className='block'>
        <Footerdemo/>
      </div>
    </>
  )
}

export default Page