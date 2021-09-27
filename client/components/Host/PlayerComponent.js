import React from 'react'

const PlayerComponent = ({players, width, largeWidth}) => {
    console.log(players);
    let compWidth
    let respWidth
    width === 'large'? compWidth = 'lg' : compWidth = 'xl'
    largeWidth === 'md' ? respWidth = 'md' : respWidth = 'xs'
    return (
        <div className={`flex flex-row flex-wrap md:max-w-${respWidth} lg:max-w-${compWidth} justify-evenly max-h-44`} style={{overflowY:"scroll"}} id="players">
                        {players && players.map((player, index) => (
                            <div style={{zIndex:2, textAlign:"center"}} key = {index}>
                                <div className="mx-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                {player.name}
                            </div>
                        ))}
        </div>
    )
}

export default PlayerComponent
