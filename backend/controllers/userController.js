//Holds the logic for the userRoute functions

//using async await to handle the mongoose
//used to handle exceptions in routes instead of using try-catch blocks
const asyncHanlder = require('express-async-handler')
const { log } = require('console')
// @desc Register a new user
// @Route /api/users/
// @access public
const registerUser = (req, res) => {
  const { name, password } = req.body
  if (!name || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  } else {
    res.send('Register route')
  }
}

// @desc Login registered user
// @Route /api/users/login
// @access public
const loginUser = (req, res) => {
  res.send('Register route')
}

module.exports = {
  registerUser,
  loginUser,
}
