const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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
    coverPic: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Users', UserSchema)