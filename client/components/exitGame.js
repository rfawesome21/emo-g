import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "./Modal";

const exitGame = (props) => {

    const router = useRouter()

    const [confirmExit, setConfirmExit] = useState(false)

    return ( 
        <div className="burlywoodOverlay h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
            
            <div className="px-12 py-4 text-xl font-bold heading rounded-xl">
                <div>Do you want to leave the game?</div>
                <br/>
                <div className="flex justify-evenly">
                    <div className="cursor-pointer" onClick={() => router.push("/")}>Yes</div>
                    <div className="cursor-pointer" onClick={() => props.cancelPress(false)}>No</div>
                </div>
            </div>
        </div>
     );
}
 
export default exitGame;