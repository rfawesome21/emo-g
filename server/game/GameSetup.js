const game = []
const {Teams} = require('../data/Teams')
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

    

    const setRounds = ({MAX_ROUND}) => {
        let index = 0
        for(var [i, value] of roomSpecificGamePlay.room.game.entries()){
            for(var j of Password){
                if(value.id === j){
                    index = i
                    break
                }
            }
        }
        roomSpecificGamePlay.room.game[index].MAX_ROUNDS = MAX_ROUND
    }

    const setTimer = ({guesser, typer}) => {
        let index
        console.log(Password);
        for(var [i, value] of roomSpecificGamePlay.room.game.entries()){
            for(var j of Password){
                if((value.id) === j){
                    console.log(`Match Found!`);
                    index = i
                    break
                }
            }
        }
        roomSpecificGamePlay.room.game[index].guessingTimer = guesser
        roomSpecificGamePlay.room.game[index].typingTimer = typer
    }


    socket.on('set-time', setTimer)
    socket.on('create-team', createTeam)
    socket.on('show', showTeamDetails)
    socket.on('mode', selectAMode)
    socket.on('join-team', joinATeam)
    socket.on('no-of-rounds', setRounds)
}