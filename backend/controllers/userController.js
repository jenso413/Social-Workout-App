const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models/User')
const { Program } = require('../models/Workout')
const { Log } = require('../models/Log')
const { cloudinary } = require('../features/cloudinary')
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
            friends: user.friends,
            profilePic: user.profilePic
        })
    } else {
        res.status(400).json('Invalid credentials')
    }
}

// @desc    Get user by ID
// @route   GET /api/auth/:userId
// @access  Private
const getMe = async (req, res) => {
    const { _id, username, email, friends } = await User.findById(req.params.userId)

    res.status(200).json({
        id : _id,
        username,
        email, 
        friends
    })
}

// @desc    Get user by username
// @route   GET /api/auth/user/:username
// @access  Public
const getUserByUsername = async (req, res) => {
    const { username } = req.params
    console.log(username)

    const user = await User.findOne({ username }).populate('community').select('-password')

    if (user) {
        res.status(200).json(user)
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
    console.log(`UserID: ${userId}`)

    const date = new Date().toString().slice(4, 15)

    const joinedProgram = await Program.findOneAndUpdate({ programName: programName }, {$push: {members : userId}})

    if (joinedProgram) {
        const updatedUser = await User.findByIdAndUpdate(userId, {community: joinedProgram.id, joinedCommunityDate: date}, {new: true})

        // Remove user from member list of previous program
        const user = await User.findById(userId)

        const leavingProgram = await Program.findById(user.community)

        if (leavingProgram) {
            const index = leavingProgram.members.indexOf(userId)
            leavingProgram.members.splice(index, 1)
            await leavingProgram.save()
        }
    
        if (updatedUser && joinedProgram) {
            await updatedUser.save()
            await joinedProgram.save()
            res.status(200).json(updatedUser)
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

// PATCH /api/auth/user/:id/streak
const incrementStreak = async (req, res) => {
    const { id } = req.params
    console.log(id)

    const user = await User.findById(id)

    const userLogs = await Log.find({user: user._id}).sort({ createdAt: 'desc'})
    const mostRecentLog = userLogs[0].createdAt.toString()
    const recentLogDate = mostRecentLog.slice(4, 16)
    console.log(recentLogDate)
    
    let currentDate = new Date().toString().slice(4, 16)
    console.log(currentDate)

    // if most recent log was any day but today, increment streak by 1
    if (recentLogDate == currentDate) {
        return
    } else {
        if (user) {
            user.streak++
            user.loggedToday = true
            await user.save()
            res.status(200).json(user)
        } else {
            console.log('user not found')
        }
    }
}

// DELETE /api/auth/friend/:id
const removeFriend = async (req, res) => {
    const friendId = req.params.id
    // placeholder for now
    const userId = "62ab8f0447667229c17b398e"

    const user = await User.findByIdAndUpdate(userId, {$pull : {friends : friendId}})

    if (user) {
        res.status(200).json(user)
    }

}

// PATCH: /api/auth/user/update
const updateProfilePic = async (req, res) => {
    const { profilePic } = req.body
    const { id } = req.user

    const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
        upload_preset: 'ml_default'
    })

    const user = await User.findByIdAndUpdate(id, {profilePic : uploadedResponse})

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400).json({err: 'Unable to update profile picture'})
    }
}

module.exports = { registerUser, loginUser, getMe, updateCommunity, getUserByUsername, addFriend, getFriends, incrementStreak, removeFriend, updateProfilePic }