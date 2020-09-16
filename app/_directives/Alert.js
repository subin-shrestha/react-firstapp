import React from "react"

function Alert(props) {
  return (
    <div className="floating-alerts">
      {console.log(props)}
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className={`alert alert-${msg.type} text-center floating-alert shadow-sm`}>
            {msg.content}
          </div>
        )
      })}
    </div>
  )
}

export default Alert
