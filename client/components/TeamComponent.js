import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext';
import PlayerComponent from './Host/PlayerComponent';

const TeamComponent = ({teams, activeIcon, player, playersWithoutTeams}) => {
    console.log(playersWithoutTeams);
    const [display, setDisplay] = useState("teams")    
    const [players, setPlayers] = useState(playersWithoutTeams)
    const socket = useContext(SocketContext)

    const [menu, setMenu] = useState(undefined)

    useEffect(() => {
        socket.emit('get-players-no-teams', sessionStorage.getItem('game-code'))
        socket.on('players-without-teams' , players => setPlayers(players))
    }, [socket])

    useEffect(() => {
        document.addEventListener("contextmenu", function(event){event.preventDefault()})
    },[])

    const createNewTeam = () => {
        socket.emit('create-team', sessionStorage.getItem('game-code'))
    }

    console.log("teams", teams);
    return (
        <div className="bg-gray-200 px-8 pb-2 max-h-96 mt-5 overflow-y-auto" style={{minHeight:"50vh"}}>
            <div className='flex flex-row justify-between items-center'>
                <div  className='flex flex-row'>
                    <div className='text-lg' onClick={() => setDisplay("teams")}>
                        <div className={display==="teams"?"bg-gray-400 flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2":"flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2"}>
                            <div className='self-start font-bold'>
                                Teams
                            </div>
                            <div className='text-gray-500'>
                                {teams.length} team(s)
                            </div>
                        </div>
                    </div>
                    {!player?<div className='text-lg' onClick={() => setDisplay("lobby")}>
                        <div className={display==="lobby"?"bg-gray-400 flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2":"flex flex-col justify-between mb-3 px-3 cursor-pointer pt-2 pb-2 ml-2"}>
                            <div className='self-start font-bold'>
                                Lobby
                            </div>
                            <div className='text-gray-500'>
                                {players.length} Player(s)
                            </div>
                        </div>
                    </div>:<></>}
                </div>
                {!player?<div className="flex" onClick = {createNewTeam}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-2 text-base">New Team</div>
                </div>:<></>}
            </div>
            <div className='flex flex-row flex-wrap'>
                {display==="teams"?teams.map((team, index) => {
                    return(
                        <div className='text-lg' key = {index} onClick={(event) => console.log(event, "click")}>
                            <div className='flex flex-col justify-between bg-gray-400 mb-3 px-3 cursor-pointer pt-2 pb-2 m-2 flex-wrap' onClick = {() => activeIcon(team.teamName)}>
                                <div className='self-start font-bold flex-wrap'>
                                    {index < 9? `Team 0${index+1}` : `Team ${index+1}`}
                                </div>
                                <div className='text-gray-500'>
                                    {team.teamMembers.length} players
                                </div>
                            </div>
                            {
                            menu && !player?
                            <div className="h-screen w-screen" style={{position:"absolute", top:0, left:0}} onClick={() => setMenu(undefined)} onContextMenu={() => {console.log("right")}} onMouseOver={() => console.log("in")}>
                                <div className="flex flex-row" style={{position:"absolute", top:menu.y, left:menu.x, zIndex:2}}>
                                    <div className="bg-gray-200 border-2 border-black cursor-pointer h-full">
                                        <div>Remove</div>
                                    </div>
                                </div>
                            </div>:<></>}
                        </div>
                    )
                }):<PlayerComponent players = {playersWithoutTeams} player={player} teams = {teams} />}
            </div>
        </div>
    )
}

export default TeamComponent
