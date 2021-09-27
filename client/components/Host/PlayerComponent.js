import React, { useState } from 'react'

const PlayerComponent = ({players, width, largeWidth, teams}) => {

    const [menu, setMenu] = useState()
    const [moveTeams, setMoveTeams] = useState(false)

    console.log(players);
    let compWidth
    let respWidth
    width === 'large'? compWidth = 'lg' : compWidth = 'xl'
    largeWidth === 'md' ? respWidth = 'md' : respWidth = 'xs'
    return (
        <div className={`flex flex-row flex-wrap md:max-w-${respWidth} lg:max-w-${compWidth} justify-evenly max-h-44`} style={{overflowY:"scroll"}} id="players">
                        {players && players.map((player, index) => (
                            <div style={{zIndex:2, textAlign:"center"}} key = {index} onClick={event => setMenu({x: event.clientX, y: event.clientY, player: player})}>
                                <div className="mx-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                {player.name}
                            </div>
                        ))}
            {
                menu?
                <div className="flex flex-row" style={{position:"absolute", top:menu.y, left:menu.x, zIndex:2}}>
                    <div className="bg-gray-200 border-2 border-black cursor-pointer h-full">
                        <div onMouseEnter={() => setMoveTeams(true)} onMouseLeave={() => setMoveTeams(false)}>Move</div>
                        <div>Remove</div>
                        <div onClick={() => setMenu(undefined)}>Back</div> 
                    </div>
                    {moveTeams?<div className="bg-gray-200 border-2 border-black cursor-pointer">
                        {teams?teams.map((team) => <div>{team}</div>):<></>}
                    </div>:<></>}
                </div>:<></>}
        </div>
    )
}

export default PlayerComponent
