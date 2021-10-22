import React from 'react'
import Navbar from '../components/Navbar'

const bg={
    backgroundImage: 'url("https://lh3.googleusercontent.com/pw/AM-JKLWpsh3dJ9PBVT7EctH4we3NFsK_Ak9HfOxDA43uKDj03Dcr1j0fMbYJ5zQmiWasH3-W1vjujsrC7jzossGI52QYfTrZ1EF-ZDkoERMcNfalvKOOmswYHiOnG4g4Tp1zlgw2gLLZWyfSEmwyyE2pmaBE=w1563-h879-no?authuser=0")',
    backgroundSize: "100vw 100vh"
}

const play = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center' style={bg}>
            <div className="px-8 py-12 bg-gray-200 rounded-lg">
                <Navbar />
            </div>
        </div>
    )
}

export default play
