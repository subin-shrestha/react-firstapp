import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import StateContext from "./_contexts/StateContext"
import About from "./components/footer/About"
import Terms from "./components/footer/Terms"
import Home from "./components/home/Home"
import HomeGuest from "./components/home/HomeGuest"
import ViewPost from "./components/post/ViewPost"
import CreatePost from "./components/post/CreatePost"

function AppRouting(props) {
  const state = useContext(StateContext)

  return (
    <Switch>
      <Route path="/" exact>
        {state.loggedIn ? <Home /> : <HomeGuest />}
      </Route>
      <Route path="/post/create">
        <CreatePost />
      </Route>
      <Route path="/post/:id">
        <ViewPost />
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
