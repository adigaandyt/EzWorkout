//middleware to protect route
//only users with the json web token can access
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
  //check if auth exists and check if it starts with bearer
  //Json web token starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1]
      //verify token
      //using token and secret in the env
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //Get user from token
      //get the user by ID but exclude password (select -password)
      //This req.user gets forwarded to protected route functions
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      log(error)
      res.status(401)
      throw new error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new error('Not authorized')
  }
})

module.exports = { protect }
