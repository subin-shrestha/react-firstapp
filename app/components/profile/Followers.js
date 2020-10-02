import Axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import StateContext from "../../_contexts/StateContext"
import Request from "../../_requests/Request"
import Loading from "../pages/Loading"

function Followers() {
  const appState = useContext(StateContext)
  const { username } = useParams()
  const [isFetching, setIsFetching] = useState(true)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    const followerRequest = Axios.CancelToken.source()

    async function fetchFollowers() {
      setIsFetching(true)
      try {
        const response = await Request({
          url: `/profile/${username}/followers`,
          method: "GET",
          cancelToken: followerRequest.token
        })
        setFollowers(response.data)
        setIsFetching(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchFollowers()

    return () => {
      followerRequest.cancel()
    }
  }, [])

  if (isFetching) {
    return <Loading />
  } else if (!followers || !followers.length) {
    return (
      <div className="text-center">
        <div></div>
        <p className="lead text-muted">{appState.user.username == username ? "You don't have any followers." : "This user don't have any followers."}</p>
      </div>
    )
  }

  return (
    <div className="list-group">
      {followers.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} /> <strong>{follower.username}</strong>
          </Link>
        )
      })}
    </div>
  )
}

export default Followers
