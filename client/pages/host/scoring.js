import { useContext, useEffect, useState } from "react";
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";
import { SocketContext } from "../../context/socket/SocketContext";

const Scoring = () => {

    const [gameCode, setGameCode] = useState("696969")
    const [numberOfPlayers, setNumberOfPlayers] = useState(10)
    
    const [otherCorrect, setOtherCorrect] = useState(2)
    const [otherIncorrect, setOtherIncorrect] = useState(0)
    const [otherAdjacent, setOtherAdjacent] = useState(1)
    const [compoundCorrect, setCompoundCorrect] = useState(3)
    const [compoundIncorrect, setCompoundIncorrect] = useState(0)

    const router = useRouter()
    const socket = useContext(SocketContext)
    useEffect(() => {
        setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('join-score-settings', sessionStorage.getItem('game-code'))
        socket.on('players', players => setNumberOfPlayers(players.length))
    })

    const clickHandler = () => {
        socket.emit('Score-Settings', {compoundCorrect, compoundIncorrect, otherCorrect, otherIncorrect, otherAdjacent, gameCode})
        router.push('/host/teams')
    }


    return ( 
        <div className="flex flex-row bgNormal justify-center h-screen">

            <div className="flex flex-col justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />

                <div className="bg-gray-200 flex justify-around items-center h-1/2" style={{width:"50vw"}}>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Other Emotion</div>
                        <div className="text-2xl flex justify-between">
                            <div>Correct Guess:</div>
                            <input type="number" value={otherCorrect} onChange={(event) => setOtherCorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                        <div className="text-2xl flex justify-between">
                            <div>Adjacent Cell:</div>
                            <input type="number" value={otherAdjacent} onChange={(event) => setOtherAdjacent(event.target.value)} className="ml-4 w-16"/>
                        </div>
                        <div className="text-2xl flex justify-between">
                            <div>Incorrect Guess:</div>
                            <input type="number" value={otherIncorrect} onChange={(event) => setOtherIncorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Compound Emotion</div>
                        <div className="text-2xl flex justify-between">
                            <div>Correct Guess:</div>
                            <input type="number" value={compoundCorrect} onChange={(event) => setCompoundCorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                        <div className="text-2xl flex justify-between">
                            <div>Incorrect Guess:</div>
                            <input type="number" value={compoundIncorrect} onChange={(event) => setCompoundIncorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                    </div>
                </div>

                <div className="text-center"><button onClick={() => clickHandler()} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-lg font-bold">Continue</button></div>
            </div>
        </div>
     );
}
 
export default Scoring;
