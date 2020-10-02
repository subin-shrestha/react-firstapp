import Axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { NavLink, Route, Switch, useParams } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import DispatchContext from "../../_contexts/DispatchContext"
import StateContext from "../../_contexts/StateContext"
import Request from "../../_requests/Request"
import Page from "../Page"
import Loading from "../pages/Loading"
import Page404 from "../pages/Page404"
import PostList from "../post/PostList"
import Followers from "./Followers"
import Following from "./Followings"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const initialState = {
    profile: {
      profileUsername: "...",
      profileAvatar: "https://via.placeholder.com/32",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" }
    },
    isFetching: true,
    hasProfile: true,
    followingActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetching":
        draft.isFetching = true
        break
      case "fetchCompleted":
        draft.profile = action.data
        draft.isFetching = false
        break
      case "noUser":
        draft.isFetching = false
        draft.hasProfile = false
        break
      case "startFollowing":
        if (draft.profile.isFollowing) {
          appDispatch({ type: "alertMessage", value: "You have already followed this user.", alert_type: "danger" })
        } else {
          draft.followingActionLoading = true
          draft.startFollowingRequestCount++
        }
        break
      case "followComplete":
        draft.followingActionLoading = false
        draft.profile.isFollowing = true
        draft.profile.counts.followerCount++
        appDispatch({ type: "alertMessage", value: `You have followed user '${username}'.`, alert_type: "success" })
        break
      case "stopFollowing":
        if (!draft.profile.isFollowing) {
          appDispatch({ type: "alertMessage", value: "You have already unfollowed this user.", alert_type: "danger" })
        } else {
          draft.followingActionLoading = true
          draft.stopFollowingRequestCount++
        }
        break
      case "stopFollowComplete":
        draft.followingActionLoading = false
        draft.profile.isFollowing = false
        draft.profile.counts.followerCount--
        appDispatch({ type: "alertMessage", value: `You have unfollowed user '${username}'.`, alert_type: "success" })
        break
      case "followError":
        draft.followingActionLoading = false
        appDispatch({ type: "alertMessage", value: "Some error occured. Please try again later.", alert_type: "danger" })
        break
    }
  }

  useEffect(() => {
    const fetchRequest = Axios.CancelToken.source()
    dispatch({ type: "fetching" })
    async function fetchUser() {
      try {
        const response = await Request({
          url: `/profile/${username}`,
          method: "POST",
          data: { token: appState.user.token },
          cancelToken: fetchRequest.token
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
      fetchRequest.cancel()
    }
  }, [username])

  useEffect(() => {
    if (state.startFollowingRequestCount) {
      const followRequest = Axios.CancelToken.source()

      async function followUser() {
        try {
          const response = await Request({
            url: `/addFollow/${username}`,
            method: "POST",
            data: { token: appState.user.token },
            cancelToken: followRequest.token
          })
          if (response.data) {
            dispatch({ type: "followComplete" })
          } else {
            dispatch({ type: "followError" })
          }
        } catch (e) {
          dispatch({ type: "followError" })
        }
      }
      followUser()

      return () => {
        followRequest.cancel()
      }
    }
  }, [state.startFollowingRequestCount])

  useEffect(() => {
    if (state.stopFollowingRequestCount) {
      const cancelRequest = Axios.CancelToken.source()
      async function unfollowUser() {
        try {
          const response = await Request({
            url: `/removeFollow/${username}`,
            method: "POST",
            data: { token: appState.user.token },
            cancelToken: cancelRequest.token
          })
          if (response.data) {
            dispatch({ type: "stopFollowComplete" })
          } else {
            dispatch({ type: "followError" })
          }
        } catch (e) {
          dispatch({ type: "followError" })
        }
      }
      unfollowUser()

      return () => {
        cancelRequest.cancel()
      }
    }
  }, [state.stopFollowingRequestCount])

  function displayButton() {
    if (appState.loggedIn && appState.user.username != username) {
      if (state.profile.isFollowing) {
        return (
          <button onClick={e => dispatch({ type: "stopFollowing" })} className={`btn btn-danger btn-sm ml-2`}>
            Unfollow{state.followingActionLoading && "ing..."} <i className="fas fa-user-times"></i>
          </button>
        )
      } else {
        return (
          <button onClick={e => dispatch({ type: "startFollowing" })} className={`btn btn-primary btn-sm ml-2`}>
            Follow{state.followingActionLoading && "ing..."} <i className="fas fa-user-plus"></i>
          </button>
        )
      }
    }
  }

  if (state.isFetching) {
    return <Loading />
  } else if (!state.hasProfile) {
    return <Page404 />
  }

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={state.profile.profileAvatar} />
        {state.profile.profileUsername} {displayButton()}
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <NavLink to={`/profile/${username}`} exact className="nav-item nav-link">
          Posts: {state.profile.counts.postCount}
        </NavLink>
        <NavLink to={`/profile/${username}/followers`} className="nav-item nav-link">
          Followers: {state.profile.counts.followerCount}
        </NavLink>
        <NavLink to={`/profile/${username}/following`} className="nav-item nav-link">
          Following: {state.profile.counts.followingCount}
        </NavLink>
      </div>

      <Switch>
        <Route path="/profile/:username" component={PostList} exact></Route>
        <Route path="/profile/:username/followers" component={Followers}></Route>
        <Route path="/profile/:username/following" component={Following}></Route>
      </Switch>
    </Page>
  )
}

export default Profile
