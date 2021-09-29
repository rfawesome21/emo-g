import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PlayerComponent from "../../components/Host/PlayerComponent";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
import TeamPlayers from "../../components/TeamPlayers";
// import styles from "../css/hostScreen.module.css"

const choice = () => {

    const router = useRouter()

    const [numberOfPlayers, setNumberOfPlayers] = useState(20)
    const [gameCode, setGameCode] = useState("")

    const [players, setPlayers] = useState([])
    const [playerIcon, deletePlayer] = useState()
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState(1)



    useEffect(() => {
        setGameCode(sessionStorage.getItem('game-code'))
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

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return ( 
        <div className="flex flex-col justify-center items-center" style={{height:"100vh"}}>
            <SettingsAndBack link = {'/host/teams'} />
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams? (<TeamComponent teams = {teams} activeIcon = {activeButton} player={true}/>) : (null)}
                </div>
                <div className='w-3/12'>
                {console.log(teams.map(t => console.log(t.teamName === activeTeam)))}
                {teams? <TeamPlayers teams = {teams.filter(t => t.teamName == activeTeam)} activeTeam = {activeTeam} allTeams = {teams} player={true}/> : null}
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
 
export default choice;