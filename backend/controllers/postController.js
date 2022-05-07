const Post = require('../models/Posts');

// Adds new post
async function addNewPost(req, res) {
    const newPost = await new Post({
        content : req.body.content,
        likes : req.body.likes,
        comments : req.body.comments
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
    let posts = Post.find({}, (err, posts) => {
        if(err) {
            console.log(err)
        } else {
            res.json(posts)
        }
    })
}

module.exports = { addNewPost, getAllPosts }