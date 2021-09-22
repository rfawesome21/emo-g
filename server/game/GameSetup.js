const game = []
const {Teams} = require('../data/Teams')
const {Scenes} = require('../data/Scenes')
const defaultGame = Teams
let mode = 'default'
let { roomSpecificGamePlay, Password} = require('./GameVariables')

module.exports = (io, socket) => {

    const createTeam = () => {
        let teamName = 'A'
        let teamMembers = 'Manan'
        let team = {teamName, teamMembers}
        game.push(team)
    }

    const showTeamDetails = () => {
        console.log(game);
        console.log(defaultGame);
    }

    const joinATeam = ({teamName, username}) => {
        if(mode === 'default'){
            for(let d of defaultGame){
                if(d.teamName === teamName){
                    d.teamMembers.push(username)
                }
            }
        }
        else if(mode === 'custom'){
            for(let g of game){
                if(g.teamName === teamName){
                    g.teamMembers.push(username)
                }
            }
        }
    }

    const selectAMode = ({mode}) => {
        mode = mode
    }

    

    const setRounds = ({MAX_ROUND, gameCode}) => {
        let index = 0
        for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
            if(roomSpecificGamePlay.room.game[i].id === gameCode){
                index = i
            }
        }
        roomSpecificGamePlay.room.game[index].MAX_ROUNDS = MAX_ROUND
    }

    const setTimer = ({guesser, typer, gameCode}) => {
        let index = 0
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === gameCode){
                    index = i
                }
        }
        roomSpecificGamePlay.room.game[index].guessingTimer = guesser
        roomSpecificGamePlay.room.game[index].typingTimer = typer
    }

    const joinScenes = (gameCode) => {
        let index
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === gameCode){
                    index = i
                }
        }
        io.to(socket.id).emit('scenes', roomSpecificGamePlay.room.game[index].GAME_SCENES)
        io.to(socket.id).emit('players', roomSpecificGamePlay.room.game[index].players)
    }

    const addNewScenes = ({addScenesToGame, gameCode}) => {
        let index
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === gameCode){
                    index = i
                }
        }
        roomSpecificGamePlay.room.game[index].scene = addScenesToGame
        console.log(roomSpecificGamePlay.room.game[index]);
    }

    const joinAvatar = ({gameCode}) => {
        let index
        console.log(gameCode)
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === gameCode){
                    index = i
                }
        }
        console.log(index)
        socket.join(gameCode)
        io.in(gameCode).emit('players', roomSpecificGamePlay.room.game[index].players)
    }

    const gameScenes = (gameCode) => {
        let index
        console.log(gameCode)
        for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
            if(roomSpecificGamePlay.room.game[i].id === gameCode){
                index = i
            }
        }
        socket.join(gameCode)
        io.in(gameCode).emit('players', roomSpecificGamePlay.room.game[index].players)
    }

    const addScene = ({scene, gameCode}) => {
        let index
        for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
            if(roomSpecificGamePlay.room.game[i].id === gameCode){
                index = i
                roomSpecificGamePlay.room.game[i].scene.push({
                    id : roomSpecificGamePlay.room.game[i].scene.length + 1,
                    scene : scene
                })
                roomSpecificGamePlay.room.game[i].GAME_SCENES.push({
                    id : roomSpecificGamePlay.room.game[i].scene.length + 1,
                    scene : scene
                }) 
            }
        }
        io.to(socket.id).emit('scenes',roomSpecificGamePlay.room.game[index].GAME_SCENES)
    }

    const editScenes = ({sceneID, scene, gameCode}) => {
        let index
        for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
            if(roomSpecificGamePlay.room.game[i].id === gameCode){
                index = i
            }
        }
        let sceneIndex
        for(let j = 0; j < roomSpecificGamePlay.room.game[index].scene.length; j++){
            if(roomSpecificGamePlay.room.game[index].scene[j].id === sceneID){
                sceneIndex = j
            }
        }               
        console.log(sceneIndex);
        console.log(index);
        roomSpecificGamePlay.room.game[index].scene[sceneIndex].scene = scene
        roomSpecificGamePlay.room.game[index].GAME_SCENES[sceneIndex].scene = scene
        io.to(socket.id).emit('updated-scenes', roomSpecificGamePlay.room.game[index].GAME_SCENES)
    }

    socket.on('edit-scenes', editScenes)
    socket.on('game-scenes', gameScenes)
    socket.on('join-scenes', joinScenes)
    socket.on('new-scenes', addNewScenes)
    socket.on('add-scene', addScene)
    socket.on('set-time', setTimer)
    socket.on('create-team', createTeam)
    socket.on('show', showTeamDetails)
    socket.on('mode', selectAMode)
    socket.on('join-team', joinATeam)
    socket.on('no-of-rounds', setRounds)
    socket.on('join-avatar', joinAvatar)
}