import GetSummary from '@/actions/SummaryAction'
import { notFound } from 'next/navigation'
import React from 'react'

async function Summarize({searchparams}: {searchparams: {[key: string]: string | undefined}}) {

    if(!searchparams?.["id"]) {
        return notFound()
    }

    const summary:SummaryType | null = await GetSummary.getSummary(searchparams?.["id"])

    if(!summary) {
        return notFound()
    }

  return (
    <div>Summarize
        <p>{searchparams?.["id"]}</p>
    </div>
  )
}

export default Summarize