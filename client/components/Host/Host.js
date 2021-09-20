import React from 'react'
import {useRouter} from "next/router"

const Host = () => {
    const router = useRouter()
    
    return (
        <div className='h-full flex flex-col'>
            <input className='bg-gray-300 rounded-md p-2 text-black text-center' placeholder='Username' />
            <input className='bg-gray-300 rounded-md p-2 mt-3 text-black text-center' placeholder='Password' />
            <button className='bg-gray-200 border-2 border-black rounded-md px-2 py-1 mt-3 w-40 text-lg font-bold self-center'
            onClick = {() => router.push('/host/settings')}>
            Login
            </button>
        </div>
    )
}

export default Host
