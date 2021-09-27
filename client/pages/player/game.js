import { useEffect, useState } from "react";
import ExitGame from "../../components/exitGame";

const playerScreen5 = () => {

    const [settingsPressed, setSettingsPressed] = useState(false)
    const [players, setPlayers] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setPlayers([
            {
                name: "Player 1", 
                img:"#0f0"
            },
            {
                name: "Player 2", 
                img:"#000"
            },
            {
                name: "Player 3", 
                img:"#0ff"
            },
            {
                name: "Player 4", 
                img:"#ff0"
            }
        ])

        setMessages([
            {
                id:"1",
                message:"hola"
            },
            {
                id:"0",
                message:"hola adsad  qwe w dsad asd awdasd asd awdas "
            },
            {
                id:"0",
                message:"holasd asd asd asd we w as dad ad saa"
            },
            {
                id:"1",
                message:"hola adws ads asdasd adads dad ad s asdawdasd "
            },
            {
                id:"0",
                message:"hoaasd adaw dasd a dasdawdasd a ads adsasdla"
            },
            {
                id:"1",
                message:"holasdasd asdawddasd awe dawd awd a sd asdd ada"
            },
            {
                id:"1",
                message:"hola adws ads asdasd adads dad ad s asdawdasd "
            },
            {
                id:"0",
                message:"hoaasd adaw dasd a dasdawdasd a ads adsasdla"
            },
            {
                id:"1",
                message:"holasdasd asdawddasd awe dawd awd a sd asdd ada"
            },
            {
                id:"1",
                message:"hola adws ads asdasd adads dad ad s asdawdasd "
            }
        ])   
    }, [])

    return ( 
        <div className="flex flex-column h-screen overflow-y-hidden">
            <div className="flex justify-end my-8">
                <div className="bg-gray-200 font-bold py-2 px-4 mx-2 cursor-pointer">
                    Call host
                </div>
                <div className="bg-gray-200 font-bold py-2 px-4 mx-2 cursor-pointer">
                    Rule Book
                </div>
                <div className="py-2 px-4 cursor-pointer mr-8">
                    <div onClick={() => setSettingsPressed(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-row px-8 pb-4" style={{flex:"1"}}>
                <div className="flex bg-gray-200 mx-2 flex-column items-center" style={{flex:"1"}}>
                    {players.map((player) => (
                        <div className="mt-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke={player.img}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                {player.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-column bg-gray-200 mx-2" style={{flex:"4"}}>
                    <div className="font-bold flex justify-between bg-gray-300 text-xl px-8 py-4">
                        <div>
                            Round 5/10                            
                        </div>
                        <div>
                            02:55
                        </div>
                    </div>
                    <div className="flex flex-column-reverse h-full max-h-full">
                        <div className="bg-gray-300 mx-4 my-2 text-lg p-2">
                            <input className="bg-transparent w-full "/>
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="inline-block w-full max-h-full">
                                {messages.map((message) => (
                                    message.id==="0"?
                                        <div className="text-left my-1">
                                            <div className="mr-8 bg-gray-400 inline-block px-4 py-2 rounded-t-md rounded-r-md">
                                                {message.message}
                                            </div>
                                        </div>
                                    :
                                        <div className="text-right my-1">
                                            <div className="ml-8 bg-gray-400 inline-block px-4 py-2 rounded-t-md rounded-l-md">
                                                {message.message}
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column mx-2" style={{flex:"4"}}>
                    <div className="font-bold px-8 py-4 bg-gray-400 text-lg">
                        Scene:{"Father is not happy with his daughter's result"}
                    </div>
                    <div className="m-12 p-8 rounded-full bg-gray-200 h-full">
                        <div className="p-8 rounded-full bg-gray-300 h-full">
                            <div className="p-8 rounded-full bg-gray-400 h-full">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column mx-2" style={{flex:"1"}}>
                    <div className="font-bold px-8 py-9 bg-gray-300 text-lg">
                    </div>
                    <div className="h-full flex flex-column">
                        <div className="bg-gray-200 border-2 border-black text-sm my-3 rounded-xl px-4 py-3 text-center font-bold">This or That</div>
                        <div className="bg-gray-200 border-2 border-black text-sm my-3 rounded-xl px-4 py-3 text-center font-bold">Delete a row</div>
                        <div className="bg-gray-200 border-2 border-black text-sm my-3 rounded-xl px-4 py-3 text-center font-bold">Call the bot</div>
                    </div>
                    <div className="bg-gray-200 px-4 py-2 text-center border-2 border-black font-bold rounded-xl">
                        CONFIRM
                    </div>
                </div>
            </div>

            {settingsPressed?<ExitGame cancelPress={setSettingsPressed}/>:<></>}

        </div>
     );
}

export default playerScreen5;