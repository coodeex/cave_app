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
  const [newBatchProducts, setNewBatchProducts] = useState([{ productName: "Amarillo", usedWeight: 100 }, { productName: "Magnum", usedWeight: 80 }])
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
      batchService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null ? <LoginForm username={username} setUser={setUser} setUsername={setUsername} password={password} setPassword={setPassword} /> : null}
      {user !== null ? <ProductForm products={products} setProducts={setProducts} newProductName={newProductName} setNewProductName={setNewProductName} newProductPrice={newProductPrice} setNewProductPrice={setNewProductPrice} newProductWeight={newProductWeight} setNewProductWeight={setNewProductWeight} /> : null}

      {user !== null ? <BatchForm products={products} batches={batches} setBatches={setBatches} newBatchName={newBatchName} setNewBatchName={setNewBatchName} newBatchProducts={newBatchProducts} setNewBatchProducts={setNewBatchProducts} newBatchSize={newBatchSize} setNewBatchSize={setNewBatchSize} newBatchDescription={newBatchDescription} setNewBatchDescription={setNewBatchDescription} /> : null}

      {user !== null ? <Logout setUser={setUser} /> : null}

      <button onClick={() => console.log(products)}>log products</button> {/* for dev purposes */}
      <button onClick={() => console.log(batches)}>log batches</button> {/* for dev purposes */}
      <h1>Products</h1>
      <ProductsList products={products} />
      <h1>Batches</h1>
      <BatchesList batches={batches} />
    </div>
  )
}

export default App 