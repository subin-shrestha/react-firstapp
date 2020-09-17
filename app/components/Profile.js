import Axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StateContext from "../_contexts/StateContext"
import Request from "../_requests/Request"
import Page from "./Page"
import PostList from "./post/PostList"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://via.placeholder.com/32",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" }
  })

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Request({
          url: `/profile/${username}`,
          method: "POST",
          data: { token: appState.user.token },
          cancelToken: ourRequest.token
        })
        setProfileData(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPosts()

    return () => {
      ourRequest.cancel()
    }
  }, [])

  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <PostList />
    </Page>
  )
}

export default Profile
