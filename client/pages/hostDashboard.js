import { useState } from "react"

const hostDashboard = () => {

    const [selected, setSelected] = useState("lobby")

    return ( <div className="flex flex-row">
        <div className="flex bg-gray-300 flex-column justify-between items-center font-bold text-xl h-screen" style={{flex:2}}>
            <div className="flex flex-column justify-evenly items-center w-full" style={{minHeight:"50vh"}}>
                <div onClick={() => setSelected("timeRound")} className={selected==="timeRound"?"bg-gray-400 w-full p-4 cursor-pointer text-center":"w-full cursor-pointer p-4 text-center"}>Time-Round</div>
                <div onClick={() => setSelected("scene")} className={selected==="scene"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Scene</div>
                <div onClick={() => setSelected("emotion")} className={selected==="emotion"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Emotion</div>
                <div onClick={() => setSelected("scoring")} className={selected==="scoring"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Scoring</div>
                <div onClick={() => setSelected("teams")} className={selected==="teams"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Teams</div>
                <div onClick={() => setSelected("lobby")} className={selected==="lobby"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Lobby</div>
            </div>
            <div>End Game</div>
        </div>
        <div style={{flex:9}}>b</div>
    </div> );
}
 
export default hostDashboard;