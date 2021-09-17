//Initialize the app
const express = require('express')
const cors = require('cors')
const colors = require('colors')

const app = express()
app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 5000
const MODE = process.env.MODE || 'development'

const io = require('socket.io')(9000, {
    cors: {
      origins: ['http://localhost:3000', '*'],
    },
})

const gameSetup = require('./game/GameSetup')
const gameAuth = require('./game/GameAuth')
  
const onConnection = socket => {
  gameSetup(io, socket)
  gameAuth(io, socket)
}

io.on(
   'connection', onConnection 
)

app.listen(
    PORT,
    console.log(
      `Server running on port ${PORT} in ${MODE.rainbow.bold + ' mode'.yellow.bold} `.yellow.bold
    )
)