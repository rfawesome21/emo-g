const sendCodeToInvitePlayers = (props) => {
    return ( 
        <div>
            <div className="text-center font-bold text-xl">Send code to invite players</div>
            <br />
            <div className="flex flex-row justify-evenly">
                <div className="border-2 cursor-pointer border-black rounded-md flex justify-between" onClick={() => {navigator.clipboard.writeText("12345")}}>
                    <span className="py-2 px-4 font-bold text-lg">{props.gameCode}</span>
                    <span className="bg-black p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </span>
                </div>
                <div className="border-2 py-2 px-4 border-black rounded-md font-bold text-lg">
                    {props.numberOfPlayers} Joined
                </div>
            </div>
        </div>
     );
}
 
export default sendCodeToInvitePlayers;