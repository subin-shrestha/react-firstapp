import React, { useContext, useState } from "react"
import DispatchContext from "../../_contexts/DispatchContext"
import StateContext from "../../_contexts/StateContext"
import Request from "../../_requests/Request"

function Annoymous() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const appDispatch = useContext(DispatchContext)

  async function HandleLogin(e) {
    e.preventDefault()
    const response = await Request({
      url: "/login",
      method: "POST",
      data: { username, password }
    })

    if (response.data) {
      appDispatch({ type: "login", data: response.data })
    } else {
      appDispatch({ type: "alertMessage", value: "Incorrect Username or Password!", alert_type: "danger" })
    }
  }

  return (
    <form onSubmit={HandleLogin} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default Annoymous
