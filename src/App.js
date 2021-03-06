import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Auth from './pages/Auth'
import AuthContext from './store/auth-context'
import Post from './pages/Post'
import NotFound from './pages/NotFound'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Container } from '@mui/material'
import Profile from './pages/Profile'
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#b75ad6'
    },
    secondary: {
      main: '#f03580'
    }
  },
  typography: {
    body1: {
      lineHeight: 1.7,
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.03em'
    }
  },
  shape: {
    borderRadius: 8
  },
  props: {
    MuiAppBar: {
      color: 'default'
    }
  }
})

theme.typography.h1 = {
  fontSize: '3rem',
  fontWeight: 300,
  [theme.breakpoints.up('lg')]: {
    fontSize: '6rem'
  }
}
theme.typography.h2 = {
  fontSize: '3rem',

  [theme.breakpoints.up('md')]: {
    fontSize: '5rem'
  }
}

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container sx={{ marginY: 8 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:postid' element={<Post />} />
          {!authCtx.isLoggedIn && (
            <>
              <Route path='/login' element={<Auth />} />
              <Route path='/register' element={<Auth />} />
              <Route path='/profile' element={<Navigate to="/" replace={true} />} />

            </>
          )}
          {authCtx.isLoggedIn && (
            <>
              <Route path='/login' element={<Navigate to="/" replace={true} />} />
              <Route path='/register' element={<Navigate to="/" replace={true} />} />
              <Route path='/logout' element={<Navigate to="/" replace={true} />} />
              <Route path='/profile' element={<Profile />} />
            </>
          )}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
