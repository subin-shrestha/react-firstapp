import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import AppRouting from "./components/AppRouting"
import Footer from "./components/Footer"
import Header from "./components/Header"

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouting />
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
