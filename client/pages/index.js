import Head from 'next/head'
import { useContext } from 'react'
import { SocketContext } from '../context/socket/SocketContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const socket = useContext(SocketContext)
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Emo-G</title>
        <meta name="description" content="Emo-G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className='stroke-current xl:text-7xl md:text-4xl'>E<span className='text-yellow-400'>M</span><span className='text-'>O</span><span>-</span><span>G</span></p>
    </div>
  )
}
