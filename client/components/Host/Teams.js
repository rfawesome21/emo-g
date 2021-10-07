const Teams = ({teams, players, roundResults}) => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 h-2/3 w-4/5 flex">
                <div className="px-4 py-2" style={{flex:6}}>
                    <div className="my-2 px-4 py-2 font-bold text-xl bg-gray-400 flex justify-between items-center">
                        <div>Team</div>
                        <div className="text-gray-500 ml-8">Players</div>
                        <div className="text-gray-500">Rounds</div>
                        <div className="text-gray-500">Points</div>
                        <div></div>
                    </div>
                    {teams?teams.map((team) => (<div className="my-2 px-4 py-2 font-bold text-xl bg-gray-300 flex justify-between items-center">
                        <div>{team.teamName}</div>
                        <div className="text-gray-400">4 Players</div>
                        <div className="text-gray-400">6/10</div>
                        <div className="text-gray-400">03</div>
                        {team.call?<div className="rounded-full bg-red-700 h-4 w-4"></div>:<div className="rounded-full bg-gray-300 h-4 w-4"></div>}
                    </div>)):<></>}
                </div>
                <div className="" style={{flex:4}}>
                    <div className="flex justify-around items-center text-xl bg-gray-300 font-bold h-1/4">
                        <div>
                            <div>Team 02</div>
                            <div className="text-base">4 Members</div>
                        </div>
                        <div className="bg-gray-400 px-2 py-1">JOIN</div>
                    </div>
                    <div className="flex h-3/4">
                        <div className="bg-gray-400 h-full overflow-y-auto" style={{flex:3}}>
                            {players?players.map((player) => (
                                <div className ="my-4 text-center">
                                    <div className="rounded-full mx-auto bg-gray-200 h-16 w-16"></div>
                                    <div>{player}</div>
                                </div>
                            )):<></>}
                        </div>
                        <div className="h-full p-4 py-2 text-lg overflow-y-auto" style={{flex:7}}>
                            {roundResults?roundResults.map((result, index) => (
                                <div className="my-2"><b>Round {index+1}: </b>{result}</div>
                            )):<></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Teams;