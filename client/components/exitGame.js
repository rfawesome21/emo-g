import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "./Modal";

const exitGame = (props) => {

    const router = useRouter()

    const [confirmExit, setConfirmExit] = useState(false)

    return ( 
        <Modal>
            
            <div className="px-12 py-4 text-xl font-bold bg-gray-200 border-2 border-black">
                <div>Do you want to exit the game?</div>
                <br/>
                <div className="flex justify-evenly">
                    <div className="cursor-pointer" onClick={() => router.push("/")}>Yes</div>
                    <div className="cursor-pointer" onClick={() => props.cancelPress(false)}>No</div>
                </div>
            </div>
        </Modal>
     );
}
 
export default exitGame;