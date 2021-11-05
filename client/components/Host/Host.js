import React from 'react'
import {useRouter} from "next/router"
import Button from '../Button'

const Host = () => {
    const router = useRouter()
    
    return (
        <div className='h-full flex flex-col'>
            <br/>
            <input className='inputs rounded-md p-2 text-black text-center' placeholder='User ID' />
            <input className='inputs rounded-md p-2 mt-3 text-black text-center' placeholder='Password' />
            <div className="absolute xs-mobile:bottom-36 tall-devices:bottom-72 left-0 flex justify-center w-100"><Button text = {'LOGIN'} clickHandler = {() => router.push('/host/settings')} /></div>
        </div>
    )
}

export default Host
