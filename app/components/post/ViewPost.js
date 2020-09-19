import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Page from "../Page"
import Request from "../../_requests/Request"
import Loading from "../../_directives/Loading"
import Axios from "axios"
import ReactMarkdown from "react-markdown"
import ReactTooltip from "react-tooltip"

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
          <a href="#" data-tip="Edit" data-for="edit" className="text-primary mr-2">
            <i className="fas fa-edit"></i>
          </a>
          <ReactTooltip id="edit" className="custom-tooltip" />{" "}
          <a data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
            <i className="fas fa-trash"></i>
          </a>
          <ReactTooltip id="delete" className="custom-tooltip " />
        </span>
      </div>

      <p className="text-muted small mb-4">
        <a href="#">
          <img className="avatar-tiny" src={post.author.avatar} />
        </a>
        Posted by <a href="#">{post.author.username}</a> on {dateFormatted}
      </p>

      <div className="body-content">
        <ReactMarkdown source={post.body} allowedTypes={["paragraph", "strong", "emphasis", "text", "heading", "list", "listItem"]} />
      </div>
    </Page>
  )
}

export default ViewPost
