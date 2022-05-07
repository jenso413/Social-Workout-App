const mongoose = require('mongoose');

const friendsSchema = mongoose.Schema({
    name: String,
    workoutStreak: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('Friends', friendsSchema)