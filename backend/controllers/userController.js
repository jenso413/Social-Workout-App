const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models/User')
const { Program } = require('../models/Workout')
// const req = require('express/lib/request')
// const { json } = require('express/lib/response')

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body

    if(!username || !email || !password ) {
        return res.status(400).json('Please add all fields')
    }

    // Check if user exists (don't want duplicate user data)
    const userExists = await User.findOne({email})
    
    if(userExists) {
        return res.status(400).json('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username : username,
        email : email,
        password : hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id : user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        return res.status(400).json('Invalid user data')
    }

    // try {
    //     const newUser = await user.save();
    //     res.status(200).json(newUser)
    // } catch(err) {
    //     console.log(err)
    // }

    // res.json({message: 'Register User'})
}

// @desc    Logs user in
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    
    console.log(req.body)
    const {username, password} = req.body

    // Check for username in DB
    const user = await User.findOne({username})

    // Doesn't work if password isn't hashed
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id : user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            community: user.community,
            friends: user.friends
        })
    } else {
        res.status(400).json('Invalid credentials')
    }
}

// @desc    Get user by ID
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id)

    res.status(200).json({
        id : _id,
        username,
        email
    })
}

// @desc    Get user by username
// @route   GET /api/auth/user/:username
// @access  Public
const getUserByUsername = async (req, res) => {
    const { username } = req.params
    console.log(username)

    const user = await User.findOne({ username })

    if (user) {
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404).json('No user with that username found')
    }
}

// POST /api/auth/friend
const addFriend = async (req, res) => {
    const { myId, friendId } = req.body
    console.log(req.body)

    const myUser = await User.findById(myId)

    if (myUser) {
        myUser.friends.push(friendId)
        const savedUser = await myUser.save()
        res.status(200).json(savedUser)
    } else {
        res.status(404).json('User Cannot be found')
    }
}

// Adds/updates community to user
// PATCH: `/api/auth/user/${userId}`
const updateCommunity = async (req, res) => {
    
    const { programName } =  req.body
    const userId = req.params.id

    const foundProgram = await Program.findOne({ programName: programName })

    if (foundProgram) {
        const updatedUser = await User.findByIdAndUpdate(userId, {community: foundProgram.id})
    
        if (updatedUser) {
            res.status(200).json({
                _id : updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                token: generateToken(updatedUser._id),
                community: updatedUser.community,
                friends: updatedUser.friends
            })
        } else {
            res.status(404).json('User not found')
        }
    } else {
        res.status(404).json('Program not found')
    }
}

// Get /api/auth/friends/:userId
const getFriends = async (req, res) => {
    const { userId } = req.params
    console.log(userId)

    const myUser = await User.findById(userId).populate('friends')

    if (myUser) {
        res.status(200).json(myUser)
    } else {
        console.log('Cannot find user')
    }
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { registerUser, loginUser, getMe, updateCommunity, getUserByUsername, addFriend, getFriends }