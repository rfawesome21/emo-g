import SettingsAndBack from "../components/settingsAndBack";
import { useState, useEffect } from "react";

const playerScreen1 = () => {

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
        <div>
            <SettingsAndBack />
            <div className="flex justify-evenly h-screen items-center">
                <div>
                    <div className="flex flex-column justify-evenly items-center bg-gray-200 p-8">
                        <div className="font-bold text-xl">
                            Choose your avatar
                        </div>
                        <div className="flex flex-row justify-evenly items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="font-bold text-xl">
                            Avatar
                        </div>
                    </div>
                    <br/>
                    <br />
                    <div className="flex justify-center">
                        <div className="rounded px-4 py-2 bg-gray-200 border-2 border-black text-xl font-bold">Save</div>
                    </div>
                </div>
                <div className="flex flex-column justify-evenly" style={{height:"80vh"}}>
                <div className="flex flex-column justify-evenly">
                    <div className="text-center font-bold text-xl">Waiting for host to start game ...</div>
                        <br />
                        <div className="flex flex-row justify-evenly">
                            <div className="border-2 py-2 px-4 border-black rounded-md font-bold text-lg">
                                {numberOfPlayers} Joined
                            </div>
                        </div>
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
            </div>
        </div>
     );
}
 
export default playerScreen1;