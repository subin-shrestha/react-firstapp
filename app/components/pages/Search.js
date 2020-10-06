import Axios from "axios"
import React, { useContext, useEffect } from "react"
import { useImmer } from "use-immer"
import DispatchContext from "../../_contexts/DispatchContext"
import Request from "../../_requests/Request"
import PostItem from "../post/PostItem"

function Search() {
  const appDispatch = useContext(DispatchContext)

  const [state, setState] = useImmer({
    searchText: "",
    results: [],
    show: "",
    requestCount: 0
  })

  function closeSearch() {
    appDispatch({ type: "closeSearch" })
  }

  function searchKeyPressHandler(e) {
    if (e.keyCode == 27) {
      closeSearch()
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler)
    return () => {
      document.removeEventListener("keyup", searchKeyPressHandler)
    }
  }, [])

  useEffect(() => {
    if (state.requestCount) {
      const ourRequest = Axios.CancelToken.source()
      async function searchPost() {
        try {
          const response = await Request({
            url: "/search",
            method: "POST",
            data: { searchTerm: state.searchText },
            cancelToken: ourRequest.token
          })
          setState(draft => {
            draft.show = "results"
            draft.results = response.data
          })
        } catch (e) {
          console.log(e)
        }
      }
      searchPost()
    }
  }, [state.requestCount])

  useEffect(() => {
    if (state.searchText.trim()) {
      setState(draft => {
        draft.show = "loading"
      })
      const delay = setTimeout(() => {
        setState(draft => {
          draft.requestCount++
        })
      }, 750)
      return () => clearTimeout(delay)
    } else {
      setState(draft => {
        draft.show = ""
      })
    }
  }, [state.searchText])

  function handleSearch(e) {
    const value = e.target.value
    setState(draft => {
      draft.searchText = value
    })
  }

  function showResults() {
    if (state.results.length) {
      return (
        <div className="list-group shadow-sm">
          <div className="list-group-item active">
            <strong>Search Results</strong> ({state.results.length} {state.results.length == 1 ? "item" : "items"} found)
          </div>

          {state.results.map(post => {
            return <PostItem key={post._id} post={post} />
          })}
        </div>
      )
    } else {
      return <p className="alert alert-danger text-center shadow-sm">Sorry, we could not find any results.</p>
    }
  }

  return (
    <>
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input onChange={handleSearch} autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
          <span onClick={closeSearch} className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>

      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className={"circle-loader " + (state.show == "loading" && "circle-loader--visible")}></div>
          <div className={"live-search-results " + (state.show == "results" && "live-search-results--visible")}>{showResults()}</div>
        </div>
      </div>
    </>
  )
}

export default Search
