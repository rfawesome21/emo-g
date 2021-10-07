const { Emotions, CompoundEmotions, EmotionsAccordingToColor } = require("../data/Emotions");
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
        io.in(`${gameCode}-${teamName}`).emit('typing-counter', team.typingCounter)
        io.in(gameCode).emit('team-details', roomObject.teams)
        io.in(`${gameCode}-${teamName}`).emit('guessing-counter', team.guessingCounter)
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
        io.in(`${gameCode}-${teamName}`).emit('typing-counter', team.typingCounter)
        io.in(`${gameCode}-${teamName}`).emit('guessing-counter', team.guessingCounter)
    }

    const emotionGuessed = ({gameCode, teamName, emotion}) => {
        emotion = emotion.toUpperCase()
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))

        if(Emotions.some(row => row.includes(emotion)) || CompoundEmotions.includes(emotion))
        {
            console.log(emotion);
            if(roomObject.emotion[team.roundNo- 1] === emotion)
            {   
                console.log('Yes');
                let emotionRow = Emotions.filter(row => row.find(e => e === emotion))
                if(emotionRow.length >= 1){
                    team.score += 2
                }
                let compoundEmotionRow = CompoundEmotions.find(e => e === emotion)
                if(compoundEmotionRow)
                    team.score += 3
            }
            else if(!CompoundEmotions.includes(emotion)){
                const coloredEmotion = EmotionsAccordingToColor.find(e => e.emotion === emotion).color
                const allEmotionsOfThisColor = EmotionsAccordingToColor.filter(e => e.color === coloredEmotion)
                const correctColoredEmotion = EmotionsAccordingToColor.find(e => e.emotion === roomObject.emotion[team.roundNo - 1]).color
                const colorTwoCorrectColoredEmotion = EmotionsAccordingToColor.find(e => e.emotion === roomObject.emotion[team.roundNo - 1]).colorTwo
                for(let i of allEmotionsOfThisColor){
                    if(i.color === correctColoredEmotion){
                        team.score += 1
                        break
                    }
                    else if(i.colorTwo === colorTwoCorrectColoredEmotion){
                        team.score += 1
                        break
                    }
                }
            }
        }
        

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

        let arr = roomObject.guessingTimer.split(':')
        let totalTimerG = Number(arr[0]) * 60 + Number(arr[1])
        
        let arr2 = roomObject.typingTimer.split(':')
        let totalTimerT = Number(arr2[0]) * 60 + Number(arr2[1])

        team.typingCounter = totalTimerT
        team.guessingCounter = totalTimerG

        io.in(`${gameCode}-${teamName}`).emit('team-round', team.roundNo)
        io.in(`${gameCode}-${teamName}`).emit('team-players', team.teamMembers)
        io.in(`${gameCode}-${teamName}`).emit('typing-counter', team.typingCounter)
        io.in(`${gameCode}-${teamName}`).emit('guessing-counter', team.guessingCounter)
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('team-score', team.score)
        io.in(gameCode).emit('team-details', roomObject.teams)
    }

    const typingTimeDetails = ({gameCode, teamName, counterT}) => {
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.typingCounter = counterT
    }

    const guessingTimeDetails = ({gameCode, teamName, counterG}) => {
        const roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.guessingCounter = counterG
    }

    const hostDashboard = (gameCode) => {
        socket.join(gameCode)
        const roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('team-details', roomObject.teams)
        io.to(socket.id).emit('game-scenes', roomObject.scene)
        io.to(socket.id).emit('typing-timer', roomObject.typingTimer)
        io.to(socket.id).emit('guessing-timer', roomObject.guessingTimer)
        io.to(socket.id).emit('emotions', roomObject.emotion)
        io.to(socket.id).emit('max-rounds', roomObject.MAX_ROUNDS)
    }

    socket.on('submit-statement', addedMessage)
    socket.on('join-team-room', joinTeamRoom)
    socket.on('is-typing', isTyping)
    socket.on('guessed', emotionGuessed)
    socket.on('typing-time', typingTimeDetails)
    socket.on('guessing-time', guessingTimeDetails)
    socket.on('host-dashboard', hostDashboard)
}