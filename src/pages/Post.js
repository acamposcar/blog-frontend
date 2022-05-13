// import classes from './Post.module.css'

import { useParams } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import CommentItem from '../components/CommentItem'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/UI/Spinner'
import NewCommentForm from '../components/NewCommentForm'
import AuthContext from '../store/auth-context'
import PostDetail from '../components/PostDetail'
import { Container } from '@mui/material'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

const Post = () => {
  const { postid } = useParams()
  const [post, setPost] = useState()
  const { loading, sendRequest, error } = useFetch()
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const transformPost = (postObj) => {
      const comments = []
      for (const comment of postObj.data.comments) {
        comments.push({
          id: comment._id,
          content: comment.content,
          date: new Date(comment.date),
          author: comment.author.username,
          avatar: comment.author.avatar
        })
      }
      setPost({
        id: postObj.data._id,
        title: postObj.data.title,
        content: postObj.data.content,
        date: new Date(postObj.data.date),
        author: postObj.data.author.name,
        published: postObj.data.published === 'true',
        comments,
        image: postObj.data.image,
        summary: postObj.data.sumamry
      })
    }

    sendRequest({ url: `/api/v1/posts/${postid}` }, transformPost)
  }, [sendRequest])

  const handleAddComment = (comment) => {
    const newComment = {
      id: comment._id,
      content: comment.content,
      date: new Date(comment.date),
      author: authCtx.user.username,
      avatar: authCtx.user.avatar

    }
    setPost(prevState => {
      return { ...prevState, comments: [newComment, ...prevState.comments] }
    })
  }

  let commentsList
  if (post?.comments) {
    commentsList = post.comments.map(comment => {
      return <CommentItem key={comment.id} comment={comment} />
    })
  }

  return (
    <Container maxWidth='false' sx={{ maxWidth: 750, padding: 0 }}>
      {loading
        ? <Spinner />
        : error
          ? <Alert severity="error">{error}</Alert>
          : <>
            {post ? <PostDetail post={post} /> : <Alert severity="info">No post found</Alert>}

            <Divider variant="middle" />

            <Typography gutterBottom variant="h4" component="div" sx={{ marginY: 4 }}>
              Comments ({commentsList?.length})
            </Typography>

            {authCtx.isLoggedIn && <NewCommentForm onAddComment={handleAddComment} postid={postid} />}

            {commentsList?.length > 0 ? commentsList : <Alert severity="info">No comments found. Sign in to leave a new comment</Alert>}

          </>
      }
    </Container>
  )
}

export default Post
