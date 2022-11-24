# Full stack task

## Background

This app renders a list of blocks to the screen. It currently does three things:

- Renders blocks by creation time in descending order.
- Allows a user to create a block by providing some content and clicking the `Create` button.
- Allows a user to delete a block by clicking the `X` icon button within it.

## Task

> Once you're done, please send a link to your fork of this repo to adrien@genei.io.

> ❗❗ Please spend no more than a total of 4h on this task. If you don't finish, that's fine. We're
  more interested in how you approach the problem than in the solution itself. ❗❗

Your task is to fulfill this imaginary user's dreams of reordering their blocks:

"As a user I want to be able see my blocks in an order that I choose. In order to reorder my blocks,
I expect to be able to drag and drop one block either above or below another. When I come back to the
app I expect that my blocks are still in the order I defined."

Implementation details:
- The user-defined ordering should be stored in the database in some shape or form.
- The `list` procedure in `src/server/trpc/router/block.ts` currently accepts a `sortBy` property
  that can only be set to `createdAt`.
- Add a new `sortBy` option called e.g. `order`.
- When `sortBy` is set to `order` in `src/components/Blocks.tsx`, the blocks should be sorted
  in the user-defined order.
- By default (before any blocks have been reordered), sorting by `order` should look no different
  than sorting by `createdAt`.
- When a new block is created, it should appear at the top when sorting `desc` by `order`.
- When deleting a block, the ordering of the remaining blocks should not change.
- Implement the `reorder` procedure defined in `src/server/trpc/router/block.ts` to move one block
  after another.
  - The `id` is the id of the block that is being moved.
  - The `afterId` is the id of the block that the source block should be moved after.
  - If `afterId` is `null` that means the block should be after no block, i.e. it is the first block
    in the ordering, or in other words it is at the end of the list when sorting `desc` by `order`.
- When a block is dropped, call the `reorder` procedure with the correct `id` and `afterId` values
  and invalidate the `list` procedure.

If you have time left:
- Animate the drag and drop. When a block is dragged, remove it from the list. When it is dragged
  between blocks, insert a placeholder to provide feedback to the user about where it will be moved to.
- Implement an optimistic response to the `reorder` procedure so that the UI response on drop is instant.

## Suggestions

1. Make frequent commits with descriptive commit messages. Again, we're more interested in how you
   approach the problem than in the solution itself.
2. Create a file called NOTES.md, and write up any notes / thoughts you have as you go along.
3. It's totally fine, even encouraged, to use Google to explore the problem space and find solutions.
4. Feel free to use whichever libraries you like to help you complete the task.
5. If you get really stuck or have any additional questions, please send me an email at adrien@genei.io
   and I will get back to you as soon as possible.

## Relevant Documentation
- [Prisma ORM](https://www.prisma.io/docs/)
  - We use Prisma to interact with our database at Genei.
- [tRPC](https://trpc.io/docs)
  - Don't worry about this too much. It's just a module that lets you define end-to-end typesafe APIs.
  - Refer to `src/components/CreateBlock.tsx` and `src/components/Blocks.tsx` to see how it's used in
    the frontend.
  - Refer to `src/server/trpc/router/block.ts` to see how it's used in the backend.

## Setup

1. Install dependencies

```bash
npm i
```

2. Instantiate the database. _Make sure Docker is running._

```bash
docker compose up -d
```

3. Run the migrations

```bash
npx prisma migrate dev
```

4. Run the app

```bash
npm run dev
```

5. Run type checking

```bash
npm run ts:watch
```
