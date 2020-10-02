import Axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import StateContext from "../../_contexts/StateContext"
import Request from "../../_requests/Request"
import Loading from "../pages/Loading"

function Following() {
  const appState = useContext(StateContext)
  const { username } = useParams()
  const [isFetching, setIsFetching] = useState(true)
  const [following, setFollowing] = useState([])

  useEffect(() => {
    const followerRequest = Axios.CancelToken.source()

    async function fetchFollowing() {
      setIsFetching(true)
      try {
        const response = await Request({
          url: `/profile/${username}/following`,
          method: "GET",
          cancelToken: followerRequest.token
        })
        setFollowing(response.data)
        setIsFetching(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchFollowing()

    return () => {
      followerRequest.cancel()
    }
  }, [])

  if (isFetching) {
    return <Loading />
  } else if (!following || !following.length) {
    return (
      <div className="text-center">
        <div></div>
        <p className="lead text-muted">{appState.user.username == username ? "You have not following anyone yet." : "This user has not following anyone yet."}</p>
      </div>
    )
  }

  return (
    <div className="list-group">
      {following.map((user, index) => {
        return (
          <Link key={index} to={`/profile/${user.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={user.avatar} /> <strong>{user.username}</strong>
          </Link>
        )
      })}
    </div>
  )
}

export default Following
