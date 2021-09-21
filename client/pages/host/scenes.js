import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SelectScene from "../../components/Host/SelectScene";

const scenes = () => {

    const [gameCode, setGameCode] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [scenes, setScenes] = useState(false)
    const [createScene, setCreateScene] = useState(false)
    const [emotion, setEmotion] = useState(false)
    const [createEmotion, setCreateEmotion] = useState(false)

    useEffect(() => {
        setGameCode(sessionStorage.getItem('game-code'))
        setNumberOfPlayers(sessionStorage.getItem('players-length'))
    })
    const router = useRouter()

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <SettingsAndBack link = '/host/settings' />
            
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>

                <div className="flex justify-between">
                    <div className="flex flex-column justify-evenly align-center bg-gray-200 p-8 mx-4">
                        <div className="font-bold text-xl">Set the Scene</div>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50" 
                        onClick = {() => setScenes(!scenes)}>Choose Existing</button>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50" 
                        onClick = {() => setCreateScene(!createScene)}>Create New</button>
                    </div>
                    <div className="flex flex-column justify-evenly align-center bg-gray-200 p-8 mx-4">
                        <div className="font-bold text-xl">Set Emotions</div>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50" onClick = {() => setEmotion(!emotion)}>Choose Existing</button>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50" onClick = {() => setCreateEmotion(!createEmotion)}>Create New</button>
                    </div>
                </div>

                <div className="text-center"><button onClick={() => router.push("/host/teams")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
            {
                scenes?
                <SelectScene closeButton = {() => setScenes(!scenes)}/>
                : 
                null
            }
        </div>
     );
}
 
export default scenes;