import { type Block as BlockData } from '@prisma/client'
import styles from './Block.module.css'
import { trpc } from '../utils/trpc'

type BlockProps = {
  block: BlockData
}

export function Block(props: BlockProps) {
  const { block } = props

  const utils = trpc.useContext()
  const delBlock = trpc.block.del.useMutation({
    onSuccess: () => utils.block.list.invalidate(),
  })

  const handleDelete = () => {
    delBlock.mutate({ id: block.id })
  }

  return (
    <div className={styles.block}>
      <div>{block.content}</div>
      <button
        className={styles.delete}
        title="Delete block"
        onClick={handleDelete}
      >
        ×
      </button>
    </div>
  )
}
