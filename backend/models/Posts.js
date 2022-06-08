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
    user: {
        type: String
    }
    },
    { timestamps: true }
)

const Post = mongoose.model('Posts', postSchema)

module.exports = { Post }
