import { router } from '../trpc'
import { blockRouter } from './block'

export const appRouter = router({
  block: blockRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
