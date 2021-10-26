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
    const [nudgeRoundNo, setNudgeRoundNo] = useState(4)

    const router = useRouter()

    const addScenes = (scene) => {
        const newScene = {
            scene : scene.scene,
            nudge : scene.nudge,
            roleOne : scene.roleOne,
            roleTwo : scene.roleTwo,
            statementOne : scene.statementOne,
            statementTwo : scene.statementTwo,
            nudgeRoundNo : scene.nudgeRoundNo
        }
        let arr = addScenesToGame.slice(0)
        arr.length = 0
        arr.push(newScene)
        arr = new Set(arr)
        setAddScenesToGame([...arr])
    }

    const clickHandler = () => {
        setSelectedItem([])
        if(addScenesToGame.length === 0){
            alert('Please Select a scene before proceeding')
            return
        }
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
        <div className="justify-center align-center text-center flex flex-col px-10 h-screen bgNormal">
            <div className="flex justify-center mt-10">
                {!createScenes?<div className="rounded p-10 w-3/4 heading">
                    <div className="font-bold mb-5 align-center text-center text-3xl">Choose a Scene
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex items-center justify-between px-3 pb-4">
                        <div className="h-8">
                            <input placeholder="  Search" className="burlywoodBorder burlywoodText rounded h-100"/>
                        </div>
                        <div className="float-right">
                            <button className="buttonNew rounded px-3 py-2 text-lg font-bold" onClick = {() =>  {
                                setEditSceneText('')
                                setNudge('')
                                setRoleTwo('')
                                setRoleOne('')
                                setStatementTwo('')
                                setStatementOne('')
                                setCreateScenes(true)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-2 -mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                    Create Scene
                            </button>
                        </div>
                    </div>
                    <div className="h-64 w-full grid grid-flow-row lg:grid-cols-2 px-1 xl:grid-cols-3 md:grid-cols-1 gap-3 text-xl overflow-y-auto scl">
                        {scenes && scenes.map((scene, index) => {
                            if(index > 0){
                                return(
                                <div className={selectedItem.includes(index)? 'border-2 rounded ebaBorder ebaBg whiteText' : 'burlywoodBorder rounded'} key = {index*100}>
                                    <button className="py-2 lg:px-4 text-left h-32 w-100 rounded overflow-y-auto scl"
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
                                        setNudgeRoundNo(scene.nudgeRoundNo)
                                        setCreateScenes(true)}}
                                    >
                                        <div className="font-bold text-lg">
                                            Scene {index}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-base">{scene.scene}</div>
                                    </button> 
                                </div>
                                )
                            }
                        })}
                    </div>
                </div>:<></>}
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
                            nudgeRoundNumber = {nudgeRoundNo}
                             /> : null}
        </div>
    )
}

export default SelectScene
