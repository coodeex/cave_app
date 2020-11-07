import React, { useState, useEffect } from 'react'
import Product from './components/Product'
import productService from './services/products'

const App = () => {
  const [products, setProducts] = useState([])
  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductWeight, setNewProductWeight] = useState('')

  useEffect(() => {
    productService
      .getAll()
      .then(initialProducts => {
        setProducts(initialProducts)
      })
  }, [])

  console.log('products', products)

  const validateAddProduct = (event) => {
    event.preventDefault()
    if (newProductWeight < 10) {
      if (window.confirm("Onko paino oikeesti alle 10 grammaa?")) {
        addProduct(event)
      }
    } else {
      addProduct(event)
    }
  }

  const addProduct = (event) => {
    event.preventDefault()
    const productObject = {
      name: newProductName,
      price: newProductPrice,
      weight: newProductWeight,
    }

    productService
      .create(productObject)
      .then(returnedProduct => {
        setProducts(products.concat(returnedProduct))
        setNewProductName('')
        setNewProductPrice('')
        setNewProductWeight('')
      }).catch(err => alert(err.response.data.error))
  }

  const handleProductNameChange = (event) => {
    setNewProductName(event.target.value)
  }

  const handleProductPriceChange = (event) => {
    setNewProductPrice(event.target.value)
  }

  const handleProductWeightChange = (event) => {
    setNewProductWeight(event.target.value)
    // const financialGoal = (event.target.validity.valid) ? event.target.value : null;
    // setNewProductWeight(financialGoal)
  }

  return (
    <div>
      <h1>Products</h1>

      <ul>
        {products.map((product, i) =>
          <Product key={i} product={product} />
        )}
      </ul>
      <form onSubmit={validateAddProduct}>

        <input
          value={newProductName}
          placeholder="Amarillo"
          onChange={handleProductNameChange}
          list="opts"
        />
        <datalist id="opts">
          {products.map(p => <option key={p.id}>{p.name}</option>)}
        </datalist>

        <input
          pattern="[0-9]*\.?[0-9]?[0-9]?"
          placeholder="8.9"
          value={newProductPrice}
          onChange={handleProductPriceChange}
        />
        <input
          pattern="[0-9]*"
          placeholder="100"
          value={newProductWeight}
          onChange={handleProductWeightChange}
        />

        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 