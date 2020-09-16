import React, { useContext } from "react"
import { Link } from "react-router-dom"
import StateContext from "../_contexts/StateContext"
import Annoymous from "./header/Annoymous"
import Registered from "./header/Registered"

function Header(props) {
  const appState = useContext(StateContext)

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        {appState.loggedIn ? <Registered /> : <Annoymous />}
      </div>
    </header>
  )
}

export default Header
