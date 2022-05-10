import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'
import AuthContext from '../store/auth-context'

const Header = () => {
  const authCtx = useContext(AuthContext)

  const logoutHandler = () => {
    authCtx.logout()
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>DEV BLOG</div>
      {authCtx.isLoggedIn &&

        <p>Hello {authCtx.user.username}</p>

      }
      <nav>
        <NavLink className={({ isActive }) =>
          isActive ? classes.active : undefined
        } to='/'>Home</NavLink>
        {!authCtx.isLoggedIn &&
          <>
            <NavLink className={({ isActive }) =>
              isActive ? classes.active : undefined
            } to='/login'>Sign In</NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? classes.active : undefined
            } to='/register'>Register</NavLink>
          </>
        }
        {authCtx.isLoggedIn &&
          <>
            <NavLink className={({ isActive }) =>
              isActive ? classes.active : undefined
            } to='/profile'>Profile</NavLink>
            <a onClick={logoutHandler}>Logout</a>
          </>
        }
      </nav>
    </header>
  )
}

export default Header
