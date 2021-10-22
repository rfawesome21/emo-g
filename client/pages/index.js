import Head from 'next/head'
import { useContext } from 'react'
import { SocketContext } from '../context/socket/SocketContext'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const socket = useContext(SocketContext)
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Emo-G</title>
        <meta name="description" content="Emo-G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href= '/play'>
        <button className='rounded-md px-4 py-2 text-2xl font-bold buttonNew startButton absolute bottom-32'>
          PLAY
        </button>
      </Link>
    </div>
  )
}
