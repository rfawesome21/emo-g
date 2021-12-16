import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SelectScene from "./SelectScene";
import { SocketContext } from "../../context/socket/SocketContext";
import EndGame from "../../components/endGame";
import Head from 'next/head'

const scenes = () => {


    const socket = useContext(SocketContext)
    const [gameCode, setGameCode] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState('')
    const [scenes, setScenes] = useState(false)
    const [sceneClassName, setSceneClassName] = useState(false)
    const [emotionClassName,setEmotionClassName] = useState(false)
    useEffect(() => {
        document.getElementById('focusDiv').focus()
        if(sessionStorage.getItem('scene-class'))
            setSceneClassName(true)
        if(sessionStorage.getItem('emotion-class'))
            setEmotionClassName(true)
            
        let isMounted = true
        if (isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('game-scenes', sessionStorage.getItem('game-code'))
        socket.on('players', players => {
            if (isMounted)
                setNumberOfPlayers(players.length)
        })
        socket.on('received-scenes', () => {
            if(isMounted){
                setSceneClassName(true)
                sessionStorage.setItem('scene-class', true)
            }
        })
        socket.on('received-emotions', (bool) => {
            setEmotionClassName(bool)
            sessionStorage.setItem('emotion-class', true)
        })
        return () => {
            isMounted = false
        }
    }, [socket])

    const router = useRouter()

    const onSubmit = () => {
        router.push('/host/scoring')
    }

    return (
        <div className="flex flex-row justify-center h-screen bgNormal" onKeyPress={(e) => e.key === 'Enter' && onSubmit()} tabIndex={0} id={'focusDiv'}>
            <Head>
                <title>Emo-G | Scenes</title>
                <meta name="description" content="Emo-G" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SettingsAndBack link='/host/settings' player={false}/>
            <EndGame />
            
            <div className="flex flex-col justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />

                <div className="flex flex-row justify-between">
                    <div className={sceneClassName? "hostSelectEmo cursor-pointer p-2 rounded-lg mx-4" : "heading p-2 cursor-pointer rounded-lg mx-4"}>
                        <div className="font-bold text-xl" onClick={() => router.push('/host/SelectScene')}>
                            {sceneClassName?<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>:<></>}
                            Set the Scene
                        </div>
                    </div>
                    <div className={emotionClassName? "hostSelectEmo cursor-pointer p-2 rounded-lg mx-4" : "heading p-2 cursor-pointer rounded-lg mx-4"}>
                        <div className="font-bold text-xl"  onClick={() => router.push('/host/chooseEmotion')}>
                            {emotionClassName?<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>:<></>}
                            Set Emotions
                        </div>
                    </div>
                </div>

                <div className="text-center"><button onClick={() => router.push("/host/scoring")} className=" buttonNew rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
            {
                scenes ?
                    <SelectScene closeButton={() => setScenes(!scenes)} />
                    :
                    null
            }
        </div>
    );
}

export default scenes;