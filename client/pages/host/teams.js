import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import {SocketContext} from '../../context/socket/SocketContext'
import Button from '../../components/Button'
// import styles from "../css/hostScreen.module.css"

const teams = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [mode, setMode] = useState('random')

    const [players, setPlayers] = useState([])
    const [playerIcon, deletePlayer] = useState()
    const [playersPerTeam, setPlayersPerTeam] = useState(4)
    useEffect(() => {
        let isMounted = true
        if(isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('join-teams', sessionStorage.getItem('game-code'))
        socket.on('players', numberPlayers => {
            if(isMounted){
                setNumberOfPlayers(numberPlayers.length)
                console.log(numberPlayers);
                setPlayers(numberPlayers)
            }
        })
        
        return() => {
            isMounted = false
        }
    }, [socket])

    const continueGame = () => {
        socket.emit('max-players', {gameCode, playersPerTeam})
        socket.emit('mode', {gameCode, mode})
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

    const onChangeHandler = (e) => {
        setPlayersPerTeam(e.target.value)
    }

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <SettingsAndBack link = {'/host/scenes'} />
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>

                <div className="flex flex-row justify-center items-center w-screen">
                    <div className="bg-gray-200 px-16 py-4 flex flex-column justify-evenly">
                        <div className="font-bold text-xl">Divide players into Teams</div>
                        <div className="font-bold text-xl mt-5">Players per team:  <input type="number" min="2" max = "10"  style={{width:"4rem"}}
                        value = {playersPerTeam}
                        onChange = {(e) => onChangeHandler(e)}
                        /></div>
                        <div className="text-xl font-semibold mt-5"> <input type="radio" defaultChecked name = 'option' onClick = {() => setMode('random')} /> Random  </div>
                        <div className="text-xl font-semibold"> <input type="radio" name = 'option' onClick = {() => setMode('manual')} /> Manual  </div>
                        <div className="text-xl font-semibold"> <input type="radio" name = 'option' onClick = {() => setMode('choice')} /> Player's choice  </div>
                    
                    </div>
                    {players.length > 0?   
                    <PlayerComponent players = {players} width = {'large'} largeWidth = {'md'} />
                    : null
                }
                </div>

                <div className="text-center">
                    <Button clickHandler = {continueGame} text = 'Continue' />
                </div>


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
 
export default teams;