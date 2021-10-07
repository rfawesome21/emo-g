const Sidebar = (props) => {

    return ( 
        <div className="flex bg-gray-300 flex-column justify-between items-center font-bold text-xl h-screen" style={{flex:2}}>
            <div className="flex flex-column justify-evenly items-center w-full" style={{minHeight:"50vh"}}>
                <div onClick={() => props.setSelected("timeRound")} className={props.selected==="timeRound"?"bg-gray-400 w-full p-4 cursor-pointer text-center":"w-full cursor-pointer p-4 text-center"}>Time-Round</div>
                <div onClick={() => props.setSelected("scene")} className={props.selected==="scene"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Scene</div>
                <div onClick={() => props.setSelected("emotion")} className={props.selected==="emotion"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Emotion</div>
                <div onClick={() => props.setSelected("scoring")} className={props.selected==="scoring"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Scoring</div>
                <div onClick={() => props.setSelected("teams")} className={props.selected==="teams"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Teams</div>
                <div onClick={() => props.setSelected("lobby")} className={props.selected==="lobby"?"bg-gray-400 w-full text-center py-4 cursor-pointer":"w-full cursor-pointer p-4 text-center"}>Lobby</div>
            </div>
            <div className="mb-8">
                <span className="px-4 bg-red-400 py-2 cursor-pointer">END GAME</span>
            </div>
        </div>
     );
}
 
export default Sidebar;