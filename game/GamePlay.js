const { roomArrayMap } = require("./GameVariables")

module.exports = (io, socket) => {

    const joinTeamRoom = ({gameCode, teamName, playerName}) => {
        socket.join(`${gameCode}-${teamName}`)
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === teamName)
        const player = roomObject.playerDetails.find(p => p.name === playerName)
        if(player.isRandomlySelected){
            if(team.previousSceneRole === roomObject.scenes[0].role[0]){
                io.to(socket.id).emit('role', roomObject.scenes[0].role[1])
                io.to(socket.id).emit('team-players', team.teamMembers)
                return
            }
            io.to(socket.id).emit('role', roomObject.scenes[0].role[0])
        }
        io.to(socket.id).emit('team-players', team.teamMembers)
    }

    const isTyping = ({gameCode, teamName, playerName}) => {
        const roomObject = roomArrayMap.get(gameCode)
        const player = roomObject.playerDetails.find(p => p.name === playerName)
        io.in(`${gameCode}-${teamName}`).emit('active-player', player.name)
    }

    const emotionGuessed = ({gameCode, teamName, emotion}) => {
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === teamName)
        const roundEmotion = roomObject.emotions.get(team.roundNo)
        
    }

    socket.on('join-team-room', joinTeamRoom)
    socket.on('is-typing', isTyping)
    socket.on('guessed', emotionGuessed)
}