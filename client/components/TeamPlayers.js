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
        <div className={'flex flex-col heading rounded-xl mt-5 w-full pb-2'} style={{minHeight:"50vh", zoom:0.95}}>
            <div className="ebaBg whiteText rounded-t-xl">
                <div className='font-bold text-xl flex justify-between items-center'>
                    <div className="pl-8 py-4">{teams? `Team 0${teams.teamName}` : null}</div>
                    {player && mode==='choice'?
                    <div><button className="buttonNew rounded font-normal text-base mr-8 px-2 py-1 cursor-pointer" onClick={() => joinTeam(teams.teamName)}>{player?"JOIN":""}</button></div>
                    :null}
                </div>
                <div className='font-semibold text-lg pb-4 pl-8'>
                    {teams? `${teams.teamMembers.length} players` : `0 Players`}
                </div>
            </div>
            <div className='w-full'>
                <PlayerComponent players = {teams && teams.teamMembers} player={player} teams = {allTeams} status = {status} width='medium' largeWidth='xs' />
            </div>
        </div>
    )
}

export default TeamPlayers
