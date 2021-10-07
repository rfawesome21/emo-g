import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SelectScene from "./SelectScene";
import { SocketContext } from "../../context/socket/SocketContext";

const scenes = () => {


    const socket = useContext(SocketContext)
    const [gameCode, setGameCode] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState('')
    const [scenes, setScenes] = useState(false)
    const [emotion, setEmotion] = useState(false)
    const [sceneClassName, setSceneClassName] = useState(false)
    const [emotionClassName,setEmotionClassName] = useState(false)
    useEffect(() => {
        if(sessionStorage.getItem('scene-class'))
            setSceneClassName(true)
        
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
        socket.on('received-emotions', (bool) => setEmotionClassName(bool))
        return () => {
            isMounted = false
        }
    }, [socket])

    const router = useRouter()

    return (
        <div className="flex flex-row justify-center h-screen">
            <SettingsAndBack link='/host/settings' />

            <div className="flex flex-col justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />

                <div className="flex flex-row justify-between">
                    <div className={sceneClassName? "flex flex-col justify-evenly align-center bg-green-200 p-8 mx-4" :  "flex flex-col justify-evenly align-center bg-gray-200 p-8 mx-4"}>
                        <div className="font-bold text-xl">Set the Scene</div>
                        <button className="bg-gray-100 border-2 border-black border-opacity-50 mt-2"
                            onClick={() => router.push('/host/SelectScene')}>Choose Existing</button>
                    </div>
                    <div className={emotionClassName? "flex flex-col justify-evenly align-center bg-green-200 p-8 mx-4" :  "flex flex-col justify-evenly align-center bg-gray-200 p-8 mx-4"}>
                        <div className="font-bold text-xl">Set Emotions</div>
                        <button className="bg-gray-100 border-2 border-black border-opacity-50 mt-2" onClick={() => router.push('/host/chooseEmotion')}>Choose Existing</button>
                    </div>
                </div>

                <div className="text-center"><button onClick={() => router.push("/host/teams")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
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