const ConfirmLifeline = (props) => {
    return ( 
        <div className="h-screen w-screen bg-opacity-50 absolute top-0 left-0 flex justify-center items-center" style={{backgroundColor:"rgba(235, 162, 130, 0.5)"}}>
            <div className="bg-gray-200 rounded-lg p-4 text-center" style={{backgroundColor:"#fffaee", color:"#da764b"}}>
               <div className="text-xl font-bold">
                    Do you want to use the lifeline<br />{props.lifeLine}?
               </div>
               <div className="flex justify-evenly items-center">
                    <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => props.setConfirmLifeline(false)}>Yes</div>
                    <div className="buttonNew text-lg px-2 py-0 rounded" onClick={() => props.setConfirmLifeline(false)}>No</div>
               </div>
            </div>                
        </div>
     );
}
 
export default ConfirmLifeline;