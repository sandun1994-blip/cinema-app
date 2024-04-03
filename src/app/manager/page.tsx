import { Title2 } from '@/components/atoms/typography'
import { CreateManager } from '@/components/organisms/CreateManager'
import StatCard from '@/components/organisms/StatCard'
import { UserCard } from '@/components/organisms/UserCard'

import { trpcServer } from '@/trpc/clients/server'

export default async function ManageAdmins() {
  const dashboard = await trpcServer.managers.dashboard.query()

  return (
    <main className="flex flex-col gap-3">
      <StatCard href={'/manager/cinemas'} title={'Cinemas'}>
        {dashboard.cinemas}
      </StatCard>

      <StatCard href={'/manager/showtimes'} title={'Showtimes'}>
        {dashboard.showtime}
      </StatCard>
    </main>
  )
}
