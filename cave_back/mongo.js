const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/product-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const productSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Product = mongoose.model('Product', productSchema)

const product = new Product({
  content: 'Callback-functions suck',
  date: new Date(),
  important: true,
})

/*
product.save().then(response => {
  console.log('product saved!');
  mongoose.connection.close();
})
*/

Product.find({}).then(result => {
  result.forEach(product => {
    console.log(product)
  })
  mongoose.connection.close()
})