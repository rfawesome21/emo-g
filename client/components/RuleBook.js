import { useState } from "react";

const RuleBook = () => {
    const [ruleBook, ruleBookClicked] = useState(false)

    return ( 
        <>
        <div className="px-4 py-2 buttonNew absolute top-8 right-8 rounded text-lg font-bold cursor-pointer" onClick={() => ruleBookClicked(true)}>
            Rule Book
        </div>  
        {ruleBook?
        <div className="flex justify-center h-screen w-screen bg-black bg-opacity-50 overflow-hidden items-center absolute top-0 left-0 z-50">
            <div className="bg-red-200 h-4/5 w-4/5 relative">
                <div className="text-3xl cursor-pointer absolute top-8 right-8" onClick={() => ruleBookClicked(false)}>&times;</div>
                <div className="text-center font-bold text-2xl mt-4">RULE BOOK</div>
            </div>
        </div>:<></>}
        </>
);
}
 
export default RuleBook;