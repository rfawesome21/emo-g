import React, { useEffect, useState } from 'react'
import PlayerComponent from './Host/PlayerComponent';

const TeamPlayers = ({teams, activeTeam}) => {
    console.log(teams);
    return (
        <div className={'flex flex-col bg-gray-200 mt-5 w-full px-10 py-2'}>
            <div className='font-bold text-xl'>
                {teams[0]? `Team ${teams[0].id}` : null}
            </div>
            <div className='font-bold text-lg py-4'>
                {teams[0]? `${teams[0].teamMembers.length} players` : null}
            </div>
            <div className='w-full'>
                <PlayerComponent players = {teams[0] && teams[0].teamMembers} width='medium' largeWidth='xs' />
            </div>
        </div>
    )
}

export default TeamPlayers
