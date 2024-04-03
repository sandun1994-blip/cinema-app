'use client'

import { useFormCreateManager } from '@/forms/createManager'
import { trpcClient } from '@/trpc/clients/client'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { useToast } from '../molecules/Toaster/use-toast'
import { revalidatePath } from '@/util/actions/revalidatePath'

const CreateManager = () => {
  const { register, handleSubmit, reset } = useFormCreateManager()

  const { toast } = useToast()

  const { mutateAsync: createManager, isLoading } =
    trpcClient.managers.create.useMutation()

 // console.log(isLoading, 'is loading')

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const manager = await createManager(data)

          if (manager) {
            reset()
            toast({ title: 'Manager created.' })
            revalidatePath('admin/managers')
          }
        } catch (error) {
         // console.log(error)

          toast({ title: 'Action faiild.' })
        }
      })}
    >
      <Label title="UID">
        <Input placeholder="Enter the uid" {...register('id')} />
      </Label>

      <Button loading={isLoading} type="submit">
        Submit
      </Button>
    </form>
  )
}

export default CreateManager
