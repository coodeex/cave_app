const batchesRouter = require('express').Router()
const Batch = require('../models/batch')
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

batchesRouter.get('/', async (request, response) => {
  const batches = await Batch.find({}).populate('user', { batchName: 1 })
  response.json(batches.map(batch => batch.toJSON()))
})


batchesRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (body.batchName === undefined || body.batchName === '') {
    return response.status(400).json({ error: 'batch name missing' })
  }
  if (body.products === undefined || body.products.length === 0) {
    return response.status(400).json({ error: 'batch product(s) or weight(s) missing' })
  }
  body.products.forEach(product => {
    if (product.productName === null || product.usedWeight === null || product.productName === '' || product.usedWeight === '') {
      return response.status(400).json({ error: 'batch product(s) or weight(s) missing' })
    } else {
      return false
    }
  })
  if (body.batchSize === undefined || body.batchSize === '') {
    return response.status(400).json({ error: 'batch size missing' })
  }
  if (body.description === undefined || body.description === '') {
    return response.status(400).json({ error: 'batch description missing' })
  }

  let initialProducts = await Product.find({})
  let batchPrice = body.extraCosts||0
  const updateProductsReturnBottlePrice = () => {

    body.products.forEach(async product => {

      //if product already exists in the database then update product's remaining price and weight
      if (initialProducts.filter(initial => initial.name === product.productName).length === 1) {
        const oldProduct = initialProducts.filter(initial => initial.name === product.productName)[0]

        const usedPrice = Math.max(0, oldProduct.price * (product.usedWeight / oldProduct.weight) || 0)
        const currentPrice = Math.max(0, oldProduct.price - usedPrice || 0)
        const currentWeight = Math.max(0, oldProduct.weight - product.usedWeight || 0)

        batchPrice += Math.round((usedPrice + Number.EPSILON) * 100) / 100

        await Product.findOneAndUpdate({ name: product.productName },
          {
            price: Math.round((currentPrice + Number.EPSILON) * 100) / 100,
            weight: Math.round((currentWeight + Number.EPSILON) * 100) / 100,
            date: new Date()
          },
          {
            new: true,
            upsert: true
          })
      }
    }
    )
    const bottlePrice = batchPrice / (body.batchSize / 0.33)
    return [batchPrice || 0, bottlePrice || 0]
  }

  const batchAndBottlePrice = updateProductsReturnBottlePrice()

  // create a new Batch
  const batch = new Batch({
    batchName: body.batchName,
    products: body.products,
    date: new Date(),
    batchSize: body.batchSize,
    description: body.description,
    batchPrice: batchAndBottlePrice[0],
    oneBottlePrice: batchAndBottlePrice[1],
    user: user._id
  })
  const savedBatch = await batch.save()
  user.batches = user.batches.concat(savedBatch._id)
  await user.save()

  console.log({
    batch: savedBatch.toJSON(),
    updatedExisting: false
  })
  response.json({
    batch: savedBatch.toJSON(),
    updatedExisting: false
  })

})

batchesRouter.get('/:id', (request, response, next) => {
  Batch.findById(request.params.id)
    .then(batch => {
      if (batch) {
        response.json(batch.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

batchesRouter.delete('/:id', async (request, response, next) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Batch.findByIdAndRemove(request.params.id)
  response.status(204).end().catch(error => next(error))
})

module.exports = batchesRouter