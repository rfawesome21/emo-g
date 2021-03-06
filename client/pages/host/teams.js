import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import {SocketContext} from '../../context/socket/SocketContext'
import Button from '../../components/Button'
import EndGame from "../../components/endGame"

const teams = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [mode, setMode] = useState('random')
    const [numberTeams, setNumberTeams] = useState(0)
    const [players, setPlayers] = useState([])
    const [playersPerTeam, setPlayersPerTeam] = useState(4)

    useEffect(() => {
        let isMounted = true
        setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('join-teams', sessionStorage.getItem('game-code'))
        
            if(isMounted){
            socket.on('players', numberPlayers => {
                if(isMounted){
                    setNumberOfPlayers(numberPlayers.length)
                }
                if(isMounted)
                    setPlayers(numberPlayers)
            })
        }
        
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
        <div className="flex flex-row justify-center h-screen bgNormal">
            <SettingsAndBack link="/host/scoring" player={false}/>
            <div className="flex flex-column justify-evenly">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/></div>
                </div>

                <div className="flex flex-row justify-between items-center container">
                    <div className="heading ebaText rounded-xl px-12 py-8 mr-12 flex flex-column justify-evenly" style={{flex:4}}>
                        <div className="font-bold burlywoodText text-xl mt-1">Divide players into Teams</div>
                        <div className="text-xl mt-4 flex justify-between">Players per team:  <input type="number" min="2" max = "10" className="w-12 ebaBorder rounded pl-2"
                        value = {playersPerTeam}
                        onChange = {(e) => onChangeHandler(e)}
                        /></div>
                        <div className="text-xl mt-1 flex justify-between">No of Teams:  <input type="number" className="w-12 ebaBorder rounded pl-2"
                        value = {Math.ceil(numberOfPlayers/playersPerTeam)} onChange = {(e) => setNumberTeams(e.target.value)}
                        /></div>
                        <div className="text-xl mt-4"> <input type="radio" defaultChecked name = 'option' onClick = {() => setMode('random')} /> Random  </div>
                        <div className="text-xl"> <input type="radio" name = 'option' onClick = {() => setMode('manual')} /> Manual  </div>
                        <div className="text-xl mb-1"> <input type="radio" name = 'option' onClick = {() => setMode('choice')} /> Player's choice  </div>
                    
                    </div>
                    <div className="ml-28 heading rounded-xl" style={{flex:9}}>
                        {players.length > 0?   
                        <PlayerComponent players = {players} width = {'large'} largeWidth = {'md'} />
                        : null
                        }
                    </div>
                </div>

                <div className="text-center">
                    <Button clickHandler = {continueGame} text = 'Continue' />
                </div>
            </div>

            <EndGame />
        </div>
     )
}
 
export default teams;