import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Product from './components/Product'

const App = () => {
  const [products, setProducts] = useState([]) 
  const [newProduct, setNewProduct] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/products')
      .then(response => {
        console.log('promise fulfilled')
        setProducts(response.data)
      })
  }, [])

  console.log('render', products.length, 'products')

  const addProduct = (event) => {
    event.preventDefault()
    const productObject = {
      content: newProduct,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: products.length + 1,
    }
  
    setProducts(products.concat(productObject))
    setNewProduct('')
  }

  const handleProductChange = (event) => {
    console.log(event.target.value)
    setNewProduct(event.target.value)
  }

  const productsToShow = showAll
    ? products
    : products.filter(product => product.important)

  return (
    <div>
      <h1>Products</h1>
    
      <ul>
        {productsToShow.map((product, i) => 
          <Product key={i} product={product} />
        )}
      </ul>
      <form onSubmit={addProduct}>
        <input
          value={newProduct}
          onChange={handleProductChange}
        />
        <input
          value={newProduct}
          onChange={handleProductChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App 