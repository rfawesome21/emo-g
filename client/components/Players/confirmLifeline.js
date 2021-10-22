const ConfirmLifeline = (props) => {
    console.log(props);
    return ( 
        <div className="h-screen w-screen bg-opacity-50 absolute top-0 left-0 flex justify-center items-center" style={{backgroundColor:"rgba(235, 162, 130, 0.5)"}}>
            <div className="bg-gray-200 rounded-lg p-4 text-center" style={{backgroundColor:"#fffaee"}} onClick={() => props.setConfirmLifeline(false)}>
               <div>
                    Do you want to use the lifeline<br />{props.lifeLine}?
               </div>
               <div className="flex justify-evenly items-center">
                    <div>Yes</div>
                    <div>No</div>
               </div>
            </div>                
        </div>
     );
}
 
export default ConfirmLifeline;