const Scoring = ({compoundCorrect, compoundIncorrect, otherCorrect, otherIncorrect, otherAdjacent}) => {
    return ( 
        <div className="flex justify-center items-center h-screen">
                <div className="bg-gray-200 flex justify-around items-center h-1/2 w-1/2">
                    <div>
                        <div className="text-2xl mb-8 font-bold">Other Emotion</div>
                        <div className="text-2xl">Correct Guess: {otherCorrect}</div>
                        <div className="text-2xl">Adjacent Cell: {otherAdjacent}</div>
                        <div className="text-2xl">Incorrect Guess: {otherIncorrect}</div>
                    </div>
                    <div>
                        <div className="text-2xl mb-8 font-bold">Compound Emotion</div>
                        <div className="text-2xl">Correct Guess: {compoundCorrect}</div>
                        <div className="text-2xl">Incorrect Guess: {compoundIncorrect}</div>
                    </div>
                </div>
            </div>
     );
}
 
export default Scoring;