const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema(
    {
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    image: {},
    content : String,
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array
    },
    },
    { timestamps: true }
)

const Post = mongoose.model('Posts', postSchema)

module.exports = { Post }
