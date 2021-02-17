import React, { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import BatchForm from './components/BatchForm'
import productService from './services/products'
import batchService from './services/batches'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import ProductsList from './components/ProductsList'
import BatchesList from './components/BatchesList'
import './App.css';


const App = () => {
  const [products, setProducts] = useState([])
  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductWeight, setNewProductWeight] = useState('')

  const [batches, setBatches] = useState([])
  const [newBatchName, setNewBatchName] = useState('')
  const [newBatchProducts, setNewBatchProducts] = useState([{ productName: "", usedWeight: "" }])
  const [newBatchSize, setNewBatchSize] = useState('')
  const [newBatchDescription, setNewBatchDescription] = useState('')
  const [newBatchExtraCosts, setNewBatchExtraCosts] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const devMode = false //Does not allow user to do any harm, but enables console.log buttons

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
    <>
      <div className="container"><h1>Cave App</h1>CaveBrewery is a home brewery located in Otaniemi, Espoo. This app helps to keep track of products and batches. In addition, it calculates the price of one bottle.{!user && <div><br></br>Log in to add purchased products and brewed batches.</div>}</div>

      {!user && <LoginForm username={username} setUser={setUser} setUsername={setUsername} password={password} setPassword={setPassword} />}
      {user && <Logout user={user} setUser={setUser} />}

      {user && <ProductForm products={products} setProducts={setProducts} newProductName={newProductName} setNewProductName={setNewProductName} newProductPrice={newProductPrice} setNewProductPrice={setNewProductPrice} newProductWeight={newProductWeight} setNewProductWeight={setNewProductWeight} />}

      {user && <BatchForm products={products} batches={batches} setBatches={setBatches} newBatchName={newBatchName} setNewBatchName={setNewBatchName} newBatchProducts={newBatchProducts} setNewBatchProducts={setNewBatchProducts} newBatchSize={newBatchSize} setNewBatchSize={setNewBatchSize} newBatchDescription={newBatchDescription} setNewBatchDescription={setNewBatchDescription} newBatchExtraCosts={newBatchExtraCosts} setNewBatchExtraCosts={setNewBatchExtraCosts} />}


      {devMode && <button onClick={() => console.log(products)}>log products</button>}
      {devMode && <button onClick={() => console.log(batches)}>log batches</button>}
      {devMode && <button onClick={() => console.log(user)}>log user</button>}

      <ProductsList products={products} />
      <BatchesList batches={batches} />
    </>
  )
}

export default App 