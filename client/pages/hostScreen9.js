import SendCodeToInvitePlayers from "../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../components/settingsAndBack";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import styles from "../css/hostScreen.module.css"

const hostScreen9 = () => {

    const router = useRouter()

    const [numberOfPlayers, setNumberOfPlayers] = useState(20)
    const [gameCode, setGameCode] = useState("LN69ASX")

    const [players, setPlayers] = useState([])
    const [playerIcon, deletePlayer] = useState()

    useEffect(() => {
        //get players and gamecode
        setPlayers([
            {
                name:"x0"
            },
            {
                name:"x1"
            },
            {
                name:"x2"
            },
            {
                name:"x3"
            },,
            {
                name:"x4"
            },
            {
                name:"x5"
            },
            {
                name:"x6"
            },
            {
                name:"bajra"
            },
            {
                name:"x8"
            },
            {
                name:"x9"
            },
            {
                name:"x10"
            }
        ])
    }, [])

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <SettingsAndBack />
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>

                <div className="flex flex-row justify-evenly w-screen">
                    <div className="bg-gray-200">
                        <div className="font-bold text-xl ml-4 mt-4">
                            Players Online
                        </div>
                        <div className="font-bold ml-4 my-4">
                            20 Players
                        </div> 
                        <div className="flex flex-row flex-wrap max-w-sm max-h-44 justify-evenly my-4" style={{overflowY:"auto"}} id="players">
                            {players.map(player => (
                                <div style={{zIndex:2, textAlign:"center"}} onClick={event => deletePlayer({x: event.clientX, y: event.clientY, player: player})}>
                                    <div className="mx-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    {player.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-200">
                        <div className="font-bold text-xl mx-4 mt-4 flex justify-between">
                            <div>TeamName</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="font-bold mx-4 my-4">
                            4 Players
                        </div> 
                        <div className="flex flex-row flex-wrap max-w-xs max-h-44 justify-evenly my-4" style={{overflowY:"auto"}} id="players">
                            {players.map(player => (
                                <div style={{zIndex:2, textAlign:"center"}} onClick={event => deletePlayer({x: event.clientX, y: event.clientY, player: player})}>
                                    <div className="mx-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    {player.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-200">
                        <div className="font-bold text-xl mx-4 mt-4 flex justify-between">
                            <div>TeamName</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="font-bold mx-4 my-4">
                            4 Players
                        </div> 
                        <div className="flex flex-row flex-wrap max-w-xs max-h-44 justify-evenly my-4" style={{overflowY:"auto"}} id="players">
                            {players.map(player => (
                                <div style={{zIndex:2, textAlign:"center"}} onClick={event => deletePlayer({x: event.clientX, y: event.clientY, player: player})}>
                                    <div className="mx-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    {player.name}
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="flex items-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>

                </div>

                <div className="text-center"><button onClick={() => router.push("/hostScreen8")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Start</button></div>


                {
                playerIcon?
                <div className="bg-gray-200 border-2 border-black cursor-pointer" style={{position:"absolute", top:playerIcon.y, left:playerIcon.x, zIndex:2}}>
                    <div>Remove Player</div>
                    <div onClick={() => deletePlayer(undefined)}>Back</div>  
                </div>:<></>}
            </div>
        </div>
     );
}
 
export default hostScreen9;