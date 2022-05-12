import React, { useContext } from 'react'
import { Typography, Avatar, Box } from '@mui/material'
import AuthContext from '../store/auth-context'
import ChangeAvatarForm from '../components/ChangeAvatarForm'

const Profile = () => {
  const authCtx = useContext(AuthContext)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, textAlign: 'center' }}>
      <Avatar src={authCtx.user.avatar
        ? `http://localhost:3000/uploads/${authCtx.user.avatar}`
        : ''} sx={{ width: 80, height: 80, backgroundColor: 'primary.main' }}>{authCtx.user.username[0].toUpperCase()}
      </Avatar>
      <Typography gutterBottom variant="h1" component="h1">
        Hello {authCtx.user.name}!
      </Typography>

      <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: 4 }}>
        You can change your avatar here!
      </Typography>
      <ChangeAvatarForm></ChangeAvatarForm>
    </Box>
  )
}

export default Profile
