require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const productRouter = require('./controllers/products')
const loginRouter = require('./controllers/login')

const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(express.json())
app.use(express.static('build'))


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use('/api/products', productRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

module.exports = app