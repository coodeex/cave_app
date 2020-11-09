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

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.slice().reverse().filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).reverse().sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        }).map((product, i) =>
          <Product key={i} product={product} />
        )}
      </ul>
      <ProductForm products={products} setProducts={setProducts} newProductName={newProductName} setNewProductName={setNewProductName} newProductPrice={newProductPrice} setNewProductPrice={setNewProductPrice} newProductWeight={newProductWeight} setNewProductWeight={setNewProductWeight} />
      <button onClick={() => console.log(products)}>log products</button> {/* for dev purposes */}
    </div>
  )
}

export default App 