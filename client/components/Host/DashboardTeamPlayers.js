import { useRouter } from 'next/router';
import React from 'react'

const DashboardTeamPlayers = ({activeTeam}) => {
    const router = useRouter()

    const clickHandler = () => {
        sessionStorage.setItem('team-name', activeTeam.teamName)   
        router.push(`/player/game/${activeTeam.teamName}`)
    }

    return (
        <div className='flex flex-col justify-start items-start' style={{flex:4}}>
            <div className="pt-4 flex justify-between px-4 w-100 rounded-t-xl ebaBg whiteText">
                <div>
                    <div className='text-xl font-semibold flex justify-between'>
                        Team 0{activeTeam && activeTeam.teamName}
                    </div>
                    <div className='text-lg font-light pt-2 pb-8'>
                        {activeTeam && activeTeam.teamMembers.length} player(s)
                    </div>
                </div>
                <div className="pt-3">
                    <button className="buttonNew rounded font-normal text-base px-2 py-1 cursor-pointer" onClick={clickHandler}>JOIN</button>
                </div>
            </div>
            <div className='flex flex-row h-full w-100 overflow-y-auto heading rounded-b-xl'>
                <div className='flex flex-col justify-start items-start h-full px-3 pt-4 overflow-y-auto'>
                    {activeTeam && activeTeam.teamMembers.map((player, index) => 
                        <div className="z-10 text-center pt-2" key = {index}>
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        {player.name && player.name}
                    </div>
                    )}
                </div>
                <div className='flex flex-col flex-1 font-semibold pt-4'>
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
