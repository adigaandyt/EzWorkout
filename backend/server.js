//Common node.js syntax
const { log } = require('console')
const express = require('express')
const dotenv = require('dotenv').config()
//This reads the PORT var in the .env folder
const PORT = process.env.PORT || 5000
const userRoutes = require('./routes/userRoutes')
const { errHandler } = require('./middleware/errorMiddleware')
const colors = require('colors')
const { connectDB } = require('./config/db')

connectDB()

const app = express()

//middleware that allows the use of raw JSON folders
app.use(express.json())
//Middleware to use the URL encoded JSON (sent with Postman)
app.use(express.urlencoded({ extended: false }))

//Creating a route in express
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome to EzWorkout API' })
})

//Routes
//This goes to the userRoutes folder and based on if its POST/GET/ETC
//Will handle the routing, but it will add api/users and then w/e is
//written in the userRoutes folder
app.use('/api/users', userRoutes)

//Use our custom error handler middleware
//PLACMENT IS IMPORTANT HAS TO BE UNDER USE ROUTES
app.use(errHandler)

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
