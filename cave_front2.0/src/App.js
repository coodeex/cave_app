import React, { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import productService from './services/products'
import batchService from './services/batches'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import ProductsList from './components/ProductsList'
import BatchesList from './components/BatchesList'

const App = () => {
  const [products, setProducts] = useState([])  // all products
  const [newProductName, setNewProductName] = useState('')  // product input name
  const [newProductPrice, setNewProductPrice] = useState('')  // product input price
  const [newProductWeight, setNewProductWeight] = useState('')  // product input weight

  const [batches, setBatches] = useState([])  // all batches
  const [newBatchName, setNewBatchName] = useState('')
  const [newBatchProducts, setNewBatchProducts] = useState([])
  const [newBatchSize, setNewBatchSize] = useState('')
  const [newBatchDescription, setNewBatchDescription] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    productService
      .getAll()
      .then(initialProducts => {
        setProducts(initialProducts)
      })
  }, [])

  useEffect(() => {
    batchService
      .getAll()
      .then(initialBatches => {
        setBatches(initialBatches)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedCaveAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      productService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>Batches</h1>
      <BatchesList batches={batches}/>
      <h1>Products</h1>
      <ProductsList products={products}/>
      {user === null
        ? <LoginForm username={username} setUser={setUser} setUsername={setUsername} password={password} setPassword={setPassword}/>
        : <ProductForm products={products} setProducts={setProducts} newProductName={newProductName} setNewProductName={setNewProductName} newProductPrice={newProductPrice} setNewProductPrice={setNewProductPrice} newProductWeight={newProductWeight} setNewProductWeight={setNewProductWeight} />
      }
      {user !== null ? <Logout setUser={setUser} /> : null}

      <button onClick={() => console.log(products)}>log products</button> {/* for dev purposes */}
    </div>
  )
}

export default App 