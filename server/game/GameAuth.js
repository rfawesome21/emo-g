const {genRanHex} = require('./GameFunctions')
let code = ''
const {Teams} = require('../data/Teams')
const {Scenes} = require('../data/Scenes')
const GameScenes = JSON.parse(JSON.stringify(Scenes))
const MainScenes = JSON.parse(JSON.stringify(Scenes))
const Players = []
let {roomSpecificGamePlay, Password} = require('./GameVariables')
const { Emotions } = require('../data/Emotions')
const GameEmotions = JSON.parse(JSON.stringify(Emotions))

const deepCopyFunction = (inObject) => {
    let outObject, value, key
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
  
    for (key in inObject) {
      value = inObject[key]
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value)
    }
  
    return outObject
  }

module.exports = (io, socket) => {
    const authentication = ({code, name}) => {
        let index = false
        if(roomSpecificGamePlay.room.game.length > 0){
            for(let j of Password){
                if(code === j){
                    index = true
                }
            }
        }
        if(index){
            socket.join(code)
            for (let index = 0; index < roomSpecificGamePlay.room.game.length; index++) {
                if(code === roomSpecificGamePlay.room.game[index].id){
                    roomSpecificGamePlay.room.game[index].players.push({
                        name : name,
                        avatar : ''
                    })
                    io.in(roomSpecificGamePlay.room.game[index].id)
                    .emit('players', roomSpecificGamePlay.room.game[index].players.length)
                    break
                }
            }
            io.to(socket.id).emit('authenticated')
            console.log('Player joined!');
        }
        else{
            console.log('Wrong');
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
        console.log(MainScenes);
        Password.push(code)
        roomSpecificGamePlay.room.game.push({
        id : code,
        players : [],
        guessingTimer : '3:00',
        score : [],
        scene : GameScenes,
        typingTimer : '1:30',
        roundNo : 1,
        MAX_ROUNDS : 10,
        lifelines : [],
        MAX_PLAYERS_PER_TEAM : 5,
        GAME_SCENES : deepCopyFunction(MainScenes),
        teams : Teams,
        emotions : GameEmotions,
        emotionsPerRounds : []
        })
        let index
        if(roomSpecificGamePlay.room.game.length > 0){
            for(var [i,value]  of roomSpecificGamePlay.room.game.entries()){
                for(var j of Password)
                if(value.id === j){
                    index = i
                    break
                }
            }
        }
        else{
            index = 0
        }
        io.to(socket.id).emit('guessing-timer', roomSpecificGamePlay.room.game[index].guessingTimer)
        io.to(socket.id).emit('typing-timer', roomSpecificGamePlay.room.game[index].typingTimer)
        console.log('The Host has created the game!')
    }

    socket.on('create-game', createNewGame)
    socket.on('join-game', authentication)
}