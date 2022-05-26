const Post = require('../models/Posts');
const User = require('../models/User')

// Adds new post
async function addNewPost(req, res) {
    const newPost = await new Post({
        content : req.body.content,
        user: req.user.id,
        username: req.user.username
    })
    

    try {
        const post = await newPost.save()
        res.status(200).json(post)
    } catch(err) {
        console.log(err)
    }
}

// Returns all posts
async function getAllPosts(req, res) {
    // Return array of post objects
    const posts = await Post.find({ user: req.user.id })

    res.status(200).json(posts)
}

const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        return res.status(400).json('no post found')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(401).json('User not found')
    }

    // Check logged in user matches post body user
    if (post.user.toString() !== user.id) {
        return res.status(401).json('User not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPost)
}

module.exports = { addNewPost, getAllPosts, updatePost }