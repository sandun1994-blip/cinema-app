import { ListCinemas } from '@/components/templates/ListCinemas'
import { trpcServer } from '@/trpc/clients/server'
import React from 'react'

const page = async () => {
  const cinemas = await trpcServer.cinemas.cinemas.query()

  return (
    <div> 
      <ListCinemas cinemas={cinemas}/>
    </div>
  )
}

export default page
