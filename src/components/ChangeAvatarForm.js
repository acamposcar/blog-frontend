import React, { useContext, useState } from 'react'
import AuthContext from '../store/auth-context'
import useFetch from '../hooks/useFetch'
import { Button, Avatar } from '@mui/material'
import Alert from '@mui/material/Alert'
import { SaveAs } from '@mui/icons-material'
import classes from './ChangeAvatarForm.module.css'

const ChangeAvatarForm = (props) => {
  const { loading, sendRequest, error } = useFetch()
  const authCtx = useContext(AuthContext)
  const [file, setFile] = useState({ preview: undefined, data: undefined })

  const handleChange = (event) => {
    setFile({
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('image', file.data)
    sendRequest({
      url: '/api/v1/users/avatar/',
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${authCtx.token}`
      }
    }, (avatarObj) => {
      authCtx.changeAvatar(avatarObj.data)
      setFile({ preview: undefined, data: undefined })
    })
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit} >
        {error && <Alert variant="standard" severity="error">{error}</Alert>}
        <Button
          variant="outlined"
          component="label"
          fullWidth
        >
          Select File
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            hidden
            name="image"
            id="image"
            onChange={handleChange}
          />
        </Button>
        {file.preview &&
          <Avatar
            src={file.preview
              ? file.preview
              : ''}
            sx={{ width: 80, height: 80, backgroundColor: 'primary.main' }}>{authCtx.user.username[0].toUpperCase()}
          </Avatar>}
        {loading
          ? <Button fullWidth variant="contained" disabled>Loading...</Button>
          : file.preview && <Button fullWidth type="submit" variant="contained" endIcon={<SaveAs />} >Save</Button>}
      </form>

    </>
  )
}

export default ChangeAvatarForm
