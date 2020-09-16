import React, { useContext, useState } from "react"
import UserContext from "../../_contexts/UserContext"
import Request from "../../_requests/Request"

function Annoymous() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const { setLoggedIn, addAlertMessage } = useContext(UserContext)

  async function HandleLogin(e) {
    e.preventDefault()
    const response = await Request("/login", "POST", { username, password })
    if (response.data) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("username", response.data.username)
      localStorage.setItem("avatar", response.data.avatar)

      setLoggedIn(true)
      addAlertMessage("Login successfully!", "success")
    } else {
      console.log("Incorrect Username or Password.")
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
