import React from 'react'
import classes from './CommentItem.module.css'
import Card from './UI/Card'
import { formatDistanceToNow } from 'date-fns'
const CommentItem = (props) => {
  const { comment } = props
  return (
    <Card>
      <div className={classes.footer}>
        <div className={classes.user}>{comment.author}</div>
        <div className={classes.date}>{formatDistanceToNow(comment.date, { addSuffix: true })}</div>
      </div>
      <div className={classes.content}>{comment.content}</div>
    </Card>
  )
}

export default CommentItem
