import {useState} from "react"

const hostScreen1 = () => {

    const [rounds, setRounds] = useState(6)

    return ( 
        <div className="flex flex-row justify-center" style={{height:"100vh"}}>
            <div style={{position:"absolute", right:"2rem", top:"2rem"}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <div style={{position:"absolute", left:"2rem", top:"2rem"}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    < path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>  
            </div>
            <div className="flex flex-column justify-evenly">
                <div>
                    <div className="text-center font-bold text-xl">Send code to invite players</div>
                    <br />
                    <div className="flex flex-row justify-evenly">
                        <div className="border-2 cursor-pointer border-black rounded-md flex justify-between" onClick={() => {navigator.clipboard.writeText("12345")}}>
                            <span className="py-2 px-4 font-bold text-lg">123456</span>
                            <span className="bg-black p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </span>
                        </div>
                        <div className="border-2 py-2 px-4 border-black rounded-md font-bold text-lg">
                            20 Joined
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between bg-gray-400 px-4 py-4">
                    <div className="pr-4  font-bold text-xl">Set Timer</div>
                    <div className="px-4 text-xl"><input type="checkbox" class="form-checkbox"/> Default</div>
                    <div className="pl-4">
                        <div className="text-xl"><input type="checkbox" class="form-checkbox"/> Manual</div>
                        <div className="flex justify-between ml-4 my-2 text-lg">Guessing time <input type="time" className="ml-4"/></div>
                        <div className="flex justify-between ml-4 my-2 text-lg">Typing time <input type="time" className="ml-4"/></div>
                    </div>
                </div>
                <div className="flex flex-row justify-between bg-gray-400 px-4 py-4">
                    <div className="font-bold text-xl">Number of rounds</div>
                    <div className="text-xl"><input type="checkbox" className="form-checkbox"/> 10 Rounds</div>
                    <div className="text-xl"><input type="checkbox" className="form-checkbox"/> <input value={rounds} onChange={event => setRounds(event.target.value)} type="number" min="6" style={{width:"4rem"}} className="border-2"/></div>
                </div>
                <div className="text-center"><button className="bg-gray-400 border-2 border-black rounded-md px-4 py-2 text-xl font-bold">Continue</button></div>
            </div>
        </div>
     );
}
 
export default hostScreen1;