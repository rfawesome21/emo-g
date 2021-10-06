import { useContext, useEffect, useState } from "react"
import PlayerComponent from "../../components/Host/PlayerComponent"
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers"
import { SocketContext } from "../../context/socket/SocketContext"

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
    const socket = useContext(SocketContext)
    const [selected, setSelected] = useState("teams")
    const [ruleBook, ruleBookClicked] = useState(false)
    const [playersWithoutTeams, setPlayers] = useState([{name: "Player 1"}, {name: "Player 2"}, {name: "Player 3"}, {name: "Player 4"}, {name: "Player 5"}, {name: "Player 6"}])
    const [teams, setTeams] = useState([{teamName:"Team 01", call:true}, {teamName:"Team 02"}, {teamName:"Team 03"}])
    const [players, setPlayer] = useState(["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"])
    const [roundResults, setRoundResult] = useState(["Angry", "Happy", "Annoyed", "Excited", "Cool", "", "", "", "", ""])


    return ( <div className="flex flex-row">
        <div className="flex bg-gray-300 flex-column justify-between items-center font-bold text-xl h-screen" style={{flex:2}}>
            <div className="flex flex-column justify-evenly items-center w-full" style={{minHeight:"50vh"}}>
                <div onClick={() => setSelected("timeRound")} className={selected==="timeRound"?"bg-gray-400 w-full p-4 cursor-pointer text-center":"w-full cursor-pointer p-4 text-center"}>Time-Round</div>
                <div onClick={() => setSelected("scene")} className={selected==="scene"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Scene</div>
                <div onClick={() => setSelected("emotion")} className={selected==="emotion"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Emotion</div>
                <div onClick={() => setSelected("scoring")} className={selected==="scoring"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Scoring</div>
                <div onClick={() => setSelected("teams")} className={selected==="teams"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Teams</div>
                <div onClick={() => setSelected("lobby")} className={selected==="lobby"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Lobby</div>
            </div>
            <div className="mb-8">
                <span className="px-4 bg-red-400 py-2 cursor-pointer">END GAME</span>
            </div>
        </div>
        <div className="px-4 py-2 bg-gray-200 text-lg font-bold cursor-pointer" style={{position:"absolute", top:"2rem", right:"2rem"}} onClick={() => ruleBookClicked(true)}>
            Rule Book
        </div>  
        <div style={{flex:9}}>



            {selected==="timeRound"?
// timeround            
            
            
            <div className="flex flex-row justify-center h-screen items-center">
            <div className="flex flex-column justify-evenly h-3/4">
                <div className="flex flex-row justify-between bg-gray-200 px-4 py-4">
                    <div className="pr-4  font-bold text-xl">Set Timer</div>
                    <div className="px-4 text-xl"><input type="radio" name="mode" defaultChecked onClick = {() => setDisabled(true)} /> Default</div>
                    <div className="pl-4">
                        <div className="text-xl"><input type="radio" name="mode" onClick = {() => setDisabled(false)} /> Manual</div>
                        <div className="flex justify-between ml-4 my-2 text-lg">
                            Guessing time 
                            <input type="number"
                            min="1"
                            max="10"
                            onChange = {e => onChangeHandlerInMinutes(e)}
                            value = {guessingTime}
                            disabled={disabled? true:false}
                            className={disabled?`ml-1 text-center disabled:opacity-50 bg-gray-500 w-14 text-blue-100` : 'ml-1 text-center w-14'}
                            name = "guess"
                            />
                            <input type = "number"
                            min="1"
                            max="60"
                            className={disabled?`ml-1 text-center disabled:opacity-50 bg-gray-500 w-14 text-blue-100` : 'ml-1 text-center w-14'}
                            onChange = {e => onChangeHandlerInSeconds(e)}
                            value = {guessingTimeInSeconds}
                            disabled={disabled? true:false}
                            name = "guessInSeconds"
                            />
                            mins
                        </div>
                        <div className="flex justify-between ml-4 my-2 text-lg">
                            Typing time 
                            <input 
                            type="number" 
                            min='1' 
                            max='10'
                            value={typingTime} 
                            className={disabled?`ml-6 text-center disabled:opacity-50 bg-gray-500 w-14 text-blue-100` : 'ml-6 text-center w-14'}
                            disabled={disabled? true:false}
                            name = 'type'
                            onChange = {e => onChangeHandlerInMinutes(e)}
                            />
                            <input 
                            type="number" 
                            min='1' 
                            max='60'
                            value={typingTimeInSeconds} 
                            className={disabled?`ml-1 text-center disabled:opacity-50 bg-gray-500 w-14 text-blue-100` : 'ml-1 text-center w-14'}
                            disabled={disabled? true:false}
                            name = 'type'
                            onChange = {e => onChangeHandlerInSeconds(e)}
                            />
                            mins
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between bg-gray-200 px-4 py-4">
                    <div className="font-bold text-xl">Number of rounds</div>
                    <div className="text-xl">
                        <input type="radio" 
                        name="round" 
                        className="form-checkbox"
                        defaultChecked
                        onClick = {() => setDisableRounds(true)}
                        /> 
                        10 Rounds(Default)
                        </div>
                    <div className="text-xl">
                        <input 
                        type="radio" 
                        name="round" 
                        className="form-checkbox"
                        onClick = {() => setDisableRounds(false)}
                        /> 
                        <input 
                        value={numberOfRounds} 
                        onChange={event => setNumberOfRounds(event.target.value)} 
                        type="number" min="6" 
                        style={{width:"10rem"}}
                        placeholder = 'Set Number of Rounds' 
                        disabled={disableRounds?true:false}
                        className={disableRounds? 'border-2 bg-gray-300 text-black text-sm' : 'border-2 text-sm'}
                        />
                    </div>
                </div>
                <div className="text-center"><button onClick={continueGame} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
        </div>:



            selected==="scene"?
// scene
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="text-3xl mb-12 font-bold">Scene</div>
                    <div className="text-2xl font-bold">Angry father is pissed with his daughter putting pinepapples on pizza</div>
                </div>
            </div>:



            selected==="emotion"?
// emotion
            <div>
                Abishek is working on it
            </div>:


            selected==="scoring"?
// scoring 
            
            
            <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200 flex justify-around items-center h-1/2 w-1/2">
                    <div>
                        <div className="text-2xl mb-8 font-bold">Other Emotion</div>
                        <div className="text-2xl">Correct Guess: 02</div>
                        <div className="text-2xl">Adjacent Cell: 01</div>
                        <div className="text-2xl">Incorrect Guess: 00</div>
                    </div>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Compound Emotion</div>
                        <div className="text-2xl">Correct Guess: 03</div>
                        <div className="text-2xl">Incorrect Guess: 00</div>
                    </div>
                </div>
            </div>:



            selected==="teams"?
// teams 
            
            
            <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200 h-2/3 w-4/5 flex">
                    <div className="px-4 py-2" style={{flex:6}}>
                        <div className="my-2 px-4 py-2 font-bold text-xl bg-gray-400 flex justify-between items-center">
                            <div>Team</div>
                            <div className="text-gray-500 ml-8">Players</div>
                            <div className="text-gray-500">Rounds</div>
                            <div className="text-gray-500">Points</div>
                            <div></div>
                        </div>
                        {teams?teams.map((team) => (<div className="my-2 px-4 py-2 font-bold text-xl bg-gray-300 flex justify-between items-center">
                            <div>{team.teamName}</div>
                            <div className="text-gray-400">4 Players</div>
                            <div className="text-gray-400">6/10</div>
                            <div className="text-gray-400">03</div>
                            {team.call?<div className="rounded-full bg-red-700 h-4 w-4"></div>:<div className="rounded-full bg-gray-300 h-4 w-4"></div>}
                        </div>)):<></>}
                    </div>
                    <div className="" style={{flex:4}}>
                        <div className="flex justify-around items-center text-xl bg-gray-300 font-bold h-1/4">
                            <div>
                                <div>Team 02</div>
                                <div className="text-base">4 Members</div>
                            </div>
                            <div className="bg-gray-400 px-2 py-1">JOIN</div>
                        </div>
                        <div className="flex h-3/4">
                            <div className="bg-gray-400 h-full overflow-y-auto" style={{flex:3}}>
                                {players?players.map((player) => (
                                    <div className ="my-4 text-center">
                                        <div className="rounded-full mx-auto bg-gray-200 h-16 w-16"></div>
                                        <div>{player}</div>
                                    </div>
                                )):<></>}
                            </div>
                            <div className="h-full p-4 py-2 text-lg overflow-y-auto" style={{flex:7}}>
                                {roundResults?roundResults.map((result, index) => (
                                    <div className="my-2"><b>Round {index+1}: </b>{result}</div>
                                )):<></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>:


// lobby 
            <div className="flex justify-center items-center h-screen">
                <PlayerComponent players = {playersWithoutTeams} teams = {teams} />
            </div>}
        </div>

{/* Rule book */}
        {ruleBook?<div className="flex justify-center h-screen w-screen bg-black bg-opacity-50 overflow-hidden items-center" style={{position:"absolute", top:"0", left:"0"}}>
            <div className="bg-red-200 h-4/5 w-4/5 relative">
                <div className="text-3xl cursor-pointer" style={{position:"absolute", top:"2rem", right:"2rem"}} onClick={() => ruleBookClicked(false)}>&times;</div>
                <div className="text-center font-bold text-2xl mt-4">RULE BOOK</div>
            </div>
        </div>:<></>}
    </div> );
}
 
export default hostDashboard;