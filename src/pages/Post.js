// import classes from './Post.module.css'

import { useParams } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import PostItem from '../components/PostItem'
import CommentItem from '../components/CommentItem'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/UI/Spinner'
import NewCommentForm from '../components/NewCommentForm'
import AuthContext from '../store/auth-context'
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
          author: comment.author.username
        })
      }
      setPost({
        id: postObj.data._id,
        title: postObj.data.title,
        content: postObj.data.content,
        date: new Date(postObj.data.date),
        author: postObj.data.author.username,
        published: postObj.data.published === 'true',
        comments
      })
    }

    sendRequest({ url: `/api/v1/posts/${postid}` }, transformPost)
  }, [sendRequest])

  const handleAddComment = (comment) => {
    const newComment = {
      id: comment._id,
      content: comment.content,
      date: new Date(comment.date),
      author: authCtx.user.username
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
    <>
      {loading
        ? <Spinner />
        : error
          ? <p>{error}</p>
          : <>
            {post && <PostItem post={post} />}
            {!post && <p>No post found</p>}
            <h1>Comments</h1>
            {authCtx.isLoggedIn && <NewCommentForm onAddComment={handleAddComment} postid={postid} />}

            {commentsList?.length > 0 && commentsList}
            {commentsList?.length === 0 && <p>No comments found</p>}
          </>}
    </>
  )
}

export default Post
