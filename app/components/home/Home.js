import Axios from "axios"
import React, { useContext, useEffect } from "react"
import { useImmer } from "use-immer"
import StateContext from "../../_contexts/StateContext"
import Request from "../../_requests/Request"
import Page from "../Page"
import Loading from "../pages/Loading"
import PostItem from "../post/PostItem"

function Home() {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    isLoading: true,
    feeds: []
  })

  useEffect(() => {
    const feedRequest = Axios.CancelToken.source()
    async function fetchFeed() {
      try {
        const response = await Request({
          url: `/getHomeFeed`,
          method: "POST",
          data: { token: appState.user.token },
          cancelToken: feedRequest.token
        })
        if (response.data) {
          setState(draft => {
            draft.isLoading = false
            draft.feeds = response.data
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchFeed()

    return () => {
      feedRequest.cancel()
    }
  }, [])

  function displayFeed() {
    if (state.feeds.length > 0) {
      return (
        <>
          <h2 className="text-center mb-4">The latest post from those you follow.</h2>
          <div className="list-group">
            {state.feeds.map(feed => {
              return <PostItem key={feed._id} post={feed} showAuthor={true} />
            })}
          </div>
        </>
      )
    } else {
      return (
        <>
          <h2 className="text-center">
            Hello <strong>{appState.user.username}</strong>, your feed is empty.
          </h2>
          <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
        </>
      )
    }
  }

  if (state.isLoading) {
    return <Loading />
  }

  return (
    <Page title={`Welcome ${appState.user.username}!`}>
      <div className="container container--narrow py-md-5">{displayFeed()}</div>
    </Page>
  )
}

export default Home
