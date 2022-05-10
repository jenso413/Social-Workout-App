const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
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

    console.log(hashedPassword)

    const user = await new User({
        username : name,
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

    try {
        const newUser = await user.save();
        res.status(200).json(newUser)
    } catch(err) {
        console.log(err)
    }

    // res.json({message: 'Register User'})
}

// @desc    Logs user in
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const {email, password} = req.body

    // Check for user email
    const user = await User.findOne({email})

    // Doesn't work if password isn't hashed
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id : user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json('Invalid credentials')
    }
}

// @desc    Get user info
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

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { registerUser, loginUser, getMe }