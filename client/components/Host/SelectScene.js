import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket/SocketContext";
import Modal from "../Modal";

const SelectScene = ({closeButton}) => {


    const socket = useContext(SocketContext)
    const [scenes, setScenes] = useState([])
    const [addScenesToGame, setAddScenesToGame] = useState([])
    useEffect(() => {
        socket.emit('join-scenes')
        socket.on('scenes', scenes => setScenes(scenes))
    },[socket])

    const addScenes = (scene) => {
        let arr = addScenesToGame.slice(0)
        arr.push(scene)
        arr = new Set(arr)
        setAddScenesToGame([...arr])
    }

    const saveChanges = () => {
        const gameCode = sessionStorage.getItem('game-code')
        socket.emit('new-scenes', {addScenesToGame, gameCode})
        closeButton()
    }

    return ( 
        <Modal>
        <div className="justify-center align-center text-center flex flex-col container px-10">
            
            <div className="justify-center mt-2">
                <div className="bg-gray-200 p-2">
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
                    <div className = 'flex flex-col w-full'>
                        <div className="inline-flex justify-center">
                            <div className="ml-auto mr-auto inline-block font-bold text-xl mb-4">
                                Choose A Scene
                                </div>
                            </div>
                        </div>

                    <div className="h-64 grid grid-flow-row grid-cols-2 gap-4 text-xl overflow-y-auto">
                        {scenes && scenes.map((scene,index) => {
                            return(
                                <div className="py-3 px-5 bg-gray-50 rounded" key = {index}><button onClick = {() => addScenes(scene.scene)}>{scene.scene}</button> </div>
                            )
                        })}
                    </div>
                        <div className="text-center"><button onClick={() => saveChanges()} className="bg-gray-200 border-2 mt-10 border-black rounded-md px-4 py-2 text-xl font-bold">Save</button></div>
                </div>
            </div>
        </div>
        </Modal>
     );
}
 
export default SelectScene;