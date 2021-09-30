// const game = []
// const {Teams} = require('../data/Teams')
// const {Scenes} = require('../data/Scenes')
// const defaultGame = Teams
// let mode = 'default'
// let { roomSpecificGamePlay, Password} = require('./GameVariables')

const { roomArrayMap } = require("./GameVariables")

module.exports = (io, socket) => {



    const setRounds = ({MAX_ROUND, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.MAX_ROUNDS = Number(MAX_ROUND)
    }

    const setTimer = ({guesser, typer, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.guessingTimer = guesser
        roomObject.typingTimer = typer
    }



    const joinAvatar = ({gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        socket.join(gameCode)
        io.in(gameCode).emit('players', roomObject.playerDetails)
    }
    

    socket.on('set-time', setTimer)
    socket.on('no-of-rounds', setRounds)
    socket.on('join-avatar', joinAvatar)
}