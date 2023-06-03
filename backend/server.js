//Common node.js syntax
const { log } = require('console')
const express = require('express')
const dotenv = require('dotenv').config()
//This reads the PORT var in the .env folder
const PORT = process.env.PORT || 5000
const app = express()

//Creating a route in express
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'This is a jason file' })
})

app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
