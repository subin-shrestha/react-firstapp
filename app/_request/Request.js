import Axios from "axios"
import React from "react"

const REACT_APP_BASE_URL = "https://complexapp-nodejs.herokuapp.com"

function Request(url, method, data) {
  try {
    return Axios.request({
      url: url,
      method: method,
      data: data,
      baseURL: REACT_APP_BASE_URL
    })
  } catch (e) {
    console.log(e.response)
    return e.response
  }
}

export default Request
