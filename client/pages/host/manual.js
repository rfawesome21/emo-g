import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import {SocketContext} from '../../context/socket/SocketContext'
import TeamPlayers from "../../components/TeamPlayers";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
// import styles from "../css/hostScreen.module.css"

const manual = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")

    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState(1)

    const clickHandler = () => {
        socket.emit('come-to-scene', sessionStorage.getItem('game-code'))
        socket.on('scene-page', () => router.push('/scene'))
    }

    useEffect(() => {
        socket.emit('manual-division', sessionStorage.getItem('game-code'))
        socket.on('players', players => {
            setNumberOfPlayers(players.length)
        })
        socket.on('teams', teams => setTeams(teams))
        socket.on('players-without-teams', playersWithoutTeams => {
            console.log('no teams :(');
            setPlayers(playersWithoutTeams)
        })
        socket.on('manual-teams', teams => {
            setTeams(teams)
        })
        setGameCode(sessionStorage.getItem('game-code'))
        //get players and gamecode
        
    }, [socket])

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return ( 
        <div className="flex flex-col bgNormal justify-center items-center h-screen">
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/></div>
                </div>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams? (<TeamComponent teams = {teams} activeTeam={activeTeam} activeIcon = {activeButton} playersWithoutTeams = {players} />) : (null)}
                </div>
                <div className='w-3/12'>
                {console.log(teams.map(t => console.log(t.teamName === activeTeam)))}
                {teams? <TeamPlayers teams = {teams.find(t => t.teamName == activeTeam)} activeTeam = {activeTeam} allTeams = {teams} status = {true} /> : null}
                </div>
            </div>
            <div className="text-center"><Button text = {'Start'} clickHandler = {() => clickHandler()} /></div>
        </div>
     );
}
 
export default manual;