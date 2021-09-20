import React from 'react'

const Join = () => {
    return (
        <div className='h-full flex flex-col'>
            <input className='bg-gray-300 rounded-md p-2 text-black text-center' placeholder='Enter Name' />
            <input className='bg-gray-300 rounded-md p-2 mt-3 text-black text-center' placeholder='Enter Code' />
            <button className='bg-gray-200 border-2 border-black rounded-md px-2 py-1 mt-3 w-20 text-lg font-bold self-center'>
            Join 
            </button>
        </div>
    )
}

export default Join
