import React, { useContext, useState } from "react"
import { withRouter } from "react-router-dom"
import Page from "../components/Page"
import UserContext from "../_contexts/UserContext"
import Request from "../_requests/Request"

function CreatePost(props) {
  const { addAlertMessage } = useContext(UserContext)
  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  async function handleCreatePost(e) {
    e.preventDefault()
    const response = await Request("/create-post", "POST", { title, body, token: localStorage.getItem("token") })
    console.log(response)
    if (response.data) {
      addAlertMessage("New post created successfully.", "success")
      props.history.push(`/post/${response.data}`)
    } else {
      addAlertMessage("Something went wrong.", "danger")
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
