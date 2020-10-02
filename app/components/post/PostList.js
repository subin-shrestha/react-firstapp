import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Request from "../../_requests/Request"
import Loading from "../pages/Loading"
import PostItem from "./PostItem"

function PostList() {
  const { username } = useParams()
  const [isFetching, setIsFetching] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      setIsFetching(true)
      try {
        const response = await Request({
          url: `/profile/${username}/posts`,
          method: "GET",
          cancelToken: ourRequest.token
        })
        setPosts(response.data)
        setIsFetching(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPosts()

    return () => {
      ourRequest.cancel()
    }
  }, [username])

  if (isFetching) {
    return <Loading />
  } else if (!posts || !posts.length) {
    return (
      <div className="text-center">
        <div></div>
        <p className="lead text-muted"> User does not have any posts.</p>
      </div>
    )
  }

  return (
    <div className="list-group">
      {posts.map(post => {
        return <PostItem key={post._id} post={post} />
      })}
    </div>
  )
}

export default PostList
