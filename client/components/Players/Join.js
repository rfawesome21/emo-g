import React, { useContext, useState } from 'react'
import Button from '../Button'
import {SocketContext} from '../../context/socket/SocketContext'
import {useRouter} from "next/router"

const Join = () => {
    const router = useRouter()
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [pressed, setPressed] = useState(false)
    const socket = useContext(SocketContext)

    const clickHandler = () => {
        socket.emit('join-game', {code, name})
        socket.on('err', ({message}) => {
            if(!pressed)
                alert(message)
            setPressed(true)})
        socket.on('authenticated',(value) => {
            sessionStorage.setItem('game-code', code)
            sessionStorage.setItem('player-name', name)
            if(value === 1)
                router.push('/player/avatar')
            else{
                if(!pressed)
                    alert('Wrong code entered! Please try again.')
           }
        })
    }

    const onChangeHandler = (e) => {
        e.target.name === 'code'? setCode(e.target.value) : setName(e.target.value)
    }

    return (
        <div className='h-full flex flex-col'>
            <input name = 'name' className='bg-gray-300 rounded-md p-2 text-black text-center' placeholder='Enter Name' value = {name} onChange = {e => onChangeHandler(e)} />
            <input name = 'code' className='bg-gray-300 rounded-md p-2 mt-3 text-black text-center' placeholder='Enter Code' value = {code} onChange = {e => onChangeHandler(e)} />
            <Button text = {'Join'} clickHandler = {clickHandler} />
        </div>
    )
}

export default Join
