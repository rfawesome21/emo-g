import {useContext, useEffect, useState} from "react"
import {useRouter} from "next/router"
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers"
import SettingsAndBack from "../../components/settingsAndBack"
import styles from '../../styles/Settings.module.css'
import { SocketContext } from "../../context/socket/SocketContext"

const settings = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfRounds, setNumberOfRounds] = useState(6)
    const [numberOfPlayers, setNumberOfPlayers] = useState(20)
    const [gameCode, setGameCode] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [guessingTime, setGuessingTime] = useState('03')
    const [typingTime, setTypingTime] = useState('01')
    const [guessingTimeInSeconds, setGuessingTimeInSeconds] = useState('00')
    const [typingTimeInSeconds, setTypingTimeInSeconds] = useState('30')
    
    useEffect(() => {
        socket.emit('create-game')
        socket.on('Room-code', code => setGameCode(code))
        socket.on('Players', players => setNumberOfPlayers(players))

    }, [])

    const onChangeHandlerInMinutes = (e) => {
        e.target.name === 'guess'? setGuessingTime(e.target.value) : setTypingTime(e.target.value)
    }
    const onChangeHandlerInSeconds = (e) => {
        e.target.name === 'guessInSeconds'? setGuessingTimeInSeconds(e.target.value) : setTypingTimeInSeconds(e.target.value)
    }

    return ( 
        <div className="flex flex-row justify-center h-screen">
            <SettingsAndBack />
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

                            />
                            <input type = "number"
                            min="1"
                            max="60"
                            onChange = {e => onChangeHandlerInSeconds(e)}
                            value = {guessingTimeInSeconds}
                            disabled={disabled? true:false}
                            />
                        </div>
                        <div className="flex justify-between ml-4 my-2 text-lg">Typing time <input 
                                                                                            type="number" 
                                                                                            min='01:00' 
                                                                                            max='10:00'
                                                                                            value={typingTime} 
                                                                                            className={`ml-4`}
                                                                                            disabled={disabled? true:false}
                                                                                            name = 'type'
                                                                                            onChange = {e => onChangeHandlerInMinutes(e)}
                                                                                            />
                                                                                            <input 
                                                                                            type="number" 
                                                                                            min='01:00' 
                                                                                            max='10:00'
                                                                                            value={typingTimeInSeconds} 
                                                                                            className={`ml-4 ${styles.input}`}
                                                                                            disabled={disabled? true:false}
                                                                                            name = 'type'
                                                                                            onChange = {e => onChangeHandlerInSeconds(e)}
                                                                                            />
                                                                                            </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between bg-gray-200 px-4 py-4">
                    <div className="font-bold text-xl">Number of rounds</div>
                    <div className="text-xl"><input type="checkbox" className="form-checkbox"/> 10 Rounds</div>
                    <div className="text-xl"><input type="checkbox" className="form-checkbox"/> <input value={numberOfRounds} onChange={event => setNumberOfRounds(event.target.value)} type="number" min="6" style={{width:"4rem"}} className="border-2"/></div>
                </div>
                <div className="text-center"><button onClick={() => router.push("/hostScreen2")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
        </div>
     );
}

export default settings;