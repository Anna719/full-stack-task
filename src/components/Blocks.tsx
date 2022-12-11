import React, { useState, useEffect } from 'react'
import styles from './Blocks.module.css'
import { trpc } from '../utils/trpc'
import { Block } from './Block'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { type Block as BlockData } from '@prisma/client'
import { getItemStyle } from '../styles/changeStyle'

export function Blocks() {
  const [notes, setNote] = useState<BlockData[]>([])

  const blocks = trpc.block.list.useQuery({
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })
  useEffect(() => {
    //updating notes state with blocks, each time object is changed
    if (blocks.data) {
      setNote(blocks.data)
      console.log('Was useffect')
    }
  }, [blocks.data])

  const utils = trpc.useContext()
  const updateBlock = trpc.block.reorder.useMutation({
    onSuccess: () => utils.block.list.invalidate(),
  })

  if (blocks.isLoading) {
    return <p>Loading...</p>
  }

  if (blocks.error) {
    return <p>{blocks.error.message}</p>
  }

  //giving order a new value after dragging
  const resetPositions = (list: any[]) => {
    const resetList = list.map((item, index) => {
      const newItem = item
      newItem.order = index + 1
      return item
    })
    return resetList
  }

  const reorder = (
    list: any[],
    startIndex: number,
    endIndex: number,
  ): any[] => {
    const result = Array.from(list)
    //remove and paste element into array
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    // list.map((item, index) => ({ ...item, order: index }))
    console.log(resetPositions(result), 'RESET')
    return resetPositions(result)
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
    //updating state
    setNote(reorder(notes, source.index, destination.index))
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
              {notes.map((note, index) => {
                return (
                  <Draggable key={note.id} draggableId={note.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.block}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <Block block={note} />
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
