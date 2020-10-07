import Axios from "axios"
import React from "react"

function Request(props) {
  return Axios.request({
    url: props.url,
    method: props.method,
    data: props.data,
    baseURL: process.env.BACKENDURL || "https://complexapp-nodejs.herokuapp.com",
    cancelToken: props.cancelToken
  })
}

export default Request
