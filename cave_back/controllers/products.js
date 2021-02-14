const productsRouter = require('express').Router()
const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

productsRouter.get('/', async (request, response) => {
  const products = await Product.find({})//.populate('user', { name: 1, price: 1, weight: 1, id: 1 })
  response.json(products.map(product => product.toJSON()))
})


productsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    //console.log('token missing or invalid')
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

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
      user: user._id
    })

    const savedProduct = await product.save()
    user.products = user.products.concat(savedProduct._id)
    await user.save()

    console.log({
      product: savedProduct.toJSON(),
      updatedExisting: false
    })
    response.json({
      product: savedProduct.toJSON(),
      updatedExisting: false
    })

    // product.save().then(savedProduct => {
    //   console.log({
    //     product: savedProduct.toJSON(),
    //     updatedExisting: false
    //   })
    //   response.json({
    //     product: savedProduct.toJSON(),
    //     updatedExisting: false
    //   })
    // })
  } else {//product already exists so it's weight and price must be updated
    const savedProduct = await Product.findOneAndUpdate({ name: body.name },
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
      })

    response.json({
      product: savedProduct.toJSON(),
      updatedExisting: true
    })

    // then(savedProduct => {
    //   response.json({
    //     product: savedProduct.toJSON(),
    //     updatedExisting: true
    //   })
    // })
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

productsRouter.delete('/:id', async (request, response, next) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Product.findByIdAndRemove(request.params.id)
  response.status(204).end().catch(error => next(error))
})

productsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const product = {
    price: body.price,
    weight: body.weight,
  }

  const updatedProduct = await Product.findByIdAndUpdate(request.params.id, product, { new: true })
  response.json(updatedProduct.toJSON()).catch(error => next(error))
})

module.exports = productsRouter