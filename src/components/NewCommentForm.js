import classes from './NewCommentForm.module.css'
import React, { useRef, useContext } from 'react'
import Button from '../components/UI/Button'
import AuthContext from '../store/auth-context'
import useFetch from '../hooks/useFetch'
const NewCommentForm = (props) => {
  const { loading, sendRequest, error } = useFetch()
  const contentRef = useRef()
  const authCtx = useContext(AuthContext)

  const submitHandler = async (event) => {
    event.preventDefault()

    sendRequest({
      url: `/api/v1/posts/${props.postid}/comments`,
      method: 'POST',
      body: {
        content: contentRef.current.value
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`
      }
    }, (commentObj) => { props.onAddComment(commentObj.data) })
  }
  return (
    <div className={classes.form}>
      <form onSubmit={submitHandler}>
        {error && <p className={classes['alert-danger']}>{error}</p>}
        <div className={classes.control}>
          <label htmlFor="content">New Comment</label>
          <textarea className={classes.content} ref={contentRef} id="content" rows={3} name="content" type="text" required />
        </div>
        <div className={classes.control}>
          {loading ? <Button>Loading...</Button> : <Button>Submit</Button>}
        </div>
      </form>
    </div>
  )
}

export default NewCommentForm
