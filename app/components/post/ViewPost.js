import React, { useContext, useEffect, useState } from "react"
import { Link, useParams, withRouter } from "react-router-dom"
import Page from "../Page"
import Request from "../../_requests/Request"
import Loading from "../pages/Loading"
import Axios from "axios"
import ReactMarkdown from "react-markdown"
import ReactTooltip from "react-tooltip"
import Page404 from "../pages/Page404"
import StateContext from "../../_contexts/StateContext"
import DispatchContext from "../../_contexts/DispatchContext"

function ViewPost(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
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
  }, [id])

  if (isLoading) {
    return <Loading />
  } else if (!post) {
    return <Page404 />
  }

  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  function isOwner() {
    return appState.loggedIn && appState.user.username == post.author.username
  }

  async function HandleDelete() {
    const confirm = window.confirm("Do you really want to delete this post?")
    if (confirm) {
      try {
        const response = await Request({
          url: `/post/${post._id}`,
          method: "DELETE",
          data: { token: appState.user.token }
        })
        console.log(response)
        if (response.data == "Success") {
          appDispatch({ type: "alertMessage", value: "Post was successfully deleted.", alert_type: "success" })
          props.history.push(`/profile/${appState.user.username}`)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link to={`/post/${id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip id="edit" className="custom-tooltip" />{" "}
            <a onClick={HandleDelete} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
              <i className="fas fa-trash"></i>
            </a>
            <ReactTooltip id="delete" className="custom-tooltip " />
          </span>
        )}
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

export default withRouter(ViewPost)
