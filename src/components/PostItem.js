import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, CardActions } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const PostItem = (props) => {
  const { post } = props
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/posts/${post.id}`, { replace: true })
  }
  return (
    <Card onClick={handleClick} sx={{ maxWidth: 400, margin: '0 auto' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://midu.dev/images/react-hooks-use-state.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography sx={{ marginY: 2 }} variant="body1" color="text.secondary">
            {post.content.substr(0, post.content.indexOf('.') + 1)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', padding: 2.5 }}>
          <Typography variant="body2" color="text.secondary">
            {post.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDistanceToNow(post.date, { addSuffix: true })}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card >
  )
}

export default PostItem
