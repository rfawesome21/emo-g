const { Emotions, CompoundEmotions, EmotionsAccordingToColor, EmotionsAccordingToColorSeparatedInArray } = require("../data/Emotions");
const { roomArrayMap } = require("./GameVariables")
const { getRandomInt } = require('./GameFunctions')

module.exports = (io, socket) => {

    const joinTeamRoom = ({code, teamName}) => {
        console.log('My team is ', teamName)
        socket.join(`${code}-${teamName}`)
        const roomObject = roomArrayMap.get(code)
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
        io.to(socket.id).emit('typing-counter', team.typingCounter)
        io.to(socket.id).emit('guessing-counter', team.guessingCounter)
        io.to(socket.id).emit('current-round-emotion', roomObject.emotion[team.roundNo - 1])
        io.in(code).emit('team-details', roomObject.teams)
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
        console.log(team.roundNo);
        team.isDisabled = true
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('active-player', '')
        io.in(`${gameCode}-${teamName}`).emit('team-messages', team.messages)
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
                    team.score += roomObject.otherCorrect
                }
                let compoundEmotionRow = CompoundEmotions.find(e => e === emotion)
                if(compoundEmotionRow)
                    team.score += roomObject.compoundCorrect
            }
            else if(!CompoundEmotions.includes(emotion)){
                const coloredEmotion = EmotionsAccordingToColor.find(e => e.emotion === emotion).color
                const allEmotionsOfThisColor = EmotionsAccordingToColor.filter(e => e.color === coloredEmotion)
                let correctColoredEmotion = ''
                let colorTwoCorrectColoredEmotion = ''
                if(!CompoundEmotions.includes(roomObject.emotion[team.roundNo - 1])){
                    correctColoredEmotion = EmotionsAccordingToColor.find(e => e.emotion === roomObject.emotion[team.roundNo - 1]).color
                    colorTwoCorrectColoredEmotion = EmotionsAccordingToColor.find(e => e.emotion === roomObject.emotion[team.roundNo - 1]).colorTwo
                }
                for(let i of allEmotionsOfThisColor){
                    if(i.color === correctColoredEmotion){
                        team.score += roomObject.adjacent
                        break
                    }
                    else if(i.colorTwo === colorTwoCorrectColoredEmotion){
                        team.score += roomObject.adjacent
                        break
                    }
                }
            }
            else{
                team.score += roomObject.otherIncorrect
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

        if(team.roundNo === roomObject.scene[0].nudgeRoundNo - 1){
            team.messages.push(roomObject.scene[0].nudge)
        }

        
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('active-player', '')
        io.in(`${gameCode}-${teamName}`).emit('team-messages', team.messages)
        io.in(`${gameCode}-${teamName}`).emit('team-round', team.roundNo)
        io.in(`${gameCode}-${teamName}`).emit('team-players', team.teamMembers)
        io.in(`${gameCode}-${teamName}`).emit('typing-counter', team.typingCounter)
        io.in(`${gameCode}-${teamName}`).emit('guessing-counter', team.guessingCounter)
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('team-score', team.score)
        io.in(`${gameCode}-${teamName}`).emit('current-round-emotion', roomObject.emotion[team.roundNo - 1])
        io.in(gameCode).emit('team-details', roomObject.teams)
    }

    const emotionGuessedArray = ({gameCode, teamName, guessedEmotions}) => {
        console.log(guessedEmotions);
        const roomObject = roomArrayMap.get(gameCode)
        guessedEmotions = guessedEmotions.map(g => g.toUpperCase())
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        if(guessedEmotions.includes(roomObject.emotion[team.roundNo - 1])){
            console.log(roomObject.emotion[team.roundNo - 1]);
            team.score += roomObject.otherCorrect
        }
        else{
            team.score += roomObject.otherIncorrect
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
        team.emotionsGuessed.push(guessedEmotions)
        team.typingTimer = roomObject.typingTimer
        team.guessingTimer = roomObject.guessingTimer
        team.isDisabled = false

        let arr = roomObject.guessingTimer.split(':')
        let totalTimerG = Number(arr[0]) * 60 + Number(arr[1])
        
        let arr2 = roomObject.typingTimer.split(':')
        let totalTimerT = Number(arr2[0]) * 60 + Number(arr2[1])

        team.typingCounter = totalTimerT
        team.guessingCounter = totalTimerG
        
        if(team.roundNo === roomObject.scene[0].nudgeRoundNo - 1){
            team.messages.push(roomObject.scene[0].nudge)
        }

        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('active-player', '')
        io.in(`${gameCode}-${teamName}`).emit('team-messages', team.messages)
        io.in(`${gameCode}-${teamName}`).emit('set-this-to-true', false)
        io.in(`${gameCode}-${teamName}`).emit('team-round', team.roundNo)
        io.in(`${gameCode}-${teamName}`).emit('team-players', team.teamMembers)
        io.in(`${gameCode}-${teamName}`).emit('typing-counter', team.typingCounter)
        io.in(`${gameCode}-${teamName}`).emit('guessing-counter', team.guessingCounter)
        io.in(`${gameCode}-${teamName}`).emit('team-disabled', team.isDisabled)
        io.in(`${gameCode}-${teamName}`).emit('team-score', team.score)
        io.in(`${gameCode}-${teamName}`).emit('current-round-emotion', roomObject.emotion[team.roundNo - 1])
        io.in(gameCode).emit('team-details', roomObject.teams)
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
        io.to(socket.id).emit('compound-correct', roomObject.compoundCorrect)
        io.to(socket.id).emit('compound-incorrect', roomObject.compoundIncorrect)
        io.to(socket.id).emit('adjacent', roomObject.adjacent)
        io.to(socket.id).emit('other-correct', roomObject.otherCorrect)
        io.to(socket.id).emit('other-incorrect', roomObject.otherIncorrect)
    }

    socket.on('submit-statement', addedMessage)
    socket.on('join-team-room', joinTeamRoom)
    socket.on('is-typing', isTyping)
    socket.on('guessed', emotionGuessed)
    socket.on('host-dashboard', hostDashboard)
    socket.on('guessed-array', emotionGuessedArray)
}