import DashNav from '@/components/dashboard/DashNav'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'

async function page() {

    const session:CustomSession | null = await getServerSession(authOptions)

  return (
    <div className='container'>
        <DashNav user={session?.user!} userCoins={null}/>
    </div>
  )
}

export default page