import * as React from 'react'
import Typography from '@mui/material/Typography'
import { formatDistanceToNow } from 'date-fns'
import { Stack, Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import remarkGfm from 'remark-gfm'

const PostDetail = (props) => {
  const { post } = props
  console.log(post)
  return (
    <>
      <Typography gutterBottom variant='h2' component="h1" sx={{ marginTop: 4 }}>
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
        alt=""
        src={`http://localhost:5000/uploads/${post.image}`}
      />
      <ReactMarkdown components={CodeBlock} remarkPlugins={[remarkGfm]} >{post.content}</ReactMarkdown>

    </>
  )
}

export default PostDetail
