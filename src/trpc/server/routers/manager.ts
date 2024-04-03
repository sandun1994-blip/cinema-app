import { schemaCreateManager } from '@/forms/createManager'
import { createTRPCRouter, protectedProcedure } from '..'

export const managerRoutes = createTRPCRouter({
  dashboard: protectedProcedure('admin', 'manager').query(async ({ ctx }) => {
    const uid = ctx.userId

    const [cinemas, showtime, users] = await Promise.all([
      await ctx.db.cinema.count({ where: { Managers: { some: { id: uid } } } }),
      await ctx.db.showtime.count({
        where: { Screen: { Cinema: { Managers: { some: { id: uid } } } } },
      }),
      await ctx.db.user.count(),
    ])

    return { cinemas, showtime, users }
  }),

  create: protectedProcedure('admin')
    .input(schemaCreateManager)
    .mutation(({ ctx, input }) => {
     // console.log(input, 'input')

      return ctx.db.manager.create({ data: input })
    }),
  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.manager.findMany({ include: { User: true } })
  }),
  mangerMe:protectedProcedure('admin','manager').query(async({ctx})=>{
    return ctx.db.manager.findUnique({where:{id:ctx.userId}})
  })
})
