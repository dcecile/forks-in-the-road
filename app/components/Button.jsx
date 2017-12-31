import React from "react"

function Button({ className, type, onClick, children }) {
  const props = { type, onClick, children }
  return <button className={`Button ${className}`} {...props} />
}

export default Button
