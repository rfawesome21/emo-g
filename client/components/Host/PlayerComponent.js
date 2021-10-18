import React, { useContext, useState } from 'react'
import {SocketContext} from '../../context/socket/SocketContext'

const PlayerComponent = ({players, width, largeWidth, teams, player}) => {
    const socket = useContext(SocketContext)
    const [menu, setMenu] = useState()
    const [moveTeams, setMoveTeams] = useState(false)
    console.log(players);

    const clickHandler = (team) => {
        const player = menu.player
        setMenu(false)
        const gameCode = sessionStorage.getItem('game-code')
        socket.emit('change-team', {team, player, gameCode})
        socket.on('err', ({message}) => alert(message))
    }

    const removePlayer = () => {
        const gameCode = sessionStorage.getItem('game-code')
        const playerName = menu.player.name
        socket.emit('remove-player', {gameCode, playerName})
    }
    
    let compWidth
    let respWidth
    width === 'large'? compWidth = 'lg' : compWidth = 'xl'
    largeWidth === 'md' ? respWidth = 'md' : respWidth = 'xs'
    return (
        <div className={`flex flex-row flex-wrap md:max-w-${respWidth} lg:max-w-${compWidth} justify-evenly max-h-44`} style={{overflowY:"auto"}} id="players" >
                        {players && players.length > 0? players.map((player, index) => (
                            <div style={{zIndex:2, textAlign:"center"}} key = {index} onClick={event => setMenu({x: event.clientX, y: event.clientY, player: player})}>
                                <div className="mx-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                {player.name && player.name}
                            </div>
                        )) : null}
            {
                menu && !player?
                <div className="h-screen w-screen" style={{position:"absolute", top:0, left:0}} onClick={() => {setMenu(undefined); setMoveTeams(false)}} onMouseOver={() => console.log("in")}>
                    <div className="flex flex-row" style={{position:"absolute", top:menu.y, left:menu.x, zIndex:2}}>
                        <div className="bg-gray-200 border-2 border-black cursor-pointer h-full">
                            <div onClick={(event) => {setMoveTeams(!moveTeams); event.stopPropagation()}}>Move</div>
                            <div onClick={() => removePlayer()}>Remove</div>
                        </div>
                        {moveTeams?<div className="bg-gray-200 border-2 border-black cursor-pointer max-h-32 overflow-y-auto">
                            {teams?teams.map((team) => <div className='w-auto px-2' onClickCapture = {() => clickHandler(team.teamName)}>Team {team.teamName}</div>):<></>}
                        </div>:<></>}
                    </div>
                </div>:<></>}
        </div>
    )
}

export default PlayerComponent
