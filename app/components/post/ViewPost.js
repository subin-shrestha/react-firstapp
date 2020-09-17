import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Page from "../Page"
import Request from "../../_requests/Request"
import Loading from "../../_directives/Loading"
import Axios from "axios"

function ViewPost() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPost() {
      try {
        const response = await Request({
          url: `/post/${id}`,
          method: "GET",
          cancelToken: ourRequest.token
        })
        setPost(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPost()

    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading) {
    return (
      <Page title="...">
        <Loading />
      </Page>
    )
  } else if (!post) {
    return (
      <Page title="404">
        <div>No post found.</div>
      </Page>
    )
  }

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <a href="#">
          <img className="avatar-tiny" src={post.author.avatar} />
        </a>
        Posted by <a href="#">{post.author.username}</a> on {dateFormatted}
      </p>

      <div className="body-content">{post.body}</div>
    </Page>
  )
}

export default ViewPost
