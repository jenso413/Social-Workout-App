const express = require('express');
const app = express();
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, () => {
    console.log('Connected to MongoDB')
})

// Middleware
app.use(express.json({limit: '50mb'}))
app.use(helmet())
app.use(morgan('common'))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/auth', require('./routes/userRoutes'))
app.use('/api/workouts', require('./routes/workoutRoutes'))

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})