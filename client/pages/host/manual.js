import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import {SocketContext} from '../../context/socket/SocketContext'
// import styles from "../css/hostScreen.module.css"

const manual = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")

    const [players, setPlayers] = useState([])
    const [playerIcon, deletePlayer] = useState()
    const [teams, setTeams] = useState(["Team 1", "Team 2", "Team 3", "Team 4"])

    useEffect(() => {
        socket.emit('manual-division', sessionStorage.getItem('game-code'))
        socket.on('players', players => {
            setNumberOfPlayers(players.length)
            setPlayers(players)})
        setGameCode(sessionStorage.getItem('game-code'))
        //get players and gamecode
        
    }, [])

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <SettingsAndBack link = {'/host/teams'} />
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
                        <PlayerComponent players = {players} deletePlayer = {deletePlayer} teams={teams}/>
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
                            <PlayerComponent players = {players} deletePlayer = {deletePlayer} teams={teams}/>
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
                            <PlayerComponent players = {players} deletePlayer = {deletePlayer} teams={teams}/>
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
 
export default manual;