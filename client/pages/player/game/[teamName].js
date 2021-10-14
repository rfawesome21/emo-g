import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import ExitGame from "../../../components/exitGame";
import { SocketContext } from "../../../context/socket/SocketContext";
import Button from '../../../components/Button'
import Wheel from '../../../components/wheel'
const Game = () => {

    const router = useRouter()
    const { teamName } = router.query


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

    useEffect(() => {
        setPlayerName(sessionStorage.getItem('player-name'))
        const teamName = sessionStorage.getItem('team-name')
        const code = sessionStorage.getItem('game-code')
        setGameCode(sessionStorage.getItem('game-code'))        
        socket.emit('join-team-room', {code, teamName })

        socket.on('team-players', players => {
            setPlayer(players.find(p => p.isRandomlySelected === true))    
            setPlayers(players)
            }
        )

        socket.on('current-round-emotion', emotion => setCurrentRoundEmotion(emotion))

        socket.on('team-round', roundNumber => {
            if(roundNumber > roundNo)
            {    
                sessionStorage.removeItem('type-counter')
                sessionStorage.removeItem('guess-counter')
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
        <div className="flex flex-column h-screen">
            <div className="flex justify-end py-2">
                <div className="bg-gray-200 font-bold py-2 px-4 mx-2 cursor-pointer">
                    Call host
                </div>
                <div className="bg-gray-200 font-bold py-2 px-4 mx-2 cursor-pointer">
                    Rule Book
                </div>
                <div className="py-2 px-4 cursor-pointer mr-8">
                    <div onClick={() => setSettingsPressed(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-row px-8 pb-4" style={{flex:"1"}}>
                <div className="flex bg-gray-200 mx-2 flex-column items-center" style={{flex:"1", height:"80vh"}}>
                    {players.map((player, index) => (
                        <div className="mt-4" key = {index}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke={player.name === activePlayer? "#dd6127" : "currentColor"}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                {player.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-column bg-gray-200 mx-2" style={{flex:"4", height:"80vh"}}>
                    <div className="font-bold flex justify-between bg-gray-300 text-lg px-8 py-4" style={{flex:"1"}}>
                        <div>
                            Round {roundNo}/{maxRounds}                            
                        </div>
                        <div>
                            {isTimerOver? timeGuesserFormat : timeFormat}
                        </div>
                    </div>
                    <div className="flex flex-column-reverse overflow-y-auto scl" style={{flex:"9"}}>
                            {player.name === playerName && player.isRandomlySelected?
                            <div className='flex flex-row justify-between'>
                                
                                <input placeholder='Be Careful! You can only submit one statement in a round.' className="bg-transparent w-full border-2 border-gray-700 " value = {statement} onChange = {e => onChangeHandler(e)} disabled = {isDisabled? true: false} />
                                <button className='flex-1 h-full border-2 border-black' onClick = {onSubmit} disabled = {isDisabled? true: false} > Submit </button>
                            </div>
                                : null}
                        <div className="flex-1 ml-4 overflow-y-scroll scl">
                            <div className="inline-block w-full">
                                {messages.map((message, index) => (
                                    index % 2 !== 0?
                                        <div className="text-left my-1" key={index}>
                                            <h6 className='text-sm'>{scene.roleOne}</h6>
                                            <div className="mr-8 bg-gray-400 inline-block px-4 py-2 rounded-t-md rounded-r-md">
                                                {message}
                                            </div>
                                        </div>
                                    :
                                        <div className="text-right my-1" key={index}>
                                            <h6 className='text-sm'>{scene.roleTwo}</h6>
                                            <div className="ml-8 bg-gray-400 inline-block px-4 py-2 rounded-t-md rounded-l-md">
                                                {message}
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column mx-2 items-center" style={{flex:"4", height:"80vh"}}>
                    <div className="font-bold px-8 py-4 bg-gray-400 text-lg">
                        Scene: {scene.scene}
                    </div>
                    {player.isRandomlySelected && player.name === playerName? <div className='border-1 border-gray-500 rounded-full bg-gray-400 h-full w-full flex justify-center items-center font-bold text-2xl'>{currentRoundEmotion}</div> : <Wheel emotionFunction = {guessEmotion} /> }
                </div>
                <div className="flex flex-column mx-2" style={{flex:"1", height:"80vh"}}>
                    <div className="font-bold px-8 py-9 bg-gray-300 text-lg">
                        {score}
                    </div>
                    <div className="h-full flex flex-column">
                        <div className="bg-gray-200 border-2 border-black text-sm my-3 rounded-xl px-4 py-3 text-center font-bold">This or That</div>
                        <div className="bg-gray-200 border-2 border-black text-sm my-3 rounded-xl px-4 py-3 text-center font-bold">Delete a row</div>
                        <div className="bg-gray-200 border-2 border-black text-sm my-3 rounded-xl px-4 py-3 text-center font-bold">Call the bot</div>
                    </div>
                    {player.name === playerName && player.isRandomlySelected? null:
                    <button className='bg-gray-200 border-2 border-black rounded-md px-2 py-1 mt-3 w-auto text-lg font-bold self-center'
                    onClick = {() => clickHandler()} disabled = {!isDisabled} >Confirm</button>}
                </div>
            </div>

            {settingsPressed?<ExitGame cancelPress={setSettingsPressed}/>:<></>}

        </div>
     );
}

export default Game;
