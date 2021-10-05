const {genRanHex, getRandomInt} = require('./GameFunctions')
let code = ''
const {Teams} = require('../data/Teams')
const {Scenes} = require('../data/Scenes')
const GameScenes = JSON.parse(JSON.stringify(Scenes))
const MainScenes = JSON.parse(JSON.stringify(Scenes))
const Players = []
let { Password, roomArrayMap} = require('./GameVariables')
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
        if(!name || !code){
            io.to(socket.id).emit('err', {message : 'Please fill all the fields before proceeding'})
            return
        }
        if(name.length > 10){
            io.to(socket.id).emit('err', {message : 'Your username should only be 10 characters long'})
            return
        }
        code = code.trim()
        if(roomArrayMap.get(code))
        {

            let roomObject = roomArrayMap.get(code)
            if(roomObject.players.includes(name)){
                io.to(socket.id).emit('err', {message : 'This player already exists. Please Enter with a different name'})
            }
            else{
                roomObject.players.push(name)
                roomObject.playerDetails.push({
                    name : name,
                    avatar : '',
                    join : false,
                    isRandomlySelected : false
                })
                console.log(`Player joined!`);
                io.to(code).emit('players', roomObject.playerDetails)
                const playersWithoutTeams = roomObject.playerDetails.filter(p => p.join === false)
                io.to(code).emit('players-without-teams', playersWithoutTeams)
                io.to(socket.id).emit('authenticated', 1)
            }
        }

        else
            io.to(socket.id).emit('authenticated', 0)
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
        let number = getRandomInt(0, GameScenes.length - 1)
        let sceneObj = {
            id : GameScenes[number].id,
            scene : GameScenes[number].scene,
            roleOne : GameScenes[number].roleOne,
            roleTwo : GameScenes[number].roleTwo,
            nudge : GameScenes[number].nudge,
            statementOne : GameScenes[number].statementOne,
            statementTwo : GameScenes[number].statementTwo
        }
        
        let myData = []

        myData.push({
            id : sceneObj.id,
            scene : sceneObj.scene,
            roleOne : sceneObj.roleOne,
            roleTwo : sceneObj.roleTwo,
            nudge : sceneObj.nudge,
            statementOne : sceneObj.statementOne,
            statementTwo : sceneObj.statementTwo
        })

        roomArrayMap.set(code, {
            id : code,
            players : [],
            playerDetails : [],
            guessingTimer : '3:00',
            score : [],
            scene : myData,
            typingTimer : '1:30',
            MAX_ROUNDS : 10,
            lifelines : [],
            MAX_PLAYERS_PER_TEAM : 5,
            GAME_SCENES : deepCopyFunction(MainScenes),
            teams : [],
            emotions : GameEmotions,
            emotionsPerRounds : [],
            mode : ''
        })
        
        io.to(socket.id).emit('guessing-timer', roomArrayMap.get(code).guessingTimer)
        io.to(socket.id).emit('typing-timer', roomArrayMap.get(code).typingTimer)
        console.log('The Host has created the game!')
    }

    socket.on('create-game', createNewGame)
    socket.on('join-game', authentication)
}