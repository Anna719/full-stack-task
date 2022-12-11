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
   I added to scheme.prisma new option `order` to make new migration and have this in the database.
   I decided to have it "autoincrement()" by default, to keep up with the position (to have at least any info about it).

2. By default (before any blocks have been reordered), sorting by `order` should look no different than sorting by `createdAt`.

I added `order` option to `src/server/trpc/router/block.ts` in sortBy and then changed procedure `trpc.block.list.useQuery`to `sortBy:  'order'`.

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

6. Adding reorder function

Firstly, I thought it would be nice to start with reordering in a "static way", without pushing position to database.
As far as I understood, we need to use this `order` option in `reorder procedure` (obviously), where input.id = source.id and afterId = destination.id. But I was lost here, because input.id has to be that unique string, so definetely it's not going to be that number source id. So initially I skipped doing it dynamically.
So I created reorder function, which will update positions, but not update them in database.

a) Creating `useffect ()` to update notes state with blocks in order to change it when the order is also changed.
b) Using `splice ()` method that changes the content of an array, adding new elements while removing old elements.

Second step is done -> I can drag elements and they will change their positions (after refresh they go back to initial positions) :clap:

 7. I'm still thinking if I should implement dynamic `reorder` during onDragEnd or during onDragUpdate.
 I wanted to at least reassign values of `order` and to see it into console (whether this values change at all). So I created function `resetPositions()`.
 Third step is done -> I can see chaging order in console :clap: collision: .

 8. I decided to add basic style change, when component is onDrag.