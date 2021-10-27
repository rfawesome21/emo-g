import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/socket/SocketContext'

const leaderboard = () => {
    const socket = useContext(SocketContext)
    const [teams, setTeams] = useState([])

    useEffect(() => {
        socket.emit('join-leaderboard',sessionStorage.getItem('game-code'))
        socket.on('team-scores', teams => setTeams(teams))
    },[socket])

    return (
        <div>
            {teams.map((team,index) => 
                <div key = {index}>
                    {team.score}
                </div>
            	)}
        </div>
    )
}

export default leaderboard
