import classes from './Auth.module.css'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../store/auth-context'
import { TextField, Button, Avatar, Typography, Alert } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

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
    ? <p className={classes.message}>Don&apos;t have an account? <Link to='/register'>Register</Link></p>
    : <p className={classes.message} >Already have an account? <Link to='/login'>Sign in</Link></p>

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

        authCtx.login(data.data.token, expirationTime.toISOString(), data.data.user)
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

      <div className={classes.header}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Sign in' : 'Register'}
        </Typography>
      </div>
      <form onSubmit={submitHandler}>
        {!isValidationError() && errorMessage && <Alert sx={{ marginY: 3 }} variant="standard" severity="error">{errorMessage}</Alert>}
        {!isLogin && <div className={classes.control}>
          <TextField fullWidth id="name" label="Name" variant="outlined" inputRef={nameRef} name="name" required maxLength={50} sx={{ backgroundColor: 'white' }} />
          {nameErrors.length > 0 && formatValidationErrors(nameErrors)}
        </div>}
        <div className={classes.control}>
          <TextField fullWidth id="username" label="Username" variant="outlined" inputRef={usernameRef} name="username" required minLength={3} sx={{ backgroundColor: 'white' }} autoFocus autoComplete="username" />
          {usernameErrors.length > 0 && formatValidationErrors(usernameErrors)}

        </div>
        <div className={classes.control}>
          <TextField type="password" fullWidth id="password" label="Password" variant="outlined" inputRef={passwordRef} name="password" required minLength={4} sx={{ backgroundColor: 'white' }} autoComplete="current-password" />
          {passwordErrors.length > 0 && formatValidationErrors(passwordErrors)}
        </div>
        <div className={classes.control}>
          <Button fullWidth type='submit' variant="contained">{buttonText}</Button>
        </div>
      </form>
      {message}
    </div>
  )
}

export default Auth
