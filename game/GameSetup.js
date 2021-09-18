const game = []
const {Teams} = require('../data/Teams')
const defaultGame = Teams
let mode = 'default'
let guessingTimer = 180//in seconds
let typingTimer = 90//in seconds
let MAX_ROUNDS = 6

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

    const setTimer = ({guessingTime, typingTime}) => {
        guessingTimer = guessingTime
        typingTimer = typingTime
    }

    const setRounds = ({MAX_ROUND}) => {
        MAX_ROUNDS = MAX_ROUND
    }

    socket.on('create-team', createTeam)
    socket.on('show', showTeamDetails)
    socket.on('mode', selectAMode)
    socket.on('join-team', joinATeam)
    socket.on('set-time', setTimer)
    socket.on('no-of-rounds', setRounds)
}