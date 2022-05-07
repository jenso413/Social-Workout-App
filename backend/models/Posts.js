const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema(
    {
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

module.exports = mongoose.model('Posts', postSchema)
