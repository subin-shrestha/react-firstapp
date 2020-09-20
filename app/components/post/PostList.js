import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../pages/Loading"
import Request from "../../_requests/Request"

function PostList() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Request({
          url: `/profile/${username}/posts`,
          method: "GET",
          cancelToken: ourRequest.token
        })
        console.log(response.data)
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPosts()

    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="list-group">
      {posts.map(post => {
        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>
            <span className="text-muted small"> on {dateFormatted}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default PostList
