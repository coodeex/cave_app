import React from 'react'

const Logout = ({ user, setUser }) => {
  return (
    <div className="container">
      <div className="row">
        <label className="col-25">Logged in as {user.username}</label>

        <button type="submit" className="Logout-button" onClick={() => {
          setUser(null)
          window.localStorage.removeItem('loggedCaveAppUser')
        }
        }>Log out</button>
      </div>
    </div>
  )
}

export default Logout