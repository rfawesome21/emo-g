import { useState } from "react";
import TeamPlayers from "../TeamPlayers";
import DashboardTeamPlayers from "./DashboardTeamPlayers";

const Teams = ({teams}) => {
    console.log(teams);
    const [activeTeam, setActiveTeam] = useState(1)

    return ( 
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 h-2/3 w-4/5 flex">
                <div className="px-4 py-2" style={{flex:6}}>
                    <div className="my-2 px-4 py-2 font-bold text-xl bg-gray-400 flex justify-between items-center">
                        <div className='text-gray-500'>Team</div>
                        <div className="text-gray-500 px-2">Players</div>
                        <div className="text-gray-500 px-2">Round</div>
                        <div className="text-gray-500 px-2">Points</div>
                        <div></div>
                    </div>
                    {teams?teams.map((team, index) => 
                    (<div className="my-2 px-4 py-2 font-bold text-xl bg-gray-300 flex justify-between items-center cursor-pointer"
                    key = {index}
                    onClick = {() => setActiveTeam(team.teamName)}
                    >
                        <div className='ml-5'>{team.teamName}</div>
                        <div className="text-gray-400 ml-12">{team.teamMembers.length}</div>
                        <div className="text-gray-400 ml-12">{team.roundNo}/10</div>
                        <div className="text-gray-400 ml-12">{team.score < 10? `0${team.score}` : `${team.score}`}</div>
                        {team.call?<div className="rounded-full bg-red-700 h-4 w-4"></div>:<div className="rounded-full bg-gray-300 h-4 w-4"></div>}
                    </div>
                    )):<></>}
                </div>
                <DashboardTeamPlayers activeTeam = {teams.find(t => t.teamName === activeTeam)} />
            </div>
        </div>
     );
}
 
export default Teams;