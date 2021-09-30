const { getRandomInt } = require('./GameFunctions')
// let {roomSpecificGamePlay, Password} = require('./GameVariables')

const { roomArrayMap } = require("./GameVariables")


module.exports = (io, socket) => {
    const joinTeams = (gameCode) => {
        socket.join(gameCode)
        io.in(gameCode).emit('players', roomArrayMap.get(gameCode).playerDetails)
    }

    const maxPlayersPerTeam = ({gameCode, playersPerTeam}) => {
        console.log('dudes : ',playersPerTeam);
        console.log('code : ', gameCode);
        roomArrayMap.get(gameCode).MAX_PLAYERS_PER_TEAM = playersPerTeam
    }

    const selectAMode = ({gameCode, mode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.teams.length = 0
        roomArrayMap.get(gameCode).mode = mode
        roomObject.NO_OF_TEAMS = Math.ceil(roomObject.players.length/roomObject.MAX_PLAYERS_PER_TEAM)
        for(let m = 0; m < roomObject.NO_OF_TEAMS; m++){
            roomObject.teams.push({
                teamName : m+1,
                teamMembers : [],
                roundNo : 1
            })
        }
        if(mode === 'random'){
            for(let i = 0; i < roomObject.players.length; i++){
                let j = getRandomInt(0, roomObject.teams.length - 1)
                if(roomObject.teams[j].teamMembers.length < roomObject.MAX_PLAYERS_PER_TEAM){
                    roomObject.playerDetails[i].join = true
                    roomObject.teams[j].teamMembers.push(roomObject.playerDetails[i])
                }
                else{
                    let k = getRandomInt(0, roomObject.teams.length - 1)
                    while(k === j){
                        k = getRandomInt(0, roomObject.teams.length - 1)
                    }
                    console.log(`k is ${k}`);
                    roomObject.playerDetails[i].join = true
                    roomObject.teams[k].teamMembers.push(roomObject.playerDetails[i])
                }
            }
        }
    }

    const randomTeamDivision = (gameCode) => {
        io.to(socket.id).emit('random-teams', roomArrayMap.get(gameCode).teams)
    }

    const manualTeamDivision = (gameCode) => {
        let roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('teams', roomObject.teams)
    }

    const letPlayerChoose = ({gameCode, playerName, teamName}) => {
        socket.join(gameCode)
        let roomObject = roomArrayMap.get(gameCode)
        let team = roomObject.teams.filter(t => t.teamName === teamName)
        let teamObject = team.teamMembers.filter(t => t.name !== playerName)
        let player = roomObject.playerDetails.filter(p => p.name === playerName)
        if(!player.join){
            if(teamObject.teamMembers.length < roomObject.MAX_PLAYERS_PER_TEAM){
                player.join = true
                teamObject.teamMembers.push(player)
            }
            else
                io.to(socket.id).emit('err', {message : 'This team is full. Please join another team'})
        }
        else
            io.to(socket.id).emit('err')
        console.log(roomObject.teams);
    }   

    const changeTeam = ({team, player, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        const teams = roomObject.teams.filter(t => t.teamName === team)
        const teamMembers = teams[0].teamMembers.filter(p => (p.name === player.name))
        if(teamMembers.length > 0){
            console.log('Error message');
            io.to(socket.id).emit('err' , {message : 'This player already belongs to that team!'})
            return
        }
        else{
            console.log(`Max Players : ${roomObject.MAX_PLAYERS_PER_TEAM}`);
            for(let i = 0; i < roomObject.teams.length; i++){
                for(let j = 0; j < roomObject.teams[i].teamMembers.length; j++){  
                    if( roomObject.MAX_PLAYERS_PER_TEAM <= roomObject.teams[i].teamMembers.length)
                    {
                        console.log('Max Players reached!');
                        io.to(socket.id).emit('err', {message : 'This Team already has maximum number of players!'})
                        return
                    }
                    if(roomObject.teams[i].teamMembers[j].name === player.name){
                        roomObject.teams[i].teamMembers =  roomObject.teams[i].teamMembers.filter(p => p.name !== player.name)            
                        
                        break
                    }
                }
            }
        }

        teams[0].teamMembers.push(player)
        const playerNu = roomObject.playerDetails.filter(p => p.name === player.name)
        playerNu[0].join = true
        const playersWithoutTeams = roomObject.playerDetails.filter(p => p.join === false)
        io.to(gameCode).emit('players-without-teams', playersWithoutTeams)
        io.to(socket.id).emit('manual-teams', roomObject.teams)
        io.to(socket.id).emit('random-teams', roomObject.teams)
    }

    const getPlayers = (gameCode) => {
        socket.join(gameCode)
        let roomObject = roomArrayMap.get(gameCode)
        const playersWithoutTeams = roomObject.playerDetails.filter(p => p.join === false)
        io.to(socket.id).emit('players-without-teams', playersWithoutTeams)
    }   

    const createTeam = (gameCode) => {
        let roomObject = roomArrayMap.get(gameCode)
        let teamName = roomObject.teams.length + 1
        let teamMembers = []
        let roundNo = 1
        let team = {teamName, teamMembers, roundNo}
        roomObject.teams.push(team)
        io.to(socket.id).emit('random-teams', roomArrayMap.get(gameCode).teams)

    }

    socket.on('create-team', createTeam)
    socket.on('get-players-no-teams', getPlayers)
    socket.on('change-team', changeTeam)
    socket.on('join-teams', joinTeams)
    socket.on('max-players', maxPlayersPerTeam)
    socket.on('mode', selectAMode)
    socket.on('random-division', randomTeamDivision)
    socket.on('manual-division', manualTeamDivision)
    socket.on('choice', letPlayerChoose)
}