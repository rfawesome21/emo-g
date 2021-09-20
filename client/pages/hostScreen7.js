import SendCodeToInvitePlayers from "../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../components/settingsAndBack";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import styles from "../css/hostScreen.module.css"

const hostScreen7 = () => {

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
            },
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
                    <div className="bg-gray-200 px-16 py-4 flex flex-column justify-evenly">
                        <div className="font-bold text-xl">Divide players into Teams</div>
                        <div className="text-xl font-semibold"> <input type="checkbox"/> System  </div>
                        <div className="text-xl font-semibold"> <input type="checkbox"/> Manual  </div>
                        <div className="text-xl font-semibold"> <input type="checkbox"/> Player's choice  </div>
                    </div>
                    <div className="flex flex-row flex-wrap md:max-w-md lg:max-w-lg max-h-44" style={{overflowY:"scroll"}} id="players">
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

                <div className="text-center"><button onClick={() => router.push("/hostScreen8")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>


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
 
export default hostScreen7;