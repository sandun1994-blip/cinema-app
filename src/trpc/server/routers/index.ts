import { createTRPCRouter, protectedProcedure, publicProcedure } from "..";
import { adminRouter } from "./admin";
import { cinemasRouter } from "./cinemas";
import { managerRoutes } from "./manager";
import { moviesRouter } from "./movies";
import { showtimesRoutes } from "./showtimes";
import { stripeRoutes } from "./stripe";
import { ticketsRoutes } from "./tickets";


export const appRouter =createTRPCRouter({
   movies:moviesRouter,
   admins:adminRouter,
   cinemas: cinemasRouter,
   managers:managerRoutes,
   showtimes: showtimesRoutes,
    stripe: stripeRoutes,
    tickets: ticketsRoutes,

})

export type AppRouter =typeof appRouter