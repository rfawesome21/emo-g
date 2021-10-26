const { roomArrayMap } = require("./GameVariables")

module.exports = (io, socket) => {
    
    const thisOrThat = ({gameCode, teamName}) => {
        console.log('LifeLine used: This or that!');
        let roomObject = roomArrayMap.get(gameCode)
        const team = roomObject.teams.find(t => t.teamName === Number(teamName))
        team.thisOrThat = true
        const correctEmotion = roomObject.emotion[team.roundNo - 1]
        let otherEmotion = roomObject.emotions[Math.floor(Math.random) * roomObject.emotions.length]
        while(otherEmotion === correctEmotion){
            otherEmotion = roomObject.emotions[Math.floor(Math.random) * roomObject.emotions.length]
        }
        let thirdEmotion = roomObject.emotions[Math.floor(Math.random) * roomObject.emotions.length]
        while(thirdEmotion === otherEmotion || thirdEmotion === correctEmotion){
            thirdEmotion = roomObject.emotions[Math.floor(Math.random) * roomObject.emotions.length]
        }
        io.in(`${gameCode}-${teamName}`).emit('your-choices', {correctEmotion, otherEmotion, thirdEmotion})
    }

    socket.on('this-or-that', thisOrThat)
}