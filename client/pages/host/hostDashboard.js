import { useContext, useEffect, useState } from "react"
import PlayerComponent from "../../components/Host/PlayerComponent"
import RuleBook from "../../components/RuleBook"
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers"
import Sidebar from "../../components/Host/Sidebar"
import Wheel from "../../components/wheel"
import TimeRound from "../../components/Host/Timeround"
import Scene from "../../components/Host/Scene"
import Emotion from "../../components/Host/Emotion"
import Scoring from "../../components/Host/Scoring"
import Teams from "../../components/Host/Teams"
import { SocketContext } from "../../context/socket/SocketContext"

const hostDashboard = () => {

    const socket = useContext(SocketContext)
    const [guessingTime, setGuessingTime] = useState('')
    const [typingTime, setTypingTime] = useState('')
    const [scene, setScene] = useState('')
    const [selected, setSelected] = useState("emotion")
    const [emotionArray, setEmotionArray] = useState(["Hate", "Love", "Greed", "Jealous"])
    const [playersWithoutTeams, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [rounds, setMaxRounds] = useState(10)

    useEffect(() => {
           socket.emit('host-dashboard', sessionStorage.getItem('game-code'))
           socket.on('team-details', teams => {setTeams(teams)})
           socket.on('game-scenes', scene => setScene(scene))
           socket.on('typing-timer', typingTimer => setTypingTime(typingTimer))
           socket.on('guessing-timer', guessingTimer => setGuessingTime(guessingTimer))
           socket.on('player-without-teams', players => setPlayers(players))
           socket.on('emotions', emotions => setEmotionArray(emotions) )
           socket.on('max-round', maxRound => setMaxRounds(maxRound))
    },  [socket])


    return ( <div className="flex flex-row">

        <Sidebar selected={selected} setSelected={setSelected}/>

        <RuleBook />
         
        <div style={{flex:9}}>



            {selected==="timeRound"?
// timeround            
            <TimeRound typingTime = {typingTime} guessingTime={guessingTime} MAX_ROUND = {rounds} />:

            selected==="scene"?
// scene
            <Scene scene = {scene} />:

            selected==="emotion"?
// emotion
            <Emotion emotionArray={emotionArray} Wheel={<Wheel />}/>:

            selected==="scoring"?
// scoring 
            <Scoring />:

            selected==="teams"?
// teams     
            <Teams teams={teams} />:

// lobby 
            <div className="flex justify-center items-center h-screen">
                <PlayerComponent players = {playersWithoutTeams} teams = {teams} />
            </div>}
        </div>
    </div> );
}
 
export default hostDashboard;