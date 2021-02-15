const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema({
  batchName: String,
  products: [{
    productName: String,
    usedWeight: Number
  }],
  date: Date,
  batchSize: Number,
  description: String,
  batchPrice: Number,
  oneBottlePrice: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

batchSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Batch', batchSchema)