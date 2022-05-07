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
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/auth', require('./routes/userRoutes'))

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})