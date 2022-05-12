import React from 'react'
import classes from './CommentItem.module.css'
import { formatDistanceToNow } from 'date-fns'
import { Card, Avatar } from '@mui/material'
const CommentItem = (props) => {
  const { comment } = props
  return (
    <Card sx={{ padding: 4, marginBottom: 3, display: 'flex', gap: 2 }}>
      <Avatar src={`http://localhost:3000/uploads/${comment.avatar}`} sx={{ backgroundColor: 'primary.main' }}>{comment.author[0].toUpperCase()}</Avatar>
      <div className={classes.comment}>
        <div className={classes.header}>
          <div className={classes.author}>{comment.author}</div>
          <div className={classes.date}>{formatDistanceToNow(comment.date, { addSuffix: true })}</div>
        </div>
        <p className={classes.content}>{comment.content}</p>
      </div>
    </Card>
  )
}

export default CommentItem
