const express = require('express')
const app = express()
const Product = require('./models/product')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/products', (request, response) => {
  Product.find({}).then(products => {
    response.json(products.map(product => product.toJSON()))
  })
})

app.post('/api/products', (request, response) => {
  const body = request.body
  console.log(body)

  if (body.name === undefined || body.name === '') {
    return response.status(400).json({ error: 'product name missing' })
  }
  if (body.price === undefined || body.price === '') {
    return response.status(400).json({ error: 'product price missing' })
  }
  if (body.weight === undefined || body.weight === '') {
    return response.status(400).json({ error: 'product weigth missing' })
  }

  const product = new Product({
    name: body.name,
    price: body.price,
    weight: body.weight, //|| 0 
    date: new Date(),
  })

  product.save().then(savedProduct => {
    response.json(savedProduct.toJSON())
  })
})

app.get('/api/products/:id', (request, response, next) => {
  Product.findById(request.params.id)
    .then(product => {
      if (product) {
        response.json(product.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/products/:id', (request, response, next) => {
  Product.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/products/:id', (request, response, next) => {
  const body = request.body

  const product = {
    price: body.price,
    weight: body.weight,
  }

  Product.findByIdAndUpdate(request.params.id, product, { new: true })
    .then(updatedProduct => {
      response.json(updatedProduct.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

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