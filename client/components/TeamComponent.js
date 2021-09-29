import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext';
import PlayerComponent from './Host/PlayerComponent';

const TeamComponent = ({teams, activeIcon, player, playersWithoutTeams}) => {
    console.log(playersWithoutTeams);
    const [display, setDisplay] = useState("teams")    
    const [players, setPlayers] = useState(playersWithoutTeams)
    const socket = useContext(SocketContext)

    useEffect(() => {
        socket.emit('get-players-no-teams', sessionStorage.getItem('game-code'))
        socket.on('players-without-teams' , players => setPlayers(players))
    }, [socket])

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
                {!player?<div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-2 text-base">New Team</div>
                </div>:<></>}
            </div>
            <div className='flex flex-row'>
                {display==="teams"?teams.map((team, index) => {
                    return(
                        <div className='text-lg' key = {index}>
                            <div className='flex flex-col justify-between bg-gray-400 mb-3 px-3 cursor-pointer pt-2 pb-2 m-2' onClick = {() => activeIcon(team.teamName)}>
                                <div className='self-start font-bold'>
                                    {index < 9? `Team 0${index+1}` : `Team ${index+1}`}
                                </div>
                                <div className='text-gray-500'>
                                    {team.teamMembers.length} players
                                </div>
                            </div>
                        </div>
                    )
                }):<PlayerComponent players = {playersWithoutTeams} teams = {teams} />}
            </div>
        </div>
    )
}

export default TeamComponent
