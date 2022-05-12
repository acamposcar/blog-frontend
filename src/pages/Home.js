import React, { useEffect, useState } from 'react'
import Spinner from '../components/UI/Spinner'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import PostItem from '../components/PostItem'
import Alert from '@mui/material/Alert'

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
      return (
        <Grid item xs={4} sm={4} md={4} key={post.id} >
          <PostItem key={post.id} post={post} />
        </Grid>
      )
    })
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && !error && posts &&
        <Grid container spacing={{ xs: 2, md: 4, lg: 8 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          {postsList}
        </Grid>
      }
      {!loading && !error && !posts && <Alert variant="standard" severity="info">No posts found</Alert>}
      {!loading && error && <Alert variant="standard" severity="error">Something went wrong!</Alert>}

    </>
  )
}

export default Home
