import * as React from 'react'
import Typography from '@mui/material/Typography'
import { formatDistanceToNow } from 'date-fns'
import { Stack, Box } from '@mui/material'
import Divider from '@mui/material/Divider'

const PostDetail = (props) => {
  const { post } = props

  return (
    <>
      <Typography gutterBottom variant="h1" component="div" sx={{ marginTop: 4 }}>
        {post.title}
      </Typography>
      <Stack sx={{ marginY: 3 }} direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}
      >
        <Typography variant="body2" color="text.secondary" component="div">
          {post.author}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {formatDistanceToNow(post.date, { addSuffix: true })}
        </Typography>
      </Stack>
      <Box
        component="img"
        sx={{
          width: '100%',
          maxHeight: '500px',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        alt="The house from the offer."
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <Typography color="text.primary" sx={{ marginY: 4 }}>
        {post.content}
      </Typography>

    </>
  )
}

export default PostDetail
