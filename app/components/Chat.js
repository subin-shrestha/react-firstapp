import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useImmer } from "use-immer"
import DispatchContext from "../_contexts/DispatchContext"
import StateContext from "../_contexts/StateContext"

function Chat() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  const chatField = useRef(null)
  const [chatText, setChatText] = useState()
  const [state, setState] = useImmer({
    messages: []
  })

  useEffect(() => {
    if (appState.isChatOpen) {
      chatField.current.focus()
    }
  }, [appState.isChatOpen])

  function handleSubmit(e) {
    e.preventDefault()
    if (chatText) {
      setState(draft => {
        draft.messages.push({
          username: appState.user.username,
          avatar: appState.user.avatar,
          message: chatText
        })
      })
      setChatText("")
    }
  }

  return (
    <div id="chat-wrapper" className={"chat-wrapper shadow border-top border-left border-right " + (appState.isChatOpen ? "chat-wrapper--is-visible" : "")}>
      <div className="chat-title-bar bg-primary">
        Chat
        <span onClick={() => appDispatch({ type: "closeChat" })} className="chat-title-bar-close">
          <i className="fas fa-times-circle"></i>
        </span>
      </div>
      <div id="chat" className="chat-log">
        {state.messages.map((message, index) => {
          if (message.username == appState.user.username) {
            return (
              <div key={index} className="chat-self">
                <div className="chat-message">
                  <div className="chat-message-inner">{message.message}</div>
                </div>
                <img className="chat-avatar avatar-tiny" src={message.avatar} />
              </div>
            )
          }
          return (
            <div key={index} className="chat-other">
              <Link to={`/profile/${message.username}`}>
                <img className="avatar-tiny" src={message.avatar} />
              </Link>
              <div className="chat-message">
                <div className="chat-message-inner">
                  <Link to={`/profile/${message.username}`}>
                    <strong>{message.username}:</strong>
                  </Link>
                  {message.message}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <form onSubmit={handleSubmit} id="chatForm" className="chat-form border-top">
        <input ref={chatField} onChange={e => setChatText(e.target.value)} value={chatText} type="text" className="chat-field" id="chatField" placeholder="Type a message…" autoComplete="off" />
      </form>
    </div>
  )
}

export default Chat
