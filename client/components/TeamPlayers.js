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

    return (
        <div className={'flex flex-col bg-gray-200 mt-5 w-full py-2'} style={{minHeight:"50vh"}}>
            <div className='font-bold text-xl flex justify-between'>
                <div className="pl-8 pt-4">{teams? `Team ${teams.teamName}` : null}</div>
                {player && mode==='choice'?
                <button className="bg-green-800 font-normal text-base px-2 py-1 cursor-pointer" onClick={() => joinTeam(teams.teamName)} style={{color:"white"}}>{player?"JOIN":""}</button>
                :null}
            </div>
            <div className='font-bold text-lg pt-4 pl-8'>
                {teams? `${teams.teamMembers.length} players` : `0 Players`}
            </div>
            <div className='w-full'>
                <PlayerComponent players = {teams && teams.teamMembers} player={player} teams = {allTeams} status = {status} width='medium' largeWidth='xs' />
            </div>
        </div>
    )
}

export default TeamPlayers
