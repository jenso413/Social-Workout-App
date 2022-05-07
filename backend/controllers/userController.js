const User = require('../models/User')

// Makes a new user
async function makeNewUser(req, res) {
    const newUser = await new User({
        username : req.body.username,
        password: req.body.password,
        email : req.body.email,
        profilePic : req.body.profilePic,
        coverPic : req.body.coverPic,
        followers : req.body.followers,
        following : req.body.following,
        isAdmin : req.body.isAdmin
    })

    try {
        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err) {
        console.log(err)
    }
}

async function validateUserLogin(req, res) {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        !user && res.status(404).send('User not found')
        user && res.status(200).send('User found!')
    } catch(err) {
        console.log(err)
    }
}

module.exports = { makeNewUser, validateUserLogin}