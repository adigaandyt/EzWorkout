const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please enter a name'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
  }
)

module.exports = mongoose.model('User', userSchema)
