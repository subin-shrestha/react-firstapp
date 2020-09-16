import React, { useContext } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../../_contexts/DispatchContext"
import StateContext from "../../_contexts/StateContext"

function Registered() {
  const appDispatch = useContext(DispatchContext)

  function hangleLogout() {
    appDispatch({ type: "logout" })
    appDispatch({ type: "alertMessage", value: "Logout successfully!", alert_type: "danger" })

    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("avatar")
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <a href="#" className="mr-2">
        <img className="small-header-avatar" src={localStorage.getItem("avatar")} />
      </a>
      <Link to="/post/create" className="btn btn-sm btn-success mr-2">
        Create Post
      </Link>
      <button onClick={hangleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default Registered
