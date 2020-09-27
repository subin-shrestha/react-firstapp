import React from "react"
import { Link } from "react-router-dom"

function PostItem(props) {
  const date = new Date(props.post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Link key={props.post._id} to={`/post/${props.post._id}`} className="list-group-item list-group-item-action">
      <img className="avatar-tiny" src={props.post.author.avatar} /> <strong>{props.post.title}</strong>
      <span className="text-muted small"> on {dateFormatted}</span>
    </Link>
  )
}

export default PostItem
