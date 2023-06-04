//Holds the logic for the userRoute functions

//using async await to handle the mongoose
//used to handle exceptions in routes instead of using try-catch blocks
const asyncHandler = require('express-async-handler')
const { log } = require('console')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register a new user
// @Route /api/users/
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body
  if (!name || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const userExists = await User.findOne({ name })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hashpassword
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  // Using the mongodDB schema a new user is added
  const newUser = await User.create({
    name,
    password: hashedPassword,
  })

  //If new user was created successfully
  if (newUser) {
    //_id is how mongoose generates IDs
    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      token: generateToken(newUser._id), //generate token with JWT which takes an ID
    })
  } else {
    res.status(400)
    throw new error('invalid data')
  }
})

// @desc Login registered user
// @Route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  const user = await User.findOne({ name })

  //If user exists and password matches (using the compare in bcrypt)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid info')
  }
})

// @desc Get current user
// @Route /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
  }
  res.send(user)
})

//Generate a JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
