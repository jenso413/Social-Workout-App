const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema(
    {
    username: String,
    content : String,
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array
    },
    user: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Posts', postSchema)
