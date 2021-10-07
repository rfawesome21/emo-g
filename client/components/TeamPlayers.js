import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext';
import PlayerComponent from './Host/PlayerComponent';

const TeamPlayers = ({teams, allTeams, player, mode, status}) => {

    const socket  = useContext(SocketContext)
    const [playerName, setPlayerName] = useState('')
    const [gameCode, setGameCode] = useState('')

    useEffect(() => {
        setGameCode(sessionStorage.getItem('game-code'))
        setPlayerName(sessionStorage.getItem('player-name'))
    })

    const joinTeam = (teamName) => {
        socket.emit('choice',{gameCode, playerName, teamName})
    }

    console.log(teams);
    if(teams)
        console.log(teams.teamMembers);
    return (
        <div className={'flex flex-col bg-gray-200 mt-5 w-full px-10 py-2'} style={{minHeight:"50vh"}}>
            <div className='font-bold text-xl flex justify-between'>
                <div>{teams? `Team ${teams.teamName}` : null}</div>
                {player && mode==='choice'?
                <button className="bg-green-800 font-normal text-base px-2 py-1 cursor-pointer" onClick={() => joinTeam(teams[0].teamName)} style={{color:"white"}}>{player?"JOIN":""}</button>
                :null}
            </div>
            <div className='font-bold text-lg py-4'>
                {teams? `${teams.teamMembers.length} players` : `0 Players`}
            </div>
            <div className='w-full'>

                <PlayerComponent players = {teams && teams.teamMembers} player={player} teams = {allTeams} status = {status} width='medium' largeWidth='xs' />
            </div>
        </div>
    )
}

export default TeamPlayers
