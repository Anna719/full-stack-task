import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const blockRouter = router({
  create: publicProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.block.create({
        data: {
          content: input.content,
        },
      })
    }),
  del: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.block.delete({
        where: {
          id: input.id,
        },
      })
    }),
  reorder: publicProcedure
    .input(
      z.object({
        id: z.string(),
        afterId: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: implement
    }),
  list: publicProcedure
    .input(
      z.object({
        sortBy: z.enum(['createdAt']),
        sortDirection: z.enum(['asc', 'desc']),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.block.findMany({
        orderBy: {
          [input.sortBy]: input.sortDirection,
        },
      })
    }),
})
