import { useState } from "react";

const RuleBook = () => {
    const [ruleBook, ruleBookClicked] = useState(false)

    return ( 
        <>
        <div className="px-4 py-2 bg-gray-200 text-lg font-bold cursor-pointer" style={{position:"absolute", top:"2rem", right:"2rem"}} onClick={() => ruleBookClicked(true)}>
            Rule Book
        </div>  
        {ruleBook?
        <div className="flex justify-center h-screen w-screen bg-black bg-opacity-50 overflow-hidden items-center" style={{position:"absolute", top:"0", left:"0"}}>
            <div className="bg-red-200 h-4/5 w-4/5 relative">
                <div className="text-3xl cursor-pointer" style={{position:"absolute", top:"2rem", right:"2rem"}} onClick={() => ruleBookClicked(false)}>&times;</div>
                <div className="text-center font-bold text-2xl mt-4">RULE BOOK</div>
            </div>
        </div>:<></>}
        </>
);
}
 
export default RuleBook;