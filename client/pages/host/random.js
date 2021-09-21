import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
// import styles from "../css/hostScreen.module.css"

const random = () => {

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
            }
        ])
    }, [])

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <SettingsAndBack link = {'/host/divide'} />
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>

                <div className="flex flex-row justify-evenly w-screen">
                    <div className="bg-gray-200">
                        <div className="font-bold text-xl ml-4 mt-4">
                            TeamName
                        </div>
                        <div className="font-bold ml-4 my-4">
                            4 Players
                        </div>
                        <PlayerComponent players = {players} deletePlayer = {deletePlayer} />
                    </div>
                    <div className="bg-gray-200">
                        <div className="font-bold text-xl ml-4 mt-4">
                            TeamName
                        </div>
                        <div className="font-bold ml-4 my-4">
                            4 Players
                        </div> 
                        <PlayerComponent players = {players} deletePlayer = {deletePlayer} />
                    </div>
                    <div className="bg-gray-200">
                        <div className="font-bold text-xl ml-4 mt-4">
                            TeamName
                        </div>
                        <div className="font-bold ml-4 my-4">
                            3 Players
                        </div> 
                        <PlayerComponent players = {players} deletePlayer = {deletePlayer} />
                    </div>


                    <div className="flex items-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
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
 
export default random;