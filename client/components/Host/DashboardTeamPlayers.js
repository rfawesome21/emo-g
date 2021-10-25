import { useRouter } from 'next/router';
import React from 'react'

const DashboardTeamPlayers = ({activeTeam}) => {
    const router = useRouter()
    console.log(activeTeam);
    return (
        <div className=' pt-4 flex flex-col justify-start items-start bg-gray-400' style={{flex:4}}>
            <div className='text-xl font-semibold flex justify-between'>
                Team {activeTeam && activeTeam.teamName}
                <button className="bg-green-800 font-normal text-base px-2 py-1 cursor-pointer" onClick={() => router.push(`/player/game/${activeTeam.teamName}`)} style={{color:"white"}}>JOIN</button>
            </div>
            <div className='text-lg font-light py-5'>
                {activeTeam && activeTeam.teamMembers.length} player(s)
            </div>
            <div className='flex flex-row h-full overflow-y-auto'>
            <div className='flex flex-col justify-start items-start bg-gray-300 h-full px-2 pt-2 overflow-y-auto'>
                {activeTeam && activeTeam.teamMembers.map((player, index) => 
                    <div style={{zIndex:2, textAlign:"center"}} key = {index}>
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    {player.name && player.name}
                </div>
                )}
            </div>
            <div className='flex flex-col'>
                    {activeTeam && activeTeam.emotionsGuessed.map((emotion, index) => 
                    <div className='px-2 pt-2'>
                        Round {index + 1}
                        <span className='px-2'>
                            {emotion}
                        </span>
                    </div>)}
            </div>
            </div>
        </div>
    )
}

export default DashboardTeamPlayers
