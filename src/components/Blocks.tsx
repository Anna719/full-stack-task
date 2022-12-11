import styles from './Blocks.module.css'
import { trpc } from '../utils/trpc'
import { Block } from './Block'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export function Blocks() {
  const blocks = trpc.block.list.useQuery({
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  if (blocks.isLoading) {
    return <p>Loading...</p>
  }

  if (blocks.error) {
    return <p>{blocks.error.message}</p>
  }

  const onDragEnd = (result: any) => {
    const { destination, source } = result
    //check if souce and destination work correctly
    console.log('drag result', destination, source)

    //checks if the destination or source exists
    if (!destination || !source) {
      return
    }
    //don't move item if it's dragged to the same place.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div
              className={styles.blocks}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {blocks.data.map((block, index) => {
                return (
                  <Draggable
                    key={block.id}
                    draggableId={block.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.block}
                      >
                        <Block block={block} />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
