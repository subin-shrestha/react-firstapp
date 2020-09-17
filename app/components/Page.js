import React, { useEffect } from "react"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Complex App`
    window.scrollTo(0, 0)
  }, [props.title])

  return <div className={"container py-md-5 " + (!props.wide && "container--narrow")}>{props.children}</div>
}

export default Page
