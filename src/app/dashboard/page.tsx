import DashNav from '@/components/dashboard/DashNav'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import getUserCoin from '@/actions/fetchActions'
import URLInput from '@/components/dashboard/URLInput'
import { OldSummaries } from '@/actions/OldSummaries'
import OldSummaryCard from '@/components/dashboard/OldSummary'

async function page() {

    const session:CustomSession | null = await getServerSession(authOptions);
    const coins = await getUserCoin.getUserCoin(session?.user?.id!);

    const oldsummaires = await OldSummaries.oldSummaries(session?.user?.id!);

  return (
    <div className='container'>
        <DashNav user={session?.user!} userCoins={coins}/>
        <URLInput user={session?.user!}/>
        <div className='mt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {oldsummaires && oldsummaires.length > 0 && oldsummaires.map((item, index) => (
              <OldSummaryCard summary={item} key={index}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default page