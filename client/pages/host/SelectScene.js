import React, { useContext, useEffect, useState } from 'react'
import SettingsAndBack from '../../components/settingsAndBack'
import {SocketContext} from '../../context/socket/SocketContext'
import CreateNewScene from '../../components/CreateNewScene'
import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import { useRouter } from "next/router";
import Button from '../../components/Button';

const SelectScene = () => {
    const socket = useContext(SocketContext)
    const [scenes, setScenes] = useState([])
    const [addScenesToGame, setAddScenesToGame] = useState([])
    const [createScenes, setCreateScenes] = useState(false)
    const [gameCode, setGameCode] = useState('')
    const [selectedItem, setSelectedItem] = useState([])
    const [playerLength, setPlayerLength] = useState('')
    const [editSceneText, setEditSceneText] = useState('')
    const  [nudge, setNudge] = useState('')
    const [roleOne, setRoleOne] = useState('')
    const [roleTwo, setRoleTwo] = useState('')
    const [statementOne, setStatementOne] = useState('')
    const [statementTwo, setStatementTwo] = useState('')
    const [sceneID, setSceneID] = useState()

    const router = useRouter()

    const addScenes = (scene) => {
        const newScene = {
            scene : scene.scene,
            nudge : scene.nudge,
            roleOne : scene.roleOne,
            roleTwo : scene.roleTwo,
            statementOne : scene.statementOne,
            statementTwo : scene.statementTwo
        }
        let arr = addScenesToGame.slice(0)
        arr.length = 0
        arr.push(newScene)
        arr = new Set(arr)
        setAddScenesToGame([...arr])
    }

    const clickHandler = () => {
        setSelectedItem([])
        socket.emit('new-scenes', {addScenesToGame, gameCode})
        router.push('/host/scenes')
    }

    const removeScene = (scene) => {
        setAddScenesToGame(addScenesToGame.filter(a => a !== scene))
    }

    useEffect(() => {
            let isMounted = true
            if(isMounted)
                setGameCode(sessionStorage.getItem('game-code'))
            socket.emit('join-scenes', sessionStorage.getItem('game-code'))
            socket.on('scenes', scenes => {
                if(isMounted)
                    setScenes(scenes)
                })
            socket.on('updated-scenes', scenes => {
                if(isMounted)
                    setScenes(scenes)
            })
            socket.on('players', players => 
            {
                if(isMounted)
                    setPlayerLength(players.length)
            })
            return () => {
                isMounted = false
            }
    },  [socket])


    return (
        <div className="justify-center align-center text-center flex flex-col container px-10" style={{ height: "100vh" }}>
            <SettingsAndBack link = {'/host/scenes'}  />
            <div className="grid grid-cols-1 justify-center self-center w-full align-center ">
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={playerLength}/>
            </div>
            <div className="place-items-center justify-items-center mt-10">
                <div className="bg-gray-200 p-10 ">
                    <div className="font-bold mb-5 align-center text-center text-3xl">Choose a Scene
                    </div>
                    <div className="h-64 grid grid-flow-row lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-1 gap-3 text-xl overflow-y-auto">
                        {scenes && scenes.map((scene, index) => {
                            if(index > 0){
                                return(
                                <div className={selectedItem.includes(index)? 'border-2 border-red-500' : ''} key = {index*100}>
                                    <button className="py-2 lg:px-4 font-bold text-lg h-28 lg:w-96 md:w-96 bg-gray-50 rounded"
                                    onClick = {() => {
                                        let arr = selectedItem.slice(0)
                                        setSceneID(scene.id)
                                        arr.length = 0
                                        arr.push(index)
                                        arr = new Set(arr)
                                        setSelectedItem([...arr])
                                        addScenes(scene)}}
                            
                                    onDoubleClick = {() => {
                                        setAddScenesToGame(addScenesToGame.filter(a => a !== scene.scene))
                                        setEditSceneText(scene.scene)
                                        setNudge(scene.nudge)
                                        setRoleOne(scene.roleOne)
                                        setRoleTwo(scene.roleTwo)
                                        setStatementOne(scene.statementOne)
                                        setStatementTwo(scene.statementTwo)
                                        setCreateScenes(true)}}
                                    >
                                        {scene.scene}
                                    </button> 
                                </div>
                                )
                            }
                            else{
                                return(
                                <div key = {index}>
                                    <button className="py-2 px-4 font-bold text-lg h-28 w-96 bg-gray-50 rounded" key = {index}
                                    onClick = {() => {
                                        setEditSceneText('')
                                        setNudge('')
                                        setRoleTwo('')
                                        setRoleOne('')
                                        setStatementTwo('')
                                        setStatementOne('')
                                        setCreateScenes(true)}}
                                    >+ Create Scene</button> 
                                </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className="text-center"><Button text = 'Save' clickHandler = {clickHandler} /></div>
            {createScenes? <CreateNewScene closeButton = {() => setCreateScenes(false)} 
                            text = {editSceneText} 
                            nudge = {nudge} 
                            roleOne = {roleOne}
                            roleTwo = {roleTwo}
                            statementOne = {statementOne}
                            statementTwo = {statementTwo}
                            sceneID = {sceneID}
                             /> : null}
        </div>
    )
}

export default SelectScene