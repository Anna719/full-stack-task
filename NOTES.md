# Thought process

## Set up + prisma & trpc
1. I decided to check out how prisma and trpc work (because I haven't used them before)
2. I opened an interface for prisma studio with command 

```bash
npx prisma studio
```

3. Of course I checked adding notes + deleting them and compared this processes in database (which changes occured and how those changes were made -> with trpc).
4. I watched a couple of videos and read documentation on trpc and compared them to your code.
5. After intensive googling I had a basic understanding on how to work with those tools (hope so).

## Implementation

1. Add a new `sortBy` option called e.g. `order`.
I added to scheme.prisma  new option `order` to make new migration and have this in the database.
I decided to have it "autoincrement()" by default, to keep up with the position (to have at least any info about it).

2. By default (before any blocks have been reordered), sorting by `order` should look no different than sorting by `createdAt`.
 
 I added `order` option to `src/server/trpc/router/block.ts`  in sortBy and then changed procedure  `trpc.block.list.useQuery`to `sortBy:  'order'`.

 