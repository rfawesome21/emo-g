import { useRouter } from "next/router";
import { useState } from "react";

const exitGame = (props) => {

    const router = useRouter()

    const [confirmExit, setConfirmExit] = useState(false)

    return ( 
        <div className="bg-black bg-opacity-50 flex justify-center items-center h-screen w-screen" style={{position:"absolute", top:"0", left:"0", zIndex:"3"}}>
            {
            !confirmExit?
            <div className="px-12 py-4 text-xl font-bold bg-gray-200 border-2 border-black cursor-pointer" onClick={() => setConfirmExit(true)}>
                Exit Game
            </div>
            :
            <div className="px-12 py-4 text-xl font-bold bg-gray-200 border-2 border-black">
                <div>Do you want to exit the game?</div>
                <br/>
                <div className="flex justify-evenly">
                    <div className="cursor-pointer" onClick={() => router.push("/")}>Yes</div>
                    <div className="cursor-pointer" onClick={() => props.cancelPress(false)}>No</div>
                </div>
            </div>
            }
        </div>
     );
}
 
export default exitGame;