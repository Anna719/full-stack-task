import { type NextPage } from 'next'
import Head from 'next/head'
import { CreateBlock } from '../components/CreateBlock'
import { Blocks } from '../components/Blocks'
import styles from './index.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blocks</title>
        <meta name="description" content="Reorder the blocks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Reorder the blocks</h1>
        <h2>Create block</h2>
        <CreateBlock />
        <h2>Blocks</h2>
        <Blocks />
      </main>
    </>
  )
}

export default Home
