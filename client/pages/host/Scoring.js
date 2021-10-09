import { useState } from "react";
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";

const Scoring = () => {

    const [gameCode, setGameCode] = useState("696969")
    const [numberOfPlayers, setNumberOfPlayers] = useState(10)

    const router = useRouter()


    const [otherCorrect, setOtherCorrect] = useState()
    const [otherIncorrect, setOtherInorrect] = useState()
    const [otherAdjacent, setOtherAdjacent] = useState()

    const [compoundCorrect, setCompoundCorrect] = useState()
    const [compoundIncorrect, setCompoundInorrect] = useState()

    return ( 
        <div className="flex flex-row justify-center h-screen">
            <SettingsAndBack link='/host/settings' />

            <div className="flex flex-col justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />

                <div className="bg-gray-200 flex justify-around items-center h-1/2" style={{width:"50vw"}}>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Other Emotion</div>
                        <div className="text-2xl flex justify-between">
                            <div>Correct Guess:</div>
                            <input value={otherCorrect} onChange={(event) => setOtherCorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                        <div className="text-2xl flex justify-between">
                            <div>Adjacent Cell:</div>
                            <input value={otherAdjacent} onChange={(event) => setOtherAdjacent(event.target.value)} className="ml-4 w-16"/>
                        </div>
                        <div className="text-2xl flex justify-between">
                            <div>Incorrect Guess:</div>
                            <input value={otherIncorrect} onChange={(event) => setOtherInorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Compound Emotion</div>
                        <div className="text-2xl flex justify-between">
                            <div>Correct Guess:</div>
                            <input value={compoundCorrect} onChange={(event) => setCompoundCorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                        <div className="text-2xl flex justify-between">
                            <div>Incorrect Guess:</div>
                            <input value={compoundIncorrect} onChange={(event) => setCompoundInorrect(event.target.value)} className="ml-4 w-16"/>
                        </div>
                    </div>
                </div>

                <div className="text-center"><button onClick={() => router.push("/host/teams")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
        </div>
     );
}
 
export default Scoring;