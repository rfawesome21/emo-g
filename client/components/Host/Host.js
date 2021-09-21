import React from 'react'
import {useRouter} from "next/router"
import Button from '../Button'

const Host = () => {
    const router = useRouter()
    
    return (
        <div className='h-full flex flex-col'>
            <input className='bg-gray-300 rounded-md p-2 text-black text-center' placeholder='Username' />
            <input className='bg-gray-300 rounded-md p-2 mt-3 text-black text-center' placeholder='Password' />
            <Button text = {'Login'} clickHandler = {() => router.push('/host/settings')} />
        </div>
    )
}

export default Host
