import Axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import StateContext from "../_contexts/StateContext"
import Request from "../_requests/Request"
import Page from "./Page"
import Loading from "./pages/Loading"
import Page404 from "./pages/Page404"
import PostList from "./post/PostList"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)

  const initialState = {
    profile: {
      profileUsername: "...",
      profileAvatar: "https://via.placeholder.com/32",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" }
    },
    isFetching: true,
    hasProfile: true
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchCompleted":
        draft.profile = action.data
        draft.isFetching = false
        break
      case "noUser":
        draft.isFetching = false
        draft.hasProfile = false
        break
    }
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchUser() {
      try {
        const response = await Request({
          url: `/profile/${username}`,
          method: "POST",
          data: { token: appState.user.token },
          cancelToken: ourRequest.token
        })

        if (response.data) {
          dispatch({ type: "fetchCompleted", data: response.data })
        } else {
          dispatch({ type: "noUser" })
        }
      } catch (e) {
        dispatch({ type: "noUser" })
      }
    }
    fetchUser()

    return () => {
      ourRequest.cancel()
    }
  }, [])

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  if (state.isFetching) {
    return <Loading />
  } else if (!state.hasProfile) {
    return <Page404 />
  }

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={state.profile.profileAvatar} /> {state.profile.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {state.profile.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {state.profile.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {state.profile.counts.followingCount}
        </a>
      </div>

      <PostList />
    </Page>
  )
}

export default Profile
