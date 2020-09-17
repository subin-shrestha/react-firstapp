import Axios from "axios"
import React from "react"

const REACT_APP_BASE_URL = "https://complexapp-nodejs.herokuapp.com"

function Request(props) {
  return Axios.request({
    url: props.url,
    method: props.method,
    data: props.data,
    baseURL: REACT_APP_BASE_URL,
    cancelToken: props.cancelToken
  })
}

export default Request
