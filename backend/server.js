//Common node.js syntax
const { log } = require('console')
const express = require('express')
const dotenv = require('dotenv').config()
//This reads the PORT var in the .env folder
const PORT = process.env.PORT || 5000
const app = express()
const userRoutes = require('./routes/userRoutes')

//Creating a route in express
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'This is a jason file' })
})

//Routes
//This goes to the userRoutes folder and based on if its POST/GET/ETC
//Will handle the routing, but it will add api/users and then w/e is
//written in the userRoutes folder
app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
