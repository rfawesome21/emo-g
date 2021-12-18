import Head from 'next/head'
import { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    document.getElementById('focusDiv').focus();
    sessionStorage.clear()
  }, [])


  const onSubmit = () => {
    console.log('Clicked');
    router.push("/play")
  }
  
  return (
    <div className={styles.container} onKeyPress={(e) => e.key === 'Enter' && onSubmit()} tabIndex={0} id={'focusDiv'}  >
      <Head>
        <title>Emo-G</title>
        <meta name="description" content="Emo-G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href= '/play'>
        <div className='flex justify-center items-end h-full'>
        <button className='rounded-md px-4 py-2 text-2xl font-bold buttonNew startButton ml-auto mr-auto mb-32'>
          PLAY
        </button>
        </div>
      </Link>
    </div>
  )
}
