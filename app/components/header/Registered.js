import React, { useContext } from "react"
import { Link, withRouter } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import DispatchContext from "../../_contexts/DispatchContext"
import StateContext from "../../_contexts/StateContext"

function Registered(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function hangleLogout() {
    appDispatch({ type: "logout" })
    props.history.push("/")
  }

  function handleChat() {
    appDispatch({ type: "toggleChat" })
  }

  function handleSearch(e) {
    e.preventDefault()
    appDispatch({ type: "openSearch" })
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" onClick={handleSearch} data-tip="Search" data-for="search" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip id="search" />
      <span onClick={handleChat} data-tip="Chat" data-for="chat" className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <ReactTooltip id="chat" />
      <Link to={`/profile/${appState.user.username}`} data-tip="Profile" data-for="user" className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <ReactTooltip id="user" />
      <Link to="/post/create" className="btn btn-sm btn-success mr-2">
        Create Post
      </Link>
      <button onClick={hangleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default withRouter(Registered)
