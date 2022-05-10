import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../store/auth-context'
// import classes from './styles/Home.module.css'

const Profile = () => {
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const authCtx = useContext(AuthContext)
  useEffect(() => {
    const fetchPosts = async () => {
      setError(null)
      setIsLoading(true)
      try {
        const response = await fetch('/api/v1/users/', {
          headers: new Headers({ Authorization: 'Bearer ' + authCtx.token })
        })

        const responseData = await response.json()
        if (!response.ok) {
          const errorMessage = responseData?.error ? responseData.error : 'Something went wrong'
          setError(errorMessage)
        } else {
          setUser(responseData.data)
        }
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && user && user.username}
      {!isLoading && !error && !user && <p>No posts found...</p>}
      {!isLoading && error && <p>{error}</p>}

    </>
  )
}

export default Profile
