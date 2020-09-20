import React, { useContext, useEffect } from "react"
import { Link, useParams, withRouter } from "react-router-dom"
import Page from "../Page"
import Request from "../../_requests/Request"
import Loading from "../pages/Loading"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "../../_contexts/StateContext"
import DispatchContext from "../../_contexts/DispatchContext"
import Page404 from "../pages/Page404"

function EditPost(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const { id } = useParams()
  const initialState = {
    title: {
      value: "",
      hasError: false,
      message: ""
    },
    body: {
      value: "",
      hasError: false,
      message: ""
    },
    hasPost: false,
    isFetching: true,
    isSaving: false,
    id: id,
    sendCount: 0
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchCompleted":
        draft.title.value = action.value.title
        draft.body.value = action.value.body
        draft.isFetching = false
        draft.hasPost = true
        break
      case "titleChanged":
        draft.title.value = action.value
        draft.title.hasError = false
        draft.title.message = ""
        break
      case "bodyChanged":
        draft.body.value = action.value
        draft.body.hasError = false
        draft.body.message = ""
        break
      case "updatePost":
        if (!draft.title.hasError && !draft.body.hasError) {
          draft.sendCount++
        }
        break
      case "updating":
        draft.isSaving = true
        break
      case "updated":
        draft.isSaving = false
        break
      case "validateTitle":
        if (!action.value.trim()) {
          draft.title.hasError = true
          draft.title.message = "This is required field."
        }
        break
      case "validateBody":
        if (!action.value.trim()) {
          draft.body.hasError = true
          draft.body.message = "This is required field."
        }
        break
      case "notFound":
        draft.isFetching = false
        draft.hasPost = false
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function handleCreatePost(e) {
    e.preventDefault()
    dispatch({ type: "validateTitle" })
    dispatch({ type: "validateBody" })
    dispatch({ type: "updatePost" })
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPost() {
      try {
        const response = await Request({
          url: `/post/${state.id}`,
          method: "GET",
          cancelToken: ourRequest.token
        })
        if (response.data) {
          dispatch({ type: "fetchCompleted", value: response.data })
        } else {
          dispatch({ type: "notFound" })
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchPost()

    return () => {
      ourRequest.cancel()
    }
  }, [])

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "updating" })
      const ourRequest = Axios.CancelToken.source()

      async function updatePost() {
        try {
          const response = await Request({
            url: `/post/${state.id}/edit`,
            method: "POST",
            data: {
              title: state.title.value,
              body: state.body.value,
              token: appState.user.token
            },
            cancelToken: ourRequest.token
          })
          dispatch({ type: "updated" })
          appDispatch({ type: "alertMessage", value: "Post was updated successfully", alert_type: "success" })
          props.history.push(`/post/${state.id}`)
        } catch (e) {
          console.log(e)
        }
      }
      updatePost()

      return () => {
        ourRequest.cancel()
      }
    }
  }, [state.sendCount])

  if (state.isFetching) {
    return <Loading />
  } else if (!state.hasPost) {
    return <Page404 />
  }

  return (
    <Page title="Edit post">
      <Link to={`/post/${state.id}`} className="small font-weight-bold">
        &laquo; Back to post
      </Link>
      <form className="mt-3" onSubmit={handleCreatePost}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => dispatch({ type: "titleChanged", value: e.target.value })} onBlur={e => dispatch({ type: "validateTitle", value: e.target.value })} value={state.title.value} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
          {state.title.hasError && <div className="alert alert-danger small LiveValidateMessage">{state.title.message}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => dispatch({ type: "bodyChanged", value: e.target.value })} onBlur={e => dispatch({ type: "validateBody", value: e.target.value })} value={state.body.value} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
          <small className="text-sm help-text text-muted">You can use markdown for styling.</small>
          {state.body.hasError && <div className="alert alert-danger small LiveValidateMessage">{state.body.message}</div>}
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          {state.isSaving ? "Updating..." : "Update Post"}
        </button>
      </form>
    </Page>
  )
}

export default withRouter(EditPost)
