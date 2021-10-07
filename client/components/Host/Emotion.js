const Emotion = ({emotionArray, Wheel}) => {
    return ( 
        <div style={{ height: "100%" }}>
                <div className="mt-20 justify-center align-center text-center flex flex-col container px-10" >
                    <div className="grid grid-col justify-evenly align-center ">
                    </div>
                    <div className="h-80 mb-16 grid grid-col-1 grid-flow-col  place-items-center">
                        <div style={{overflowY: "auto", scrollBehavior: "smooth"}} className="bg-gray-300 h-96 w-96 p-3 scl">
                            <div className="font-bold mb-3 mt-2 align-center text-center text-xl">Set Emotions
                            </div>
                            <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-2">
                                {emotionArray.map((emotion, index) => <div className="py-2 px-3 w-40 h-16 font-bold text-md bg-gray-50 text-center grid relative">Round{` ${index + 1}`}
                                    <span className="capitalize">{emotion}</span>
                                    </div>)}
                            </div>
                        </div>
                        <div className=" ">
                            <div className="">
                                {Wheel}
                            </div>
                        </div>
                    </div>
                </div >
                <div className="mt-10 text-center">
                    <button onClick={() => router.push("/hostScreen4")} className="bg-gray-200 border-2 mt-28 border-black rounded-md px-4 py-2 text-xl font-bold">Save</button>
                </div>
            </div>
     );
}
 
export default Emotion;