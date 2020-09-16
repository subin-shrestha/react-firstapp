import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import UserContext from "./_contexts/UserContext"
import About from "./components/footer/About"
import Terms from "./components/footer/Terms"
import Home from "./components/home/Home"
import HomeGuest from "./components/home/HomeGuest"
import CreatePost from "./post/CreatePost"
import ViewPost from "./post/ViewPost"

function AppRouting(props) {
  const { loggedIn } = useContext(UserContext)

  return (
    <Switch>
      <Route path="/" exact>
        {loggedIn ? <Home /> : <HomeGuest />}
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
