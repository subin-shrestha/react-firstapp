import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import StateContext from "./_contexts/StateContext"
import About from "./components/footer/About"
import Terms from "./components/footer/Terms"
import Home from "./components/home/Home"
import HomeGuest from "./components/home/HomeGuest"
import ViewPost from "./components/post/ViewPost"
import CreatePost from "./components/post/CreatePost"
import Profile from "./components/Profile"
import ProtectedRoute from "./ProtectedRoute"
import Page404 from "./components/pages/Page404"

function AppRouting(props) {
  const state = useContext(StateContext)

  return (
    <Switch>
      <Route path="/" component={state.loggedIn ? Home : HomeGuest} exact />
      <ProtectedRoute path="/post/create" component={CreatePost} exact />
      <ProtectedRoute path="/post/:id" component={ViewPost} exact />
      <ProtectedRoute path="/profile/:username" component={Profile} exact />
      <Route path="/about-us" component={About} exact />
      <Route path="/terms" component={Terms} exact />
      <Route path="*" component={Page404} />
    </Switch>
  )
}

export default AppRouting
