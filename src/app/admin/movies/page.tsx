import MovieInfo from '@/components/organisms/MovieInfo'
import { trpcServer } from '@/trpc/clients/server'
import React from 'react'

const page = async() => {


const movies =await trpcServer.movies.movies.query()


  return (
    <div className='grid grid-cols-3 gap-4'>{movies?.map((movie)=>(<MovieInfo movie={movie} key={movie.id}/>))}</div>
  )
}

export default page