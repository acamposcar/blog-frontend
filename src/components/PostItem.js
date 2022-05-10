import React from 'react'
import classes from './PostItem.module.css'
import Card from './UI/Card'
import { formatDistanceToNow } from 'date-fns'
const PostItem = (props) => {
  const { post } = props
  console.log(post.content)
  return (
    <Card>
      <a href={'/posts/' + post.id} className={classes.title}>{post.title}</a>
      <div className={classes.content}>{post.content}</div>
      <div className={classes.footer}>
        <div className={classes.user}>{post.author}</div>
        <div className={classes.date}>{formatDistanceToNow(post.date, { addSuffix: true })}</div>
      </div>
    </Card>
  )
}

export default PostItem
