import React, { Suspense, useContext } from "react"
import { Switch, Route } from "react-router-dom"
import StateContext from "./_contexts/StateContext"
import About from "./components/footer/About"
import Terms from "./components/footer/Terms"
import Home from "./components/home/Home"
import HomeGuest from "./components/home/HomeGuest"
import Profile from "./components/profile/Profile"
import ProtectedRoute from "./ProtectedRoute"
import Page404 from "./components/pages/Page404"
import Loading from "./components/pages/Loading"

const CreatePost = React.lazy(() => import("./components/post/CreatePost"))
const EditPost = React.lazy(() => import("./components/post/EditPost"))
const ViewPost = React.lazy(() => import("./components/post/ViewPost"))

function AppRouting(props) {
  const state = useContext(StateContext)

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={state.loggedIn ? Home : HomeGuest} exact />
        <ProtectedRoute path="/post/create" component={CreatePost} exact />
        <ProtectedRoute path="/post/:id" component={ViewPost} exact />
        <ProtectedRoute path="/post/:id/edit" component={EditPost} exact />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/about-us" component={About} exact />
        <Route path="/terms" component={Terms} exact />
        <Route path="*" component={Page404} />
      </Switch>
    </Suspense>
  )
}

export default AppRouting
