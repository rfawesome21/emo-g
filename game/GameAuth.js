const Password = []

module.exports = (io, socket) => {
    const authentication = ({code}) => {
        if(Password.includes(code)){
            socket.join(code)
        }
        else{
            socket.emit('err', {message : 'Wrong Room Code entered!'})
        }
    }

    const createNewGame = ({code}) => {
        socket.join(code)
        Password.push(code)
        console.log('The Host has created the game!')
    }

    socket.on('create-game', createNewGame)
    socket.on('join-game', authentication)
}