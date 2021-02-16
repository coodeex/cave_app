import React, { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import BatchForm from './components/BatchForm'
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
  const [newBatchProducts, setNewBatchProducts] = useState([{ productName: "", usedWeight: "" }])
  const [newBatchSize, setNewBatchSize] = useState('')
  const [newBatchDescription, setNewBatchDescription] = useState('')
  const [newBatchExtraCosts, setNewBatchExtraCosts] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const devMode = true

  useEffect(() => {
    productService
      .getAll()
      .then(initialProducts => {
        setProducts(initialProducts)
      })
  }, [batches])

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
      batchService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {!user && <LoginForm username={username} setUser={setUser} setUsername={setUsername} password={password} setPassword={setPassword} />}

      {user && <ProductForm products={products} setProducts={setProducts} newProductName={newProductName} setNewProductName={setNewProductName} newProductPrice={newProductPrice} setNewProductPrice={setNewProductPrice} newProductWeight={newProductWeight} setNewProductWeight={setNewProductWeight} />}

      {user && <BatchForm products={products} batches={batches} setBatches={setBatches} newBatchName={newBatchName} setNewBatchName={setNewBatchName} newBatchProducts={newBatchProducts} setNewBatchProducts={setNewBatchProducts} newBatchSize={newBatchSize} setNewBatchSize={setNewBatchSize} newBatchDescription={newBatchDescription} setNewBatchDescription={setNewBatchDescription} newBatchExtraCosts={newBatchExtraCosts} setNewBatchExtraCosts={setNewBatchExtraCosts} />}

      {user && <Logout setUser={setUser} />}

      {devMode && <button onClick={() => console.log(products)}>log products</button>}
      {devMode && <button onClick={() => console.log(batches)}>log batches</button>}
      {devMode && <button onClick={() => console.log(user)}>log user</button>}
      <h1>Products</h1>
      <ProductsList products={products} />
      <h1>Batches</h1>
      <BatchesList batches={batches} />
    </div>
  )
}

export default App 