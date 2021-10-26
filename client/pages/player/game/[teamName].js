import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import ExitGame from "../../../components/exitGame";
import { SocketContext } from "../../../context/socket/SocketContext";
import Button from '../../../components/Button'
import Wheel from '../../../components/wheel'
import SettingsAndBack from "../../../components/settingsAndBack";
import ConfirmLifeline from "../../../components/Players/confirmLifeline";

const game = () => {

    const router = useRouter()
    const { teamName } = router.query


    const [ruleBook, ruleBookClicked] = useState(false)
    const [settingsPressed, setSettingsPressed] = useState(false)
    const [players, setPlayers] = useState([])
    const [roundNo, setRoundNo] = useState(1)
    const [maxRounds, setMaxRounds] = useState(10)
    const [scene, setScene] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useContext(SocketContext)
    const [statement, setStatement] = useState('')
    const [player, setPlayer] = useState({})
    const [activePlayer, setActivePlayer] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [score, setScore] = useState(0)
    const [playerName, setPlayerName] = useState('')
    const [emotion, setEmotion] = useState('')
    const [isTimerOver, setIsTimerOver] = useState(false)
    const [timeFormat, setTimeFormat] = useState('')
    const [timeGuesserFormat, setTimeGuesserFormat] = useState('')
    const [active, setActive] = useState(false)
    const [counter, setCounter] = useState(90)
    const [guessCounter, setGuessCounter] = useState(180)
    const [gameCode, setGameCode] = useState('')
    const timerRef = useRef()
    const [currentRoundEmotion, setCurrentRoundEmotion] = useState('')
    const [status, setStatus] = useState('')
    const [confirmLifeline, setConfirmLifeline] = useState()

    useEffect(() => {
        setStatus(sessionStorage.getItem('status'))
        setPlayerName(sessionStorage.getItem('player-name'))
        const code = sessionStorage.getItem('game-code')
        setGameCode(sessionStorage.getItem('game-code'))  
        const teamName = sessionStorage.getItem('team-name')      
        socket.emit('join-team-room', {code, teamName })

        socket.on('team-players', players => {
            setPlayer(players.find(p => p.isRandomlySelected === true))    
            setPlayers(players)
            }
        )

        socket.on('current-round-emotion', emotion => setCurrentRoundEmotion(emotion))

        socket.on('team-round', roundNumber => {
            console.log(roundNumber);
            console.log(maxRounds);
            console.log(typeof(maxRounds));
            if(roundNumber > roundNo)
            {    
                sessionStorage.removeItem('type-counter')
                sessionStorage.removeItem('guess-counter')
            }
            if(roundNumber > maxRounds){
                console.log(roundNumber);
                router.push('/play')
            }
            setRoundNo(roundNumber)
        })

        socket.on('max-rounds', maxRounds => setMaxRounds(maxRounds))

        socket.on('active-player', activePlayer => setActivePlayer(activePlayer))
        
        socket.on('team-score', score => setScore(score))
        socket.on('scene', scene => setScene(scene))
        socket.on('team-messages', messages => setMessages(messages))
        socket.on('typing-counter', counter => {
            if(!sessionStorage.getItem('type-counter')){
                console.log(counter);
                setCounter(counter)}})
        socket.on('guessing-counter', counter => {
            if(!sessionStorage.getItem('guess-counter'))
            setGuessCounter(counter)})
        socket.on('team-disabled', bool => {
            setIsTimerOver(bool)
            if(bool)
                setCounter(0)
            setIsDisabled(bool)
        })

    }, [socket])

    useEffect(() => {

        

        if(sessionStorage.getItem('guess-counter'))
            setGuessCounter(Number(sessionStorage.getItem('guess-counter')))
        if(sessionStorage.getItem('type-counter')){
            setCounter(Number(sessionStorage.getItem('type-counter')))
        }
        if(!active)
        {
            if(counter !== 0){
            timerRef.current = setInterval(() => {
                    const secondCounter = counter % 60;
                    const minuteCounter = Math.floor(counter / 60);
                    const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                    const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
                    setTimeFormat(computedMinute + ':' + computedSecond)
                    sessionStorage.setItem('time-format', computedMinute + ':' + computedSecond)
                    setCounter(counter => counter - 1);
                    sessionStorage.setItem('type-counter', counter - 1)
            }, 1000)
            }
            else{
                sessionStorage.setItem('type-counter', 0)
                setIsDisabled(true)
                sessionStorage.setItem('is-disabled', JSON.stringify(true))
                setIsTimerOver(true)
                sessionStorage.setItem('is-time-over', JSON.stringify(true))
                if(guessCounter !== 0){
                    timerRef.current = setInterval(() =>{
                    const secondCounter = guessCounter % 60;
                    const minuteCounter = Math.floor(guessCounter / 60);
                    const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                    const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
                    setTimeGuesserFormat(computedMinute + ':' + computedSecond)
                    setGuessCounter(counter => counter - 1);
                    sessionStorage.setItem('guess-counter', guessCounter - 1)
                    }, 1000)
                }
                else{
                    const emotion = ''
                    socket.emit('guessed', {gameCode, teamName, emotion })
                    clearInterval(timerRef.current)
                    setTimeGuesserFormat('00:00')
                    setGuessCounter(0)
                    sessionStorage.setItem('guess-counter', 0)
                }
            }
        }
        return() => {
            clearInterval(timerRef.current)
        }
    }, [counter, active, guessCounter, socket])

    const guessEmotion = (e) => {
        setEmotion(e)
    }

    const clickHandler = () => {
        const gameCode = sessionStorage.getItem('game-code')
        sessionStorage.removeItem('is-disabled')
        sessionStorage.removeItem('is-time-over')
        sessionStorage.removeItem('type-counter')
        sessionStorage.removeItem('guess-counter')
        setIsTimerOver(false)
        socket.emit('guessed', {gameCode, teamName, emotion})
    }

    const onChangeHandler = (e) => {
        
        const gameCode = sessionStorage.getItem('game-code')
        setStatement(e.target.value)
        socket.emit('is-typing', {gameCode, teamName, playerName})
    }

    const onSubmit = () => {
        setStatement('')
        let message = messages.slice(0)
        message.push(statement)
        setIsTimerOver(true)
        setTimeFormat('0:00')
        setCounter(0)
        sessionStorage.setItem('type-counter', 0)
        socket.emit('submit-statement', {gameCode, teamName, message})
    }

    return ( 
        <div className="flex flex-column h-screen bgNormal">
            <div className="flex justify-end my-8">
                
            </div>
            <div className="flex flex-row px-8 pb-4" style={{flex:"1"}}>
                <div className="flex heading rounded-xl mx-2 flex-column items-center flex-1" style={{height:"80vh"}}>
                    {players.map((player, index) => (
                        <div className={player.name===activePlayer?"mt-4 p-2 burlywoodBorder rounded-lg":"mt-4 p-2"} key = {index}>
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke={player.name === activePlayer? "#dd6127" : "currentColor"}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                {player.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-column heading rounded-xl mx-2" style={{flex:"4", height:"80vh"}}>
                    <div className="flex justify-between rounded-t-xl ebaBg whiteText text-xl px-8 pt-4 flex-1">
                        <div>
                            Round {roundNo}/{maxRounds}                            
                        </div>
                        <div>
                            {isTimerOver? timeGuesserFormat : timeFormat}
                        </div>
                    </div>
                    <div className="flex flex-column-reverse overflow-y-auto" style={{flex:"9"}}>
                            {player.name === playerName && player.isRandomlySelected?
                            <div className='flex flex-row justify-between py-2 px-3'>
                                
                                <input placeholder='Be Careful! You can only submit one statement in a round.' className="ebaBg w-full input font-normal pl-2 border-2 rounded-lg ebaBorder whiteText h-8" value = {statement} onChange = {e => onChangeHandler(e)} disabled = {isDisabled? true: false} />
                                <button className='flex-1 ebaText h-full' onClick = {onSubmit} disabled = {isDisabled? true: false} > 
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                                : null}
                        <div className="flex-1 ml-4 overflow-y-auto scl pr-2">
                            <div className="inline-block w-full">
                                {messages.map((message, index) => (
                                    index % 2 !== 0?
                                        <div className="text-left my-1" key={index}>
                                            <h6 className='text-sm'>{scene.roleOne}</h6>
                                            <div className="mr-8 ebaBg whiteText inline-block px-4 py-2 rounded-t-md rounded-r-md">
                                                {message}
                                            </div>
                                        </div>
                                    :
                                        <div className="text-right my-1" key={index}>
                                            <h6 className='text-sm'>{scene.roleTwo}</h6>
                                            <div className="ml-8 ebaBg whiteText inline-block px-4 py-2 rounded-t-md rounded-l-md">
                                                {message}
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column mx-2 items-center" style={{flex:"4", height:"80vh"}}>
                    <div className="font-bold px-8 py-4 heading rounded-xl w-3/4 text-lg">
                        Scene: {scene.scene}
                    </div>
                    {player.isRandomlySelected && player.name === playerName? <div className='border-1 border-gray-500 rounded-full bg-gray-400 h-full w-full flex justify-center items-center  text-lg'>{currentRoundEmotion}</div> : <Wheel emotionFunction = {guessEmotion} /> }
                </div>
                <div className="flex flex-column mx-2 flex-1" style={{height:"80vh"}}>
                    <div className="font-bold flex p-2 heading rounded-lg text-lg">
                        {console.log(score)}
                        <div className="flex-1 h-16 whiteText text-6xl font-light flex justify-center items-center ebaBg rounded-lg">{score.toString().length>1?score.toString().slice(0,1):"0"}</div>
                        <div className="flex-1 h-16 whiteText text-6xl font-light flex justify-center items-center ml-2 ebaBg rounded-lg">{score.toString().slice(1,2)}</div>
                    </div>
                    <div className="h-full flex flex-column pt-2">
                        <div className="mt-2 text-sm rounded-md px-2 py-2 text-center font-bold buttonLifeline" onClick={() => setConfirmLifeline("This ot That")}>This or That</div>
                        <div className="mt-2 text-sm rounded-md px-2 py-2 text-center font-bold buttonLifeline" onClick={() => setConfirmLifeline("Delete a row")}>Delete a row</div>
                        <div className="my-2 text-sm rounded-md px-3 py-2 text-center font-bold buttonLifeline" onClick={() => setConfirmLifeline("Call the bot")}>Call the bot</div>
                        {player.name === playerName && player.isRandomlySelected? null:
                        <button className='buttonNew rounded-md px-3 py-2 mb-3 mt-4 text-lg font-bold text-center'
                        onClick = {() => clickHandler()} disabled = {!isDisabled} >Confirm</button>}
                        <div className="flex-1 heading rounded-xl pt-3">
                            <div className="text-center">Game Log</div>
                            <div className="scl overscroll-y-auto px-1 py-1">
                                {/* Put the logs here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end absolute bottom-4 right-0">
                <div className="buttonNew rounded font-bold py-2 px-4 mx-2 cursor-pointer">
                    Call host
                </div>
                <div className="buttonNew rounded font-bold py-2 px-4 mx-2 cursor-pointer" onClick={() => ruleBookClicked(true)}>
                    Rule Book
                </div>
                <div className="py-2 px-3 cursor-pointer">
                </div>
            </div>

            {ruleBook?
            <div className="flex justify-center h-screen w-screen burlywoodOverlay bg-opacity-50 overflow-hidden items-center absolute top-0 left-0 z-50">
                <div className="heading rounded-xl h-4/5 w-4/5 relative">
                    <div className="text-3xl cursor-pointer absolute top-6 right-8" onClick={() => ruleBookClicked(false)}>&times;</div>
                    <div className="text-center font-bold text-2xl mt-4">RULE BOOK</div>
                </div>
            </div>:<></>}

            {confirmLifeline?<ConfirmLifeline setConfirmLifeline={setConfirmLifeline} lifeLine={confirmLifeline}/>:<></>}
        </div>
     );
}

export default game;
