import SendCodeToInvitePlayers from "../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../components/settingsAndBack";
import { useState, useEffect } from "react";

const hostScreen3 = () => {

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

                

                <div className="text-center"><button onClick={() => router.push("/hostScreen4")} className="bg-gray-200 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
        </div>
     );
}
 
export default hostScreen3;