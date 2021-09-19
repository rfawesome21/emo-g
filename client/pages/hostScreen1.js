import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import SendCodeToInvitePlayers from "../components/sendCodeToInvitePlayers"
import SettingsAndBack from "../components/settingsAndBack"

const hostScreen1 = () => {

    const router = useRouter()

    const [numberOfRounds, setNumberOfRounds] = useState(6)
    const [numberOfPlayers, setNumberOfPlayers] = useState(20)
    const [gameCode, setGameCode] = useState("LN69ASX")

    useEffect(() => {
        //get players and gamecode 
    }, [])

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <SettingsAndBack />
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>
                <div className="flex flex-row justify-between bg-gray-200 px-4 py-4">
                    <div className="pr-4  font-bold text-xl">Set Timer</div>
                    <div className="px-4 text-xl"><input type="checkbox" className="form-checkbox"/> Default</div>
                    <div className="pl-4">
                        <div className="text-xl"><input type="checkbox" className="form-checkbox"/> Manual</div>
                        <div className="flex justify-between ml-4 my-2 text-lg">Guessing time <input type="time" className="ml-4"/></div>
                        <div className="flex justify-between ml-4 my-2 text-lg">Typing time <input type="time" className="ml-4"/></div>
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
 
export default hostScreen1;