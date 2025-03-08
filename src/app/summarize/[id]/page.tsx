import getUserCoin from '@/actions/fetchActions'
import GetSummary from '@/actions/SummaryAction'
import { authOptions, CustomSession } from '@/app/api/auth/[...nextauth]/options'
import DashNav from '@/components/dashboard/DashNav'
import SummaryBase from '@/components/summary/SummaryMain'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

interface SummaryPageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

async function Summarize({params}: SummaryPageProps) {

    if(!params?.id) {
        return notFound()
    }

    const summary:SummaryType | null = await GetSummary.getSummary(params.id)

    if(!summary) {
        return notFound()
    }

    const session:CustomSession | null = await getServerSession(authOptions)
    const userCoins = await getUserCoin.getUserCoin(session?.user?.id!)

  return (
    <div className='container'>
      <DashNav user={session?.user!} userCoins={userCoins}/>
      <SummaryBase summary={summary}/>
    </div>
  )
}

export default Summarize