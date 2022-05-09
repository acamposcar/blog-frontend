import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
// import classes from './styles/Home.module.css'

const Home = () => {
  const [posts, setPosts] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setError(null)
      setIsLoading(true)
      try {
        const response = await fetch('/api/v1/posts/')
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
        const responseData = await response.json()
        const postsData = []

        for (const post of responseData.data) {
          postsData.push({
            title: post.title,
            content: post.content,
            date: new Date(post.date),
            author: post.author.username,
            published: post.published === 'true'
          })
        }
        setPosts(postsData)
      } catch (error) {
        setError(error.message)
      }

      setIsLoading(false)
    }
    fetchPosts()
  }, [])

  let postsList
  if (posts) {
    postsList = posts.map(post => {
      return <PostItem key={post._id} post={post} />
    })
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && posts && postsList}
      {!isLoading && !error && !posts && <p>No posts found...</p>}
      {!isLoading && error && <p>{error}</p>}

    </>
  )
}

export default Home
