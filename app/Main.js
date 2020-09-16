import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import AppRouting from "./components/AppRouting"
import Footer from "./components/Footer"
import Header from "./components/Header"
import UserContext from "./_contexts/UserContext"
import Alert from "./_directives/Alert"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")))
  const [alertMessages, setAlertMessages] = useState([])

  function addAlertMessage(content, type) {
    setAlertMessages(prev => prev.concat({ content, type }))
  }

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, addAlertMessage }}>
      <BrowserRouter>
        <Alert messages={alertMessages} />
        <Header />
        <AppRouting />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
