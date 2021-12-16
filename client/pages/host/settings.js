import {useContext, useEffect, useState} from "react"
import {useRouter} from "next/router"
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers"
import { SocketContext } from "../../context/socket/SocketContext"
import EndGame from "../../components/endGame"
import Head from 'next/head'


const settings = () => {

    const router = useRouter()
    const socket = useContext(SocketContext)
    const [numberOfRounds, setNumberOfRounds] = useState(10)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [guessingTime, setGuessingTime] = useState('')
    const [typingTime, setTypingTime] = useState('')
    const [guessingTimeInSeconds, setGuessingTimeInSeconds] = useState('')
    const [typingTimeInSeconds, setTypingTimeInSeconds] = useState('')

    useEffect(() => {
        document.getElementById('focusDiv').focus()
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
        <div className="flex flex-row justify-center h-screen w-screen bgNormal" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && continueGame()} id={'focusDiv'}>
            <Head>
                <title>Emo-G | Settings</title>
                <meta name="description" content="Emo-G" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <SettingsAndBack link = '/play' /> */}
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>
                <div className="heading w-80 px-8 py-8 rounded-2xl">
                    <div className="pr-4 font-bold text-xl">Set Timer</div>
                    <br/>
                    <div className="container-fluid my-2 text-lg">
                        <div className="row">
                            <div className="col-6 ebaText p-0">Guessing time</div>
                            <div className="col-6 ebaText p-0">
                                <input type="number"
                                min="1"
                                max="10"
                                onChange = {e => onChangeHandlerInMinutes(e)}
                                value = {guessingTime}
                                className={`ml-1 text-center w-14 counterInput`}
                                name = "guess"
                                />
                                <input type = "number"
                                min="1"
                                max="60"
                                className={`ml-1 text-center w-14 counterInput`}
                                onChange = {e => onChangeHandlerInSeconds(e)}
                                value = {guessingTimeInSeconds}
                                name = "guessInSeconds"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-2 text-lg container-fluid">
                        <div className="row">
                            <div className="col-6 ebaText font-normal p-0">Typing time</div>
                            <div className="col-6 ebaText p-0">
                                <input 
                                type="number" 
                                min='1' 
                                max='10'
                                value={typingTime} 
                                className={`ml-1 text-center w-14 counterInput`}
                                name = 'type'
                                onChange = {e => onChangeHandlerInMinutes(e)}
                                />
                                <input 
                                type="number" 
                                min='1' 
                                max='60'
                                value={typingTimeInSeconds} 
                                className={`ml-1 text-center w-14 counterInput`}
                                name = 'type'
                                onChange = {e => onChangeHandlerInSeconds(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="font-bold text-xl">Rounds</div>
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6 ebaText text-lg font-normal p-0">
                                No. of rounds
                            </div>
                            <div className="col-6 ebaText p-0">
                                <input 
                                value={numberOfRounds} 
                                onChange={event => setNumberOfRounds(event.target.value)} 
                                type="number" min="2" 
                                placeholder = 'Set Number of Rounds' 
                                className={'ml-1 text-center h-7 w-14 counterInput'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center"><button onClick={continueGame} className="buttonNew rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
            <EndGame />
        </div>
     );
}

export default settings;