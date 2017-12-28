import React from "react"

function Button({ className, type, children }) {
  const props = { type, children }
  return <button className={`Button ${className}`} {...props} />
}

export default Button
