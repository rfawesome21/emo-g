const Scoring = () => {
    return ( 
        <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200 flex justify-around items-center h-1/2 w-1/2">
                    <div>
                        <div className="text-2xl mb-8 font-bold">Other Emotion</div>
                        <div className="text-2xl">Correct Guess: 02</div>
                        <div className="text-2xl">Adjacent Cell: 01</div>
                        <div className="text-2xl">Incorrect Guess: 00</div>
                    </div>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Compound Emotion</div>
                        <div className="text-2xl">Correct Guess: 03</div>
                        <div className="text-2xl">Incorrect Guess: 00</div>
                    </div>
                </div>
            </div>
     );
}
 
export default Scoring;