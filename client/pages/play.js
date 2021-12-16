import React from 'react'
import Navbar from '../components/Navbar'
import Head from 'next/head'

const bg={
    backgroundImage: 'url("https://i.imgur.com/wi33LKy.jpg")',
    backgroundSize: "100vw 100vh"
}

const play = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center' style={bg}>
            <Head>
                <title>Emo-G | Play</title>
                <meta name="description" content="Emo-G" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="px-12 py-12 loginGradient rounded-lg">
                <Navbar />
            </div>
        </div>
    )
}

export default play
