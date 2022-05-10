import React, { useState, useEffect, useCallback } from 'react'

let logoutTimer

const AuthContext = React.createContext({
  token: '',
  user: {
    name: '',
    username: ''
  },
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { }
})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingDuration = adjExpirationTime - currentTime

  return remainingDuration
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('expirationTime')
  const storedUsername = localStorage.getItem('username')
  const storedName = localStorage.getItem('name')

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 60000) {
    // Treshold. If remaining time is less than 1 minute, remove token
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('username')
    localStorage.removeItem('name')
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime,
    username: storedUsername,
    name: storedName
  }
}

export const AuthContextProvider = (props) => {
  const storedData = retrieveStoredToken()

  let initialToken
  let initialUser
  if (storedData) {
    initialToken = storedData.token
    initialUser = {
      name: storedData.name,
      username: storedData.username
    }
  }

  const [token, setToken] = useState(initialToken)
  const [user, setUser] = useState(initialUser)

  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('username')
    localStorage.removeItem('name')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expirationTime, username, name) => {
    setToken(token)
    setUser({
      name,
      username
    })
    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)
    localStorage.setItem('username', username)
    localStorage.setItem('name', name)

    const remainingTime = calculateRemainingTime(expirationTime)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    if (storedData) {
      console.log(storedData.duration)
      logoutTimer = setTimeout(logoutHandler, storedData.duration)
    }
  }, [storedData, logoutHandler])

  const contextValue = {
    token,
    user: {
      name: user?.name,
      username: user?.username
    },
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
