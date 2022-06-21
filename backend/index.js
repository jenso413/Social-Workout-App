const express = require('express');
const app = express();
const http = require('http')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')
const uuid = require('uuid')
const cronJob = require('./features/setStreak')

mongoose.connect(process.env.MONGO_URL, () => {
    console.log('Connected to MongoDB')
})

// Middleware
app.use(express.json({limit: '50mb'}))
app.use(helmet())
app.use(morgan('common'))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cors())

app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/auth', require('./routes/userRoutes'))
app.use('/api/workouts', require('./routes/workoutRoutes'))
app.use('/api/log-workout', require('./routes/logRoutes'))

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('make-post', () => {
        socket.emit('received-post')
    })

    socket.on('add-friend', () => {
        console.log('added-friend')
        socket.emit('added-friend')
    })
})

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})