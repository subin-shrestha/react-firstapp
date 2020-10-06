import React, { Suspense, useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import AppRouting from "./AppRouting"
import Footer from "./components/Footer"
import Header from "./components/Header"
import DispatchContext from "./_contexts/DispatchContext"
import StateContext from "./_contexts/StateContext"
import Alert from "./_directives/Alert"
// import Chat from "./components/Chat"
import Loading from "./components/pages/Loading"

const Search = React.lazy(() => import("./components/pages/Search"))
const Chat = React.lazy(() => import("./components/Chat"))

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    alertMessages: [],
    user: {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      avatar: localStorage.getItem("avatar")
    },
    isSearchOpen: false,
    isChatOpen: false
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        draft.alertMessages.push({ content: "Login successfully!", alert_type: "success" })
        break
      case "logout":
        draft.loggedIn = false
        draft.alertMessages.push({ content: "Logout successfully!", alert_type: "danger" })
        break
      case "alertMessage":
        draft.alertMessages.push({ content: action.value, alert_type: action.alert_type })
        break
      case "openSearch":
        draft.isSearchOpen = true
        break
      case "closeSearch":
        draft.isSearchOpen = false
        break
      case "toggleChat":
        draft.isChatOpen = !draft.isChatOpen
        break
      case "closeChat":
        draft.isChatOpen = false
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("token", state.user.token)
      localStorage.setItem("username", state.user.username)
      localStorage.setItem("avatar", state.user.avatar)
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("avatar")
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Alert messages={state.alertMessages} />
          <Header />
          <AppRouting />
          <CSSTransition timeout={330} in={state.isSearchOpen} classNames="search-overlay" unmountOnExit>
            <div className="search-overlay">
              <Suspense fallback="">
                <Search />
              </Suspense>
            </div>
          </CSSTransition>
          <Suspense fallback={<Loading />}>{state.loggedIn && <Chat />}</Suspense>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
