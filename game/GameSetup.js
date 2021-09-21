const game = []
const {Teams} = require('../data/Teams')
const {Scenes} = require('../data/Scenes')
const defaultGame = Teams
let mode = 'default'
let { roomSpecificGamePlay, Password} = require('./GameVariables')


const getIndex = (arr1, arr2) => {
    for(j of arr2){
        for([value, key] of arr1){
            if(j === value.id){
                return key
            }
        }
    }
}

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

    

    const setRounds = ({MAX_ROUND}) => {
        let index = 0
        for(let j of Password){
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === j){
                    index = i
                }
            }
        }
        roomSpecificGamePlay.room.game[index].MAX_ROUNDS = MAX_ROUND
    }

    const setTimer = ({guesser, typer}) => {
        let index = 0
        for(let j of Password){
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === j){
                    index = i
                }
            }
        }
        roomSpecificGamePlay.room.game[index].guessingTimer = guesser
        roomSpecificGamePlay.room.game[index].typingTimer = typer
    }

    const joinScenes = () => {
        io.to(socket.id).emit('scenes',Scenes)
    }

    const addNewScenes = (scenes) => {
        let index = 0
        for(let j of Password){
            for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
                if(roomSpecificGamePlay.room.game[i].id === j){
                    index = i
                }
            }
        }
        console.log(index);
        roomSpecificGamePlay.room.game[index].scene = scenes
        console.log(roomSpecificGamePlay.room.game);
    }

    socket.on('join-scenes', joinScenes)
    socket.on('new-scenes', addNewScenes)
    socket.on('set-time', setTimer)
    socket.on('create-team', createTeam)
    socket.on('show', showTeamDetails)
    socket.on('mode', selectAMode)
    socket.on('join-team', joinATeam)
    socket.on('no-of-rounds', setRounds)
}