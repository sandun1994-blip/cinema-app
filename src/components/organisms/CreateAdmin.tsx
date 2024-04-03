'use client'
import { useFormCreateManager } from '@/forms/createManager'
import { Input } from '../atoms/input'
import { Label } from '../atoms/label'

import { Title2 } from '../atoms/typography'
import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'
import { trpcClient } from '@/trpc/clients/client'
import { revalidatePath } from '@/util/actions/revalidatePath'
import { useToast } from '../molecules/Toaster/use-toast'
import { Button } from '../atoms/button'

export interface ICreateAdminProps extends BaseComponent {}

export const CreateAdmin = ({ className }: ICreateAdminProps) => {
  const { register, handleSubmit, reset } = useFormCreateManager()
  const { mutateAsync,isLoading,error } = trpcClient.admins.create.useMutation()
  const { toast } = useToast()





  return (
    <div
      className={cn(
        'w-full p-4 bg-white rounded shadow-lg max-w-96',
        className,
      )}
    >
      <Title2>Create new admin</Title2>
      <form
        onSubmit={handleSubmit(async ({ id }) => {
         try {
          const admins = await mutateAsync({ id })
          if (admins) {
            revalidatePath('/admin/adminss')
            reset()
            toast({ title: 'Admin created.' })
          } else {
            toast({ title: 'Action failed.' })
          }
         } catch (er) {
         // console.log(error?.message);
          toast({ title: error?.message })
          
         }
        })}
        className="space-y-2"
      >
        <Label title="UID">
          <Input placeholder="Enter the uid" {...register('id')} />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
