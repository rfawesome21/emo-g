import React from 'react'
import PlayerComponent from './Host/PlayerComponent';

const TeamPlayers = ({teams, allTeams}) => {
    console.log(teams);
    if(teams[0])
        console.log(teams[0].teamName);
    return (
        <div className={'flex flex-col bg-gray-200 mt-5 w-full px-10 py-2'} style={{minHeight:"50vh"}}>
            <div className='font-bold text-xl'>
                {teams[0]? `Team ${teams[0].teamName}` : null}
            </div>
            <div className='font-bold text-lg py-4'>
                {teams[0] && !teams[0][0]? `${teams[0].teamMembers.length} players` : `0 Players`}
            </div>
            <div className='w-full'>

                <PlayerComponent players = {teams[0] && teams[0].teamMembers} teams = {allTeams} width='medium' largeWidth='xs' />
            </div>
        </div>
    )
}

export default TeamPlayers
