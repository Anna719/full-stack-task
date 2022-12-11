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

 3. I understood that I need to make an update request in `block.ts`, so I googled how can I do it (with trpc + prisma).
 a) Firstly, I decided to check whether I got it correctly and created basic update request, where I changed order of 1 element, manually passing the id.

4. The most common library for drag in drop is "react-beautiful-dnd", so I installed it 

`npm i --save-dev @types/react-beautiful-dnd`

5. I read the documentation on how to use it + of course googled it.
I added the needed components 
`import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'`
 and started to impement it. 
 
 Unfortunately, it couldn't find this library after installation, so after some stackoverflow posts, I disabled `strict mode`, because "StrictMode rendering breaks ability to find node by it's draggable id ".
 ` reactStrictMode: false`

 First step is done -> I can drag components now (even though they returned to previous positions) :clap: :sparkles: .

 6. 