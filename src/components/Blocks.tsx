import styles from './Blocks.module.css'
import { trpc } from '../utils/trpc'
import { Block } from './Block'

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

  return (
    <div>
      <ul className={styles.blocks}>
        {blocks.data.map((block) => (
          <li className={styles.block} key={block.id}>
            <Block block={block} />
          </li>
        ))}
      </ul>
    </div>
  )
}
