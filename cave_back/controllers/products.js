const productsRouter = require('express').Router()
const Product = require('../models/product')
const axios = require('axios')


productsRouter.get('/', (request, response) => {
  Product.find({}).then(products => {
    response.json(products.map(product => product.toJSON()))
  })
})


productsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.name === undefined || body.name === '') {
    return response.status(400).json({ error: 'product name missing' })
  }
  if (body.price === undefined || body.price === '') {
    return response.status(400).json({ error: 'product price missing' })
  }
  if (body.weight === undefined || body.weight === '') {
    return response.status(400).json({ error: 'product weigth missing' })
  }

  let productAlreadyInDB = await Product.findOne({ name: body.name });

  if (productAlreadyInDB == null) {//if does not exist then create a new Product
    const product = new Product({
      name: body.name,
      price: body.price,
      weight: body.weight,
      date: new Date(),
    })

    product.save().then(savedProduct => {
      console.log({
        product: savedProduct.toJSON(),
        updatedExisting: false
      })
      response.json({
        product: savedProduct.toJSON(),
        updatedExisting: false
      })
    })
  } else {//product already exists so it's weight and price must be updated
    await Product.findOneAndUpdate({ name: body.name },
      {
        $inc: {
          price: body.price,
          weight: body.weight,
        },
        date: new Date()
      },
      {
        new: true,
        upsert: true
      }).then(savedProduct => {
        response.json({
          product: savedProduct.toJSON(),
          updatedExisting: true
        })
      })
  }
})

productsRouter.get('/:id', (request, response, next) => {
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

productsRouter.delete('/:id', (request, response, next) => {
  Product.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

productsRouter.put('/:id', (request, response, next) => {
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

module.exports = productsRouter