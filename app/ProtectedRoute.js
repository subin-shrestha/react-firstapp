import React, { useContext } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import StateContext from "./_contexts/StateContext"

function ProtectedRoute({ component: Component, ...props }) {
  const state = useContext(StateContext)

  function getRender() {
    if (state.loggedIn) {
      return <Component {...props} />
    } else {
      return (
        <Redirect
          to={{
            pathname: "/",
            // pathname: `/?next=${props.location.pathname}`,
            state: {
              from: props.location
            }
          }}
        />
      )
    }
  }

  return <Route {...props}>{getRender()}</Route>
}

export default withRouter(ProtectedRoute)
