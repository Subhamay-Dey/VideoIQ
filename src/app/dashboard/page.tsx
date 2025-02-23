import DashNav from '@/components/dashboard/DashNav'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import getUserCoin from '@/actions/fetchActions'
import URLInput from '@/components/dashboard/URLInput'
import { Input } from 'postcss'

async function page() {

    const session:CustomSession | null = await getServerSession(authOptions)
    const coins = await getUserCoin.getUserCoin(session?.user?.id!)

  return (
    <div className='container'>
        <DashNav user={session?.user!} userCoins={coins}/>
        <URLInput user={session?.user!}/>
    </div>
  )
}

export default page