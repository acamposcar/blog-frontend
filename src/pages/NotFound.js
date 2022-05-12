// import classes from './Post.module.css'

import React from 'react'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'

const NotFound = () => {
  return (
    <Container sx={{ display: 'grid', placeItems: 'center' }}>
      <Typography variant="h1" component="div" sx={{ marginTop: 6 }}>
        Oops!
      </Typography>
      <Typography variant="h4" component="div" sx={{ marginTop: 4 }}>
        We can&apos;t find the page you are looking for
      </Typography>
    </Container>
  )
}

export default NotFound
