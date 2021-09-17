import Head from 'next/head'
import { useContext } from 'react'
import { SocketContext } from '../context/socket/SocketContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const socket = useContext(SocketContext)
  const clickHandler = () => {
    socket.emit('create-team')
  }
  const show = () => {
    socket.emit('show')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Emo-G</title>
        <meta name="description" content="Emo-G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick = {clickHandler}>Create a Team</button>
      <button onClick = {show}>Show Team Details</button>
    </div>
  )
}
