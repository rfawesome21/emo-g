import Modal from "./Modal";
import Button from './Button'
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket/SocketContext";

const CreateNewScene = ({closeButton, text, sceneID}) => {
    const [scene, setScene] = useState(text)
    const [gameCode, setGameCode] = useState(0)

    useEffect(() => {
        let isMounted = true
        if(isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        
        return () => {
            isMounted = false
        }
    },[])

    const socket = useContext(SocketContext)
    const onChangeHandler = (e) => {
        setScene(e.target.value)
    }

    const addScene = () => {
        socket.emit('add-scene', {gameCode,scene})
        closeButton()
    }

    const editScene = () => {
        socket.emit('edit-scenes', {sceneID, scene, gameCode})
        closeButton()
    }

    return (
        <Modal>
            <div className="flex flex-col justify-center items-center mt-10">
                <div className="bg-gray-200 pb-2">
                <div className = 'flex flex-col w-full justify-end items-end'>
                        <div className="inline-block">
                                    <button
                                        onClick={() => closeButton()}
                                        className="text-dark text-2xl hover:text-dark"
                                    >
                                        &times;
                                    </button>
                        </div>    
                    </div>
            
                    <div className="font-bold mb-5 align-center text-center text-2xl">Create a Scene
                    </div>
                    <div className="flex flex-col">
                        <div><textarea cols="60" required className="text-2xl border-2 text-center border-black font-semibold px-1 h-50 w-50 py-1" value = {scene} onChange = {onChangeHandler}>
                        </textarea></div>
                        <div className="text-center">
                        <Button text = {'Save'} clickHandler = {
                            text?
                            () => editScene() : () => addScene()} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>

    );
}

export default CreateNewScene;