import { schemaCreateAdmin } from '@/forms/createAdmin'
import { createTRPCRouter, protectedProcedure } from '..'
import { TRPCError } from '@trpc/server'

export const adminRouter = createTRPCRouter({
  dashboard: protectedProcedure('admin').query(async ({ ctx }) => {
    const [cinemas, movies, admins, managers, users] =
      await Promise.all([
        await ctx.db.cinema.count(),
        await ctx.db.movie.count(),
        await ctx.db.admin.count(),
        await ctx.db.manager.count(),
        await ctx.db.user.count(),
      ])


      return {cinemas, movies, admins, managers, users}
  }),

  findAll: protectedProcedure('admin').query(({ ctx }) => {
    return ctx.db.admin.findMany({ include: { User: true } })
  }),
  adminMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.admin.findUnique({ where: { id: ctx.userId } })
  }),
  create: protectedProcedure('admin')
    .input(schemaCreateAdmin)
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({ where: input })
      //console.log(78, admin, 'admin')
      if (admin) {
       // console.log(58, admin, 'admin')

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User is already Exist',
        })
      }

      return ctx.db.admin.create({ data: input })
    }),
})
