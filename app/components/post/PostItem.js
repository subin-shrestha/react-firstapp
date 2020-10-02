import React, { useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../../_contexts/DispatchContext"

function PostItem(props) {
  const appDispatch = useContext(DispatchContext)

  const post = props.post
  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Link
      onClick={() => {
        appDispatch({ type: "closeSearch" })
      }}
      key={post._id}
      to={`/post/${post._id}`}
      className="list-group-item list-group-item-action"
    >
      <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>
      <span className="text-muted small">
        {" "}
        {props.showAuthor && ` by ${post.author.username}`} on {dateFormatted}
      </span>
    </Link>
  )
}

export default PostItem
