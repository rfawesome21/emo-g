import Modal from "./Modal";
import Button from './Button'
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket/SocketContext";

const CreateNewScene = ({closeButton, text, sceneID, nudge, roleOne, roleTwo, statementOne, statementTwo}) => {
    const [scene, setScene] = useState(text)
    const [gameCode, setGameCode] = useState(0)

    const [nudgeRoundNumber, setNudgeRoundNumber] = useState(nudge)
    const [nudgeStatement, setNudgeStatement] = useState("")
    const [nudgeRole1, setNudgeRole1] = useState(roleOne)
    const [nudgeRole2, setNudgeRole2] = useState(roleTwo)
    const [initialStatementOne, setInitialStatementOne] = useState(statementOne)
    const [initialStatementTwo, setInitialStatementTwo] = useState(statementTwo)

    useEffect(() => {
        let isMounted = true
        if(isMounted){
            setGameCode(sessionStorage.getItem('game-code'))
        }

        return () => {
            isMounted = false
        }
    },[nudge, roleOne, roleTwo, statementTwo, statementOne])

    const socket = useContext(SocketContext)
    const onChangeHandler = (e) => {
        setScene(e.target.value)
    }

    const addScene = () => {
        socket.emit('add-scene', {gameCode,scene, nudgeRole1, nudgeRole2, initialStatementTwo, initialStatementOne, nudgeStatement})
        closeButton()
    }

    const editScene = () => {
        socket.emit('edit-scenes', {sceneID, scene, gameCode})
        closeButton()
    }

    return (
        <Modal>
            <div className="flex flex-col justify-center items-center mt-10" style={{height:"75vh", width:"80vw"}}>
                <div className = 'bg-gray-200 flex flex-col w-full justify-end items-end'>
                    <div className="inline-block">
                                <button
                                    onClick={() => closeButton()}
                                    className="text-dark text-2xl mr-4 hover:text-dark"
                                >
                                    &times;
                                </button>
                    </div>    
                </div>
                <div className="bg-gray-200 flex flex-row pb-2 h-full w-full">
                    <div className="flex-1">
                        <div className="font-bold mb-5 align-center text-center text-2xl">{text? 'Edit scene' : 'Create a Scene'}
                        </div>
                        <div className="flex flex-col px-auto h-3/4 font-bold text-xl justify-between items-center">
                            <textarea cols="60" required className="text-2xl border-2 text-left border-black font-semibold px-1 h-2/5 w-3/4 py-1" value = {scene} onChange = {onChangeHandler}>
                            </textarea>
                            <div className="text-left">Roles</div>
                            <div className="flex mx-auto font-normal">
                                <div>Role 1</div>
                                <input className="ml-8" value={nudgeRole1} onChange={(event) => setNudgeRole1(event.target.value)}/>
                            </div>
                            <div className="flex mx-auto font-normal">
                                <div>Role 2</div>
                                <input className="ml-8" value={nudgeRole2} onChange={(event) => setNudgeRole2(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-row font-bold text-xl mb-5">
                            <div>
                                Nudge
                            </div>
                            <div className="ml-12 mr-4">Round No. </div>
                            <select className="w-16 pl-2 font-bold" value={nudgeRoundNumber} onChange={(event) => setNudgeRoundNumber(event.target.value)} list="rounds" name="Rounds">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                            </select>
                        </div>
                        <div className="text-xl font-bold text-left flex flex-column justify-between h-3/4">
                            <textarea className="w-3/4 h-2/5 p-2" placeholder="Angry father is very angry" value={nudgeStatement} onChange={(event) => setNudgeStatement(event.target.value)}/>
                            <div>Initial Statement</div>
                            <textarea placeholder="Initial statement 1" value = {initialStatementOne} className="w-3/4 p-2" onChange = {(e) => setInitialStatementOne(e.target.value)} />
                            <textarea placeholder="Initial statement 2" value = {initialStatementTwo} className="w-3/4 p-2" onChange = {(e) => setInitialStatementTwo(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="text-center bg-none">
                    <Button text = {'Save'} clickHandler = {
                        text?
                        () => editScene() : () => addScene()} />
                </div>
            </div>
        </Modal>

    );
}

export default CreateNewScene;