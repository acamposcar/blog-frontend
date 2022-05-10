import classes from './Auth.module.css'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../components/UI/Button'
import AuthContext from '../store/auth-context'

const Auth = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()

  const [nameErrors, setNameErrors] = useState([])
  const [usernameErrors, setUsernameErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  const [errorMessage, setErrorMessage] = useState('')

  const location = useLocation()
  const isLogin = location.pathname === '/login'

  const authCtx = useContext(AuthContext)

  useEffect(() => {
    setUsernameErrors([])
    setPasswordErrors([])
    setNameErrors([])
    setErrorMessage('')
  }, [location])

  const apiURL = isLogin ? 'api/login' : 'api/register'
  const buttonText = isLogin ? 'Sign in' : 'Register'
  const message = isLogin
    ? <p>Don&apos;t have an account? <Link to='/register'>Register</Link></p>
    : <p>Already have an account? <Link to='/login'>Sign in</Link></p>

  const submitHandler = async (event) => {
    event.preventDefault()
    setUsernameErrors([])
    setPasswordErrors([])
    setNameErrors([])
    setErrorMessage('')

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          name: nameRef.current?.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data?.error ? data.error : 'Authentication failed!'
        setErrorMessage(errorMessage)
        if (data.validationErrors) {
          for (const validationError of data.validationErrors) {
            if (validationError.param === 'username') {
              setUsernameErrors(prevState => [...prevState, validationError.msg])
            } else if (validationError.param === 'password') {
              setPasswordErrors(prevState => [...prevState, validationError.msg])
            } else if (validationError.param === 'name') {
              setNameErrors(prevState => [...prevState, validationError.msg])
            }
          }
        }
      } else {
        // expiresIn is in seconds. Convert to miliseconds
        const expirationTime = new Date(
          new Date().getTime() + data.data.expiresIn * 1000
        )

        authCtx.login(data.data.token, expirationTime.toISOString(), data.data.username, data.data.name)
      }
    } catch (error) {
      setErrorMessage('Something went wrong')
    }
  }

  const formatValidationErrors = (validationErrors) => {
    return (
      <ul className={classes['validation-error-list']}>
        {validationErrors.map(error => {
          return <li key={error} className={classes['validation-error']}>{error}</li>
        })}
      </ul>
    )
  }

  const isValidationError = () => {
    return nameErrors.length > 0 || usernameErrors.length > 0 || passwordErrors.length > 0
  }
  return (
    <div className={classes.form}>
      {isLogin ? <h1>Sign in</h1> : <h1>Register</h1>}
      <form onSubmit={submitHandler}>
        {!isValidationError() && errorMessage && <p className={classes['alert-danger']}>{errorMessage}</p>}
        {!isLogin && <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} id="name" name="name" type="text" required maxLength={50} />
          {nameErrors.length > 0 && formatValidationErrors(nameErrors)}
        </div>}
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input ref={usernameRef} id="username" name="username" type="text" required minLength={3} />
          {usernameErrors.length > 0 && formatValidationErrors(usernameErrors)}

        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} id="password" name="password" type="password" required minLength={4} />
          {passwordErrors.length > 0 && formatValidationErrors(passwordErrors)}
        </div>
        <div className={classes.control}>
          <Button>{buttonText}</Button>
        </div>
      </form>
      {message}
    </div>
  )
}

export default Auth
