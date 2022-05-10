import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import Spinner from '../components/UI/Spinner'
// import classes from './Home.module.css'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const [posts, setPosts] = useState([])
  const { loading, sendRequest, error } = useFetch()

  useEffect(() => {
    const transformPosts = (postObj) => {
      const postsArray = []
      for (const post of postObj.data) {
        postsArray.push({
          id: post._id,
          title: post.title,
          content: post.content,
          date: new Date(post.date),
          author: post.author.username,
          published: post.published === 'true'
        })
      }
      setPosts(postsArray)
    }

    sendRequest({ url: '/api/v1/posts' }, transformPosts)
  }, [sendRequest])

  let postsList
  if (posts.length > 0) {
    postsList = posts.map(post => {
      return <PostItem key={post.id} post={post} />
    })
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && posts && postsList}
      {!loading && !error && !posts && <p>No posts found...</p>}
      {!loading && error && <p>Something went wrong!</p>}

    </>
  )
}

export default Home
