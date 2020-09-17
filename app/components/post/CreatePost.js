import React, { useContext, useState } from "react"
import { withRouter } from "react-router-dom"
import Page from "../Page"
import DispatchContext from "../../_contexts/DispatchContext"
import StateContext from "../../_contexts/StateContext"
import Request from "../../_requests/Request"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  async function handleCreatePost(e) {
    e.preventDefault()

    try {
      const response = await Request({
        url: "/create-post",
        method: "POST",
        data: {
          title,
          body,
          token: appState.user.token
        }
      })
      if (response.data.constructor === String) {
        appDispatch({ type: "alertMessage", value: "New post created successfully.", alert_type: "success" })
        props.history.push(`/post/${response.data}`)
      } else {
        appDispatch({ type: "alertMessage", value: response.data[0], alert_type: "danger" })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Page title="Create new post">
      <form onSubmit={handleCreatePost}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)
