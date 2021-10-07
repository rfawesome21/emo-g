const TimeRound = ({  typingTime, guessingTime, MAX_ROUND }) => {
    console.log(guessingTime);
    return ( 
        <div className="flex flex-row justify-center h-screen items-center">
            <div className="flex flex-column">
                <div className="flex flex-row justify-between bg-gray-200 px-4 py-4">
                    <div className="pl-4">
                        <div className="flex justify-between ml-4 my-2 text-lg">
                            Typing time: 
                            <span className='px-2 font-semibold'>
                            {typingTime}
                            </span>
                            mins
                        </div>
                        <div className="flex justify-between ml-4 my-2 text-lg">
                            Guessing time:
                            <span className='px-4 font-semibold'>
                            {guessingTime}
                            </span>
                            mins
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between bg-gray-200 px-4 py-4">
                    <div className="text-lg ml-4">Number of rounds</div>
                    <div className="text-xl">
                        {MAX_ROUND}
                    </div>
                </div>
            </div>
        </div>
     )
}
 
export default TimeRound;