import {useContext, useEffect, useState} from "react"
import {useRouter} from "next/router"
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers"
import SettingsAndBack from "../../components/settingsAndBack"
import styles from '../../styles/Settings.module.css'
import { SocketContext } from "../../context/socket/SocketContext"

const settings = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfRounds, setNumberOfRounds] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [guessingTime, setGuessingTime] = useState('')
    const [typingTime, setTypingTime] = useState('')
    const [guessingTimeInSeconds, setGuessingTimeInSeconds] = useState('')
    const [typingTimeInSeconds, setTypingTimeInSeconds] = useState('')
    const [disableRounds, setDisableRounds] = useState(true)

    useEffect(() => {
        let isMounted = true
        sessionStorage.setItem('status', 1)
        socket.emit('create-game')
        socket.on('Room-code', code => {
            sessionStorage.setItem('game-code', code)
            if(isMounted)
                setGameCode(code)}
        )
        socket.on('players', players => {
            console.log(players);
            if(isMounted)
                setNumberOfPlayers(players.length)
        })
        socket.on('guessing-timer', guessTime => {
            let secondArr = guessTime.split(':')
            if(isMounted){
                setGuessingTime(secondArr[0])
                setGuessingTimeInSeconds(secondArr[1])
            }
        })
        socket.on('typing-timer', typeTime => {
            let secondArr = typeTime.split(':')
            if(isMounted){
                setTypingTime(secondArr[0])
                setTypingTimeInSeconds(secondArr[1])
            }
        })
        return () => {
            isMounted = false
        }
    }, [socket])

    const continueGame = () => {
        const guesser = `${guessingTime}:${guessingTimeInSeconds}`
        const typer = `${typingTime}:${typingTimeInSeconds}`
        socket.emit('set-time', {guesser, typer, gameCode})
        const MAX_ROUND = numberOfRounds
        socket.emit('no-of-rounds', {MAX_ROUND, gameCode} )
        router.push('/host/scenes')
    }

    const onChangeHandlerInMinutes = (e) => {
        e.target.name === 'guess'? setGuessingTime(e.target.value) : setTypingTime(e.target.value)
    }
    const onChangeHandlerInSeconds = (e) => {
        e.target.name === 'guessInSeconds'? setGuessingTimeInSeconds(e.target.value) : setTypingTimeInSeconds(e.target.value)
    }

    return ( 
        <div className="flex flex-row justify-center h-screen">
            <SettingsAndBack link = '/play' />
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>
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
        </div>
     );
}

export default settings;