import { useState } from 'react'
import styles from './CreateBlock.module.css'
import { trpc } from '../utils/trpc'

export function CreateBlock() {
  const [content, setContent] = useState('')

  const utils = trpc.useContext()
  const createBlock = trpc.block.create.useMutation({
    onSuccess: () => utils.block.list.invalidate(),
  })

  const shouldBlock = content === '' || createBlock.isLoading

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (shouldBlock) return
    e.preventDefault()
    try {
      await createBlock.mutateAsync({ content })
      setContent('')
    } catch {}
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter block content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className={styles.button}
        type="submit"
        title="Create block"
        disabled={shouldBlock}
      >
        Create
      </button>
      {createBlock.error && <div>{createBlock.error.message}</div>}
    </form>
  )
}
