import React from "react"

export default function Button({ className, type, onClick, children }) {
  const props = { type, onClick, children }
  return <button className={`Button ${className}`} {...props} />
}
