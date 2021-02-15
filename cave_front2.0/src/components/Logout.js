import React from 'react'

const Logout = ({ setUser }) => {
  return (
    <button onClick={() => {
      setUser(null)
      window.localStorage.removeItem('loggedCaveAppUser')
    }
    }>Log out</button>
  )
}

export default Logout