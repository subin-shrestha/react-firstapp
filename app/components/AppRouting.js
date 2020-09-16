import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import UserContext from "../_contexts/UserContext"
import About from "./footer/About"
import Terms from "./footer/Terms"
import Home from "./home/Home"
import HomeGuest from "./home/HomeGuest"

function AppRouting(props) {
  const { loggedIn } = useContext(UserContext)

  return (
    <Switch>
      <Route path="/" exact>
        {loggedIn ? <Home /> : <HomeGuest />}
      </Route>
      <Route path="/about-us">
        <About />
      </Route>
      <Route path="/terms">
        <Terms />
      </Route>
    </Switch>
  )
}

export default AppRouting
