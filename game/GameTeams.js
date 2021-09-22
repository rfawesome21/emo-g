const { getRandomInt } = require('./GameFunctions')
let {roomSpecificGamePlay, Password} = require('./GameVariables')

module.exports = (io, socket) => {
    const joinTeams = (gameCode) => {
        let index
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === gameCode){
                    index = i
                }
        }
        socket.join(gameCode)
        console.log(`${index} is index and ${gameCode} is game code`);
        io.in(gameCode).emit('players', roomSpecificGamePlay.room.game[index].players)
    }

    const maxPlayersPerTeam = ({gameCode, playerPerTeam}) => {
        let index
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === gameCode){
                    index = i
                }
        }
        roomSpecificGamePlay.room.game[index].MAX_PLAYERS_PER_TEAM = playerPerTeam
    }

    const selectAMode = ({gameCode, mode}) => {
        let index
        for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
            if(roomSpecificGamePlay.room.game[i].id === gameCode){
                index = i
            }
        }
        roomSpecificGamePlay.room.game[index].mode = mode
        if(mode === 'random'){
            for(let i = 0; i < roomSpecificGamePlay.room.game[index].players.length; i++){
                let j = getRandomInt(0,19)
                if(roomSpecificGamePlay.room.game[index].teams[j].teamMembers.length < roomSpecificGamePlay.room.game[index].MAX_PLAYERS_PER_TEAM)
                    roomSpecificGamePlay.room.game[index].teams[j].teamMembers.push(roomSpecificGamePlay.room.game[index].players[i])
                else{
                    let k
                    while(k!== j){
                        k = getRandomInt(0,19)
                    }
                    roomSpecificGamePlay.room.game[index].teams[k].teamMembers.push(roomSpecificGamePlay.room.game[index].players[i])
                }
            }
            console.log(roomSpecificGamePlay.room.game[index]);
        }
    }

    const randomTeamDivision = (gameCode) => {
        let index
        for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
            if(roomSpecificGamePlay.room.game[i].id === gameCode){
                index = i
            }
        }
        io.to(socket.id).emit('random-teams', roomSpecificGamePlay.room.game[index].teams)
    }

    socket.on('join-teams', joinTeams)
    socket.on('max-players', maxPlayersPerTeam)
    socket.on('mode', selectAMode)
    socket.on('random-division', randomTeamDivision)

}