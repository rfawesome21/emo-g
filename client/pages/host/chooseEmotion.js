import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/socket/SocketContext";
import Wheel from "../../components/wheel";
const ChooseEmotions = () => {


    const clickHandler = () => {
        if(emotionArray.length < maxRound)
        {
            alert(`Please Select ${maxRound} emotions`)
            return
        }
        socket.emit('send-emotions', {gameCode, emotionArray})
        router.push('/host/scenes')
    }

    const socket = useContext(SocketContext)
    const [gameCode, setGameCode] = useState('')
    const [numberOfPlayers, setNumberOfPlayers] = useState('')
    const [maxRound, setMaxRoundNo] = useState(10)
    const [emotion, setEmotion] = useState('')
    const [emotionArray, setEmotionArray] = useState([])
    const [toBeEdited, setEdit] = useState()

    const emotionFunction = (emotion, clearClicked) => {
        console.log(toBeEdited, "edit");
        if(toBeEdited===undefined){
            setEmotion(emotion)
            let arr = emotionArray.slice(0)
            if (arr.length >= maxRound) {
                alert(`Please select only ${maxRound} emotions`)
                return
            }
            arr.push(emotion.toUpperCase())
            setEmotionArray(arr)
            
        } else {
            const arr = emotionArray
            arr[toBeEdited] = emotion.toUpperCase()
            setEmotionArray([...arr])
            setEdit(undefined)
        }
    }
    useEffect(() => {
        let isMounted = true
        if (isMounted)
            setGameCode(sessionStorage.getItem('game-code'))
        socket.emit('game-emotions', sessionStorage.getItem('game-code'))
        socket.on('players', players => {
            if (isMounted)
                setNumberOfPlayers(players.length)
        })
        socket.on('max-round-no', maxRound => setMaxRoundNo(maxRound))
        return () => {
            isMounted = false
        }
    }, [socket])

    const router = useRouter()

    function randomize(){

        const array = emotionArray;

        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }


        setEmotionArray([...array])
        console.log(emotionArray);
        emotionArray.force
    }

    return (
        <div style={{ height: "100vh" }} className="flex flex-column justify-center">
            <div className="text-center container px-10" >
                <SettingsAndBack link='/host/scenes' />
                <SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} />
                <div className="h-80 grid grid-col-1 grid-flow-col place-items-center ">
                    <div className="bg-gray-300 h-96 w-96 p-3 scl">
                        <div className="font-bold mb-3 mt-2 align-center text-center text-xl">Set Emotions
                            <button className="ml-4" onClick={randomize}>Randomize</button>
                            <button className="ml-4" onClick={() => setEmotionArray([])}>Clear</button>
                        </div>

                        <div className="grid grid-cols-2 grid-flow-row h-3/4 scl auto-rows-max gap-2 overflow-y-auto">
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
                <button onClick={() => clickHandler()} className="bg-gray-200 border-2 mt-36 border-black rounded-md px-4 py-2 text-xl font-bold">Save</button>
            </div >
        </div>
    );
}

export default ChooseEmotions;
