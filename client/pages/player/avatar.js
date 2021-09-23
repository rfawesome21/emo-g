import { useState, useEffect, useContext } from "react";
import PlayerComponent from '../../components/Host/PlayerComponent'
import { SocketContext } from "../../context/socket/SocketContext";

const avatar = () => {

    const socket  = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    
    const [color, setColor] = useState(0)
    const colors = ["#f0f", "#ff0", "#0ff","#f00","#0f0", "#00f"]

    const [players, setPlayers] = useState([])

    useEffect(() => {
        const gameCode = sessionStorage.getItem('game-code')
        socket.emit('join-avatar', {gameCode})
        socket.on('players', players => {
            setNumberOfPlayers(players.length)
            setPlayers(players)
        })
    }, [socket])

    return ( 
        <div>
            <div className="flex justify-evenly h-screen items-center">
                <div>
                    <div className="flex flex-column justify-evenly items-center bg-gray-200 p-8">
                        <div className="font-bold text-xl">
                            Choose your avatar
                        </div>
                        <div className="flex flex-row justify-evenly items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setColor((color-1)%6)}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke={colors[color]}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setColor((color+1)%6)}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="font-bold text-xl">
                            Avatar
                        </div>
                    </div>
                    <br/>
                    <br />
                    <div className="flex justify-center">
                        <div className="rounded px-4 py-2 bg-gray-200 border-2 border-black text-xl font-bold">Save</div>
                    </div>
                </div>
                <div className="flex flex-column justify-evenly" style={{height:"80vh"}}>
                <div className="flex flex-column justify-evenly">
                    <div className="text-center font-bold text-xl">Waiting for host to start game ...</div>
                        <br />
                        <div className="flex flex-row justify-evenly">
                            <div className="border-2 py-2 px-4 border-black rounded-md font-bold text-lg">
                                {numberOfPlayers} Joined
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap md:max-w-md lg:max-w-lg max-h-44" style={{overflowY:"scroll"}} id="players">
                        {players.map(player => (
                            <div style={{zIndex:2, textAlign:"center"}} onClick={event => deletePlayer({x: event.clientX, y: event.clientY, player: player})}>
                                <div className="mx-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                {player.name}
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
     );
}
 
export default avatar;