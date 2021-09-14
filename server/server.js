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
  
const onConnection = socket => {

}

io.on(
   'connection', onConnection 
)

app.listen(
    PORT,
    console.log(
      `Server running on port ${PORT} in ${MODE.blue.bold + ' mode'.green.bold} `.green.bold
    )
)