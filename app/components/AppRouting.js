import React from "react"
import { Switch, Route } from "react-router-dom"
import About from "./footer/About"
import Terms from "./footer/Terms"
import HomeGuest from "./home/HomeGuest"

function AppRouting() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomeGuest />
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
