import React, { useRef, useContext } from 'react'
import AuthContext from '../store/auth-context'
import useFetch from '../hooks/useFetch'
import { TextField, Button, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
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
    }, (commentObj) => {
      props.onAddComment(commentObj.data)
      contentRef.current.value = ''
    })
  }
  return (
    <Box mb={6}>
      <form onSubmit={submitHandler}>
        {error && <Alert variant="standard" severity="error">{error}</Alert>}
        <TextField
          sx={{ marginBottom: 2, backgroundColor: 'white' }}
          id="content"
          label="Leave a comment"
          name="content"
          multiline
          required
          rows={3}
          inputRef={contentRef}
          fullWidth

        />
        {loading
          ? <Button variant="contained" disabled>Loading...</Button>
          : <Button type="submit" variant="contained" endIcon={<SendIcon />} >Submit</Button>}
      </form>
    </Box>
  )
}

export default NewCommentForm
