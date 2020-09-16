import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import AppRouting from "./AppRouting"
import Footer from "./components/Footer"
import Header from "./components/Header"
import DispatchContext from "./_contexts/DispatchContext"
import StateContext from "./_contexts/StateContext"
import Alert from "./_directives/Alert"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    alertMessages: []
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        break
      case "logout":
        draft.loggedIn = false
        break
      case "alertMessage":
        draft.alertMessages.push({ content: action.value, alert_type: action.alert_type })
        break
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Alert messages={state.alertMessages} />
          <Header />
          <AppRouting />
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
