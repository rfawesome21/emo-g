const { roomArrayMap } = require("./GameVariables")

module.exports = (io, socket) => {

    const joinTeamRoom = ({gameCode, teamName, playerName}) => {
        console.log('My team is ', teamName);
        socket.join(`${gameCode}-${teamName}`)
        const roomObject = roomArrayMap.get(gameCode)
        console.log(roomObject.teams);
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        console.log(team);
        const player = roomObject.playerDetails.find(p => p.name === playerName)
        if(player.isRandomlySelected){
                io.to(socket.id).emit('role', roomObject.scene[0].roleOne)
                io.to(socket.id).emit('team-players', team.teamMembers)
                io.to(socket.id).emit('team-round', team.roundNo)
                io.to(socket.id).emit('max-rounds', roomObject.MAX_ROUNDS)
                return
        }
        io.to(socket.id).emit('team-players', team.teamMembers)
        io.to(socket.id).emit('team-round', team.roundNo)
        console.log(roomObject.MAX_ROUNDS);
        io.to(socket.id).emit('max-rounds', roomObject.MAX_ROUNDS)
        io.to(socket.id).emit('typing-timer'. roomObject.typingTimer)
        io.to(socket.id).emit('guessing-timer', roomObject.guessingTimer)
        io.to(socket.id).emit('scene', roomObject.scene[0])
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