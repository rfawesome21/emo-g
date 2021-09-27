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
                teamMembers : []
            })
        }
        if(mode === 'random'){
            for(let i = 0; i < roomObject.players.length; i++){
                let j = getRandomInt(0, roomObject.teams.length - 1)
                if(roomObject.teams[j].teamMembers.length < roomObject.MAX_PLAYERS_PER_TEAM)
                    roomObject.teams[j].teamMembers.push(roomObject.playerDetails[i])
                else{
                    let k
                    console.log('Max Players exceeded');
                    while(k === j){
                        k = getRandomInt(0, roomObject.teams.length - 1)
                    }
                    roomObject.teams[k].teamMembers.push(roomObject.playerDetails[i])
                }
            }
        }
    }

    const randomTeamDivision = (gameCode) => {
        io.to(socket.id).emit('random-teams', roomArrayMap.get(gameCode).teams)
        io.to(socket.id).emit('no-players', roomArrayMap.get(gameCode).players.length)
    }

    const manualTeamDivision = ({gameCode, playerName, teamName}) => {
        socket.join(gameCode)
        let roomObject = roomArrayMap.get(gameCode)
        let player = roomObject.playerDetails.filter(p => p.name === playerName)
        let team = roomObject.teams.filter(t => t.teamName === teamName)
        if(team.teamMembers.length < roomObject.MAX_PLAYERS_PER_TEAM)
            roomObject.teams.filter(t => t.teamName === teamName).teamMembers.push(player)
        else
            io.to(socket.id).emit('err', {message : 'This team is already full. Please choose a different team.'})
        io.in(gameCode).emit('teams', roomObject.teams)
    }

    const letPlayerChoose = ({gameCode, playerName, teamName}) => {
        socket.join(gameCode)
        let roomObject = roomArrayMap.get(gameCode)
        let team = roomObject.teams.filter(t => t.teamName === teamName)
        let teamObject = team.teamMembers.filter(t => t.name !== playerName)
        let player = roomObject.playerDetails.filter(p => p.name === playerName)
        if(!player.join){
            if(teamObject.teamMembers.length < roomObject.MAX_PLAYERS_PER_TEAM){
                teamObject.teamMembers.push(player)
                player.join = true
            }
            else
                io.to(socket.id).emit('err', {message : 'This team is full. Please join another team'})
        }
        else
            io.to(socket.id).emit('err')
        console.log(roomObject.teams);
    }   

    socket.on('join-teams', joinTeams)
    socket.on('max-players', maxPlayersPerTeam)
    socket.on('mode', selectAMode)
    socket.on('random-division', randomTeamDivision)
    socket.on('manual-division', manualTeamDivision)
    socket.on('choice', letPlayerChoose)
}