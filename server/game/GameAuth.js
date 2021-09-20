const Password = []
const {genRanHex} = require('./GameFunctions')
let code = ''
const Players = []

module.exports = (io, socket) => {
    const authentication = ({code, name}) => {
        if(Password.includes(code)){
            socket.join(code)
            Players.push(name)
        }
        else{
            socket.emit('err', {message : 'Wrong Room Code entered!'})
        }
    }

    const createNewGame = () => {
        code = genRanHex(6)
        if(!Password.includes(code))
            socket.join(code)
        else
        {
            while(Password.includes(code)){
                code = genRanHex(6)
            }
            socket.join(code)
        }
        io.to(socket.id).emit('Room-code', code)
        io.to(socket.id).emit('Players', Players.length)
        Password.push(code)
        console.log('The Host has created the game!')
    }

    socket.on('create-game', createNewGame)
    socket.on('join-game', authentication)
}