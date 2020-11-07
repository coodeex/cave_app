import React, { useState, useEffect } from 'react'
import Product from './components/Product'
import ProductForm from './components/ProductForm'
import productService from './services/products'

const App = () => {
  const [products, setProducts] = useState([])  // all products
  const [newProductName, setNewProductName] = useState('')  // product input name
  const [newProductPrice, setNewProductPrice] = useState('')  // product input price
  const [newProductWeight, setNewProductWeight] = useState('')  // product input weight

  useEffect(() => { 
    productService
      .getAll()
      .then(initialProducts => {
        setProducts(initialProducts)
      })
  }, [])

  console.log('products', products)


  return (
    <div>
      <h1>Products</h1>

      <ul>
        {products.map((product, i) =>
          <Product key={i} product={product} />
        )}
      </ul>
      <ProductForm products={products} setProducts={setProducts} newProductName={newProductName} setNewProductName={setNewProductName} newProductPrice={newProductPrice} setNewProductPrice={setNewProductPrice} newProductWeight={newProductWeight} setNewProductWeight={setNewProductWeight}/>
    </div>
  )
}

export default App 