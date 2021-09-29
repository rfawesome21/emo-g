import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
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
    const [playerIcon, deletePlayer] = useState()
    const [activeTeam, setActiveTeam] = useState(1)
    const [players, setPlayers] = useState([])
    useEffect(() => {
        let isMounted = true
        if(isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        //get players and gamecode
        socket.emit('random-division', sessionStorage.getItem('game-code'))
        socket.on('random-teams', teams => {
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
        return () => {
            isMounted = false
        }
    }, [socket])

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return ( 
        <div className="flex flex-col justify-center items-center" style={{height:"100vh"}}>
            <SettingsAndBack link = {'/host/teams'} />
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams? (<TeamComponent teams = {teams} activeIcon = {activeButton} playersWithoutTeams = {players} />) : (null)}
                </div>
                <div className='w-3/12'>
                {console.log(teams.map(t => console.log(t.teamName === activeTeam)))}
                {teams? <TeamPlayers teams = {teams.filter(t => t.teamName == activeTeam)} activeTeam = {activeTeam} allTeams = {teams} /> : null}
                </div>
            </div>
            <div className="text-center"><Button text = {'Start'} /></div>
            {
            playerIcon?
            <div className="bg-gray-200 border-2 border-black cursor-pointer" style={{position:"absolute", top:playerIcon.y, left:playerIcon.x, zIndex:2}}>
                <div>Remove Player</div>
                <div onClick={() => deletePlayer(undefined)}>Back</div>  
            </div>:<></>}
        </div>
     );
}
 
export default random;