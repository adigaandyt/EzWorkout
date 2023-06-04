//Route class, points requests to controllers
//Controllers hold the logic
const { log } = require('console')
const express = require('express')
const router = express.Router()
//Bring in the logic from controllers
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//Keeps the routes files clean but attaching the logic to routes using controllers
router.post('/', registerUser)
router.post('/login', loginUser)
// use protect func to make a protected route
router.get('/me', protect, getMe)
//common js syntax to export modules
module.exports = router
