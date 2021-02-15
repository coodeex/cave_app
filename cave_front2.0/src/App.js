import React, { useState, useEffect } from 'react'
import Product from './components/Product'
import ProductForm from './components/ProductForm'
import productService from './services/products'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'

const App = () => {
  const [products, setProducts] = useState([])  // all products
  const [newProductName, setNewProductName] = useState('')  // product input name
  const [newProductPrice, setNewProductPrice] = useState('')  // product input price
  const [newProductWeight, setNewProductWeight] = useState('')  // product input weight
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
    const loggedUserJSON = window.localStorage.getItem('loggedCaveAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      productService.setToken(user.token)
    }
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