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

const hostDashboard = () => {

    const [numberOfRounds, setNumberOfRounds] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [guessingTime, setGuessingTime] = useState('')
    const [typingTime, setTypingTime] = useState('')
    const [guessingTimeInSeconds, setGuessingTimeInSeconds] = useState('')
    const [typingTimeInSeconds, setTypingTimeInSeconds] = useState('')
    const [disableRounds, setDisableRounds] = useState(true)

    const [selected, setSelected] = useState("emotion")
    const [emotionArray, setEmotionArray] = useState(["Hate", "Love", "Greed", "Jealous"])
    const [playersWithoutTeams, setPlayers] = useState([{name: "Player 1"}, {name: "Player 2"}, {name: "Player 3"}, {name: "Player 4"}, {name: "Player 5"}, {name: "Player 6"}])
    const [teams, setTeams] = useState([{teamName:"Team 01", call:true}, {teamName:"Team 02"}, {teamName:"Team 03"}])
    const [players, setPlayer] = useState(["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"])
    const [roundResults, setRoundResult] = useState(["Angry", "Happy", "Annoyed", "Excited", "Cool", "", "", "", "", ""])


    return ( <div className="flex flex-row">
        
        <Sidebar selected={selected} setSelected={setSelected}/>

        <RuleBook />
         
        <div style={{flex:9}}>



            {selected==="timeRound"?
// timeround            
            
            
            <TimeRound setDisabled={setDisabled} onChangeHandlerInMinutes={onChangeHandlerInMinutes} guessingTime={guessingTime} disabled={disabled} guessingTimeInSeconds={guessingTimeInSeconds} typingTime={typingTime} typingTimeInSeconds={typingTimeInSeconds} setDisableRounds={setDisableRounds} onChangeHandlerInSeconds={onChangeHandlerInSeconds} disableRounds={disableRounds} continueGame={continueGame}/>:



            selected==="scene"?
// scene
            <Scene />:



            selected==="emotion"?
// emotion
            <Emotion emotionArray={emotionArray} Wheel={<Wheel />}/>:


            selected==="scoring"?
// scoring 
            
            
            <Scoring />:



            selected==="teams"?
// teams 
            
            
            <Teams teams={teams} players={players} roundResults={roundResults}/>:


// lobby 
            <div className="flex justify-center items-center h-screen">
                <PlayerComponent players = {playersWithoutTeams} teams = {teams} />
            </div>}
        </div>
    </div> );
}
 
export default hostDashboard;