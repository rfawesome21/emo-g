import SendCodeToInvitePlayers from "../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../components/settingsAndBack";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const hostScreen2 = () => {

    const [numberOfPlayers, setNumberOfPlayers] = useState(20)
    const [gameCode, setGameCode] = useState("LN69ASX")

    const router = useRouter()

    useEffect(() => {
        //get players and gamecode 
    }, [])

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <SettingsAndBack />
            <div className="flex flex-column justify-evenly">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers}/>

                <div className="flex justify-between">
                    <div className="flex flex-column justify-evenly align-center bg-gray-200 p-8 mx-4">
                        <div className="font-bold text-xl">Set the Scene</div>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50">Choose Existing</button>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50">Create New</button>
                    </div>
                    <div className="flex flex-column justify-evenly align-center bg-gray-200 p-8 mx-4">
                        <div className="font-bold text-xl">Set Emotions</div>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50">System</button>
                        <br />
                        <button className="bg-gray-100 border-2 border-black border-opacity-50">Create New</button>
                    </div>
                </div>

                <div className="text-center"><button onClick={() => router.push("/hostScreen3")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
        </div>
     );
}
 
export default hostScreen2;