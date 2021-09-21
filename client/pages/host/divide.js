import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import { SocketContext } from "../../context/socket/SocketContext";
// import styles from "../css/hostScreen.module.css"

const divide = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [mode, setMode] = useState('random')
    const [players, setPlayers] = useState([])
    const [playerIcon, deletePlayer] = useState()

    const continueGame = () => {
        socket.emit('mode', mode)
        console.log(mode);
        if(mode === 'random')
        {
            router.push('/host/random')
        }
        else if(mode === 'manual'){
            router.push('/host/manual')
        }
        else if(mode === 'choice'){
            router.push('/host/choice')
        }
    }

    useEffect(() => {
        setGameCode(sessionStorage.getItem('game-code'))
        setNumberOfPlayers(sessionStorage.getItem('players-length'))
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
            <SettingsAndBack link = {'/host/teams'} />
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>

                <div className="flex flex-row justify-evenly w-screen">
                    <div className="bg-gray-200 px-16 py-4 flex flex-column justify-evenly">
                        <div className="font-bold text-xl">Divide players into teams</div>
                        <div className="text-xl font-semibold"> <input type="radio" defaultChecked name = 'option' onClick = {() => setMode('random')} /> Random  </div>
                        <div className="text-xl font-semibold"> <input type="radio" name = 'option' onClick = {() => setMode('manual')} /> Manual  </div>
                        <div className="text-xl font-semibold"> <input type="radio" name = 'option' onClick = {() => setMode('choice')} /> Player's choice  </div>
                    </div>
                    <PlayerComponent players = {players} deletePlayer = {deletePlayer} />
                </div>

                <div className="text-center"><button onClick={() => continueGame()} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>


                {
                playerIcon?
                <div className="bg-gray-200 border-2 border-black cursor-pointer" style={{position:"absolute", top:playerIcon.y, left:playerIcon.x, zIndex:2}}>
                    <div>Remove Player</div>
                    <div onClick={() => deletePlayer(undefined)}>Back</div>  
                </div>:<></>}
            </div>
        </div>
     )
}
 
export default divide;