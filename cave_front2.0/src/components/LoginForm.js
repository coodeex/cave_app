import React from 'react'
import loginService from '../services/login'
import productService from '../services/products'
import batchService from '../services/batches'

const LoginForm = ({ username, setUser, setUsername, password, setPassword }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedCaveAppUser', JSON.stringify(user)
      )
      productService.setToken(user.token)
      batchService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert("Wrong username or password");
    }
  }
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="row">
          <label className="col-25">Username</label>
          <input className="col-75"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="row">
          <label className="col-25">Password</label>
          <input className="col-75"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="row"><label className="col-25"></label>
          <button type="submit" className="col-75">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm