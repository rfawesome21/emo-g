import React from 'react'

const TeamComponent = ({teams, activeIcon}) => {
    
    return (
        <div className='flex flex-row bg-gray-200 px-2 py-2 max-h-96 mt-5 overflow-y-scroll'>
            {teams.map((team, index) => {
                return(
                    <div className='text-lg' key = {index}>
                        <div className='flex flex-col justify-between bg-gray-400 mb-3 px-3 cursor-pointer pt-2 pb-2' onClick = {() => activeIcon(team.teamName)}>
                            <div className='self-start font-bold'>
                                {index < 9? `Team 0${index+1}` : `Team ${index+1}`}
                            </div>
                            <div className='text-gray-500'>
                                {team.teamMembers.length} players
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TeamComponent
