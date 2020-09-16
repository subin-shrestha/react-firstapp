import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import AppRouting from "./components/AppRouting"
import Footer from "./components/Footer"
import Header from "./components/Header"
import UserContext from "./_context/UserContext"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")))

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <BrowserRouter>
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
