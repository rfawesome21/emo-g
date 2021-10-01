let { roomArrayMap} = require('./GameVariables')

module.exports = (io, socket) => {
    

    
    const joinScenes = (gameCode) => {
        
        io.to(socket.id).emit('scenes', roomArrayMap.get(gameCode).GAME_SCENES)
        io.to(socket.id).emit('players', roomArrayMap.get(gameCode).players)
    }

    const editScenes = ({sceneID, scene, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        let sceneIndex
        console.log(roomObject.scene);
        for(let j = 0; j < roomObject.scene.length; j++){
            if(roomObject.GAME_SCENES[j].id === sceneID){
                sceneIndex = j
            }
        }    
        if(sceneIndex){           
            roomObject.scene[sceneIndex].scene = scene
            roomObject.GAME_SCENES[sceneIndex].scene = scene
        }
        io.to(socket.id).emit('updated-scenes', roomObject.GAME_SCENES)
    }

    const gameScenes = (gameCode) => {
        socket.join(gameCode)
        io.in(gameCode).emit('players',roomArrayMap.get(gameCode).players)
    }

    const addScene = ({scene, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.scene.splice(1, 0,{
            id: roomObject.scene.length + 1,
            scene : scene
        })
        roomObject.GAME_SCENES.splice(1 ,0,{
            id : roomObject.scene.length + 1,
            scene : scene
        })
        io.to(socket.id).emit('scenes',roomObject.GAME_SCENES)
    }

    const addNewScenes = ({addScenesToGame, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.scene = addScenesToGame
    }

    const sendGameScene = (gameCode) => {
        let roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('game-scene', roomObject.scene)
    }

    socket.on('edit-scenes', editScenes)
    socket.on('game-scenes', gameScenes)
    socket.on('join-scenes', joinScenes)
    socket.on('new-scenes', addNewScenes)
    socket.on('add-scene', addScene)
    socket.on('get-game-scene', sendGameScene)
}