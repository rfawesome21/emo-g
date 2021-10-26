const Sidebar = (props) => {

    return ( 
        <div className="flex beigeBgTransparent flex-column justify-between bg-opacity-75 rounded-r-3xl items-center font-bold text-xl h-screen" style={{flex:3}}>
            <div className="flex flex-column justify-evenly items-center w-full px-16 pt-12" style={{minHeight:"50vh"}}>
                <div onClick={() => props.setSelected("timeRound")} className={props.selected==="timeRound"?"w-full burlywoodBg whiteText rounded-lg cursor-pointer my-4 px-3 py-2 text-center":"w-full heading rounded-lg cursor-pointer my-4 px-3 py-2 text-center"}>Time-Round</div>
                <div onClick={() => props.setSelected("scene")} className={props.selected==="scene"?"w-full burlywoodBg whiteText rounded-lg cursor-pointer my-4 px-3 py-2 text-center":"w-full heading rounded-lg cursor-pointer my-4 px-3 py-2 text-center"}>Scene</div>
                <div onClick={() => props.setSelected("emotion")} className={props.selected==="emotion"?"w-full burlywoodBg whiteText rounded-lg cursor-pointer my-4 px-3 py-2 text-center":"w-full heading rounded-lg cursor-pointer my-4 px-3 py-2 text-center"}>Emotion</div>
                <div onClick={() => props.setSelected("scoring")} className={props.selected==="scoring"?"w-full burlywoodBg whiteText rounded-lg cursor-pointer my-4 px-3 py-2 text-center":"w-full heading rounded-lg cursor-pointer my-4 px-3 py-2 text-center"}>Scoring</div>
                <div onClick={() => props.setSelected("teams")} className={props.selected==="teams"?"w-full burlywoodBg whiteText rounded-lg cursor-pointer my-4 px-3 py-2 text-center":"w-full heading rounded-lg cursor-pointer my-4 px-3 py-2 text-center"}>Teams</div>
                <div onClick={() => props.setSelected("lobby")} className={props.selected==="lobby"?"w-full burlywoodBg whiteText rounded-lg cursor-pointer my-4 px-3 py-2 text-center":"w-full heading rounded-lg cursor-pointer my-4 px-3 py-2 text-center"}>Lobby</div>
            </div>
            <div className="mb-16">
                <span className="px-4 endGame py-2 cursor-pointer">END GAME</span>
            </div>
        </div>
     );
}
 
export default Sidebar;