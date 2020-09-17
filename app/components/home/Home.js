import React, { useContext } from "react"
import StateContext from "../../_contexts/StateContext"
import Page from "../Page"

function Home() {
  const appState = useContext(StateContext)

  return (
    <Page title={`Welcome ${appState.user.username}!`}>
      <div className="container container--narrow py-md-5">
        <h2 className="text-center">
          Hello <strong>{appState.user.username}</strong>, your feed is empty.
        </h2>
        <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
      </div>
    </Page>
  )
}

export default Home
