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
        <div className="flex bgNormal h-screen flex-column justify-center">
            <div className="text-center container px-10" >
                <div className="h-80 grid grid-col-1 grid-flow-col place-items-center ">
                    <div className="h-96 w-96 rounded-xl p-3 scl heading">
                        <div className="font-bold mb-3 mt-2 align-center text-center text-xl">Set Emotions
                            <button className="ml-4" onClick={randomize}>Randomize</button>
                            <button className="ml-4" onClick={() => setEmotionArray([])}>Clear</button>
                        </div>

                        <div className="grid grid-cols-2 text-xl grid-flow-row h-3/4 scl auto-rows-max gap-2 overflow-y-auto">
                            {emotionArray.map((emotion, index) => <div className="py-2 text-left px-3 w-40 h-18 font-bold text-md inputs burlywoodBorder rounded-lg grid relative" key={index} >Round{` 0${index + 1}`}
                                <span className="text-base font-normal">{emotion}</span>
                                <span className="absolute top-0 right-0 cursor-pointer" onClick={() => setEdit(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </span>
                            </div>)}
                        </div>
                    </div>
                    <div className=" ">
                        <div className="">
                            <Wheel emotionFunction={emotionFunction} />
                        </div>
                    </div>
                </div>
                <button onClick={() => clickHandler()} className="buttonNew mt-36 rounded-md px-4 py-2 text-xl font-bold">Save</button>
            </div >
        </div>
    );
}

export default ChooseEmotions;
