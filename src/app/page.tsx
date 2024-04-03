import { SearchCinemas } from '@/components/templates/SearchCinemas'
import { trpcClient } from '@/trpc/clients/client'
import { trpcServer } from '@/trpc/clients/server'
import { prisma } from '@/db/prisma'
export default async function Home() {
 // const data: any = await trpcServer.movies.movies.query()


// try {
//   await prisma.user.create({data:{
//     id:'222',name:'sandun',
//     image:''
//   }})
// } catch (error) {
//   console.log(error);
// }




  return (
    <main  >
     <SearchCinemas/>
    </main>
  )
}
