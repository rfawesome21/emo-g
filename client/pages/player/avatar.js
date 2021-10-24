import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket/SocketContext";
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";

const avatar = () => {

    const router = useRouter()
    const socket  = useContext(SocketContext)
    const [numberOfPlayers, setNumberOfPlayers] = useState(0)

    const [players, setPlayers] = useState([])
    const [color, setColor] = useState(0)
    const colors = ["https://i.imgur.com/Lh9JoJn.png", "https://i.imgur.com/9nKWnVE.png", "https://i.imgur.com/hYZIEEV.png","https://i.imgur.com/02wPaiQ.png","https://i.imgur.com/h1fCyBi.png", "https://i.imgur.com/SkvFWSY.png", "https://i.imgur.com/LptRaIW.png", "https://i.imgur.com/0EkGcud.png", "https://i.imgur.com/8pfgcFz.png"]
    const [img, setImg] = useState(colors[0]) // rn color is stored, once the avatar images are ready, we can use them
    const [gameCodeRender, setGameCode] = useState("XYZ123")

    useEffect(() => {
        const gameCode = sessionStorage.getItem('game-code')
        setGameCode(gameCode)
        const playerName = sessionStorage.getItem('player-name')
        socket.emit('join-avatar', {gameCode, playerName})
        socket.on('players', players => {
            setNumberOfPlayers(players.length)
            setPlayers(players)
        })
        socket.on('late-comers', () => router.push('/player/choice'))
        socket.on('come-to-teams', () => router.push('/player/choice'))
    }, [socket])

    return ( 
        <div className="bgNormal h-screen flex flex-col justify-around">
        <div className="w-screen flex justify-center">
            <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCodeRender} numberOfPlayers={numberOfPlayers}/></div>
        </div>
        <div className="flex flex-col">
            <div className="flex justify-evenly items-center px-10">
                <div>
                    <div className="flex flex-column justify-evenly items-center bg-gray-200 px-8 h-80 w-80">
                    <div className="font-bold text-xl">
                            Choose your avatar
                        </div>
                        <div className="flex flex-row justify-evenly items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setColor((color+8)%9)}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                                <img src={colors[color]} className="h-40 w-40"/>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setColor((color+1)%9)}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div className="font-bold text-xl">
                            Avatar
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="rounded px-4 py-2 mt-2 bg-gray-200 border-2 border-black text-xl font-bold" onClick={() => setImg(colors[color])}>Save</div>
                    </div>
                </div>
                <div className="flex bg-gray-200 flex-column justify-start px-40 h-3/5 lg:w-9/12 xl:w-auto xl:flex-grow-0">
                    <div className="flex flex-row flex-wrap py-5" style={{overflowY:"scroll"}} id="players">
                        {players.length > 0? players.map((player,index) => (
                            <div style={{zIndex:2, textAlign:"center"}} key={index} >
                                <div className="mx-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                {player.name}
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default avatar;