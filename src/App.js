import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Container from './components/UI/Container'
import AuthContext from './store/auth-context'
import Profile from './pages/Profile'
import Post from './pages/Post'
function App() {
  const authCtx = useContext(AuthContext)

  return (
    <div className='App'>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:postid' element={<Post />} />
          {!authCtx.isLoggedIn && (
            <>
              <Route path='/login' element={<Auth />} />
              <Route path='/register' element={<Auth />} />
              <Route path='/profile' element={<Navigate to="/login" replace={true} />} />
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
        </Routes>
      </Container>
    </div>
  )
}

export default App
