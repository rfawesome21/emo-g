import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "../../context/socket/SocketContext";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
import TeamPlayers from "../../components/TeamPlayers";
// import styles from "../css/hostScreen.module.css"

const random = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState(1)
    const [players, setPlayers] = useState([])
    const clickHandler = () => {
        socket.emit('come-to-scene', sessionStorage.getItem('game-code'))
        socket.on('scene-page', () => router.push('/scene'))
    }

    useEffect(() => {
        let isMounted = true
        if(isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        //get players and gamecode
        socket.emit('random-division', sessionStorage.getItem('game-code'))
        socket.on('random-teams', teams => {
            console.log(teams);
            if(isMounted)
                setTeams(teams)
        })
        socket.on('players', players => {
            if(isMounted)
                setNumberOfPlayers(players.length)
        })
        socket.on('players-without-teams', playersWithoutTeams => {
            console.log('no teams :(');
            if(isMounted)
                setPlayers(playersWithoutTeams)
        })
        socket.on('teams', teams => {
            console.log(teams);
            setTeams(teams)})

        return () => {
            isMounted = false
        }
    }, [socket])

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return ( 
        <div className="flex flex-col justify-center items-center h-screen bgNormal">
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/></div>
                </div>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams? (<TeamComponent teams = {teams} activeIcon = {activeButton} playersWithoutTeams = {players} />) : (null)}
                </div>
                <div className='w-3/12'>
                    {teams? <TeamPlayers teams = {teams.find(t => t.teamName == activeTeam)} activeTeam = {activeTeam} allTeams = {teams} status = {true} /> : null}
                </div>
            </div>
            <div className="text-center"><Button text = {'Start'} clickHandler = {() => clickHandler()} /></div>
        </div>
     );
}
 
export default random;