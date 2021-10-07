import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/socket/SocketContext";
import Wheel from "../../components/wheel";
const chooseEmotions = () => {


    const socket = useContext(SocketContext)
    const [gameCode, setGameCode] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState('')
    const [scenes, setScenes] = useState(false)
    const [emotion, setEmotion] = useState('')
    const [emotionArray, setEmotionArray] = useState([])
    const [toBeEdited, setEdit] = useState()

    const emotionFunction = (emotion, clearClicked) => {
        console.log(toBeEdited, "edit");
        if(toBeEdited===undefined){
            setEmotion(emotion)
            let arr = emotionArray.slice(0)
            if (arr.length > 9) {
                alert('Please Select only 10 Emotions')
                return
            }
            arr.push(emotion)
            setEmotionArray(arr)
        } else {
            const arr = emotionArray
            arr[toBeEdited] = emotion
            setEmotionArray([...arr])
            setEdit(undefined)
        }
    }
    const myStyle = {
        overflowY: "auto",
        scrollBehavior: "smooth"
    }
    useEffect(() => {
        let isMounted = true
        if (isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('game-scenes', sessionStorage.getItem('game-code'))
        socket.on('players', players => {
            if (isMounted)
                setNumberOfPlayers(players.length)
        })
        return () => {
            isMounted = false
        }
    }, [socket])

    const router = useRouter()

    function randomize(){

        const array = emotionArray;
        console.log("Array ", array);

        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        console.log("After", array);

        setEmotionArray([...array])
        console.log(emotionArray);
        emotionArray.force
    }

    return (
        <div style={{ height: "100vh" }}>
            <div className="justify-center align-center text-center flex flex-col container px-10" >
                <SettingsAndBack link='/host/scenes' />
                <div className="grid grid-col justify-evenly align-center ">
                    <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />
                </div>
                <div className="h-80 grid grid-col-1 grid-flow-col  place-items-center ">
                    <div style={myStyle} className="bg-gray-300 h-96 w-96 p-3 scl">
                        <div className="font-bold mb-3 mt-2 align-center text-center text-xl">Set Emotions
                            <button className="ml-4" onClick={randomize}>Randomize</button>
                            <button className="ml-4" onClick={() => setEmotionArray([])}>Clear</button>
                        </div>

                        <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-2">
                            {emotionArray.map((emotion, index) => <div className="py-2 px-3 w-40 h-16 font-bold text-md bg-gray-50 text-center grid relative" key={index} >Round{` ${index + 1}`}
                                <span className="capitalize ">{emotion}</span>
                                <span className="absolute top-0 right-0 cursor-pointer" onClick={() => setEdit(index)}>E</span></div>)}
                        </div>
                    </div>
                    <div className=" ">
                        <div className="">
                            <Wheel emotionFunction={emotionFunction} />
                        </div>
                    </div>
                </div>
            </div >
            <div className="text-center py-14">
                <button onClick={() => router.push("/host/scenes")} className="bg-gray-200 border-2 mt-28 border-black rounded-md px-4 py-2 text-xl font-bold">Save</button>
            </div>
        </div>
    );
}

export default chooseEmotions;