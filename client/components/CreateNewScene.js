import Modal from "./Modal";
import Button from './Button'
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket/SocketContext";

const CreateNewScene = ({closeButton, text, sceneID, nudge, roleOne, roleTwo, statementOne, statementTwo, nudgeRoundNumber}) => {
    const [scene, setScene] = useState(text)
    const [gameCode, setGameCode] = useState(0)

    const [nudgeRoundNo, setNudgeRoundNumber] = useState(nudgeRoundNumber)
    const [nudgeStatement, setNudgeStatement] = useState(nudge)
    const [nudgeRole1, setNudgeRole1] = useState(roleOne)
    const [nudgeRole2, setNudgeRole2] = useState(roleTwo)
    const [initialStatementOne, setInitialStatementOne] = useState(statementOne)
    const [initialStatementTwo, setInitialStatementTwo] = useState(statementTwo)
    const [maxRounds, setMaxRounds] = useState(10)
    const [rounds, setRounds] = useState([])
    const socket = useContext(SocketContext)

    useEffect(() => {
        let isMounted = true
        socket.emit('get-max-rounds', sessionStorage.getItem('game-code'))
        socket.on('sent-max-rounds', maxRounds => {
            console.log(maxRounds);
            setMaxRounds(maxRounds)
        })
        if(isMounted){
            setGameCode(sessionStorage.getItem('game-code'))
            let k = rounds.slice(0)
            for(let i = 1; i <= maxRounds; i ++){
                k.push(i)
                setRounds(k)
            }
        }

        return () => {
            isMounted = false
        }
    },[nudge, roleOne, roleTwo, statementTwo, statementOne])



    const onChangeHandler = (e) => {
        setScene(e.target.value)
    }

    const addScene = () => {
        socket.emit('add-scene', {gameCode,scene, nudgeRole1, nudgeRole2, initialStatementTwo, initialStatementOne, nudgeStatement, nudgeRoundNo})
        closeButton()
    }

    const editScene = () => {
        socket.emit('edit-scenes', {sceneID, scene, gameCode, nudgeRole1, nudgeRole2, initialStatementTwo, initialStatementOne, nudgeStatement, nudgeRoundNo})
        closeButton()
    }

    return (
        <Modal>
            <div className="flex flex-col justify-center items-center mt-10" style={{height:"75vh", width:"80vw"}}>
                <div className = 'beigeBg rounded-t-xl burlywoodText z-10 flex flex-col w-full justify-end items-end'>
                    <div className="inline-block">
                                <button
                                    onClick={() => closeButton()}
                                    className="text-dark text-2xl mr-4 hover:text-dark"
                                >
                                    &times;
                                </button>
                    </div>    
                </div>
                <div className="heading rounded-b-xl flex flex-row pb-2 h-full w-full">
                    <div className="flex-1 pl-16">
                        <div className="font-bold mb-5 align-center text-left text-2xl">{text? 'Edit scene' : 'Create a Scene'}
                        </div>
                        <div className="flex flex-col px-auto text-left h-3/4 font-bold text-xl">
                            <textarea cols="60" placeholder="Angry father is very angry" required className="text-lg border-2 text-left rounded ebaText ebaBorder font-thin px-1 h-2/5 w-3/4 py-1" value = {scene} onChange = {onChangeHandler}>
                            </textarea>
                            <div className="text-left my-4">Roles</div>
                            <div className="flex font-normal">
                                <div>Role 01</div>
                                <input className="ml-8 rounded pl-2 ebaText ebaBorder" value={nudgeRole1} onChange={(event) => setNudgeRole1(event.target.value)}/>
                            </div>
                            <div className="flex font-normal mt-4">
                                <div>Role 02</div>
                                <input className="ml-8 rounded pl-2 ebaText ebaBorder" value={nudgeRole2} onChange={(event) => setNudgeRole2(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-row w-3/4 justify-between font-bold text-xl mb-5">
                            <div>
                                Nudge
                            </div>
                            <div>
                                <div className="ml-12 mr-4 inline-block font-light">Round No </div>
                                <select className="w-16 pl-2 float-right font-bold scl rounded ebaText ebaBorder" value={nudgeRoundNo} onChange={(event) => setNudgeRoundNumber(event.target.value)} list="rounds" name="Rounds">
                                    {console.log(rounds)}
                                    {rounds.map((r, index) => 
                                    <option key={index}>
                                        {r}
                                    </option>)}
                                </select>
                            </div>
                        </div>
                        <div className="text-xl font-bold text-left flex flex-column justify-between h-3/4">
                            <textarea className="w-3/4 h-2/5 p-2 rounded ebaText ebaBorder" placeholder="Angry father is very angry" value={nudgeStatement} onChange={(event) => setNudgeStatement(event.target.value)}/>
                            <div>Initial Statement</div>
                            <textarea placeholder="Initial statement 1" value = {initialStatementOne} className="w-3/4 p-2 rounded ebaText ebaBorder" onChange = {(e) => setInitialStatementOne(e.target.value)} />
                            <textarea placeholder="Initial statement 2" value = {initialStatementTwo} className="w-3/4 p-2 rounded ebaText ebaBorder" onChange = {(e) => setInitialStatementTwo(e.target.value)} />
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