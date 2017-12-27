import React from "react"

function Button({ className, type, children }) {
  return (
    <button className={`Button ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Button
