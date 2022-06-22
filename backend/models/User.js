const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        // unique: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
    },
    joinedCommunityDate: {
        type: String,
    },
    streak: {
        type: Number,
        default: 0,
    },
    loggedToday: {
        type: Boolean, 
        default: false,
    }
},
{timestamps: true}
)

const User = mongoose.model('User', UserSchema)

module.exports = { User } 