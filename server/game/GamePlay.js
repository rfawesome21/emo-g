const { Emotions, CompoundEmotions } = require("../data/Emotions");
const { roomArrayMap } = require("./GameVariables")
const { getRandomInt } = require('./GameFunctions')

module.exports = (io, socket) => {

    const joinTeamRoom = ({gameCode, teamName}) => {
        console.log('My team is ', teamName);
        socket.join(`${gameCode}-${teamName}`)
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        io.to(socket.id).emit('team-score', team.score)
        io.to(socket.id).emit('team-messages', team.messages)
        io.to(socket.id).emit('team-players', team.teamMembers)
        io.to(socket.id).emit('team-round', team.roundNo)
        io.to(socket.id).emit('max-rounds', roomObject.MAX_ROUNDS)
        io.to(socket.id).emit('typing-timer', roomObject.typingTimer)
        io.to(socket.id).emit('guessing-timer', roomObject.guessingTimer)
        io.to(socket.id).emit('scene', roomObject.scene[0])
        io.to(socket.id).emit('team-disabled', team.isDisabled)
    }

    const isTyping = ({gameCode, teamName, playerName}) => {
        const roomObject = roomArrayMap.get(gameCode)
        const player = roomObject.playerDetails.find(p => p.name === playerName)
        io.in(`${gameCode}-${teamName}`).emit('active-player', player.name)
    }

    const addedMessage = ({gameCode,teamName, message}) => {
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.messages = message
        team.isDisabled = true
        io.to(socket.id).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('active-player', '')
        io.in(`${gameCode}-${teamName}`).emit('team-messages', team.messages)
    }

    const emotionGuessed = ({gameCode, teamName, emotion}) => {
        emotion = emotion.toUpperCase()
        console.log(emotion);
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))

        let t = getRandomInt(0, team.teamMembers.length - 1)
        while(t === team.randomIndex){
            t = getRandomInt(0, team.teamMembers.length - 1)
        }
        team.teamMembers[t].isRandomlySelected = true
        team.randomIndex = t

        for(let i = 0; i < team.teamMembers.length; i++){
            if(i !== team.randomIndex)
                team.teamMembers[i].isRandomlySelected = false
        }

        team.roundNo += 1
        team.emotionsGuessed.push(emotion)
        team.typingTimer = roomObject.typingTimer
        team.guessingTimer = roomObject.guessingTimer
        team.isDisabled = false
        io.in(`${gameCode}-${teamName}`).emit('team-round', team.roundNo)
        io.in(`${gameCode}-${teamName}`).emit('team-players', team.teamMembers)
        io.in(`${gameCode}-${teamName}`).emit('typing-timer', team.typingTimer)
        io.in(`${gameCode}-${teamName}`).emit('guessing-timer', team.guessingTimer)
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('team-score', team.score)
    }

    socket.on('submit-statement', addedMessage)
    socket.on('join-team-room', joinTeamRoom)
    socket.on('is-typing', isTyping)
    socket.on('guessed', emotionGuessed)
}