// const game = []
// const {Teams} = require('../data/Teams')
// const {Scenes} = require('../data/Scenes')
// const defaultGame = Teams
// let mode = 'default'
// let { roomSpecificGamePlay, Password} = require('./GameVariables')

const { roomArrayMap } = require("./GameVariables")

module.exports = (io, socket) => {

//     const createTeam = () => {
//         let teamName = 'A'
//         let teamMembers = 'Manan'
//         let team = {teamName, teamMembers}
//         game.push(team)
//     }

//     const showTeamDetails = () => {
//         console.log(game);
//         console.log(defaultGame);
//     }

//     const joinATeam = ({teamName, username}) => {
//         if(mode === 'default'){
//             for(let d of defaultGame){
//                 if(d.teamName === teamName){
//                     d.teamMembers.push(username)
//                 }
//             }
//         }
//         else if(mode === 'custom'){
//             for(let g of game){
//                 if(g.teamName === teamName){
//                     g.teamMembers.push(username)
//                 }
//             }
//         }
//     }

    const setRounds = ({MAX_ROUND, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.MAX_ROUNDS = Number(MAX_ROUND)
    }

    const setTimer = ({guesser, typer, gameCode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.guessingTimer = guesser
        roomObject.typingTimer = typer
    }



//     const joinAvatar = ({gameCode}) => {
//         let index
//         console.log(gameCode)
//             for(let i = 0; i < roomSpecificGamePlay.room.game.length; i++){
//                 if(roomSpecificGamePlay.room.game[i].id === gameCode){
//                     index = i
//                 }
//         }
//         console.log(index)
//         socket.join(gameCode)
//         io.in(gameCode).emit('players', roomSpecificGamePlay.room.game[index].players)
//     }
    

    socket.on('set-time', setTimer)
//     socket.on('create-team', createTeam)
//     socket.on('show', showTeamDetails)
//     socket.on('join-team', joinATeam)
    socket.on('no-of-rounds', setRounds)
//     socket.on('join-avatar', joinAvatar)
}