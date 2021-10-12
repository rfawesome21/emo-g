const { getRandomInt } = require('./GameFunctions')
// let {roomSpecificGamePlay, Password} = require('./GameVariables')

const { roomArrayMap } = require("./GameVariables")


module.exports = (io, socket) => {
    const joinTeams = (gameCode) => {
        socket.join(gameCode)
        io.in(gameCode).emit('players', roomArrayMap.get(gameCode).playerDetails)
    }

    const maxPlayersPerTeam = ({gameCode, playersPerTeam}) => {
        console.log('dudes : ',playersPerTeam);
        console.log('code : ', gameCode);
        roomArrayMap.get(gameCode).MAX_PLAYERS_PER_TEAM = playersPerTeam
        io.in(gameCode).emit('come-to-teams')
    }


    const selectAMode = ({gameCode, mode}) => {
        let roomObject = roomArrayMap.get(gameCode)
        roomObject.teams.length = 0
        roomArrayMap.get(gameCode).mode = mode
        roomObject.NO_OF_TEAMS = Math.ceil(roomObject.players.length/roomObject.MAX_PLAYERS_PER_TEAM)
        
        let arr = roomObject.guessingTimer.split(':')
        let totalTimerG = Number(arr[0]) * 60 + Number(arr[1])
        
        let arr2 = roomObject.typingTimer.split(':')
        let totalTimerT = Number(arr2[0]) * 60 + Number(arr2[1])

        for(let m = 0; m < roomObject.NO_OF_TEAMS; m++){
            roomObject.teams.push({
                teamName : m+1,
                teamMembers : [],
                roundNo : 1,
                previousSceneRole : '',
                messages : [roomObject.scene[0].statementOne, roomObject.scene[0].statementTwo],
                isDisabled : false, 
                emotionsGuessed : [], 
                guessingTimer : roomObject.guessingTimer,
                typingTimer : roomObject.typingTimer,
                score : 0,
                randomIndex : 0,
            })
        }

        if(mode === 'random'){
            for(let i = 0; i < roomObject.players.length; i++){
                let j = getRandomInt(0, roomObject.teams.length - 1)
                if(roomObject.teams[j].teamMembers.length < roomObject.MAX_PLAYERS_PER_TEAM){
                    roomObject.playerDetails[i].join = true
                    roomObject.teams[j].teamMembers.push(roomObject.playerDetails[i])
                }
                else{
                    let k = getRandomInt(0, roomObject.teams.length - 1)
                    while(k === j){
                        k = getRandomInt(0, roomObject.teams.length - 1)
                    }
                    console.log(`k is ${k}`);
                    roomObject.playerDetails[i].join = true
                    roomObject.teams[k].teamMembers.push(roomObject.playerDetails[i])
                }
            }
        }
    }

    const randomTeamDivision = (gameCode) => {
        console.log(roomArrayMap.get(gameCode).teams);
        io.in(gameCode).emit('come-to-teams')
        io.to(socket.id).emit('random-teams', roomArrayMap.get(gameCode).teams)
        io.to(socket.id).emit('players', roomArrayMap.get(gameCode).players)
    }

    const manualTeamDivision = (gameCode) => {
        io.to(socket.id).emit('players', roomArrayMap.get(gameCode).players)
        let roomObject = roomArrayMap.get(gameCode)
        io.to(socket.id).emit('teams', roomObject.teams)
    }

    const letPlayerChoose = ({gameCode, playerName, teamName}) => {
        socket.join(gameCode)
        let roomObject = roomArrayMap.get(gameCode)
        let team = roomObject.teams.filter(t => t.teamName === teamName)
        let player = roomObject.playerDetails.filter(p => p.name === playerName)
        if(!player[0].join){
            if(team[0].teamMembers.length < roomObject.MAX_PLAYERS_PER_TEAM){
                player[0].join = true
                console.log('The player chose a team');
                team[0].teamMembers.push(player[0])
            }
            else
                io.to(socket.id).emit('err', {message : 'This team is full. Please join another team'})
        }
        else{
            for(let i = 0; i < roomObject.teams.length; i++){
                for(let  j = 0; j < roomObject.teams[i].teamMembers.length; j++){
                    if(roomObject.teams[i].teamMembers[j].name === playerName)
                        roomObject.teams[i].teamMembers = roomObject.teams[i].teamMembers.filter(p => p.name !== playerName)
                        team[0].teamMembers.push(player[0])
                        io.to(gameCode).emit('teams', roomObject.teams)
                        const playersWithoutTeams = roomObject.playerDetails.filter(p => p.join === false)
                        io.to(gameCode).emit('players-without-teams', playersWithoutTeams)
                        return
                }
            }
        }
        io.to(gameCode).emit('teams', roomObject.teams)
        const playersWithoutTeams = roomObject.playerDetails.filter(p => p.join === false)
        io.to(gameCode).emit('players-without-teams', playersWithoutTeams)
        io.to(socket.id).emit('players', roomArrayMap.get(gameCode).players)
    }   

    const changeTeam = ({team, player, gameCode}) => {
        console.log('Changing ',player,' team')
        let roomObject = roomArrayMap.get(gameCode)
        const teams = roomObject.teams.filter(t => t.teamName === team)
        console.log('Transferring to: ',teams)
        const teamMembers = teams[0].teamMembers.filter(p => (p.name === player.name))
        if(teamMembers.length > 0){
            console.log('Error message')
            io.to(socket.id).emit('err' , {message : 'This player already belongs to that team!'})
            return
        }
        else{
            console.log(`Max Players : ${roomObject.MAX_PLAYERS_PER_TEAM}`);
            console.log(roomObject.teams.length, ' Teams');
            console.log(teams[0].teamMembers.length, ' Players');
            for(let i = 0; i < roomObject.teams.length; i++){
                for(let j = 0; j < roomObject.teams[i].teamMembers.length; j++){  
                    if( teams[0].teamMembers.length >= roomObject.MAX_PLAYERS_PER_TEAM)
                    {
                        console.log(teams[0]);
                        console.log('Max Players reached!');
                        io.to(socket.id).emit('err', {message : 'This Team already has maximum number of players!'})
                        return
                    }
                    console.log(player.name);
                    console.log(roomObject.teams[i].teamMembers[j].name);
                    console.log(roomObject.teams[i].teamMembers[j].name === player.name);
                    if(roomObject.teams[i].teamMembers[j].name === player.name){
                        console.log(player);
                        roomObject.teams[i].teamMembers =  roomObject.teams[i].teamMembers.filter(p => p.name !== player.name)            
                        
                        break
                    }
                }
            }
        }

        teams[0].teamMembers.push(player)
        const playerNu = roomObject.playerDetails.filter(p => p.name === player.name)
        playerNu[0].join = true
        const playersWithoutTeams = roomObject.playerDetails.filter(p => p.join === false)
        io.to(gameCode).emit('players-without-teams', playersWithoutTeams)
        io.in(gameCode).emit('late-comers')
        io.to(socket.id).emit('manual-teams', roomObject.teams)
        io.to(socket.id).emit('random-teams', roomObject.teams)
        io.to(socket.id).emit('choice-teams', roomObject.teams)
        io.in(gameCode).emit('teams', roomObject.teams)
    }

    const choiceOfPlayers = (gameCode) => {
        const teams = roomArrayMap.get(gameCode).teams
        const mode = roomArrayMap.get(gameCode).mode
        io.to(socket.id).emit('player-teams', {teams, mode})
        io.to(socket.id).emit('max-players', roomArrayMap.get(gameCode).MAX_PLAYERS_PER_TEAM)
    }

    const getPlayers = (gameCode) => {
        socket.join(gameCode)
        let roomObject = roomArrayMap.get(gameCode)
        const playersWithoutTeams = roomObject.playerDetails.filter(p => p.join === false)
        io.to(socket.id).emit('players-without-teams', playersWithoutTeams)
    }   

    const createTeam = (gameCode) => {
        let roomObject = roomArrayMap.get(gameCode)
        let teamName = roomObject.teams.length + 1
        let teamMembers = []
        let arr = roomObject.guessingTimer.split(':')
        let totalTimerG = Number(arr[0]) * 60 + Number(arr[1])
        
        let arr2 = roomObject.typingTimer.split(':')
        let totalTimerT = Number(arr2[0]) * 60 + Number(arr2[1])

        let roundNo = 1,
            randomIndex = 0,
            isDisabled = false,
            messages = [roomObject.scene[0].statementOne, roomObject.scene[0].statementTwo]
            score = 0,
            typingTimer = totalTimerT,
            guessingTimer = totalTimerG
            emotionsGuessed = [],
            previousSceneRole = ''
        let team = { teamName, teamMembers, roundNo, randomIndex, isDisabled, messages, score, typingTimer, guessingTimer, emotionsGuessed, previousSceneRole }
        roomObject.teams.push(team)

        io.to(socket.id).emit('random-teams', roomArrayMap.get(gameCode).teams)
        io.to(socket.id).emit('manual-teams', roomArrayMap.get(gameCode).teams)
        io.to(socket.id).emit('choice-teams', roomArrayMap.get(gameCode).teams)
        io.in(gameCode).emit('teams', roomArrayMap.get(gameCode).teams)
    }

    const playersChoice = (gameCode) => {
        socket.join(gameCode)
        io.to(socket.id).emit('choice-teams', roomArrayMap.get(gameCode).teams)
    }

    socket.on('create-team', createTeam)
    socket.on('get-players-no-teams', getPlayers)
    socket.on('player-in-teams', choiceOfPlayers)
    socket.on('change-team', changeTeam)
    socket.on('join-teams', joinTeams)
    socket.on('max-players', maxPlayersPerTeam)
    socket.on('mode', selectAMode)
    socket.on('random-division', randomTeamDivision)
    socket.on('manual-division', manualTeamDivision)
    socket.on('choice', letPlayerChoose)
    socket.on('players-choice', playersChoice)
}