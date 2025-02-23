import GetSummary from '@/actions/SummaryAction'
import { notFound } from 'next/navigation'
import React from 'react'

async function Summarize({params}: {params: {id: string}}) {

    if(!params) {
        return notFound()
    }

    const summary:SummaryType | null = await GetSummary.getSummary(params.id)

    if(!summary) {
        return notFound()
    }

  return (
    <div>Summarize
        <p>{params.id}</p>
    </div>
  )
}

export default Summarize