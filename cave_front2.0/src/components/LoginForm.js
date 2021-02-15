import React from 'react'
import loginService from '../services/login'
import productService from '../services/products'

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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert("Wrong username or password");
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e)=>handleLogin(e)}>
      {/* <form onSubmit={console.log("object")}> */}
        <div>
          username
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
        <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm