import { schemaCreateCinema } from '@/forms/createCinema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { findManyCinemaArgsSchema } from './dtos/cinemas.input'
import { z } from 'zod'
import { locationFilter } from './dtos/common'

export const cinemasRouter = createTRPCRouter({

  searchCinemas: publicProcedure
  .input(findManyCinemaArgsSchema)
  .input(z.object({ addressWhere: locationFilter }))
  .query(async ({ input, ctx }) => {
    const { cursor, distinct, orderBy, skip, take, where, addressWhere } =
      input

    const { ne_lat, ne_lng, sw_lat, sw_lng } = addressWhere
    return ctx.db.cinema.findMany({
      cursor,
      distinct,
      orderBy,
      skip,
      take,
      where: {
        ...where,
        Address: {
          lat: { lte: ne_lat, gte: sw_lat },
          lng: { lte: ne_lng, gte: sw_lng },
        },
      },
      include: {
        Address: true,
      },
    })
  }),
cinema: publicProcedure.input(z.object({id:z.string()})).query(({ctx,input})=>{
return ctx.db.cinema.findUnique({where:{id:input.id},include:{Address:true}})
}), 


  cinemas: publicProcedure.query(({ ctx }) => {
    return ctx.db.cinema.findMany({
      include: {
        Screens: { include: { Showtimes: { include: { Movie: true } } } },
      },
    })
  }),
  myCinemas:protectedProcedure('manager').query(({ctx})=>{
        return ctx.db.cinema.findMany({
          where:{Managers:{some:{id:ctx.userId}}},
          include:{

            Screens:{
              include:{Showtimes:{
                include:{Movie:true}
              }}
            }
          }
        })
  }),
  createCinema: protectedProcedure('admin')
    .input(schemaCreateCinema)
    .mutation(({ ctx, input }) => {
      const { cinemaName, managerId, address, screens } = input

      const screensWithSeats = screens.map((screen, index) => {
        const { rows, columns, ...screenData } = screen
        const seats = []

        for (let row = 1; row < rows; row++) {
          for (let column = 1; column <= columns; column++) {
            seats.push({ row, column })
          }
        }

        return {
          ...screenData,
          Seats: { create: seats },
          number: index,
        }
      })

      return ctx.db.cinema.create({
        data: {
          name: cinemaName,
          Address: { create: address },
          Managers: {
            connectOrCreate: {
              create: { id: managerId },
              where: { id: managerId },
            },
          },
          Screens: { create: screensWithSeats },
        },
      })
    }),

    myScreens: protectedProcedure().query(({ ctx }) => {
      return ctx.db.screen.findMany({
        where: {
          Cinema: {
            Managers: { some: { id: ctx.session.userId as string } },
          },
        },
        include: {
          Cinema: true,
        },
      })
    })
})
