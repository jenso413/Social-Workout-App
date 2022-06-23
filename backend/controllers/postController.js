const { Post } = require('../models/Posts')
const { User } = require('../models/User')
const ObjectID = require('mongodb').ObjectID
const { cloudinary } = require('../features/cloudinary')

// Adds new post
async function addNewPost(req, res) {

    const { textContent, postImg } = req.body.content
    let uploadedResponse

    try {
        uploadedResponse = await cloudinary.uploader.upload(postImg, {
            upload_preset: 'ml_default'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({err: 'Something went terribly wrong'})
    }

    console.log(req.user._id)
    const newPost = await new Post({
        content : textContent,
        image: uploadedResponse,
        user: req.user._id,
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
    const posts = await Post.find({})

    res.status(200).json(posts) 
}


// Returns friend and user posts
// POST /api/posts/:id
const getFriendPosts = async (req, res) => {

    const userId = req.params.id
    // console.log(userId)

    const user = await User.findById(userId).populate('friends')

    const { friends } = user
    let friendPosts = [];

    for (let friend of friends) {

        const friendId = friend.id
        const posts = await Post.find({ user: friendId}).populate('user')
        
        // for (let post of posts) {
        //     friendPosts.push(post)
        // }
        friendPosts.push(...posts)
    }

    const userPosts = await Post.find({user : userId}).populate('user')
    friendPosts.push(...userPosts)

    return res.status(200).json(friendPosts)
    
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

module.exports = { addNewPost, getAllPosts, updatePost, getFriendPosts }