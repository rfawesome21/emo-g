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
      <p className={styles.heading}>E<span className={styles.m}>M</span><span className={styles.o}>O</span><span className = {styles.dash}>-</span><span className = {styles.g}>G</span></p>
      <Link href= '/play'>
        <button className='bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold'>
          Start
        </button>
      </Link>
    </div>
  )
}
