import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext'

const scene = () => {
    const socket = useContext(SocketContext)
    const router = useRouter()
    const [scene, setScene] = useState('')
    let status
    useEffect(() => {
        status = sessionStorage.getItem('status')
        socket.emit('get-game-scene', sessionStorage.getItem('game-code'))
        socket.on('game-scene', scene => {
            console.log(scene);
            setScene(scene)})
        if(status === '1')
            setTimeout(() => router.push('/host/hostDashboard'), 4000)
        else
            setTimeout(() => router.push(`/player/game/${sessionStorage.getItem('team-name')}`), 4000)
    }, [socket])
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='font-bold text-2xl'>Scene</h1>
            <h3>{scene[0] && scene[0].scene}</h3>
        </div>
    )
}

export default scene
