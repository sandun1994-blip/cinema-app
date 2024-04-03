import { trpcServer } from '@/trpc/clients/server'
import { Title2 } from '../atoms/typography'
import { UserCard } from '../organisms/UserCard'

const ListAdmin = async () => {
  const managers = await trpcServer.admins.findAll .query()

  return (
    <div className="mt-6">
      <Title2>Managers</Title2>
      <div className="grid md:grid-cols-3 gap-3">
        {managers?.map(({ User: { id, image, name } }) => (
          <UserCard key={id} user={{ id, name, image }} />
        ))}
      </div>
    </div>
  )
}

export default ListAdmin
