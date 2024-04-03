import StatCard from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'
import React from 'react'

const page = async () => {
  const dashboard = await trpcServer.admins.dashboard.query()

  return (
    <div className='flex flex-col gap-3'>
      {Object.entries(dashboard).map(([key, value]) => (
        <StatCard key={key} title={key}>
          {value}
        </StatCard>
      ))}
    </div>
  )
}

export default page
