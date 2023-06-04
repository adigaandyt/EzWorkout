//Database connectio file

const { log } = require('console')
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    //Connect to mongoose using the URI link in the env file
    const conn = await mongoose.connect(process.env.MONGO_URI)
    log(`MongoDB Connect  ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = {
  connectDB,
}
